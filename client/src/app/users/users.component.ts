import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-users',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="p-6">
      <h2 class="text-2xl font-bold mb-4">Users Management</h2>
      <p>Only ADMIN can see and manage all users here.</p>
      <!-- Your real users list/table goes here -->
    </div>
  `,
    styles: []
})
export class UsersComponent { }

// This is the key line — without it you get exactly the error you saw
export default UsersComponent;