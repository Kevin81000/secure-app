import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './register.component.html'
})
export class RegisterComponent {
    user = { name: '', email: '', password: '' };

    constructor(private http: HttpClient, private router: Router) { }

    register() {
        this.http.post('/api/auth/register', this.user).subscribe({
            next: () => this.router.navigate(['/login']),
            error: () => alert('Registration failed')
        });
    }
}