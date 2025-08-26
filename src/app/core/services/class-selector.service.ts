import {inject, Injectable} from '@angular/core';
import {IClass} from '../../shared/models/class.model';
import {BehaviorSubject} from 'rxjs';
import {StorageService} from './storage.service';
import {NotificationService} from './notification.service';
import {Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class ClassSelectorService {
  private storageService: StorageService = inject(StorageService);
  private notificationService: NotificationService = inject(NotificationService);
  private router: Router = inject(Router);

  selectedClassSubject = new BehaviorSubject<IClass | null>(this.loadFromStorage());

  onInit() {
    this.selectedClassSubject.subscribe(selectedClass => {
      this.storageService.setItem<IClass | null>("selected", selectedClass)
    });
  }

  select(schoolClass: IClass) {
    this.selectedClassSubject.next(schoolClass);
    this.notificationService.open("Az osztály sikeresen kiválasztásra került!")
    this.router.navigate(['/dashboard/students']);
  }

  private loadFromStorage(): IClass | null {
    return this.storageService.getItem<IClass>("selected");
  }
}
