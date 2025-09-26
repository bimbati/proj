import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Character } from '../../shared/models/character.module';
import { ApiRequestService } from '../../shared/services/api-request.service';

@Component({
  selector: 'app-character',
  standalone: true,
  templateUrl: './character.component.html',
  styleUrl: './character.component.css',
  imports: [CommonModule, FormsModule],
})
export class CharacterComponent implements OnInit {
  @Input() character: Character | null = null;
  @Input() characterComics: any[] = [];
  @Input() characterSeries: any[] = [];
  @Input() showDescription: boolean = false;
  @Input() showComicsAndSeries: boolean = false;
  notFound = false;
  loading = false;
  comics: any[] = [];
  series: any[] = [];

  // Edição/Exclusão
  editMode = false;
  editName = '';
  editThumbnail = '';
  editDescription = '';

  constructor(private route: ActivatedRoute, private api: ApiRequestService) {}

  ngOnInit(): void {
    if (this.character && this.character.id >= 1000000) {
      this.editName = this.character.name;
      this.editThumbnail = this.character.thumbnail.path;
      this.editDescription = this.character.description;
    }
    // Se vier como card, não faz nada (inputs já estão setados)
    if (this.character) return;
    this.route.paramMap.subscribe(params => {
      const idStr = params.get('id');
      const id = idStr ? Number(idStr) : null;
      if (id == null) {
        this.notFound = true;
        return;
      }
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
              this.fetchComicsAndSeries(String(id));
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
        // Só busca comics/series se for personagem da API
        if (id < 1000000) {
          this.fetchComicsAndSeries(String(id));
        }
      }
    });
  }

  saveEdit() {
    if (!this.character) return;
    const data = localStorage.getItem('characters');
    let characters: Character[] = data ? JSON.parse(data) : [];
    const idx = characters.findIndex(c => c.id === this.character!.id);
    if (idx >= 0) {
      characters[idx] = {
        ...characters[idx],
        name: this.editName,
        description: this.editDescription,
        thumbnail: { ...characters[idx].thumbnail, path: this.editThumbnail },
      };
      localStorage.setItem('characters', JSON.stringify(characters));
      this.character = characters[idx];
      this.editMode = false;
    }
  }

  deleteCharacter() {
    if (!this.character) return;
    if (!confirm('Tem certeza que deseja excluir este personagem?')) return;
    const data = localStorage.getItem('characters');
    let characters: Character[] = data ? JSON.parse(data) : [];
    characters = characters.filter(c => c.id !== this.character!.id);
    localStorage.setItem('characters', JSON.stringify(characters));
    window.location.href = '/all-characters';
  }

  fetchComicsAndSeries(id: string): void {
    this.api.getComicsByCharacter(id).subscribe({
      next: (response: any) => {
        this.comics = response?.data?.results || [];
      },
      error: () => {
        this.comics = [];
      }
    });
    this.api.getSeriesByCharacter(id).subscribe({
      next: (response: any) => {
        this.series = response?.data?.results || [];
      },
      error: () => {
        this.series = [];
      }
    });
  }
}
