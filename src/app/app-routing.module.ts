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
      {
        path: 'all-characters',
        loadChildren: () => import('./modules/all-characters/all-characters.module').then(m => m.AllCharactersModule)
      },
      {
        path: 'all-comics',
        loadChildren: () => import('./modules/all-comics/all-comics.module').then(m => m.AllComicsModule)
      },
      {
        path: 'all-series',
        loadChildren: () => import('./modules/all-series/all-series.module').then(m => m.AllSeriesModule)
      },
      {
        path: 'character/:id',
        loadChildren: () => import('./modules/character/character.module').then(m => m.CharacterModule)
      },
      {
        path: 'comics',
        loadChildren: () => import('./modules/comics/comics.module').then(m => m.ComicsModule)
      },
      {
        path: 'series',
        loadChildren: () => import('./modules/series/series.module').then(m => m.SeriesModule)
      },
      {
        path: 'search-character',
        loadChildren: () => import('./modules/search-character/search-character.module').then(m => m.SearchCharacterModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
