import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

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
  private snackBar: MatSnackBar = inject(MatSnackBar);
  private router: Router = inject(Router);
  private apiUrl: string = environment.apiUrl + "/auth";

  login(id: string | null | undefined, password: string | null | undefined) {
    this.http.post<LoginResponse>(this.apiUrl + "/login", {id, password}, {withCredentials: true}).subscribe({
      next: response => {
        this.snackBar.open(response.message, undefined, {
          horizontalPosition: "right"
        })
        this.router.navigate(['/dashboard/selector']);
      },
      error: response => {
        const error = response.error;
        this.snackBar.open(error.message, undefined, {
          horizontalPosition: "right"
        })
      }
    })
  }

  getProfile(): Observable<ProfileResponse> {
    return this.http.get<ProfileResponse>(this.apiUrl + "/profile", {withCredentials: true});
  }
}
