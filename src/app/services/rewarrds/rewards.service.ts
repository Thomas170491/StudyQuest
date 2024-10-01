import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { Reward, Progress } from '../../interfaces' 
import { producerUpdateValueVersion } from '@angular/core/primitives/signals';
import { ValueAccessor } from '@ionic/angular/common';

@Injectable({
  providedIn: 'root',
})
export class RewardService {
  private progress: Progress[] = [];


  // BehaviorSubject pour suivre les changements en temps réel
  private tokensSubject = new BehaviorSubject<number>(0);
  private badgesSubject = new BehaviorSubject<Reward[]>([]);
  private trophiesSubject = new BehaviorSubject<Reward[]>([]);

  constructor() {}

  // Méthodes pour gérer les jetons
  getTokens(): Observable<number> {
    return this.tokensSubject.asObservable();
  }

  addTokens(value: number) {
    const tokens = this.tokensSubject.value  
    const updatedTokens= tokens + value;
    this.tokensSubject.next(updatedTokens)
    
  }

  // Méthodes pour gérer les badges
  getBadges(): Observable<Reward[]> {
    return this.badgesSubject.asObservable();
  }

  addBadges(badge: Reward[]) {
    this.badgesSubject.next(badge)
  }

  addBadge(badge: Reward) {
    const badges = this.badgesSubject.value;
    badges.push(badge);
    this.badgesSubject.next(badges);
  }

  // Méthodes pour gérer les trophées
  getTrophies(): Observable<Reward[]> {
    return this.trophiesSubject.asObservable();
  }

  addTrophy(trophy: Reward)  {
    const trophies = this.trophiesSubject.value;
    trophies.push(trophy);
    this.trophiesSubject.next(trophies);
  }
  addTrophies(trophy : Reward[]){
    this.trophiesSubject.next(trophy)
  }

  // Gérer la progression du chapitre
  getProgress(chapterId: string): Progress | undefined {
    return this.progress.find((p) => p.chapterId === chapterId);
  }

  updateProgress(chapterId: string, percentage: number) {
    const chapterProgress = this.progress.find(p => p.chapterId === chapterId);
    if (chapterProgress) {
      chapterProgress.progressPercentage = percentage;
      chapterProgress.mastered = percentage >= 80;
    } else {
      this.progress.push({
        chapterId,
        subjectId: '', // à compléter
        progressPercentage: percentage,
        badges: [],
        trophies: [],
        tokens: 0,
        mastered: percentage >= 80,
        userId: '',
        completedExercises: 0,
        totalExercises: 0
      });
    }
  }
}
