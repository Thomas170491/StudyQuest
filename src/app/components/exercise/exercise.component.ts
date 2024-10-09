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
import { ProfessorComponent } from "../professor/professor.component";
import { ProfService } from '../../services/prof/prof.service';

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
  imports: [ProfessorComponent,FilterbySubjectIdPipe, CommonModule, ReactiveFormsModule, FormsModule, ...UIElements, ProgressComponent, ProfessorComponent],
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss']
})

export class ExerciseComponent implements OnInit {
  @Input() subjectId!: string;
  questions$: Observable<Exercise[]> = of([]);
  answerForms: { [questionId: string]: FormGroup } = {};
  currentQuestion$!: Observable<Exercise |undefined >;
  currentChapterId$ : Observable<string>
  professorIsVisible: boolean = true;
  message: string = '';
 


  constructor(
    private readonly _exerciseService: ExerciseService,
    private readonly fb: FormBuilder,
    private readonly _chapterService : ChapterService,
    private readonly _profService: ProfService
  ) {
    this.currentChapterId$ = this._chapterService.currentChapterId$;
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
       
  onProfessorVisibilityChange(isVisible: boolean): void {
    this.professorIsVisible = isVisible;
    console.log('Professor visibility changed:', isVisible);
  }
  onProfessorMessageChange(message: string): void {
    this.message = message;
    console.log('Professor message changed:', message);
  }
  onOptionClick(option: string, questionId: string): void {
    let currentQuestion
this.questions$.pipe(map(questions => {
      currentQuestion = questions.find(question => question.id === questionId);
}))

    if (currentQuestion) {
      const isCorrect = this._exerciseService.checkAnswer(currentQuestion, option);
      this.professorIsVisible = true;
      if (isCorrect) {
        this.message = this._profService.getMessageIfCorrectAnswer();
      } else {
        this.message = this._profService.getMessageIfWrongAnswer();
      }
      console.log('Option clicked:', option, 'Question ID:', questionId, 'Is Correct:', isCorrect);
    } else {
      console.error('Current question is undefined');
    }
  }

}