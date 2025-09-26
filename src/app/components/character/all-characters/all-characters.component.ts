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
		this.fetchCharacters();
	}

	onAddCharacter(newChar: any) {
		const id = Math.max(0, ...this.characters().map((c: any) => c.id || 0)) + 1;
		this.characters.set([
			{ ...newChar, id },
			...this.characters()
		]);
		this.showAddModal = false;
		this.filterControl.setValue(newChar.name); // já filtra pelo novo nome
	}

	fetchCharacters(offset: number = 0): void {
		this.loading.set(true);
		this.error.set(null);
		this.api.getAllCharacters(offset).subscribe({
			next: (response: any) => {
				const results = response?.data?.results as Character[];
				this.characters.set(results || []);
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
		const pageValue = typeof this.page === 'function' ? this.page() : 0;
		if (!value || value.trim().length === 0) {
			// Campo vazio: busca a lista completa da página
			this.fetchCharacters(pageValue * 100);
			return;
		}
		// Campo preenchido: busca todos da página e filtra
		this.loading.set(true);
		this.error.set(null);
		this.api.getCharactersByName(value).subscribe({
			next: (response: any) => {
				const results = response?.data?.results as Character[];
				this.characters.set(results || []);
				this.loading.set(false);
			},
			error: (err: any) => {
				this.error.set('Erro ao buscar personagens.');
				this.loading.set(false);
			},
		});
	}
}
