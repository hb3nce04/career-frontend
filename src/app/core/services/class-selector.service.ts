import {inject, Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {StorageService} from './storage.service';
import {ClassDto} from '../../shared/dtos/class.dto';

// TODO: kiválasztás törlése
@Injectable({providedIn: 'root'})
export class ClassSelectorService {
  private storageService: StorageService = inject(StorageService);

  selectedClassSubject = new BehaviorSubject<ClassDto | null>(this.loadFromStorage());

  onInit() {
    this.selectedClassSubject.subscribe(selectedClass => {
      this.storageService.setItem<ClassDto | null>("selected", selectedClass)
    });
  }

  select(schoolClass: ClassDto) {
    this.selectedClassSubject.next(schoolClass);
    return this.selectedClassSubject.asObservable();
  }

  private loadFromStorage(): ClassDto | null {
    return this.storageService.getItem<ClassDto>("selected");
  }
}
