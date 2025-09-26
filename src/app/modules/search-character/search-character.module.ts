import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchCharacterComponent } from '../../components/search-character/search-character.component';
import { SearchCharacterRoutingModule } from './search-character-routing.module';

@NgModule({
  imports: [CommonModule, SearchCharacterComponent, SearchCharacterRoutingModule]
})
export class SearchCharacterModule {}
