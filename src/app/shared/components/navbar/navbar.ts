import {Component, inject} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatMenu, MatMenuTrigger} from '@angular/material/menu';
import {RouterLink} from '@angular/router';
import {AuthService} from '../../../core/services/auth.service';
import {NAV_LINKS} from '../../../core/constants/nav-link.constant';
import {ThemeService} from '../../../core/services/theme.service';
import {AsyncPipe} from '@angular/common';

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
    AsyncPipe
  ]
})
export class Navbar {
  protected authService: AuthService = inject(AuthService);
  protected themeService: ThemeService = inject(ThemeService);

  dropdownButtons = ['Kijelentkezés'];

  handleDropdown(setting: string) {
    if (setting === 'Kijelentkezés') {
      this.authService.logout();
    }
  }

  protected readonly NAV_LINKS = NAV_LINKS;
}
