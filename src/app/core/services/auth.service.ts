import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {Router} from '@angular/router';
import {NotificationService} from './notification.service';
import {IUser} from '../../shared/models/user.model';

interface LoginResponse {
  message: string;
  user: IUser;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  private http: HttpClient = inject(HttpClient);
  private notificationService: NotificationService = inject(NotificationService);
  private router: Router = inject(Router);
  private apiUrl: string = environment.apiUrl + "/auth";

  private userSubject = new BehaviorSubject<IUser | null>(null);

  login(id: string | null | undefined, password: string | null | undefined) {
    this.http.post<LoginResponse>(this.apiUrl + "/login", {id, password}, {withCredentials: true}).subscribe({
      next: response => {
        this.userSubject.next(response.user);
        this.notificationService.open(response.message)
        this.router.navigate(['/dashboard/selector']);
      },
      error: response => {
        const error = response.error;
        this.notificationService.open(error.message ?? 'Ismeretlen hiba történt!')
      }
    })
  }

  logout() {
    this.http.post<LoginResponse>(this.apiUrl + "/logout", {}, {withCredentials: true}).subscribe({
      next: response => {
        this.notificationService.open(response.message)
        this.router.navigate(['/auth/login']);
      },
      error: response => {
        const error = response.error;
        this.notificationService.open(error.message)
      }
    })
  }

  getProfile(): Observable<IUser> {
    return this.http.get<IUser>(this.apiUrl + '/profile', { withCredentials: true }).pipe(
      tap(user => this.userSubject.next(user)),
    );
  }

  getId(): string | undefined {
    return this.userSubject.value?.id;
  }

  getIsAdmin(): boolean {
    return !!this.userSubject.value?.isAdmin;
  }
}
