import { Component } from '@angular/core';
import { UserService } from '../../services/users/user-service.service';
import { Observable } from 'rxjs';
import { User } from '../../interfaces';
import { AsyncPipe, NgIf } from '@angular/common';
import { RewardsComponent } from '../rewards/rewards.component';
import { Router, RouterModule } from '@angular/router';
import {  IonContent, IonHeader, IonList, IonToolbar,IonMenu, IonTitle, IonItem, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonSpinner, IonAvatar, IonButton, IonMenuButton, IonButtons } from '@ionic/angular/standalone';
import { ProfileService } from '../../services/profile/profile.service';
import { AuthService } from '../../services/auth/auth.service';


const UIElements = [
  IonContent,
  IonHeader,
  IonToolbar,
  IonMenu,
  IonList,
  IonItem,
  IonTitle,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonSpinner,
  IonAvatar,
  IonButton,
  IonMenuButton,
  IonButtons
]
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [AsyncPipe,RewardsComponent,RouterModule,NgIf,...UIElements],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  user$: Observable<User | undefined>;

  constructor(
    private _userService: UserService,
    private _profileService: ProfileService,
    private router: Router,
    private readonly authService : AuthService
  ) { 
    this.user$ = this._userService.getCurrentUser();
    this.router = new Router();

  }
  async changeProfilePicture(user: User): Promise<void> {
    await this._profileService.changeProfilePicture(user); 
  }
 goToGame() {
  this.router.navigate(['/select']);
 }
 goToLeaderboard() {
  this.router.navigate(['/leaderboard']);
 }
 signOut() {
   this.authService.signOut();
 }
}
 


