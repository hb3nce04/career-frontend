import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Footer} from '../components/footer/footer';
import {MatProgressBar} from '@angular/material/progress-bar';
import {LoadingService} from '../../core/services/loading.service';

@Component({
  selector: 'app-auth-layout',
  imports: [
    RouterOutlet,
    Footer,
    MatProgressBar,
  ],
  template: `
    @if (this.loadingService.loadingSubject.value) {
      <mat-progress-bar mode="indeterminate"></mat-progress-bar>
    }
    <router-outlet></router-outlet>
    <app-footer/>`
})
export class AuthLayout {
  protected loadingService: LoadingService = inject(LoadingService);
}
