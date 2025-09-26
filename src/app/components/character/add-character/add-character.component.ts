import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-character',
  standalone: true,
  templateUrl: './add-character.component.html',
  styleUrl: './add-character.component.css',
  imports: [CommonModule, ReactiveFormsModule],
})
export class AddCharacterComponent {
  @Output() add = new EventEmitter<any>();

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    thumbnail: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    if (this.form.valid) {
      this.add.emit({
        ...this.form.value,
        thumbnail: { path: this.form.value.thumbnail, extension: 'jpg' }
      });
      this.form.reset();
    }
  }
}
