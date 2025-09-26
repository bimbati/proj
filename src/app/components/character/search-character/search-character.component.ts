import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiRequestService } from '../../../shared/services/api-request.service';
import { Character } from '../../../shared/models/character.module';

@Component({
  selector: 'app-search-character',
  standalone: true,
  templateUrl: './search-character.component.html',
  styleUrl: './search-character.component.css',
  imports: [CommonModule, ReactiveFormsModule],
})
export class SearchCharacterComponent {
  searchControl = new FormControl('');
  character = signal<Character | null>(null);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor(private api: ApiRequestService) {}

  ngOnInit(): void {
    // Opcional: buscar ao digitar
    // this.searchControl.valueChanges.subscribe(value => {
    //   if (value) this.search();
    // });
  }

  search(): void {
    const name = this.searchControl.value?.trim();
    if (!name) return;
    this.loading.set(true);
    this.error.set(null);
    this.api.getCharacterByName(name).subscribe({
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

}
