import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiRequestService } from '../../shared/services/api-request.service';
import { Comic } from '../../shared/models/comics.module';

@Component({
  selector: 'app-comics',
  standalone: true,
  templateUrl: './comics.component.html',
  styleUrl: './comics.component.css',
  imports: [CommonModule],
})
export class ComicsComponent {
  ngOnInit(): void {
    if (this.comicId()) {
      this.fetchComic();
    }
  }
  comicId = signal<string>('');
  comic = signal<Comic | null>(null);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor(private api: ApiRequestService) {}

  fetchComic(): void {
    if (!this.comicId()) return;
    this.loading.set(true);
    this.error.set(null);
    this.api.getComic(this.comicId()).subscribe({
      next: (response: any) => {
        const result = response?.data?.results?.[0] as Comic;
        this.comic.set(result || null);
        this.loading.set(false);
        if (!result) this.error.set('Quadrinho não encontrado.');
      },
      error: () => {
        this.error.set('Erro ao buscar quadrinho.');
        this.loading.set(false);
      },
    });
  }
  setComicId(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.comicId.set(input?.value ?? '');
  }
}
