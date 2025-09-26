import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiRequestService } from '../../shared/services/api-request.service';
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
  selector: 'app-series',
  standalone: true,
  templateUrl: './series.component.html',
  styleUrl: './series.component.css',
  providers: [ApiRequestService],
  imports: [CommonModule],
})
export class SeriesComponent {
  serieId = signal<string>('');
  serie = signal<Serie | null>(null);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor(private api: ApiRequestService) {}

  fetchSerie(): void {
    if (!this.serieId()) return;
    this.loading.set(true);
    this.error.set(null);
    this.api.getSerie(this.serieId()).subscribe({
      next: (response: any) => {
        const result = response?.data?.results?.[0] as Serie;
        this.serie.set(result || null);
        this.loading.set(false);
        if (!result) this.error.set('Série não encontrada.');
      },
      error: () => {
        this.error.set('Erro ao buscar série.');
        this.loading.set(false);
      },
    });
  }
  setSerieId(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.serieId.set(input?.value ?? '');
  }
}
