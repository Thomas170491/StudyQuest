import { Component, OnInit } from '@angular/core';
import { ChapterService } from '../../services/chapters.service';
import { UserService } from '../../services/user-service.service';
import { Chapter, User } from '../../interfaces';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-progress',
  standalone: true,
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {

  userId: string;
  chapterId: string;
  completedExercises: number = 0;
  totalExercises: number = 0;
  progressPercentage: number = 0;

  user$: Observable<User | undefined>;
  chapter$: Observable<Chapter | undefined>;

  constructor(
    private readonly _chapterService: ChapterService,
    private readonly _userService: UserService
  ) {
    // Assume userId and chapterId are dynamically set; using default values here.
    this.userId = '1'; // This should be dynamically fetched
    this.chapterId = '1'; // This should be dynamically fetched
  }

  ngOnInit(): void {
    // Fetch the current user and chapter details
    this.user$ = of(this._userService.getUserById(this.userId));
    this.chapter$ = of(this._chapterService.getChapterById(this.chapterId));

    // Subscribe to data and calculate progress
    this.user$.subscribe(user => {
      if (user) {
        // Fetch total exercises from the chapter service
        this.chapter$.subscribe(chapter => {
          if (chapter) {
            this.totalExercises = chapter.totalExercises; // assuming totalExercises is a property in Chapter
            this.completedExercises = user.completedExercises; // assuming completedExercises is a property in User

            // Calculate progress percentage
            this.progressPercentage = this.calculateProgress();
          }
        });
      }
    });
  }

  private calculateProgress(): number {
    return this.totalExercises > 0 ? (this.completedExercises / this.totalExercises) * 100 : 0;
  }
}
