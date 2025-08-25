import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  setItem<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Hiba történt a "${key}" kulcs tárolása során`, e);
    }
  }

  getItem<T>(key: string): T | null {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) as T : null;
    } catch (e) {
      console.error(`Hiba történt a "${key}" kulcs olvasása során`, e);
      return null;
    }
  }

  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error(`Hiba történt a "${key}" kulcs törlése során`, e);
    }
  }
}
