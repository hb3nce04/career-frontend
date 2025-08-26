import {Component, inject} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatMenu, MatMenuTrigger} from '@angular/material/menu';
import {Router, RouterLink} from '@angular/router';
import {StorageService} from '../../../core/services/storage.service';
import {AuthService} from '../../../core/services/auth.service';
import {NAV_LINKS} from '../../../core/constants/nav-link.constant';

export interface NavLink {
  label: string;
  path: string;
  isAdmin?: boolean;
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
    RouterLink
  ]
})
export class Navbar {
  dropdownButtons = ['Kijelentkezés'];

  darkMode = false;

  private router: Router = inject(Router);
  private storageService: StorageService = inject(StorageService);
  private authService: AuthService = inject(AuthService);

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    this.storageService.setItem('mode', this.darkMode ? 'dark' : 'light');
  }

  handleNavigation(page: string) {
    switch (page) {
      case 'Profil':
        this.router.navigate(['/profile']);
        break;
      case 'Főoldal':
        this.router.navigate(['/admin']);
        break;
      case 'Osztály kiválasztása':
        this.router.navigate(['/class-selector']);
        break;
    }
  }

  handleDropdown(setting: string) {
    if (setting === 'Kijelentkezés') {
      this.authService.logout();
    }
  }

  protected readonly NAV_LINKS = NAV_LINKS;
}
