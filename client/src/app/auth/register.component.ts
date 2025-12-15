import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './register.component.html'
})
export class RegisterComponent {
    user = { name: '', email: '', password: '' };
    error = '';

    constructor(private http: HttpClient, private router: Router) { }

    register() {
        this.http.post('/auth/register', this.user).subscribe({
            next: () => {
                alert('Registration successful! Please login.');
                this.router.navigate(['/login']);
            },
            error: (err) => this.error = err.error?.message || 'Registration failed'
        });
    }
}