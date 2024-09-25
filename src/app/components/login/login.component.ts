import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { IonAvatar, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonHeader, IonItem, IonList, IonRow, IonTitle, IonToolbar } from '@ionic/angular/standalone';


const UIElements = [
  IonContent,
  IonButton,
  IonCol,
  IonRow,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonAvatar,
  
]
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [...UIElements],
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