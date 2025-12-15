import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="d-flex justify-content-center align-items-center py-5">
      <div class="text-center">
        <div class="spinner-border text-primary mb-3" role="status" style="width: 3rem; height: 3rem;">
          <span class="visually-hidden">Se încarcă...</span>
        </div>
        <p class="text-muted mb-0">Se încarcă datele...</p>
      </div>
    </div>
  `,
  styles: []
})
export class LoaderComponent {}
