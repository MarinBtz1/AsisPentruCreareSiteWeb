import { Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs/operators';
import { ItemsService } from '../../core/services/items.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, NgFor, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomePageComponent {
  private readonly itemsService = inject(ItemsService);

  readonly featuredItems$ = this.itemsService.items$.pipe(map((items) => items.slice(0, 3)));
}
