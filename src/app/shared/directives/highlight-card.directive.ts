import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlightCard]',
  standalone: true
})
export class HighlightCardDirective {
  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.style.boxShadow = '0 0 10px #1976d2';
    this.el.nativeElement.style.transform = 'scale(1.03)';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.boxShadow = '';
    this.el.nativeElement.style.transform = '';
  }
}
