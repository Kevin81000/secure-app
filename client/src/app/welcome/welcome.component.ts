import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-welcome',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
    <div class="welcome">
      <h1>Welcome to Task Manager</h1>
      <p>Secure task management with role-based access</p>
      <div class="actions">
        <a routerLink="/login" class="btn btn-primary">Login</a>
        <a routerLink="/register" class="btn btn-secondary">Register</a>
      </div>
    </div>
  `,
    styles: [`
    .welcome { text-align: center; padding: 100px 20px; }
    h1 { font-size: 3rem; margin-bottom: 20px; }
    p { font-size: 1.5rem; margin-bottom: 40px; color: #666; }
    .actions { gap: 20px; display: flex; justify-content: center; }
    .btn { padding: 15px 30px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 1.2rem; }
    .btn-primary { background: #007bff; color: white; }
    .btn-secondary { background: #6c757d; color: white; }
  `]
})
export class WelcomeComponent { }