import {Routes} from '@angular/router';
import {Selector} from './selector/selector';
import {Profile} from './profile/profile';
import {Contact} from './contact/contact';
import {Home} from './home/home';

export default [
  {path: '', component: Home},
  {path: 'selector', component: Selector},
  {path: 'profile', component: Profile},
  {path: 'contact', component: Contact},
] as Routes;
