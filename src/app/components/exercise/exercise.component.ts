import { Component, Input, OnInit } from '@angular/core';
import { ExerciseService } from '../../services/exercises/exercises.service';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { Exercise } from '../../interfaces';
import { CommonModule} from '@angular/common';
import { FilterbySubjectIdPipe } from '../../pipes/filterby-subject-id.pipe';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonItem, IonLabel, IonList, IonRadio, IonRadioGroup, IonSpinner } from '@ionic/angular/standalone';
import { ProgressComponent } from '../progress/progress.component';

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
  nextExercise$!: Observable<number>;

  constructor(
    private readonly _exerciseService: ExerciseService,
    private readonly fb: FormBuilder
  ) {}

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
  onNext() {
    this.nextExercise$ = this._exerciseService.goToNextExercise();
  }

  onPrevious() {
    this._exerciseService.goToPreviousExercise();
  }

  submitAnswer(questionId: string) {
    const form = this.answerForms[questionId];
    if (!form) return;

    const answer = form.get('selectedOption')?.value || form.get('answer')?.value;
    const extractedAnswer = answer.split('.')[0].trim();
    console.log(`Answer for question ${questionId}: ${extractedAnswer}`);
    this._exerciseService.saveAnswer(questionId, extractedAnswer).subscribe({
      next: () => {
        console.log(`Answer for question ${questionId} saved successfully.`);
        this.onNext(); // Move to the next question after successful submission
      },
      error: (err) => {
        console.error(`Failed to save answer for question ${questionId}:`, err);
      }
    });
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