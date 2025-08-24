import {Routes} from '@angular/router';
import {authGuard} from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: "auth",
        loadComponent: () => import('./features/auth/pages/auth/auth.component').then(c => c.AuthComponent)
    },
    {
        path: "",
        loadComponent: () => import('./app.component').then(c => c.AppComponent),
        canActivate: [authGuard]
    }
];
