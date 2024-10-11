import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, lastValueFrom, map, Observable, of } from 'rxjs';
import { Reward, Progress } from '../../interfaces' 
import { UserService } from '../users/user-service.service';

@Injectable({
  providedIn: 'root',
})
export class RewardService {
  private progress: Progress[] = [];


  // BehaviorSubject pour suivre les changements en temps réel
  private tokensSubject = new BehaviorSubject<{ [username: string]: number }>({});
  private badgesSubject = new BehaviorSubject<{ [username: string]: Reward[] }>({});
  private trophiesSubject = new BehaviorSubject<{ [username: string]: Reward[] }>({});

  constructor(
    private readonly _userService: UserService,
  ) {}

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
    const userObservable = this._userService.getCurrentUser().pipe(
      map(userData => {
        if (userData) {
          const updatedTokens = tokens + value;
          this.tokensSubject.next({ ...this.tokensSubject.value, [tokens]: updatedTokens });
          const updatedUserData = { ...userData, tokens: updatedTokens };
          this._userService.updateUser(updatedUserData, userData.id);
        }
      })
    );
  

  }

  // Méthodes pour gérer les badges


  addBadges(username: string, badge: Reward) {
    this.badgesSubject.next({ ...this.badgesSubject.value, [username]: [badge] });
    this._userService.getCurrentUser().pipe(map(userData => {
      if (userData) {
        const updatedBadges = [badge];
        const updatedUserData = { ...userData, badges: updatedBadges };
        this._userService.updateUser(updatedUserData, userData.id);
      }
    }))

  }
  addTrophy(username: string, trophy: Reward)  {
    const trophies = this.trophiesSubject.value[username] || [];
    trophies.push(trophy);
    this.trophiesSubject.next({ ...this.trophiesSubject.value, [username]: trophies });
    this._userService.getCurrentUser().pipe(map(userData => {
      if (userData) {
        const updatedTrophies = trophies;
        const updatedUserData = { ...userData, trophies: updatedTrophies };
        this._userService.updateUser(updatedUserData, userData.id);
      }
    }));
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




