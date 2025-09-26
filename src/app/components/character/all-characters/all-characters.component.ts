import { Component, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UppercaseNamePipe } from '../../../shared/pipes/uppercase-name.pipe';
import { AddCharacterComponent } from '../add-character/add-character.component';
import { HighlightCardDirective } from '../../../shared/directives/highlight-card.directive';
import { ApiRequestService } from '../../../shared/services/api-request.service';
import { Character } from '../../../shared/models/character.module';

@Component({
	selector: 'app-all-characters',
	standalone: true,
	templateUrl: './all-characters.component.html',
	styleUrl: './all-characters.component.css',
	imports: [CommonModule, RouterLink, UppercaseNamePipe, HighlightCardDirective, ReactiveFormsModule, AddCharacterComponent],
})
export class AllCharactersComponent implements OnInit {
	alphabet: string[] = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
	selectedLetter: string | null = null;
	// Lista local persistida
	localCharacters: Character[] = [];
	// Lista exibida (filtrada)
	characters = signal<Character[]>([]);
	loading = signal<boolean>(false);
	error = signal<string | null>(null);
	page = signal<number>(0);
	filterControl = new FormControl('');
	showAddModal = false;

	constructor(private api: ApiRequestService) {
		this.filterControl.valueChanges.subscribe((value: string | null) => {
			this.filterCharacters(value ?? '');
		});
	}

	ngOnInit(): void {
		this.loadLocalCharacters();
		if (this.localCharacters.length === 0) {
			this.fetchCharacters();
		} else {
			this.filterCharacters(this.filterControl.value ?? '');
		}
	}

	loadLocalCharacters() {
		const data = localStorage.getItem('characters');
		this.localCharacters = data ? JSON.parse(data) : [];
	}

	saveLocalCharacters() {
		localStorage.setItem('characters', JSON.stringify(this.localCharacters));
	}

		onAddCharacter(newChar: any) {
			const id = Math.max(0, ...this.localCharacters.map((c: any) => c.id || 0)) + 1000000; // ids locais altos para evitar conflito
			const character: Character = {
				id,
				name: newChar.name,
				description: newChar.description || '',
				thumbnail: newChar.thumbnail,
				modified: new Date(),
			};
			this.localCharacters.unshift(character);
			this.saveLocalCharacters();
			this.filterCharacters(this.filterControl.value ?? '');
			this.showAddModal = false;
			this.filterControl.setValue(newChar.name); // já filtra pelo novo nome
		}

	fetchCharacters(offset: number = 0): void {
		this.loading.set(true);
		this.error.set(null);
		this.api.getAllCharacters(offset).subscribe({
			next: (response: any) => {
				this.localCharacters = response?.data?.results || [];
				this.saveLocalCharacters();
				this.filterCharacters(this.filterControl.value ?? '');
				this.loading.set(false);
				this.showAddModal = false;
			},
			error: (err) => {
				this.error.set('Erro ao buscar personagens.');
				this.loading.set(false);
			},
		});
	}

	nextPage(): void {
		this.page.set(this.page() + 1);
		this.fetchCharacters(this.page() * 100);
	}

	prevPage(): void {
		if (this.page() > 0) {
			this.page.set(this.page() - 1);
			this.fetchCharacters(this.page() * 100);
		}
	}

			filterCharacters(value: string): void {
				let all = [...this.localCharacters];
				// Filtro por letra
				if (this.selectedLetter) {
					all = all.filter(c => c.name && c.name[0]?.toUpperCase() === this.selectedLetter);
				}
				// Filtro por texto
				if (value && value.trim().length > 0) {
					all = all.filter(c => c.name.toLowerCase().includes(value.toLowerCase()));
				}
				// Ordenação alfabética
				all.sort((a, b) => a.name.localeCompare(b.name));
				if (all.length > 0) {
					this.characters.set(all);
					return;
				}
				// Se não encontrou localmente, busca na API e adiciona ao localStorage
				if (value && value.trim().length > 0) {
					this.loading.set(true);
					this.api.getCharactersByName(value).subscribe({
						next: (response: any) => {
							const results = response?.data?.results || [];
							if (results.length > 0) {
								// Adiciona ao localStorage se não existir
								results.forEach((char: any) => {
									if (!this.localCharacters.some(c => c.id === char.id)) {
										this.localCharacters.push(char);
									}
								});
								this.saveLocalCharacters();
							}
							let updated = [...this.localCharacters];
							if (this.selectedLetter) {
								updated = updated.filter(c => c.name && c.name[0]?.toUpperCase() === this.selectedLetter);
							}
							updated = updated.filter(c => c.name.toLowerCase().includes(value.toLowerCase()));
							updated.sort((a, b) => a.name.localeCompare(b.name));
							this.characters.set(updated);
							this.loading.set(false);
						},
						error: () => {
							this.error.set('Erro ao buscar personagem na API.');
							this.loading.set(false);
						}
					});
				} else {
					this.characters.set([]);
				}
			}

				selectLetter(letter: string | null) {
					this.selectedLetter = letter;
					// Se não houver letra selecionada, volta ao filtro normal
					if (!letter) {
						this.filterCharacters(this.filterControl.value ?? '');
						return;
					}
					this.loading.set(true);
					this.error.set(null);
					// Busca local
					let localResults = this.localCharacters.filter(c => c.name && c.name[0]?.toUpperCase() === letter);
					// Busca na API por prefixo
					this.api.getCharactersByName(letter).subscribe({
						next: (response: any) => {
							const apiResults = (response?.data?.results || []).filter((c: any) => c.name && c.name[0]?.toUpperCase() === letter);
							// Unifica locais e API, evitando duplicados
							const all = [...localResults];
							apiResults.forEach((char: any) => {
								if (!all.some(c => c.id === char.id)) {
									all.push(char);
								}
							});
							all.sort((a, b) => a.name.localeCompare(b.name));
							this.characters.set(all);
							this.loading.set(false);
						},
						error: () => {
							this.error.set('Erro ao buscar personagens por letra.');
							this.loading.set(false);
						}
					});
				}
}
