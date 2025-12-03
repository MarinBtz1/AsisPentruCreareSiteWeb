import { Component, inject, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class AboutPageComponent {
  private readonly fb = inject(FormBuilder);
  readonly formSent = signal(false);

  readonly contactForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  submit(): void {
    this.formSent.set(false);
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    console.table(this.contactForm.value);
    this.contactForm.reset();
    this.formSent.set(true);
  }
}
