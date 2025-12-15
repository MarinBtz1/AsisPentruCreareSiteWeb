import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly DARK_MODE_KEY = 'darkMode';
  private _isDarkMode = signal<boolean>(this.loadTheme());

  readonly isDarkMode = this._isDarkMode.asReadonly();

  constructor() {
    this.applyTheme(this._isDarkMode());
  }

  private loadTheme(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = localStorage.getItem(this.DARK_MODE_KEY);
      if (saved !== null) {
        return saved === 'true';
      }
    }
    return false;
  }

  toggleTheme() {
    const newValue = !this._isDarkMode();
    this._isDarkMode.set(newValue);
    this.applyTheme(newValue);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.DARK_MODE_KEY, String(newValue));
    }
  }

  setDarkMode(isDark: boolean) {
    this._isDarkMode.set(isDark);
    this.applyTheme(isDark);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.DARK_MODE_KEY, String(isDark));
    }
  }

  private applyTheme(isDark: boolean) {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
      if (isDark) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
    }
  }
}



