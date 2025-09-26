import { Component, signal, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiRequestService } from '../../shared/services/api-request.service';
import { Character } from '../../shared/models/character.module';
import { ActivatedRoute } from '@angular/router';

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
  comics: any[] = [];
  series: any[] = [];
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

    constructor(private api: ApiRequestService, private route: ActivatedRoute) {}

    ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        const id = params.get('id');
        if (id) {
          this.fetchCharacterById(id);
          this.fetchComicsByCharacter(id);
          this.fetchSeriesByCharacter(id);
        }
      });
    }

    fetchCharacterById(id: string): void {
      this.loading.set(true);
      this.error.set(null);
      this.api.getCharacterById(id).subscribe({
        next: (response: any) => {
          const result = response?.data?.results?.[0] as Character;
          this.character = result || null;
          this.loading.set(false);
          if (!result) this.error.set('Personagem não encontrado.');
        },
        error: () => {
          this.error.set('Erro ao buscar personagem.');
          this.loading.set(false);
        },
      });
    }

    fetchComicsByCharacter(id: string): void {
      this.api.getComicsByCharacter(id).subscribe({
        next: (response: any) => {
          const comics = response?.data?.results || [];
          this.comics = comics;
        },
        error: () => {
          this.comics = [];
        }
      });
    }

    fetchSeriesByCharacter(id: string): void {
      this.api.getSeriesByCharacter(id).subscribe({
        next: (response: any) => {
          const series = response?.data?.results || [];
          this.series = series;
        },
        error: () => {
          this.series = [];
        }
      });
    }
}
