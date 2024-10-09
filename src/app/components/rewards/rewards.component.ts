import { Component, OnInit } from '@angular/core';
import { RewardService } from '../../services/rewarrds/rewards.service';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { Reward } from '../../interfaces';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { IonContent, IonGrid, IonHeader, IonRow, IonTitle,IonToolbar,IonCol, IonCardContent, IonCard, IonCardHeader, IonTab, IonCardTitle, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { UserService } from '../../services/users/user-service.service';





const UIElements = [
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCardContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonList,
  IonItem,
  IonLabel,

  
]

@Component({
  selector: 'app-rewards',
  standalone: true,
  imports: [AsyncPipe, ...UIElements, NgFor, NgIf],
  templateUrl: './rewards.component.html',
  styleUrl: './rewards.component.scss'
})
export class RewardsComponent implements OnInit {

  badges$!: Observable<Reward[]>;
  trophies$!: Observable<Reward[]>;
  tokens$!: Observable<number>;
  username$!: Observable<string>;

  constructor(
    private readonly _rewardService: RewardService,
    private readonly _userService: UserService
  ) {}

  ngOnInit(): void {
    this.username$ = this._userService.getCurrentUser().pipe(
      map(user => {
    
        if (user) {
          
          return user.username; // Ensure the return statement is followed by the value
        } else {
          console.error('User is undefined');
          return ''; // Return an empty string or a default value
        }
      }),
      catchError(error => {
        console.error('Error fetching user:', error);
        return of(''); // Return an empty string or a default value
      })
    );

    this.badges$ = this.username$.pipe(
      switchMap(username => this._rewardService.getBadges(username))
    );

    this.trophies$ = this.username$.pipe(
      switchMap(username => this._rewardService.getTrophies(username))
    );

    this.tokens$ = this.username$.pipe(
      switchMap(username => this._rewardService.getTokens(username))
    );
  }
}

