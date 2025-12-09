import { Component } from '@angular/core';
import { User } from '../user.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
})
export class UserEditComponent {
  user: User = { id: 0, name: '', email: '' };

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.user.id = id;
  }

  submit() {
    console.log('Updating user:', this.user);
    // TODO: PUT to backend later
    this.router.navigate(['/users']);
  }
}
