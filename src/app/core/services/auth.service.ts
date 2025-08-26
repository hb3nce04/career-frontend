import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {NotificationService} from './notification.service';

interface LoginResponse {
  message: string;
  user: ProfileResponse;
}

interface ProfileResponse {
  id: string;
  isAdmin: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  private http: HttpClient = inject(HttpClient);
  private notificationService: NotificationService = inject(NotificationService);
  private router: Router = inject(Router);
  private apiUrl: string = environment.apiUrl + "/auth";

  login(id: string | null | undefined, password: string | null | undefined) {
    this.http.post<LoginResponse>(this.apiUrl + "/login", {id, password}, {withCredentials: true}).subscribe({
      next: response => {
        this.notificationService.open(response.message)
        this.router.navigate(['/dashboard/selector']);
      },
      error: response => {
        const error = response.error;
        this.notificationService.open(error.messag)
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

  getProfile(): Observable<ProfileResponse> {
    return this.http.get<ProfileResponse>(this.apiUrl + "/profile", {withCredentials: true});
  }
}
