// client/src/app/dashboard/dashboard.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, Router } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterOutlet],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

    // Constructor injection — this is required for Router to work
    constructor(private router: Router) { }

    logout() {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    }
}