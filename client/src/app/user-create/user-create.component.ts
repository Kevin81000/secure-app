import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../users.service';
import { User } from '../user.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-user-create',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './user-create.component.html',
    styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent {

    user: User = {
        id: 0,
        name: '',
        email: ''
    };

    constructor(
        private usersService: UsersService,
        private router: Router
    ) { }

    submit() {
        this.usersService.createUser(this.user).subscribe(() => {
            this.router.navigate(['/users']);
        });
    }
}
