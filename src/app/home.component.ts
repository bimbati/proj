import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  template: `
    <section class="home">
      <h2>Bem-vindo ao CRUD Marvel App!</h2>
      <p>Este é o projeto inicial para gerenciar personagens, quadrinhos e séries da Marvel.</p>
      <nav>
        <a routerLink="/">Home</a> |
        <a routerLink="/about">Sobre</a>
      </nav>
    </section>
  `,
  styles: ``
})
export class HomeComponent {

}
