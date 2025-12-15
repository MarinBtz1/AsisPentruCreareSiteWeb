import { Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ItemsService } from '../../core/services/items.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, NgFor, NgIf, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomePageComponent {
  private readonly itemsService = inject(ItemsService);

  readonly featuredItems$ = this.itemsService.getAll().pipe(
    map((items) => items.slice(0, 3)),
    catchError((error) => {
      console.warn('Eroare la încărcarea produselor:', error);
      return of([]);
    })
  );
}
