import { Component, OnInit } from '@angular/core';
import { RewardService } from '../../services/rewarrds/rewards.service';
import { Observable } from 'rxjs';
import { Reward } from '../../interfaces';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { IonContent, IonGrid, IonHeader, IonRow, IonTitle,IonToolbar,IonCol, IonCardContent, IonCard, IonCardHeader, IonTab, IonCardTitle, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';





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
export class RewardsComponent{

  badges$: Observable<Reward[]>;
  trophies$: Observable<Reward[]>;
  tokens$: Observable<number>;

  constructor(
    private readonly _rewardService: RewardService,
  ){
    this.badges$ = this._rewardService.getBadges();
    this.trophies$ = this._rewardService.getTrophies();
    this.tokens$ = this._rewardService.getTokens();
    
  }



}
