import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable, of } from 'rxjs';
import { Reward, Progress } from '../../interfaces' 

@Injectable({
  providedIn: 'root',
})
export class RewardService {
  private progress: Progress[] = [];


  // BehaviorSubject pour suivre les changements en temps réel
  private tokensSubject = new BehaviorSubject<{ [username: string]: number }>({});
  private badgesSubject = new BehaviorSubject<{ [username: string]: Reward[] }>({});
  private trophiesSubject = new BehaviorSubject<{ [username: string]: Reward[] }>({});

  constructor() {}

;

  getTokens(username: string): Observable<number> {
    return of(this.tokensSubject.value[username] || 0);
  }

  getBadges(username: string): Observable<Reward[]> {
    return of(this.badgesSubject.value[username] || []);
  }

  getTrophies(username: string): Observable<Reward[]> {
    return of(this.trophiesSubject.value[username] || []);
  }


  addTokens(username: string, value: number) {
    const tokens = this.tokensSubject.value[username] || 0;
    const updatedTokens = tokens + value;
    this.tokensSubject.next({ ...this.tokensSubject.value, [username]: updatedTokens });
  }

  // Méthodes pour gérer les badges


  addBadges(username: string, badge: Reward[]) {
    this.badgesSubject.next({ ...this.badgesSubject.value, [username]: badge });
  }

  addBadge(username: string, badge: Reward) {
    const badges = this.badgesSubject.value[username] || [];
    badges.push(badge);
    this.badgesSubject.next({ ...this.badgesSubject.value, [username]: badges });
  }

  

  addTrophy(username: string, trophy: Reward)  {
    const trophies = this.trophiesSubject.value[username] || [];
    trophies.push(trophy);
    this.trophiesSubject.next({ ...this.trophiesSubject.value, [username]: trophies });
  }
  addTrophies(username: string, trophies: Reward[]) {
    this.trophiesSubject.next({ ...this.trophiesSubject.value, [username]: trophies });
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
        tokens: Object.values(tokens).reduce((acc, curr) => acc + curr, 0),
        badges: Object.values(badges).flat(),
        trophies: Object.values(trophies).flat()
      }))
    );
  }

}




