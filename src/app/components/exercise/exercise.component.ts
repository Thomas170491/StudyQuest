import { Component, Input, OnInit } from '@angular/core';
import { ExerciseService } from '../../services/exercises/exercises.service';
import { firstValueFrom, map, Observable, of, switchMap, tap } from 'rxjs';
import { Exercise } from '../../interfaces';
import { CommonModule} from '@angular/common';
import { FilterbySubjectIdPipe } from '../../pipes/filterby-subject-id.pipe';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonItem, IonLabel, IonList, IonRadio, IonRadioGroup, IonSpinner } from '@ionic/angular/standalone';
import { ProgressComponent } from '../progress/progress.component';
import { ChapterService } from '../../services/chapters/chapters.service';

const UIElements = [ 
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonList,
  IonItem,
  IonLabel,
  IonRadio,
  IonButton,
  IonSpinner,
  IonRadioGroup,




]

@Component({
  selector: 'app-exercise',
  standalone: true,
  imports: [FilterbySubjectIdPipe, CommonModule, ReactiveFormsModule,FormsModule, ...UIElements,ProgressComponent],
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss']
})

export class ExerciseComponent implements OnInit {
  @Input() subjectId!: string;
  questions$: Observable<Exercise[]> = of([]);
  answerForms: { [questionId: string]: FormGroup } = {};
  currentQuestion$!: Observable<Exercise |undefined >;
  currentChapterId$ : Observable<string>
 


  constructor(
    private readonly _exerciseService: ExerciseService,
    private readonly fb: FormBuilder,
    private readonly _chapterService : ChapterService
  ) {
    this.currentChapterId$ = this._chapterService.currentChapterId$;
  }
  exercises = {
    "id" : "1",
    "question": "Lequel de ces nombres n'est pas un nombre premier?",
    "options": ["A. 11", "B. 17", "C. 21", "D. 23"],
    "correctAnswer": "C",
    "feedback": "21 n'est pas un nombre premier, car il est divisible par 1, 3, 7, et 21.",
    "subjectId": "VckMwbJvRpp8zvqhbzLh",
    "level": 1,
    "type": "multiple_choice"
  }

 ngOnInit() {          
    this.currentQuestion$ = this._exerciseService.getExercises().pipe(
      switchMap(exercises => {
        if(exercises.length === 0) {
          return [];
        }
       return this._exerciseService.getCurrentExercise(this.subjectId).pipe(
          map(currentQuestion => {
            if (currentQuestion) {
              // Initialize form based on the current question type
              if (currentQuestion.type === 'multiple_choice') {
                this.answerForms[currentQuestion.id] = this.fb.group({
                  selectedOption: ['']
                });
              } else {
                this.answerForms[currentQuestion.id] = this.fb.group({
                  answer: ['']
                });
              }
            }
            return currentQuestion;
          })
        );
        
      })
    )
  }


  onPrevious() {
    this._exerciseService.goToPreviousExercise();
  }

  async submitAnswer(questionId: string) {
    const form = this.answerForms[questionId];
    if (!form) return;

    const answer = form.get('selectedOption')?.value || form.get('answer')?.value;
    const extractedAnswer = answer.split('.')[0].trim();
    console.log(`Answer for question ${questionId}: ${extractedAnswer}`);
    await firstValueFrom(this._exerciseService.saveAnswer(questionId, extractedAnswer));
    
  }
       
  
 
  isFirstQuestion(): boolean {
    // Implement logic to check if the current question is the first one
    return false; // Placeholder
  }

  isLastQuestion(): boolean {
    // Implement logic to check if the current question is the last one
    return false; // Placeholder
  }
}