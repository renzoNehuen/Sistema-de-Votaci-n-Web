import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { AdminDashboard } from './pages/dashboard/dashboard';
import { Votes } from './pages/votes/votes';
import { NewVoter } from './pages/new-voter/new-voter';
import { ChangePassword } from './pages/change-password/change-password';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  // Rutas públicas
  {
    path: '',
    component: Home
  },
  {
    path: 'login',
    component: Login
  },

  // Rutas protegidas (solo admin)
  {
    path: 'admin',
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: AdminDashboard
      },
      {
        path: 'votes',
        component: Votes
      },
      {
        path: 'voters/create',
        component: NewVoter
      },
      {
        path: 'voters/:id/edit',
        component: NewVoter
      },
      {
        path: 'change-password',
        component: ChangePassword
      }
    ]
  },

  // Redirect wildcard
  {
    path: '**',
    redirectTo: ''
  }
];
