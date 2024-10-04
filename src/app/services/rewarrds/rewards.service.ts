import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { Reward, Progress } from '../../interfaces' 

@Injectable({
  providedIn: 'root',
})
export class RewardService {
  private progress: Progress[] = [];


  // BehaviorSubject pour suivre les changements en temps réel
  private tokensSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private badgesSubject: BehaviorSubject<Reward[]> = new BehaviorSubject<Reward[]>([]);
  private trophiesSubject :BehaviorSubject<Reward[]> = new BehaviorSubject<Reward[]>([]);

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

  getAllRewards(): Observable<{ tokens: number, badges: Reward[], trophies: Reward[] }> {
    return combineLatest([
      this.tokensSubject.asObservable(),
      this.badgesSubject.asObservable(),
      this.trophiesSubject.asObservable()
    ]).pipe(
      map(([tokens, badges, trophies]) => ({
        tokens,
        badges,
        trophies
      }))
    );
  }

}




