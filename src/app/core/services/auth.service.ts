import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({providedIn: 'root'})
export class AuthService {
  private http: HttpClient = inject(HttpClient);
  private snackBar: MatSnackBar = inject(MatSnackBar);
  private apiUrl: string = environment.apiUrl + "/auth/login";

  login(id: string | null | undefined, password: string | null | undefined) {
    this.http.post(this.apiUrl, {id, password}).subscribe({
      next: response => {
        /*this.snackBar.open(response.message, undefined, {
          horizontalPosition: "right"
        })*/
        // TODO
      },
      error: response => {
        const error = response.error;
        this.snackBar.open(error.message, undefined, {
          horizontalPosition: "right"
        })
      }
    })
  }

  isLoggedIn(): boolean {
    return false;
  }
}
