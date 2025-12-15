import { Component, inject, OnInit } from '@angular/core';
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
export class ListPageComponent implements OnInit {
  private readonly itemsService = inject(ItemsService);

  readonly items$ = this.itemsService.items$;
  
  // Search and filter
  searchTerm: string = '';
  selectedCategory: string = 'all';
  sortBy: 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'stock-asc' | 'stock-desc' = 'name-asc';

  ngOnInit() {
    // Asigură-te că datele sunt încărcate când se accesează pagina
    this.itemsService.load().subscribe({
      next: (items) => {
        console.log('Produse încărcate:', items.length);
      },
      error: (error) => {
        console.error('Eroare la încărcarea produselor:', error);
      }
    });
  }

  getFilteredAndSortedItems(items: Item[]): Item[] {
    if (!items || items.length === 0) {
      return [];
    }

    let filtered = [...items];

    // Filter by search term
    if (this.searchTerm && this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase().trim();
      filtered = filtered.filter(
        (item) =>
          (item.title && item.title.toLowerCase().includes(term)) ||
          (item.description && item.description.toLowerCase().includes(term)) ||
          (item.category && item.category.toLowerCase().includes(term))
      );
    }

    // Filter by category
    if (this.selectedCategory && this.selectedCategory !== 'all') {
      filtered = filtered.filter((item) => item.category === this.selectedCategory);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (this.sortBy) {
        case 'name-asc':
          return (a.title || '').localeCompare(b.title || '');
        case 'name-desc':
          return (b.title || '').localeCompare(a.title || '');
        case 'price-asc':
          return (a.price || 0) - (b.price || 0);
        case 'price-desc':
          return (b.price || 0) - (a.price || 0);
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
    if (!items || items.length === 0) {
      return [];
    }
    const categories = new Set<string>();
    items.forEach((item) => {
      if (item.category && item.category.trim()) {
        categories.add(item.category);
      }
    });
    return Array.from(categories).sort();
  }
}
