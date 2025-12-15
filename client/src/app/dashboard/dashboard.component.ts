import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterOutlet],
    template: `
    <div class="dashboard">
      <aside class="sidebar">
        <h2>Task Manager</h2>
        <nav>
          <a routerLink="/dashboard/tasks" routerLinkActive="active">Tasks</a>
          <a routerLink="/dashboard/users" routerLinkActive="active">Users</a>
        </nav>
        <button (click)="logout()">Logout</button>
      </aside>
      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
    styles: [`
    .dashboard { display: flex; min-height: 100vh; }
    .sidebar { width: 250px; background: #343a40; color: white; padding: 20px; }
    nav a { display: block; padding: 10px; color: white; text-decoration: none; }
    nav a.active { background: #007bff; }
    button { margin-top: auto; width: 100%; padding: 10px; background: #dc3545; color: white; border: none; }
    main { flex: 1; padding: 40px; }
  `]
})
export class DashboardComponent {
    logout() {
        localStorage.removeItem('token');
        window.location.href = '/';
    }
}