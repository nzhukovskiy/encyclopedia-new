import {HttpInterceptorFn} from '@angular/common/http';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
    const baseUrl = "http://localhost:3000/";
    if (req.url.startsWith('http')) {
        return next(req);
    }

    const apiReq = req.clone({url: `${baseUrl}${req.url}`});
    return next(apiReq);
};
