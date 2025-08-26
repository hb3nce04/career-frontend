import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Navbar} from '../components/navbar/navbar';
import {Footer} from '../components/footer/footer';
import {MatProgressBar} from '@angular/material/progress-bar';
import {LoadingService} from '../../core/services/loading.service';

@Component({
  selector: 'app-dashboard-layout',
  imports: [
    RouterOutlet,
    Navbar,
    Footer,
    MatProgressBar,
  ],
  styles: `
    .page-content {
      padding: 20px 50px;
    }
  `,
  template: `
    <app-navbar/>
    @if (this.loadingService.loadingSubject.value) {
      <mat-progress-bar mode="indeterminate"></mat-progress-bar>
    }
    <div class="page-content">
      <router-outlet></router-outlet>
    </div>
    <app-footer/>`
})
export class DashboardLayout {
  protected loadingService: LoadingService = inject(LoadingService);
}
