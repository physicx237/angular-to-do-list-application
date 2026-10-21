import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'tasks-list',
    loadComponent: () =>
      import('./components/tasks-list/tasks-list.component').then((m) => m.TasksList),
  },
  {
    path: 'task-form',
    loadComponent: () =>
      import('./components/task-form/task-form.component').then((m) => m.TaskForm),
  },
  {
    path: 'task-form/:id',
    loadComponent: () =>
      import('./components/task-form/task-form.component').then((m) => m.TaskForm),
  },
  {
    path: '',
    redirectTo: 'tasks-list',
    pathMatch: 'full',
  },
];
