import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter([
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: 'welcome', loadComponent: () => import('./welcome/welcome.component').then(m => m.WelcomeComponent) },
      { path: 'login', loadComponent: () => import('./auth/login.component').then(m => m.LoginComponent) },
      { path: 'register', loadComponent: () => import('./auth/register.component').then(m => m.RegisterComponent) },

      {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
        children: [
          { path: 'tasks', loadComponent: () => import('./tasks/tasks.component').then(m => m.TasksComponent) },
          { path: 'users', loadComponent: () => import('./users/users.component').then(m => m.UsersComponent) },
          { path: '', redirectTo: 'tasks', pathMatch: 'full' } // Default to tasks
        ]
      },
      { path: '**', redirectTo: 'welcome' }
    ])
  ]
};

