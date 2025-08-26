import {inject, Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {StorageService} from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  darkModeSubject = new BehaviorSubject<boolean>(false);
  private storageService: StorageService = inject(StorageService);

  onInit() {
    this.loadFromStorage();
    this.darkModeSubject.subscribe(isDark => {
      this.storageService.setItem<boolean>('dark', isDark);
    });
  }

  toggleDarkMode() {
    this.setDarkMode(!this.darkModeSubject.value);
  }

  setDarkMode(isDark: boolean) {
    this.darkModeSubject.next(isDark);
    const body = document.body;
    body.style.colorScheme = isDark ? 'dark' : 'light';
  }

  private loadFromStorage() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark: boolean | null = this.storageService.getItem<boolean>('dark');
    if (isDark == null) {
      this.storageService.setItem<boolean>('dark', prefersDark);
    }
    this.setDarkMode(isDark ?? prefersDark);
  }
}
