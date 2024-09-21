import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  constructor(
   
    private readonly _authService: AuthService
  ) {}

  authentificate = async () => {
    await this._authService.authentificateUser();
  }

  signOut = async () => {
    await this._authService.signOut();
   
  }
}