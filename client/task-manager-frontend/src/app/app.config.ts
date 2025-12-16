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
      { path: 'dashboard', loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent) },
      { path: '**', redirectTo: 'welcome' }
    ])
  ]
};