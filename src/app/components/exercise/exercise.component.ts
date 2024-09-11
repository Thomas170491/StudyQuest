import { Component, Input, OnInit } from '@angular/core';
import { ExerciseService } from '../../services/exercises/exercises.service';
import { Observable, of, tap } from 'rxjs';
import { Exercise } from '../../interfaces';
import { AsyncPipe, CommonModule, NgFor, NgIf } from '@angular/common';
import { FilterbySubjectIdPipe } from '../../pipes/filterby-subject-id.pipe';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';



@Component({
  selector: 'app-exercise',
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe, FilterbySubjectIdPipe, CommonModule,ReactiveFormsModule],
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss']
})


export class ExerciseComponent implements OnInit {
  @Input() subjectId!: string;
  questions$: Observable<Exercise[]> = of([]);
  answerForms: { [questionId: string]: FormGroup } = {};
  currentQuestion$: Observable<Exercise | undefined> = of(undefined);

  constructor(
    private readonly _exerciseService: ExerciseService,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit() {
    this.questions$ = this._exerciseService.getExercisesBySubject(this.subjectId).pipe(
      tap(questions => {
        questions.forEach(question => {
          if (question.type === 'multiple-choice') {
            this.answerForms[question.id] = this.fb.group({
              selectedOption: ['']
            });
          } else if (question.type === 'long-answer') {
            this.answerForms[question.id] = this.fb.group({
              answer: ['']
            });
          }
        });

        this.currentQuestion$ = this._exerciseService.getCurrentExercise(this.subjectId);
      })
    );
  }

  onNext() {
    this._exerciseService.goToNextExercise();
  }

  onPrevious() {
    this._exerciseService.goToPreviousExercise();
  }

  submitAnswer(questionId: string) {
    const form = this.answerForms[questionId];
    if (!form) return;

    const answer = form.get('selectedOption')?.value || form.get('answer')?.value;
    console.log(`Answer for question ${questionId}: ${answer}`);
    // Implement saving logic if needed
    // this._exerciseService.saveAnswer(questionId, answer).pipe();
    this.onNext(); // Move to the next question after submission
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
