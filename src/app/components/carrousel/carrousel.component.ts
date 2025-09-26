import { NgFor, NgIf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { CharacterComponent } from '../character/character.component';
import { ApiRequestService } from '../../shared/services/api-request.service';
import { SearchCharacterComponent } from '../search-character/search-character.component';
import { RouterLinkWithHref } from '@angular/router';
import { Character } from '../../shared/models/character.module';

@Component({
  selector: 'app-carrousel',
  standalone: true,
  imports: [NgFor, CharacterComponent, SearchCharacterComponent, RouterLinkWithHref, NgIf],
  templateUrl: './carrousel.component.html',
  styleUrl: './carrousel.component.css',
})
export class CarrouselComponent {
  ngOnInit() {
    this.getCharactersAndComics();
  }

  heroes = [1009610, 1009351, 1009368, 1009220];
  apiResp?: any;
  characters = signal<Character[]>([]);
  charactersComics = signal<any[]>([]);
  charactersSeries = signal<any[]>([]);
  private requestService = inject(ApiRequestService);

  private getCharacters(id: number) {
    this.requestService.getComic(id.toString()).subscribe((resp) => {
      this.apiResp = resp;
      const results = this.apiResp.data.results;
      this.characters.update((value) => [...value, results[0]]);
      const comics = results[0].comics.items;
      this.charactersComics.update((value) => [...value, comics]);
      const series = results[0].series.items;
      this.charactersSeries.update((value) => [...value, series]);
    });
  }
  private getCharactersAndComics() {
    this.heroes.forEach((id) => {
      this.getCharacters(id);
    });
  }

  showInput = signal<boolean>(false);
  showCharacter = signal<boolean>(false);
  characterSearched = signal<any>({});
  comicsCharacterSearched = signal<any[]>([]);
  seriesCharacterSearched = signal<any[]>([]);

  displayInput() {
    this.showInput.set(!this.showInput());
  }

  inputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.displayInput();
    this.getCharacterByName(input.value);
    this.showCharacter.set(true);
  }

  private getCharacterByName(name: string) {
    this.requestService.getCharacterByName(name).subscribe((resp) => {
      this.apiResp = resp;
      this.characterSearched.set(this.apiResp.data.results[0]);
      const comics = this.apiResp.data.results[0].comics.items;
      this.comicsCharacterSearched.update(() => comics);
      const series = this.apiResp.data.results[0].series.items;
      this.seriesCharacterSearched.update(() => series);
    });
  }
}
