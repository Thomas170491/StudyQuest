import { Component } from '@angular/core';
import { UserService } from '../../services/users/user-service.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  constructor(private _userService: UserService) { }

  ngOnInit(): void {
    this._userService.getCurrentUser().pipe(tap(users => {
      console.log(users)}));
    
    };
  }


