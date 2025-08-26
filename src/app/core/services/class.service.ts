import {BehaviorSubject, Observable} from 'rxjs';
import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {IClass} from '../../shared/models/class.model';
import {StorageService} from './storage.service';
import {NotificationService} from './notification.service';
import {Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class ClassService {
  private httpClient: HttpClient = inject(HttpClient);
  private storageService: StorageService = inject(StorageService);
  private notificationService: NotificationService = inject(NotificationService);
  private router: Router = inject(Router);
  private apiUrl: string = environment.apiUrl + "/classes";

  selectedClassSubject = new BehaviorSubject<IClass | null>(this.loadFromStorage());

  onInit() {
    this.selectedClassSubject.subscribe(selectedClass => {
      this.storageService.setItem<IClass | null>("selected", selectedClass)
    });
  }

  getAll(): Observable<IClass[]> {
    return this.httpClient.get<IClass[]>(this.apiUrl, {withCredentials: true});
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
