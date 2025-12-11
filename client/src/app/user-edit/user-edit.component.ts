import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { User } from '../user.model';

@Component({
    selector: 'app-user-edit',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        RouterModule
    ],
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent {
    user: User = { id: 0, name: '', email: '' };

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.user.id = id || 0;
    }

    submit() {
        console.log('Updating user:', this.user);
        // TODO: call your NestJS backend here later
        this.router.navigate(['/users']);
    }
}