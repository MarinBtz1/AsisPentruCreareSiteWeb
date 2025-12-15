import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private readonly itemsUrl = 'assets/data/items.json';
  private readonly itemsSubject = new BehaviorSubject<Item[]>([]);
  readonly items$ = this.itemsSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Încarcă datele din JSON
  load(): Observable<Item[]> {
    if (this.itemsSubject.value.length > 0) {
      return this.items$;
    }

    return this.http.get<Item[]>(this.itemsUrl).pipe(
      tap((items) => {
        this.itemsSubject.next(items);
      }),
      catchError((error) => {
        console.error('Eroare la încărcarea produselor:', error);
        return of([]);
      })
    );
  }

  // Obține toate produsele
  getAll(): Observable<Item[]> {
    return this.items$;
  }

  // Obține un produs după ID
  getById(id: string): Observable<Item | undefined> {
    return this.items$.pipe(
      map((items) => items.find((item) => item.id === id))
    );
  }

  // Obține un produs după ID (compatibilitate)
  getItemById(id: string): Observable<Item | undefined> {
    return this.getById(id);
  }
}
