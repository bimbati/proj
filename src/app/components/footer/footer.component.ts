import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  redes = [
    {
      img: 'fa-github',
      link: 'https://github.com/bimbati',
    }
  ];
}
