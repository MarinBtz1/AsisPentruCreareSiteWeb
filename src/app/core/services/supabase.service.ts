import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    const url = environment.supabaseUrl;
    const key = environment.supabaseAnonKey;
    
    console.log('Initializare Supabase client...', { url, keyExists: !!key });
    
    if (!url || !key) {
      console.error('Lipsește URL sau cheia Supabase în environment!');
    }
    
    this.supabase = createClient(url, key, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    });
    
    console.log('Supabase client inițializat:', !!this.supabase);
  }

  get client(): SupabaseClient {
    return this.supabase;
  }
}

