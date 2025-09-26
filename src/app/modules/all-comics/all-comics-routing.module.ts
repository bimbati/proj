import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllComicsComponent } from '../../components/all-comics/all-comics.component';

const routes: Routes = [
  { path: '', component: AllComicsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllComicsRoutingModule {}
