import {Component, inject} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../../../core/services/auth.service';
import {NAV_LINKS} from '../../../../core/constants/nav-link.constant';
import {ThemeService} from '../../../../core/services/theme.service';
import {NotificationService} from '../../../../core/services/notification.service';

export interface NavLink {
  label: string;
  path: string;
  isProtected?: boolean;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  imports: [
    MatToolbar,
    MatButton,
    MatIcon,
    MatIconButton,
    MatMenu,
    MatMenuTrigger,
    RouterLink,
    MatMenuItem
  ]
})
export class Navbar {
  protected authService: AuthService = inject(AuthService);
  protected themeService: ThemeService = inject(ThemeService);
  protected notificationService: NotificationService = inject(NotificationService);
  protected router: Router = inject(Router);

  handleLogout() {
    this.authService.logout().subscribe({
      next: response => {
        this.notificationService.open(response.message)
        this.router.navigate(['/auth/login']);
      },
      error: response => {
        const error = response.error;
        this.notificationService.open(error.message ?? 'Hiba történt a kijelentkezés során!')
      }
    });
  }

  protected readonly NAV_LINKS = NAV_LINKS;
}
