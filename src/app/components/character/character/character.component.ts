import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Character } from '../../../shared/models/character.module';
import { ApiRequestService } from '../../../shared/services/api-request.service';

@Component({
	selector: 'app-character',
	standalone: true,
	templateUrl: './character.component.html',
	styleUrl: './character.component.css',
	imports: [CommonModule],
})
export class CharacterComponent implements OnInit {
	character: Character | null = null;
	notFound = false;
	loading = false;

	constructor(private route: ActivatedRoute, private api: ApiRequestService) {}

		ngOnInit(): void {
			const id = Number(this.route.snapshot.paramMap.get('id'));
			const data = localStorage.getItem('characters');
			let characters: Character[] = data ? JSON.parse(data) : [];
			this.character = characters.find(c => c.id === id) || null;
			// Se for personagem local (id >= 1000000), não tenta buscar na API
			if (!this.character && id < 1000000) {
				this.loading = true;
				this.api.getCharacterById(String(id)).subscribe({
					next: (response: any) => {
						const result = response?.data?.results?.[0];
						if (result) {
							characters.push(result);
							localStorage.setItem('characters', JSON.stringify(characters));
							this.character = result;
							this.notFound = false;
						} else {
							this.notFound = true;
						}
						this.loading = false;
					},
					error: () => {
						this.notFound = true;
						this.loading = false;
					}
				});
			} else if (!this.character) {
				this.notFound = true;
			} else {
				this.notFound = false;
			}
		}
}
