import {NavLink} from '../../shared/components/navbar/navbar';

// TODO: kódismétlés refactor
export const NAV_LINKS: NavLink[] = [
  {label: 'Főoldal', path: '/dashboard'},
  {label: 'Osztály kiválasztása', path: '/dashboard/selector'},
  {label: 'Profil', path: '/dashboard/profile'},
  {label: 'Kapcsolat', path: '/dashboard/contact'},
  {label: 'Felhasználók', path: '/dashboard/admin/users', isProtected: true},
];
