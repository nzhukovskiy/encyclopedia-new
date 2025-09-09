import {HttpEvent, HttpInterceptorFn, HttpResponse} from '@angular/common/http';
import {map} from 'rxjs';

export const dateInterceptor: HttpInterceptorFn = (req, next) => {
    return next(req).pipe(
        map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse && event.body) {
                const modifiedBody = convertDates(event.body);
                return event.clone({ body: modifiedBody });
            }
            return event;
        })
    );
};

function convertDates(body: any): any {
    if (body === null || body === undefined) return body;

    if (typeof body === 'string' && isIsoDateString(body)) {
        return new Date(body);
    }

    if (Array.isArray(body)) {
        return body.map(item => convertDates(item));
    }

    if (typeof body === 'object') {
        Object.keys(body).forEach(key => {
            body[key] = convertDates(body[key]);
        });
    }

    return body;
}

function isIsoDateString(value: string): boolean {
    return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?(?:[-+]\d{2}:?\d{2}|Z)$/.test(value);
}
