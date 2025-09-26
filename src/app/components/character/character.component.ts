import { Component, signal, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiRequestService } from '../../shared/services/api-request.service';
import { Character } from '../../shared/models/character.module';

@Component({
  selector: 'app-character',
  standalone: true,
  templateUrl: './character.component.html',
  styleUrl: './character.component.css',
  providers: [ApiRequestService],
  imports: [CommonModule],
})
export class CharacterComponent {
  @Input() character: Character | null = null;
  @Input() characterComics: any[] = [];
  @Input() characterSeries: any[] = [];
  @Input() showDescription: boolean = false;
  @Input() showComicsAndSeries: boolean = false;
  characterId = signal<string>('');
  characterSignal = signal<Character | null>(null);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor(private api: ApiRequestService) {}

  fetchCharacter(): void {
    if (!this.characterId()) return;
    this.loading.set(true);
    this.error.set(null);
    this.api.getCharacterByName(this.characterId()).subscribe({
      next: (response: any) => {
        const result = response?.data?.results?.[0] as Character;
        this.characterSignal.set(result || null);
        this.loading.set(false);
        if (!result) this.error.set('Personagem não encontrado.');
      },
      error: () => {
        this.error.set('Erro ao buscar personagem.');
        this.loading.set(false);
      },
    });
  }
  setCharacterId(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.characterId.set(input?.value ?? '');
  }
}
