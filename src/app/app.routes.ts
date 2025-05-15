import { Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';

export const routes: Routes = [
  { path: '', component: TaskListComponent },
  { path: 'tasks', component: TaskListComponent },
  { path: 'tasks/:id/edit', component: TaskFormComponent },
  { path: 'tasks/:id', component: TaskDetailsComponent },
];
