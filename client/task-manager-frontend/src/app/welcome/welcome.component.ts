import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-welcome',
    standalone: true,
    imports: [RouterLink],
    template: `
    <div style="text-align: center; padding: 100px;">
      <h1>Welcome to Task Manager</h1>
      <p>Secure task management with role-based access</p>
      <div style="margin-top: 40px;">
        <a routerLink="/login" style="margin: 10px; padding: 15px 30px; background: #007bff; color: white; text-decoration: none;">Login</a>
        <a routerLink="/register" style="margin: 10px; padding: 15px 30px; background: #28a745; color: white; text-decoration: none;">Register</a>
      </div>
    </div>
  `
})
export class WelcomeComponent { }
