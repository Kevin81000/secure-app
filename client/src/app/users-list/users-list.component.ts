import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsersService } from '../users.service';
import { User } from '../user.model';

@Component({
    selector: 'app-users-list',
    standalone: true,
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss'],
    imports: [
        CommonModule,
        RouterModule
    ]
})
export class UsersListComponent implements OnInit {
    users: User[] = [];

    constructor(private usersService: UsersService) { }

    ngOnInit() {
        this.usersService.getUsers().subscribe(data => (this.users = data));
    }
}
