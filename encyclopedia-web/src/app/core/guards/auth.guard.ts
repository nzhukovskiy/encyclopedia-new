import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {TokenStorageService} from '../services/token/token-storage.service';

export const authGuard: CanActivateFn = (route, state) => {
    const token = inject(TokenStorageService).getToken();
    const router = inject(Router);
    console.log(!token)
    if (!token) {
        router.navigate(['/auth']).then();
    }
    return true;
};
