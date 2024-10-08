import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
import { LeaderboardService } from '../../services/leaderboard/leaderboard.service';
import { Observable } from 'rxjs';
import { LeaderboardEntry } from '../../interfaces';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonRow, IonTitle, IonToolbar } from '@ionic/angular/standalone';


const UIElements = [
  IonHeader,
  IonTitle,
  IonToolbar,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  ]
@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [AsyncPipe, NgFor, ...UIElements],
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
  leaderboard$!: Observable<LeaderboardEntry[]>;

  constructor(private leaderboardService: LeaderboardService) {}

  ngOnInit(): void {
    this.leaderboard$ = this.leaderboardService.getLeaderboard();
  }
}