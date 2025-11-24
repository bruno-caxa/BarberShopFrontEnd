import {
  ApplicationConfig,
  importProvidersFrom
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { registerLocaleData } from '@angular/common';
import { provideHttpClient, withFetch } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { routes } from './app.routes';

registerLocaleData(localePt, 'pt');

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    importProvidersFrom(
      CalendarModule.forRoot({
        provide: DateAdapter,
        useFactory: adapterFactory,
      })
    ),
  ],
};
