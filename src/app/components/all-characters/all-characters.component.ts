import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiRequestService } from '../../shared/services/api-request.service';
import { Character } from '../../shared/models/character.module';

@Component({
  selector: 'app-all-characters',
  standalone: true,
  templateUrl: './all-characters.component.html',
  styleUrl: './all-characters.component.css',
  providers: [ApiRequestService],
  imports: [CommonModule],
})
export class AllCharactersComponent implements OnInit {
  characters = signal<Character[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

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
}
