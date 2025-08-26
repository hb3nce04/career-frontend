import {inject, Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {catchError, map, of} from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  canActivate() {
    return this.authService.getProfile().pipe(
      map(() => true),
      catchError(() => {
        this.router.navigate(['/auth/login']);
        return of(false);
      })
    )
  }
}
