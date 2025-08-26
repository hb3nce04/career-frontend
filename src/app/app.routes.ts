import {Routes} from '@angular/router';
import {AuthGuard} from './core/guards/auth.guard';
import {AuthLayout} from './shared/layouts/auth.layout';
import {DashboardLayout} from './shared/layouts/dashboard.layout';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayout,
    loadChildren: () => import('./features/auth/auth.routes')
  },
  {
    path: 'dashboard',
    component: DashboardLayout,
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/dashboard/dashboard.routes')
  },
  {path: '**', redirectTo: '/dashboard'}
];
