import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllSeriesComponent } from '../../components/all-series/all-series.component';

const routes: Routes = [
  { path: '', component: AllSeriesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllSeriesRoutingModule {}
