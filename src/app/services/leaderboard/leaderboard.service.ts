import { Injectable } from '@angular/core';
import { RewardService } from '../rewarrds/rewards.service';
import { combineLatest, map, Observable, switchMap } from 'rxjs';
import { LeaderboardEntry } from '../../interfaces';
import { UserService } from '../users/user-service.service';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {

  constructor(
    private readonly _rewardsService: RewardService,
    private readonly _userService: UserService
  ) { }

  getLeaderboard(): Observable<LeaderboardEntry[]> {
    const users = this._userService.getUsers(); 
    const leaderboardObservables = users.pipe(
      map(usersArray => usersArray.map(user => 
        combineLatest([
          this._rewardsService.getTokens(user.username),
          this._rewardsService.getBadges(user.username),
          this._rewardsService.getTrophies(user.username)
        ]).pipe(
          map(([tokens, badges, trophies]) => ({
            username: user.username,
            badges: badges.length,
            tokens,
            trophies: trophies.length
          }))
        )
      ))
    );
  
    return leaderboardObservables.pipe(
      switchMap(observables => combineLatest(observables))
    );
  }

}
