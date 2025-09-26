import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllSeriesComponent } from '../../components/all-series/all-series.component';
import { AllSeriesRoutingModule } from './all-series-routing.module';

@NgModule({
  imports: [CommonModule, AllSeriesComponent, AllSeriesRoutingModule]
})
export class AllSeriesModule {}
