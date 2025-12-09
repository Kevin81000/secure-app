import { Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserEditComponent } from './user-edit/user-edit.component';

export const routes: Routes = [
    { path: '', redirectTo: 'users', pathMatch: 'full' },
    { path: 'users', component: UsersListComponent },
    { path: 'users/create', component: UserCreateComponent },
    { path: 'users/edit/:id', component: UserEditComponent }
];
