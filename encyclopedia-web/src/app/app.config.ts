import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {baseUrlInterceptor} from './core/interceptors/base-url.interceptor';
import {authInterceptor} from './core/interceptors/auth.interceptor';
import {provideTranslateService} from '@ngx-translate/core';
import {provideTranslateHttpLoader} from '@ngx-translate/http-loader';
import {provideToastr} from 'ngx-toastr';
import {provideAnimations} from '@angular/platform-browser/animations';
import {errorInterceptor} from './core/interceptors/error.interceptor';
import {dateInterceptor} from './core/interceptors/date.interceptor';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({eventCoalescing: true}),
        provideRouter(routes),
        provideHttpClient(withInterceptors([errorInterceptor, baseUrlInterceptor, authInterceptor, dateInterceptor])),
        provideHttpClient(),
        provideTranslateService({
            lang: 'ru',
            fallbackLang: 'en',
            loader: provideTranslateHttpLoader({
                prefix: 'i18n/',
                suffix: '.json'
            })
        }),
        provideAnimations(),
        provideToastr(),
    ]
};
