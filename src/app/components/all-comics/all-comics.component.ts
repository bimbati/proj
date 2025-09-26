import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UppercaseNamePipe } from '../../shared/pipes/uppercase-name.pipe';
import { HighlightCardDirective } from '../../shared/directives/highlight-card.directive';
import { ApiRequestService } from '../../shared/services/api-request.service';
import { Comic } from '../../shared/models/comics.module';

@Component({
  selector: 'app-all-comics',
  standalone: true,
  templateUrl: './all-comics.component.html',
  styleUrl: './all-comics.component.css',
  // providers: [ApiRequestService],
  imports: [CommonModule, UppercaseNamePipe, HighlightCardDirective],
})
export class AllComicsComponent implements OnInit {
  comics = signal<Comic[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  page = signal<number>(0);
  filter = signal<string>('');

  constructor(private api: ApiRequestService) {}

  ngOnInit(): void {
    this.fetchComics();
  }

  fetchComics(offset: number = 0): void {
    this.loading.set(true);
    this.error.set(null);
    this.api.getAllComics(offset).subscribe({
      next: (response: any) => {
        const results = response?.data?.results as Comic[];
        this.comics.set(results || []);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Erro ao buscar quadrinhos.');
        this.loading.set(false);
      },
    });
  }

  nextPage(): void {
    this.page.set(this.page() + 1);
    this.fetchComics(this.page() * 100);
  }

  prevPage(): void {
    if (this.page() > 0) {
      this.page.set(this.page() - 1);
      this.fetchComics(this.page() * 100);
    }
  }

  setFilter(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input?.value ?? '';
    this.filter.set(value);
    if (value.trim().length > 0) {
      this.loading.set(true);
      this.error.set(null);
      // Busca por parte do título
      const timestamp = 1;
      const hash = CryptoJS.MD5(timestamp + this.api['privateKey'] + this.api['publicKey']).toString();
      const url = new URL(`https://gateway.marvel.com/v1/public/comics?titleStartsWith=${value}`);
      this.api['http'].get(url.toString(), {
        params: {
          apikey: this.api['publicKey'],
          ts: timestamp,
          hash: hash,
        },
        headers: {},
      }).subscribe({
        next: (response: any) => {
          const results = response?.data?.results as Comic[];
          this.comics.set(results || []);
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set('Erro ao buscar quadrinhos.');
          this.loading.set(false);
        },
      });
    } else {
      this.fetchComics(this.page() * 100);
    }
  }
}
