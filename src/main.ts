import {
  APP_INITIALIZER,
  enableProdMode,
  importProvidersFrom,
} from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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
import { TaskFormComponent } from './app/components/task-form/task-form.component';
import { TaskDetailsComponent } from './app/components/task-details/task-details.component';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(ReactiveFormsModule, FormsModule),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(KeycloakAngularModule),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
    provideRouter([
      { path: '', redirectTo: 'tasks', pathMatch: 'full' },
      {
        path: 'tasks',
        component: TaskListComponent,
        canActivate: [AppAuthGuard],
      },
      {
        path: 'tasks/new',
        component: TaskFormComponent,
        canActivate: [AppAuthGuard],
      },
      {
        path: 'tasks/:id',
        component: TaskDetailsComponent,
        canActivate: [AppAuthGuard],
      },
      {
        path: 'tasks/:id/edit',
        component: TaskFormComponent,
        canActivate: [AppAuthGuard],
      },
      { path: '**', redirectTo: 'tasks' },
    ]),
  ],
}).catch((err) => console.error(err));
