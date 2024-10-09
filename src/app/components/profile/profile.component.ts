import { Component } from '@angular/core';
import { UserService } from '../../services/users/user-service.service';
import { Observable } from 'rxjs';
import { User } from '../../interfaces';
import { AsyncPipe, NgIf } from '@angular/common';
import { RewardsComponent } from '../rewards/rewards.component';
import { RouterModule } from '@angular/router';
import {  IonContent, IonHeader, IonList, IonToolbar,IonMenu, IonTitle, IonItem, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonSpinner, IonAvatar, IonButton, IonMenuButton, IonButtons } from '@ionic/angular/standalone';
import { ProfileService } from '../../services/profile/profile.service';


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
    private _profileService: ProfileService
  ) { 
    this.user$ = this._userService.getCurrentUser()
  }
  async changeProfilePicture(user: User): Promise<void> {
    await this._profileService.changeProfilePicture(user);
  }
}




