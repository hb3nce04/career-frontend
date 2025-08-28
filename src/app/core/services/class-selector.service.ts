import {inject, Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {StorageService} from './storage.service';
import {ClassDto} from '../../shared/dtos/class.dto';

@Injectable({providedIn: 'root'})
export class ClassSelectorService {
  private storageService: StorageService = inject(StorageService);

  selectedClassSubject = new BehaviorSubject<ClassDto | null>(this.loadFromStorage());
  selectedClass$ = this.selectedClassSubject.asObservable();


  onInit() {
    this.selectedClassSubject.subscribe(selectedClass => {
      this.storageService.setItem<ClassDto | null>("selected", selectedClass)
    });
  }

  select(schoolClass: ClassDto) {
    this.selectedClassSubject.next(schoolClass);
    return this.selectedClassSubject.asObservable();
  }

  unselect() {
    this.selectedClassSubject.next(null);
    return this.selectedClassSubject.asObservable();
  }

  private loadFromStorage(): ClassDto | null {
    return this.storageService.getItem<ClassDto>("selected");
  }
}
