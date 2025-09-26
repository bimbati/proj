import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';
import { CarrouselComponent } from './components/carrousel/carrousel.component';
import { AllCharactersComponent } from './components/all-characters/all-characters.component';
import { AllComicsComponent } from './components/all-comics/all-comics.component';
import { AllSeriesComponent } from './components/all-series/all-series.component';
import { CharacterComponent } from './components/character/character.component';
import { ComicsComponent } from './components/comics/comics.component';
import { SeriesComponent } from './components/series/series.component';
import { SearchCharacterComponent } from './components/search-character/search-character.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: CarrouselComponent },
      { path: 'all-characters', component: AllCharactersComponent },
      { path: 'all-comics', component: AllComicsComponent },
      { path: 'all-series', component: AllSeriesComponent },
  { path: 'character/:id', component: CharacterComponent },
      { path: 'comics', component: ComicsComponent },
      { path: 'series', component: SeriesComponent },
      { path: 'search-character', component: SearchCharacterComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
