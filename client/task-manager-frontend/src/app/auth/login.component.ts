import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule, RouterLink, CommonModule],
    template: `
    <div style="max-width: 400px; margin: 100px auto; padding: 30px; border: 1px solid #ddd; border-radius: 8px;">
      <h2>Login</h2>
      <form (ngSubmit)="login()">
        <input [(ngModel)]="email" name="email" type="email" placeholder="Email" required style="width: 100%; padding: 10px; margin: 10px 0;" />
        <input [(ngModel)]="password" name="password" type="password" placeholder="Password" required style="width: 100%; padding: 10px; margin: 10px 0;" />
        <button type="submit" style="width: 100%; padding: 10px; background: #007bff; color: white;">Login</button>
      </form>
      <p>Don't have an account? <a routerLink="/register">Register</a></p>
      <p *ngIf="error" style="color: red;">{{ error }}</p>
    </div>
  `
})
export class LoginComponent {
    email = '';
    password = '';
    error = '';

    constructor(private http: HttpClient, private router: Router) { }

    login() {
        this.http.post<{ access_token: string }>('http://localhost:3000/auth/login', { email: this.email, password: this.password }).subscribe({
            next: (res) => {
                localStorage.setItem('token', res.access_token);
                this.router.navigate(['/dashboard']);
            },
            error: (err) => this.error = err.error.message || 'Login failed'
        });
    }
}