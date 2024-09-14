import { Component, Input, OnInit } from '@angular/core';
import { ExerciseService } from '../../services/exercises/exercises.service';
import { Observable, of, tap } from 'rxjs';
import { Exercise } from '../../interfaces';
import { CommonModule} from '@angular/common';
import { FilterbySubjectIdPipe } from '../../pipes/filterby-subject-id.pipe';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-exercise',
  standalone: true,
  imports: [FilterbySubjectIdPipe, CommonModule, ReactiveFormsModule,FormsModule],
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss']
})

export class ExerciseComponent implements OnInit {
  @Input() subjectId!: string;
  questions$: Observable<Exercise[]> = of([]);
  answerForms: { [questionId: string]: FormGroup } = {};
  currentQuestion$!: Observable<Exercise | undefined>;

  constructor(
    private readonly _exerciseService: ExerciseService,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit() {
    this.currentQuestion$ = this._exerciseService.getCurrentExercise(this.subjectId).pipe(
      tap(currentQuestion => {
        if (currentQuestion) {
          // Initialize form based on the current question type
          if (currentQuestion.type == 'multiple_choice') {
            this.answerForms[currentQuestion.id] = this.fb.group({
              selectedOption: ['']
            });
          } else if (currentQuestion.type == 'long_answer') {
            this.answerForms[currentQuestion.id] = this.fb.group({
              answer: ['']
            });
          }
        }
        return currentQuestion
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