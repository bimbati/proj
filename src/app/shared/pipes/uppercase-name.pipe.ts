import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uppercaseName',
  standalone: true
})
export class UppercaseNamePipe implements PipeTransform {
  transform(value: string): string {
    return value ? value.toUpperCase() : '';
  }
}
