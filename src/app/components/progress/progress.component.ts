import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Chapter, User } from '../../interfaces';
import { ChapterService } from '../../services/chapters/chapters.service';
import { UserService } from '../../services/users/user-service.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonProgressBar } from '@ionic/angular/standalone';



const UIElements=[
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonProgressBar,
  
]

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
  standalone: true,
  imports: [AsyncPipe, NgIf,...UIElements]
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
  ) { 

      };
  

  ngOnInit(): void {
    this.user$ = this._userService.getCurrentUser().pipe(
      map(user => {
        if (user?.id) {
          this.userId = user.id;
        }
        return user;}))
      
    
    this.chapter$ = this._chapterService.getChapterById(this.chapterId).pipe(
      map(chapter => {
        console.log('Chapter:', chapter)
        this.totalExercises = chapter?.totalExercises || 0;
        console.log('Total exercises:', this.totalExercises);
        return chapter;
      })
    );

    this.completedExercises$ = this.user$.pipe(
      map(user => {
     
        const completedExercises = user?.completedExercises;
        console.log('Completed Exercises:', completedExercises)
        return Array.isArray(completedExercises) ? completedExercises.length : 0;
      })
    );


    this.progressPercentage$ = this.completedExercises$.pipe(
      map(completedExercises => {
        console.log('Completed Exercises Count:', completedExercises);
        const progress = this.totalExercises > 0 ? (completedExercises / this.totalExercises) * 100 : 0;
        console.log('Progress Percentage:', progress);
        return progress;
      }),
      tap(console.log)
    );
  }
  }
