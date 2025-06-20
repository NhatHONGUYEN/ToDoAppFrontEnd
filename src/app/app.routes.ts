import { Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { AppAuthGuard } from './app-auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: TaskListComponent,
    canActivate: [AppAuthGuard],
  },
  {
    path: 'tasks',
    component: TaskListComponent,
    canActivate: [AppAuthGuard],
  },
  {
    path: 'tasks/new',
    component: TaskFormComponent,
    canActivate: [AppAuthGuard],
    data: { roles: ['USER', 'ADMIN'] },
  },
  {
    path: 'tasks/:id/edit',
    component: TaskFormComponent,
    canActivate: [AppAuthGuard],
    data: { roles: ['USER', 'ADMIN'] },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
