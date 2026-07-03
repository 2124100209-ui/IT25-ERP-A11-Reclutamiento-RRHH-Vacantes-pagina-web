import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { withComponentInputBinding, withRouterConfig } from '@angular/router';
import { adminAuthInterceptor } from './services/admin-auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [

    provideBrowserGlobalErrorListeners(),

    provideRouter(

      routes,

      withRouterConfig({
        onSameUrlNavigation: 'reload'
      })

    ),

    provideClientHydration(
      withEventReplay()
    ),

    provideHttpClient(
      withInterceptors([adminAuthInterceptor])
    ),

  ]
};
