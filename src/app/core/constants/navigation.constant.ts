import {NavLink} from '../../shared/components/layout/navbar/navbar';

// TODO: kódismétlés refactor
export const NAV_LINKS: NavLink[] = [
  {label: 'Főoldal', path: '/dashboard'},
  {label: 'Osztály kiválasztása', path: '/dashboard/selector'},
  {label: 'Tanulók kezelése', path: '/dashboard/students'},
  {label: 'Felhasználók', path: '/dashboard/admin/users', isProtected: true},
];
