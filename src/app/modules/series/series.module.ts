import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeriesComponent } from '../../components/series/series.component';
import { SeriesRoutingModule } from './series-routing.module';

@NgModule({
  imports: [CommonModule, SeriesComponent, SeriesRoutingModule]
})
export class SeriesModule {}
