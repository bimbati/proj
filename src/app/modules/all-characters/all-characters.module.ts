import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllCharactersComponent } from '../../components/all-characters/all-characters.component';
import { AllCharactersRoutingModule } from './all-characters-routing.module';

@NgModule({
  imports: [CommonModule, AllCharactersComponent, AllCharactersRoutingModule]
})
export class AllCharactersModule {}
