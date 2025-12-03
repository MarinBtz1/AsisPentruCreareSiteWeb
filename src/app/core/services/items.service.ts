import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private readonly http = inject(HttpClient);
  private readonly dataUrl = 'assets/data/items.json';
  private readonly itemsSubject = new BehaviorSubject<Item[]>([]);
  private hasLoaded = false;

  readonly items$ = this.itemsSubject.asObservable();

  load(): Observable<Item[]> {
    if (this.hasLoaded) {
      return this.items$;
    }

    return this.http.get<Item[]>(this.dataUrl).pipe(
      take(1),
      tap((items) => {
        this.itemsSubject.next(items);
        this.hasLoaded = true;
      })
    );
  }

  /** Returns a cold observable that resolves with one item once data is available. */
  getItemById(id: string): Observable<Item | undefined> {
    return this.items$.pipe(map((items) => items.find((item) => item.id === id)));
  }

  /** Allows future extensions to push data in memory without persisting. */
  upsertItem(nextItem: Item): Observable<Item> {
    const items = this.itemsSubject.getValue();
    const position = items.findIndex((item) => item.id === nextItem.id);
    if (position === -1) {
      this.itemsSubject.next([...items, nextItem]);
    } else {
      const updated = [...items];
      updated[position] = nextItem;
      this.itemsSubject.next(updated);
    }

    return of(nextItem);
  }
}

