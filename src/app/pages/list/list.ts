import { Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ItemsService } from '../../core/services/items.service';
import { ItemCardComponent } from './item-card/item-card';

@Component({
  selector: 'app-list-page',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, RouterLink, ItemCardComponent],
  templateUrl: './list.html',
  styleUrl: './list.css'
})
export class ListPageComponent {
  private readonly itemsService = inject(ItemsService);

  readonly items$ = this.itemsService.items$;
}
