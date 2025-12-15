import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    credentials = { email: '', password: '' };
    error = '';

    constructor(private http: HttpClient, private router: Router) { }

    login() {
        this.http.post<any>('/auth/login', this.credentials).subscribe({
            next: (res) => {
                localStorage.setItem('token', res.access_token);
                this.router.navigate(['/dashboard']);
            },
            error: (err) => this.error = err.error?.message || 'Login failed'
        });
    }
}