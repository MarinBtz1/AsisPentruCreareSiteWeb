import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="alert" [ngClass]="alertClass" role="alert">
      <strong *ngIf="title">{{ title }}</strong>
      <span *ngIf="title && message">: </span>
      {{ message }}
    </div>
  `,
  styles: []
})
export class AlertComponent {
  @Input() type: 'success' | 'danger' | 'warning' | 'info' = 'info';
  @Input() message: string = '';
  @Input() title: string = '';

  get alertClass(): string {
    const classes: { [key: string]: string } = {
      'success': 'alert-success',
      'danger': 'alert-danger',
      'warning': 'alert-warning',
      'info': 'alert-info'
    };
    return classes[this.type] || 'alert-info';
  }
}
