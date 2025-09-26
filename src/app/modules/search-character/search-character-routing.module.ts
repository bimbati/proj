import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchCharacterComponent } from '../../components/character/search-character/search-character.component';

const routes: Routes = [
  { path: '', component: SearchCharacterComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchCharacterRoutingModule {}
