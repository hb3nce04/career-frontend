import {Routes} from '@angular/router';
import {Selector} from './selector/selector';
import {Profile} from './profile/profile';
import {Contact} from './contact/contact';
import {Home} from './home/home';
import {AdminGuard} from '../../core/guards/admin.guard';
import {Students} from './students/students';

export default [
  {path: '', component: Home},
  {path: 'students', component: Students},
  {path: 'selector', component: Selector},
  {path: 'profile', component: Profile},
  {path: 'contact', component: Contact},
  {
    path: 'admin',
    canActivate: [AdminGuard],
    loadChildren: () => import('./admin/admin.routes').then(m => m.default),
  }
] as Routes;
