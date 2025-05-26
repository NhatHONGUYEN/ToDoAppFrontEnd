import { Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
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
    path: 'tasks/:id/edit',
    component: TaskFormComponent,
    canActivate: [AppAuthGuard],
    data: { roles: ['USER', 'ADMIN'] },
  },
  {
    path: 'tasks/:id',
    component: TaskDetailsComponent,
    canActivate: [AppAuthGuard],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./components/admin/admin.module') // ← no “.ts”, just the file name
        .then((m) => m.AdminModule), // ← must match the exported class name
    canActivate: [AppAuthGuard],
    data: { roles: ['ADMIN'] },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
