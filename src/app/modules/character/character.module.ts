import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterComponent } from '../../components/character/character.component';
import { CharacterRoutingModule } from './character-routing.module';

@NgModule({
  declarations: [], // Standalone component, no need to declare
  imports: [
    CommonModule,
    CharacterComponent,
    CharacterRoutingModule
  ]
})
export class CharacterModule {}
