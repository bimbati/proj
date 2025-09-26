import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiRequestService } from '../../shared/services/api-request.service';
import { Character } from '../../shared/models/character.module';

@Component({
  selector: 'app-search-character',
  standalone: true,
  templateUrl: './search-character.component.html',
  styleUrl: './search-character.component.css',
  imports: [CommonModule],
})
export class SearchCharacterComponent {
  ngOnInit(): void {
    if (this.searchTerm()) {
      this.search();
    }
  }
  searchTerm = signal<string>('');
  character = signal<Character | null>(null);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor(private api: ApiRequestService) {}

  search(): void {
    if (!this.searchTerm()) return;
    this.loading.set(true);
    this.error.set(null);
    this.api.getCharacterByName(this.searchTerm()).subscribe({
      next: (response: any) => {
        const result = response?.data?.results?.[0] as Character;
        this.character.set(result || null);
        this.loading.set(false);
        if (!result) this.error.set('Personagem não encontrado.');
      },
      error: () => {
        this.error.set('Erro ao buscar personagem.');
        this.loading.set(false);
      },
    });
  }
  setSearchTerm(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input?.value ?? '');
  }
}
