import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UppercaseNamePipe } from '../../shared/pipes/uppercase-name.pipe';
import { HighlightCardDirective } from '../../shared/directives/highlight-card.directive';
import { ApiRequestService } from '../../shared/services/api-request.service';
import { Character } from '../../shared/models/character.module';

@Component({
  selector: 'app-all-characters',
  standalone: true,
  templateUrl: './all-characters.component.html',
  styleUrl: './all-characters.component.css',
  // providers: [ApiRequestService],
  imports: [CommonModule, RouterLink, UppercaseNamePipe, HighlightCardDirective],
})
export class AllCharactersComponent implements OnInit {
  characters = signal<Character[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  page = signal<number>(0);
  filter = signal<string>('');

  constructor(private api: ApiRequestService) {}

  ngOnInit(): void {
    this.fetchCharacters();
  }

  fetchCharacters(offset: number = 0): void {
    this.loading.set(true);
    this.error.set(null);
    this.api.getAllCharacters(offset).subscribe({
      next: (response: any) => {
        const results = response?.data?.results as Character[];
        this.characters.set(results || []);
        this.loading.set(false);
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

  setFilter(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input?.value ?? '';
    this.filter.set(value);
    if (value.trim().length > 0) {
      this.loading.set(true);
      this.error.set(null);
      this.api.getCharacterByName(value).subscribe({
        next: (response: any) => {
          const results = response?.data?.results as Character[];
          this.characters.set(results || []);
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set('Erro ao buscar personagens.');
          this.loading.set(false);
        },
      });
    } else {
      this.fetchCharacters(this.page() * 100);
    }
  }
}
