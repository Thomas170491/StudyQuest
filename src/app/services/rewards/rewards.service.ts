import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Reward, Progress } from '../../interfaces' 

@Injectable({
  providedIn: 'root',
})
export class RewardService {
  private progress: Progress[] = [];
  private tokens: number = 0;
  private badges: Reward[] = [];
  private trophies: Reward[] = [];

  // BehaviorSubject pour suivre les changements en temps réel
  private tokensSubject = new BehaviorSubject<number>(this.tokens);
  private badgesSubject = new BehaviorSubject<Reward[]>(this.badges);
  private trophiesSubject = new BehaviorSubject<Reward[]>(this.trophies);

  constructor() {}

  // Méthodes pour gérer les jetons
  getTokens(): Observable<number> {
    return this.tokensSubject.asObservable();
  }

  addTokens(value: number) {
    this.tokens += value;
    this.tokensSubject.next(this.tokens);
  }

  // Méthodes pour gérer les badges
  getBadges(): Observable<Reward[]> {
    return this.badgesSubject.asObservable();
  }

  addBadge(badge: Reward) {
    this.badges.push(badge);
    this.badgesSubject.next(this.badges);
  }

  // Méthodes pour gérer les trophées
  getTrophies(): Observable<Reward[]> {
    return this.trophiesSubject.asObservable();
  }

  addTrophy(trophy: Reward) {
    this.trophies.push(trophy);
    this.trophiesSubject.next(this.trophies);
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
