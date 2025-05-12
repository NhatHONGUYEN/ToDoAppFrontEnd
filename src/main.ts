import {
  APP_INITIALIZER,
  enableProdMode,
  importProvidersFrom,
} from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { AppComponent } from './app/app.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { initializeKeycloak } from './app/app-init';
import { AppAuthGuard } from './app/app-auth.guard';

import { environment } from './environments/environment';
import { TaskListComponent } from './app/components/task-list/task-list.component';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),

    importProvidersFrom(KeycloakAngularModule),

    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },

    // --- Voilà le routing protégé par Keycloak ---
    provideRouter([
      { path: '', redirectTo: 'tasks', pathMatch: 'full' },
      {
        path: 'tasks',
        component: TaskListComponent,
        canActivate: [AppAuthGuard],
      },
      { path: '**', redirectTo: 'tasks' },
    ]),
  ],
}).catch((err) => console.error(err));
