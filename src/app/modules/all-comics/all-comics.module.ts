import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllComicsComponent } from '../../components/all-comics/all-comics.component';
import { AllComicsRoutingModule } from './all-comics-routing.module';

@NgModule({
  imports: [CommonModule, AllComicsComponent, AllComicsRoutingModule]
})
export class AllComicsModule {}
