// src/app/dashboard/dashboard.component.ts

import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [RouterLink, RouterOutlet],
    template: `
    <div style="display: flex; min-height: 100vh; background: #f4f6f9;">
      <!-- Sidebar -->
      <aside style="width: 250px; background: #343a40; color: white; padding: 20px;">
        <h2 style="margin-top: 0; text-align: center;">Task Manager</h2>
        <nav style="margin-top: 40px;">
          <a routerLink="tasks" routerLinkActive="active" 
             style="display: block; padding: 15px; color: white; text-decoration: none; border-radius: 8px; margin-bottom: 10px;">
            Tasks
          </a>
          <a routerLink="users" routerLinkActive="active" 
             style="display: block; padding: 15px; color: white; text-decoration: none; border-radius: 8px; margin-bottom: 10px;">
            Users (Admin only)
          </a>
        </nav>
        <button (click)="logout()" 
                style="width: 100%; padding: 15px; background: #dc3545; color: white; border: none; border-radius: 8px; cursor: pointer; margin-top: auto;">
          Logout
        </button>
      </aside>

      <!-- Main Content Area -->
      <main style="flex: 1; padding: 40px;">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
    styles: [`
    .active {
      background: #495057 !important;
      font-weight: bold;
    }
  `]
})
export class DashboardComponent {
    logout() {
        localStorage.removeItem('token');
        window.location.href = '/welcome';
    }
}