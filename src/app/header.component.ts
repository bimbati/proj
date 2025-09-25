import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  template: `
    <header class="header">
      <h1>CRUD Marvel App</h1>
      <nav>
        <a routerLink="/">Home</a> |
        <a routerLink="/about">Sobre</a>
      </nav>
    </header>
  `,
  styles: ``
})
export class HeaderComponent {

}
