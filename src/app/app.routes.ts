import { Routes } from '@angular/router';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
} from '@nebular/auth';

export const appRoutes: Routes = [
  {
    path: 'delete-account',
    loadChildren: () => import('./delete-account/delete-account.module')
      .then((m) => m.DeleteAccountModule),
  },
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module')
      .then((m) => m.PagesModule),
  },
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: NbLoginComponent,
      },
      {
        path: 'login',
        component: NbLoginComponent,
      },
      {
        path: 'logout',
        component: NbLogoutComponent,
      },
    ],
  },
  { path: '', redirectTo: 'pages/management/dash-board', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages/management/dash-board' },
];
