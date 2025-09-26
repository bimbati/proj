import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UppercaseNamePipe } from '../../../shared/pipes/uppercase-name.pipe';
import { HighlightCardDirective } from '../../../shared/directives/highlight-card.directive';
import { ApiRequestService } from '../../../shared/services/api-request.service';
// import { Serie } from '../../shared/models/series.module';
interface Serie {
  id: number;
  title: string;
  thumbnail: {
    extension: string;
    path: string;
  };
  description: string;
}

@Component({
  selector: 'app-all-series',
  standalone: true,
  templateUrl: './all-series.component.html',
  styleUrl: './all-series.component.css',
  // providers: [ApiRequestService],
  imports: [CommonModule, UppercaseNamePipe, HighlightCardDirective],
})
export class AllSeriesComponent implements OnInit {
  alphabet: string[] = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
  selectedLetter: string | null = null;
  series = signal<Serie[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  page = signal<number>(0);
  filter = signal<string>('');

  constructor(private api: ApiRequestService) {}

  ngOnInit(): void {
    this.fetchSeries();
  }

  fetchSeries(offset: number = 0): void {
    this.loading.set(true);
    this.error.set(null);
    this.api.getAllSeries(offset).subscribe({
      next: (response: any) => {
        const results = response?.data?.results as Serie[];
        this.series.set(results || []);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Erro ao buscar séries.');
        this.loading.set(false);
      },
    });
  }

  nextPage(): void {
    this.page.set(this.page() + 1);
    this.fetchSeries(this.page() * 100);
  }

  prevPage(): void {
    if (this.page() > 0) {
      this.page.set(this.page() - 1);
      this.fetchSeries(this.page() * 100);
    }
  }

  setFilter(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input?.value ?? '';
    this.filter.set(value);
    this.filterSeries();
  }

  filterSeries(): void {
    // Se filtro por letra, busca na API
    if (this.selectedLetter) {
      this.loading.set(true);
      this.error.set(null);
      this.api.getSeriesByTitle(this.selectedLetter).subscribe({
        next: (response: any) => {
          let seriesList = (response?.data?.results || []).filter((s: any) => s.title && s.title[0]?.toUpperCase() === this.selectedLetter);
          // Filtro por texto
          const filterValue = this.filter().toLowerCase();
          if (filterValue && filterValue.trim().length > 0) {
            seriesList = seriesList.filter((s: any) => s.title.toLowerCase().includes(filterValue));
          }
          seriesList.sort((a: any, b: any) => a.title.localeCompare(b.title));
          this.series.set(seriesList);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('Erro ao buscar séries por letra.');
          this.loading.set(false);
        }
      });
      return;
    }
    // Filtro normal (sem letra)
    let seriesList = [...this.series()];
    const filterValue = this.filter().toLowerCase();
    if (filterValue && filterValue.trim().length > 0) {
      seriesList = seriesList.filter((s: any) => s.title.toLowerCase().includes(filterValue));
    }
    seriesList.sort((a: any, b: any) => a.title.localeCompare(b.title));
    this.series.set(seriesList);
  }

  selectLetter(letter: string | null) {
    this.selectedLetter = letter;
    this.filterSeries();
  }
}
