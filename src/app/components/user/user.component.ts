import { Component } from '@angular/core';
import { User } from '../../interfaces';
import { UserService } from '../../services/users/user-service.service';
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

  constructor(private userService : UserService){}
}
