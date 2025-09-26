import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllCharactersComponent } from '../../components/all-characters/all-characters.component';

const routes: Routes = [
  { path: '', component: AllCharactersComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllCharactersRoutingModule {}
