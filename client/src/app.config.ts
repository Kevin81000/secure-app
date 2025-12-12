import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter([
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'login',    loadComponent: () => import('./app/auth/login.component').then(m => m.LoginComponent) },
      { path: 'register', loadComponent: () => import('./app/auth/register.component').then(m => m.RegisterComponent) },
      { path: 'dashboard', loadComponent: () => import('./app/dashboard/dashboard.component').then(m => m.DashboardComponent) },
      { path: 'users',    loadComponent: () => import('./app/users/users.component').then(m => m.UsersComponent) },
      { path: 'tasks',    loadComponent: () => import('./app/tasks/tasks.component').then(m => m.TasksComponent) },
      { path: '**', redirectTo: '/login' }
    ])
  ]
};
