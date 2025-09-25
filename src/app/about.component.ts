import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  template: `
    <section class="about">
      <h2>Sobre o Projeto</h2>
      <p>Este projeto foi criado para demonstrar um CRUD utilizando a API da Marvel, com Angular 17.</p>
      <nav>
        <a routerLink="/">Home</a> |
        <a routerLink="/about">Sobre</a>
      </nav>
    </section>
  `,
  styles: ``
})
export class AboutComponent {

}
