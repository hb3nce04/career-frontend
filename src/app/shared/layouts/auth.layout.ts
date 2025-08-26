import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Footer} from '../components/footer/footer';
import {MatProgressBar} from '@angular/material/progress-bar';
import {LoadingService} from '../../core/services/loading.service';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-auth-layout',
  imports: [
    RouterOutlet,
    Footer,
    MatProgressBar,
    AsyncPipe
  ],
  template: `
    @if (this.loadingService.loading$ | async) {
      <mat-progress-bar mode="indeterminate"></mat-progress-bar>
    }
    <router-outlet></router-outlet>
    <app-footer/>`
})
export class AuthLayout {
  protected loadingService: LoadingService = inject(LoadingService);
}
