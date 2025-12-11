import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="alert" [ngClass]="'alert-' + type" role="alert">
      <strong *ngIf="title">{{ title }}</strong>
      <span *ngIf="title">: </span>
      {{ message }}
    </div>
  `
})
export class AlertComponent {
  @Input() type: 'success' | 'danger' | 'warning' | 'info' = 'info';
  @Input() message: string = '';
  @Input() title: string = '';
}


