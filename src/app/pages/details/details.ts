import { Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ItemsService } from '../../core/services/items.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-details-page',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, NgFor, NgIf, RouterLink],
  templateUrl: './details.html',
  styleUrl: './details.css'
})
export class DetailsPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly itemsService = inject(ItemsService);

  readonly item$ = this.route.paramMap.pipe(
    switchMap((params) => this.itemsService.getItemById(params.get('id') ?? ''))
  );
}
