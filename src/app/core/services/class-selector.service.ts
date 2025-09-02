import {inject, Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {StorageService} from './storage.service';
import {ClassModel} from '../../shared/models/class.model';

@Injectable({providedIn: 'root'})
export class ClassSelectorService {
  private storageService: StorageService = inject(StorageService);

  selectedClassSubject = new BehaviorSubject<ClassModel | null>(this.loadFromStorage());
  selectedClass$ = this.selectedClassSubject.asObservable();

  onInit() {
    this.selectedClassSubject.subscribe(selectedClass => {
      this.storageService.setItem<ClassModel | null>("selected", selectedClass)
    });
  }

  select(schoolClass: ClassModel) {
    this.selectedClassSubject.next(schoolClass);
    return this.selectedClassSubject.asObservable();
  }

  unselect() {
    this.selectedClassSubject.next(null);
    return this.selectedClassSubject.asObservable();
  }

  private loadFromStorage(): ClassModel | null {
    return this.storageService.getItem<ClassModel>("selected");
  }
}
