import { Component, OnInit } from '@angular/core';
import { ChapterService } from '../../services/chapters/chapters.service';
import { UserService } from '../../services/users/user-service.service';
import { Chapter, User } from '../../interfaces';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-progress',
  standalone: true,
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
  imports: [AsyncPipe, NgIf]
})
export class ProgressComponent  {

  userId: string;
  chapterId: string;
  completedExercises: Observable<number >;
  totalExercises: number = 0;
  progressPercentage: Observable<number>;

  user$: Observable<User | undefined>;
  chapter$: Observable<Chapter | undefined>;

  constructor(
    private readonly _chapterService: ChapterService,
    private readonly _userService: UserService
  ) {
    // Assume userId and chapterId are dynamically set; using default values here.
    this.userId = '1'; // This should be dynamically fetched
    this.chapterId = '1'; // This should be dynamically fetched
    // Fetch the current user and chapter details
    this.user$ = this._userService.getUserById(this.userId);
    this.chapter$ = this._chapterService.getChapterById(this.chapterId).pipe(
      tap(chapter => {
        this.totalExercises = chapter?.totalExercises || 0;
      })
    ); // convert this to an obeservable
    this.completedExercises = this.user$.pipe(
      map(user => {
        const completedExercises = user?.completedExercises;
        return Array.isArray(completedExercises) ? completedExercises.length : 0;
      })
    ); // assuming completedExercises is a property in User
    this.progressPercentage = this.completedExercises.pipe(
      map(completedExercises => {
        return this.totalExercises > 0 ? (completedExercises / this.totalExercises) * 100 : 0;
      })
    );
  }


}
