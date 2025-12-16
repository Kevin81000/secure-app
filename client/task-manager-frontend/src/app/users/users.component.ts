import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-users',
    standalone: true,
    imports: [CommonModule],
    template: `

    <div>
      <h2>Users (ADMIN only)</h2>
      <ul>
        <li *ngFor="let user of users">
          {{ user.name }} - {{ user.email }} - {{ user.role }}
        </li>
      </ul>
    </div>
  `
})
export class UsersComponent {
    users: any[] = [];

    constructor(private http: HttpClient) {
        this.http.get<any[]>('http://localhost:3000/users').subscribe(data => this.users = data);
    }
}