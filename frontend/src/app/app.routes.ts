import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { AdminDashboard } from './pages/dashboard/dashboard';
import { Votes } from './pages/votes/votes';
import { Results } from './pages/results/results';
import { NewVoter } from './pages/new-voter/new-voter';
import { ChangePassword } from './pages/change-password/change-password';
import { Candidates } from './pages/candidates/candidates';
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
        path: 'results',
        component: Results
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
        path: 'candidates',
        component: Candidates
      }
    ]
  },

  // Rutas públicas adicionales
  {
    path: 'change-password',
    component: ChangePassword
  },

  // Redirect wildcard
  {
    path: '**',
    redirectTo: ''
  }
];
