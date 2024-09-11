import { Component, Input } from '@angular/core';
import { ExerciseService } from '../../services/exercises/exercises.service';
import { Observable } from 'rxjs';
import { Exercise } from '../../interfaces';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FilterbySubjectIdPipe } from '../../pipes/filterby-subject-id.pipe';

@Component({
  selector: 'app-exercise',
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe, FilterbySubjectIdPipe],
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss'] // Corrected to styleUrls
})
export class ExerciseComponent {
  @Input() subjectId!: string;
  questions$: Observable<Exercise[]>;

  constructor(private readonly _exerciseService: ExerciseService) {
    // Ensure the service method is called and returns an observable
    this.questions$ = this._exerciseService.getExercises(); // Corrected method call
  }
}
