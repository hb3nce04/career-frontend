import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Navbar} from '../components/navbar/navbar';
import {Footer} from '../components/footer/footer';
import {MatProgressBar} from '@angular/material/progress-bar';
import {AsyncPipe} from '@angular/common';
import {LoadingService} from '../../core/services/loading.service';

@Component({
  selector: 'app-dashboard-layout',
  imports: [
    RouterOutlet,
    Navbar,
    Footer,
    MatProgressBar,
    AsyncPipe
  ],
  template: `
    <app-navbar/>
    @if (this.loadingService.loading$ | async) {
      <mat-progress-bar mode="indeterminate"></mat-progress-bar>
    }
    <router-outlet></router-outlet>
    <app-footer/>`
})
export class DashboardLayout {
  protected loadingService: LoadingService = inject(LoadingService);
}
