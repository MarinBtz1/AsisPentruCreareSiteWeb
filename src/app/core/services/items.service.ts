import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, from } from 'rxjs';
import { map, catchError, tap, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Item } from '../models/item.model';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private readonly itemsSubject = new BehaviorSubject<Item[]>([]);
  readonly items$ = this.itemsSubject.asObservable();
  private readonly tableName = 'items';
  private readonly itemsUrl = 'assets/data/items.json';
  private useFallback = false;

  constructor(
    private supabaseService: SupabaseService,
    private http: HttpClient
  ) {}

  // Încarcă datele din Supabase sau JSON (fallback)
  load(): Observable<Item[]> {
    if (this.itemsSubject.value.length > 0) {
      console.log('Datele sunt deja încărcate:', this.itemsSubject.value.length, 'produse');
      return of(this.itemsSubject.value);
    }

    // Dacă folosim fallback, încarcă din JSON
    if (this.useFallback) {
      console.log('📦 Folosind fallback: încărcare din JSON...');
      return this.loadFromJson();
    }

    console.log('☁️ Încep încărcarea produselor din Supabase...');
    console.log('Numele tabelului:', this.tableName);
    console.log('Supabase client disponibil:', !!this.supabaseService.client);

    return from(
      this.supabaseService.client
        .from(this.tableName)
        .select('*')
        .order('title', { ascending: true })
    ).pipe(
      map(({ data, error }) => {
        if (error) {
          console.error('❌ Eroare la încărcarea produselor din Supabase:', error);
          console.error('Detalii eroare:', {
            message: error.message,
            details: error.details,
            hint: error.hint,
            code: error.code
          });
          console.warn('⚠️ Se încearcă fallback la JSON...');
          this.useFallback = true;
          return null; // Semnalăm că trebuie să folosim fallback
        }
        
        console.log('✅ Date primite din Supabase:', data?.length || 0, 'produse');
        
        if (!data || data.length === 0) {
          console.warn('⚠️ Nu s-au găsit produse în tabelul Supabase.');
          console.warn('Verifică: 1. Tabelul "items" există? 2. Conține date? 3. RLS permite citirea?');
          console.warn('⚠️ Se încearcă fallback la JSON...');
          this.useFallback = true;
          return null; // Semnalăm că trebuie să folosim fallback
        }
        
        // Convertește datele și asigură că availableSizes este un array
        const items = (data || []).map((item: any) => {
          let availableSizes: string[] = [];
          
          // Gestionează availableSizes care poate fi JSONB, string JSON sau array
          if (item.availableSizes) {
            if (Array.isArray(item.availableSizes)) {
              availableSizes = item.availableSizes;
            } else if (typeof item.availableSizes === 'string') {
              try {
                availableSizes = JSON.parse(item.availableSizes);
              } catch (e) {
                console.warn('Eroare la parsarea availableSizes pentru item', item.id, e);
                availableSizes = [];
              }
            } else {
              availableSizes = [];
            }
          }
          
          return {
            ...item,
            availableSizes,
            price: typeof item.price === 'string' ? parseFloat(item.price) : (item.price || 0),
            stock: typeof item.stock === 'string' ? parseInt(item.stock, 10) : (item.stock || 0)
          } as Item;
        });
        
        console.log('✅ Produse procesate:', items.length);
        return items;
      }),
      switchMap((items) => {
        // Dacă items este null, înseamnă că trebuie să folosim fallback
        if (items === null) {
          return this.loadFromJson();
        }
        return of(items);
      }),
      tap((items) => {
        console.log('✅ Produse încărcate în BehaviorSubject:', items.length);
        this.itemsSubject.next(items);
      }),
      catchError((error) => {
        console.error('❌ Eroare la încărcarea produselor:', error);
        console.error('Stack trace:', error.stack);
        console.warn('⚠️ Se încearcă fallback la JSON...');
        this.useFallback = true;
        return this.loadFromJson();
      })
    );
  }

  // Încarcă datele din fișierul JSON (fallback)
  private loadFromJson(): Observable<Item[]> {
    console.log('📦 Încărcare din fișierul JSON...');
    return this.http.get<Item[]>(this.itemsUrl).pipe(
      tap((items) => {
        console.log('✅ Produse încărcate din JSON:', items.length);
        this.itemsSubject.next(items);
      }),
      catchError((error) => {
        console.error('❌ Eroare la încărcarea din JSON:', error);
        return of([]);
      })
    );
  }

  // Obține toate produsele
  getAll(): Observable<Item[]> {
    // Dacă nu avem date încărcate, încarcă-le și returnează Observable-ul
    if (this.itemsSubject.value.length === 0) {
      return this.load();
    }
    return this.items$;
  }

  // Obține un produs după ID
  getById(id: string): Observable<Item | undefined> {
    // Dacă nu avem date încărcate, încarcă-le mai întâi
    if (this.itemsSubject.value.length === 0) {
      return new Observable<Item | undefined>((observer) => {
        this.load().subscribe(() => {
          const item = this.itemsSubject.value.find((item) => item.id === id);
          observer.next(item);
          observer.complete();
        });
      });
    }

    return this.items$.pipe(
      map((items) => items.find((item) => item.id === id))
    );
  }

  // Obține un produs după ID (compatibilitate)
  getItemById(id: string): Observable<Item | undefined> {
    return this.getById(id);
  }

  // Reîncarcă datele din Supabase
  refresh(): Observable<Item[]> {
    this.itemsSubject.next([]);
    return this.load();
  }
}
