import { Component, inject } from '@angular/core';
import { AsyncPipe, CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemsService } from '../../core/services/items.service';
import { ItemCardComponent } from './item-card/item-card';
import { Item } from '../../core/models/item.model';

@Component({
  selector: 'app-list-page',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, ItemCardComponent, CommonModule, FormsModule],
  templateUrl: './list.html',
  styleUrl: './list.css'
})
export class ListPageComponent {
  private readonly itemsService = inject(ItemsService);

  readonly items$ = this.itemsService.items$;
  
  // Search and filter
  searchTerm: string = '';
  selectedCategory: string = 'all';
  sortBy: 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'stock-asc' | 'stock-desc' = 'name-asc';

  getFilteredAndSortedItems(items: Item[]): Item[] {
    let filtered = [...items];

    // Filter by search term
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(term) ||
          item.description?.toLowerCase().includes(term) ||
          item.category?.toLowerCase().includes(term)
      );
    }

    // Filter by category
    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter((item) => item.category === this.selectedCategory);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (this.sortBy) {
        case 'name-asc':
          return a.title.localeCompare(b.title);
        case 'name-desc':
          return b.title.localeCompare(a.title);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'stock-asc':
          return (a.stock || 0) - (b.stock || 0);
        case 'stock-desc':
          return (b.stock || 0) - (a.stock || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }

  getUniqueCategories(items: Item[]): string[] {
    const categories = new Set<string>();
    items.forEach((item) => {
      if (item.category) {
        categories.add(item.category);
      }
    });
    return Array.from(categories).sort();
  }
}
