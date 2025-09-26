import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComicsComponent } from '../../components/comics/comics.component';
import { ComicsRoutingModule } from './comics-routing.module';

@NgModule({
  imports: [CommonModule, ComicsComponent, ComicsRoutingModule]
})
export class ComicsModule {}
