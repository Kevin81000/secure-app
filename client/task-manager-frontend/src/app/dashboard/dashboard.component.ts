import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [RouterLink, RouterOutlet],
    template: `
    <div style="display: flex; min-height: 100vh;">
      <aside style="width: 250px; background: #343a40; color: white; padding: 20px;">
        <h2>Task Manager</h2>
        <nav>
          <a routerLink="/dashboard/tasks" routerLinkActive="active" style="display: block; padding: 10px; color: white; text-decoration: none;">Tasks</a>
          <a routerLink="/dashboard/users" routerLinkActive="active" style="display: block; padding: 10px; color: white; text-decoration: none;">Users</a>
        </nav>
        <button (click)="logout()" style="margin-top: auto; width: 100%; padding: 10px; background: #dc3545; color: white;">Logout</button>
      </aside>
      <main style="flex: 1; padding: 40px;">
        <router-outlet></router-outlet>
      </main>
    </div>
  `
})
export class DashboardComponent {
    logout() {
        localStorage.removeItem('token');
        window.location.href = '/';
    }
}