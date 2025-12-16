import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; // ADD THIS LINE

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [FormsModule, RouterLink, CommonModule], // ADD CommonModule HERE
    template: `
    <div class="register-container">
      <h2>Register</h2>
      <form (ngSubmit)="register()">
        <input 
          [(ngModel)]="name" 
          name="name" 
          type="text"
          placeholder="Name" 
          required 
        />
        <input 
          [(ngModel)]="email" 
          name="email"
          type="email" 
          placeholder="Email" 
          required 
        />
        <input 
          [(ngModel)]="password" 
          name="password"
          type="password" 
          placeholder="Password" 
          required 
        />
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <a routerLink="/login">Login</a></p>
      <p class="success" *ngIf="success">{{ success }}</p>
      <p class="error" *ngIf="error">{{ error }}</p>
    </div>
  `,
    styles: [`
    .register-container {
      max-width: 400px;
      margin: 100px auto;
      padding: 30px;
      border: 1px solid #ddd;
      border-radius: 8px;
      text-align: center;
    }
    input {
      width: 100%;
      padding: 10px;
      margin: 10px 0;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    button {
      width: 100%;
      padding: 10px;
      background: #28a745;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background: #218838;
    }
    .success {
      color: green;
      font-weight: bold;
    }
    .error {
      color: red;
      font-weight: bold;
    }
  `]
})
export class RegisterComponent {
    name = '';
    email = '';
    password = '';
    error = '';
    success = '';

    constructor(private http: HttpClient, private router: Router) { }

    register() {
        this.error = '';
        this.success = '';

        this.http.post('http://localhost:3000/auth/register', {
            name: this.name,
            email: this.email,
            password: this.password
        }).subscribe({
            next: () => {
                this.success = 'Registration successful! Redirecting to login...';
                setTimeout(() => this.router.navigate(['/login']), 2000);
            },
            error: (err) => {
                this.error = err.error?.message || 'Registration failed. Please try again.';
            }
        });
    }
}