import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {TokenStorageService} from '../services/token/token-storage.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    let authReq = req.clone();
    const token = inject(TokenStorageService).getToken();
    if (token) {
        authReq = req.clone({setHeaders: {Authorization: `Bearer ${token}`}});
    }
    return next(authReq);
};
