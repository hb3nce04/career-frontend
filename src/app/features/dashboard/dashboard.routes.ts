import {Routes} from '@angular/router';
import {Selector} from './selector/selector';
import {Profile} from './profile/profile';
import {Home} from './home/home';
import {AdminGuard} from '../../core/guards/admin.guard';
import {Students} from './students/students';
import {ClassGuard} from '../../core/guards/class.guard';

export default [
  {path: '', component: Home},
  {path: 'students', component: Students, canActivate: [ClassGuard]},
  {path: 'selector', component: Selector},
  {path: 'profile', component: Profile},
  {
    path: 'admin',
    canActivate: [AdminGuard],
    loadChildren: () => import('./admin/admin.routes').then(m => m.default),
  }
] as Routes;
