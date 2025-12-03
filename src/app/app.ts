import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './home/header/header';
import { FooterComponent } from './home/footer/footer';
import { ItemsService } from './core/services/items.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private readonly itemsService = inject(ItemsService);
  protected readonly title = signal('AsisPentruCreareSiteWeb');

  constructor() {
    this.itemsService.load().subscribe();
  }
}
