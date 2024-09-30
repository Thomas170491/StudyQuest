import { Component, OnInit, Input } from '@angular/core';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Chapter, User } from '../../interfaces';
import { ChapterService } from '../../services/chapters/chapters.service';
import { UserService } from '../../services/users/user-service.service';
import { AsyncPipe, NgIf } from '@angular/common';


@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
  standalone: true,
  imports: [AsyncPipe, NgIf]
})
export class ProgressComponent implements OnInit { 
  @Input() userId!: string;
  @Input() chapterId!: string;
  totalExercises: number = 0;

  user$!: Observable<User | undefined>;
  chapter$!: Observable<Chapter | undefined>;
  completedExercises$!: Observable<number>;
  progressPercentage$!: Observable<number>;

  constructor(
    private readonly _chapterService: ChapterService,
    private readonly _userService: UserService
  ) { }

  ngOnInit(): void {
    this.user$ = this._userService.getUserById(this.userId);
    this.chapter$ = this._chapterService.getChapterById(this.chapterId).pipe(
      tap(chapter => {
        this.totalExercises = chapter?.totalExercises || 0;
      })
    );

    this.completedExercises$ = this.user$.pipe(
      map(user => {
        const completedExercises = user?.completedExercises;
        return Array.isArray(completedExercises) ? completedExercises.length : 0;
      })
    );

    this.progressPercentage$ = this.completedExercises$.pipe(
      map(completedExercises => {
        return this.totalExercises > 0 ? (completedExercises / this.totalExercises) * 100 : 0;
      })
    );
  }
}