import {inject, Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {StorageService} from './storage.service';
import {NotificationService} from './notification.service';
import {Router} from '@angular/router';
import {ClassDto} from '../../shared/dtos/class.dto';

// TODO: kiválasztás törlése
@Injectable({providedIn: 'root'})
export class ClassSelectorService {
  private storageService: StorageService = inject(StorageService);
  private notificationService: NotificationService = inject(NotificationService);
  private router: Router = inject(Router);

  selectedClassSubject = new BehaviorSubject<ClassDto | null>(this.loadFromStorage());

  onInit() {
    this.selectedClassSubject.subscribe(selectedClass => {
      this.storageService.setItem<ClassDto | null>("selected", selectedClass)
    });
  }

  select(schoolClass: ClassDto) {
    this.selectedClassSubject.next(schoolClass);
    this.notificationService.open("Az osztály sikeresen kiválasztásra került!")
    this.router.navigate(['/dashboard/students']);
  }

  private loadFromStorage(): ClassDto | null {
    return this.storageService.getItem<ClassDto>("selected");
  }
}
