import {inject, Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {of} from 'rxjs';

@Injectable({providedIn: 'root'})
export class AdminGuard implements CanActivate {
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  canActivate() {
    const isAdmin = this.authService.getIsAdmin();
    if (!isAdmin) {
      this.router.navigate(['/dashboard']);
    }
    return of(isAdmin);
  }
}
