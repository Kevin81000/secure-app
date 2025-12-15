import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-users',
    standalone: true,
    imports: [CommonModule],
    template: `
    <h2>Users Management (ADMIN only)</h2>
    <ul>
      <li *ngFor="let user of users">
        {{ user.name }} - {{ user.email }} - Role: {{ user.role }}
      </li>
    </ul>
  `
})
export class UsersComponent {
    users: any[] = [];

    constructor(private http: HttpClient) {
        this.http.get<any[]>('/users').subscribe(data => this.users = data);
    }
}