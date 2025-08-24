import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: "auth",
    loadComponent: () => import('./features/auth/pages/auth/auth.component').then(c => c.AuthComponent)
  }
];
