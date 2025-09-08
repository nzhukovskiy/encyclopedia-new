import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {catchError, throwError} from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const toastrService = inject(ToastrService);
    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            toastrService.error(
                error.error?.message || error.message || 'Server Error'
            );
            return throwError(() => error);
        })
    );
};
