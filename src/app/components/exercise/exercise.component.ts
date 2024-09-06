import { Component } from '@angular/core';
import { ExerciseService } from '../../services/exercises/exercises.service';
import { SubjectListService } from '../../services/subject-list/subject-list.service';

@Component({
  selector: 'app-exercise',
  standalone: true,
  imports: [],
  templateUrl: './exercise.component.html',
  styleUrl: './exercise.component.scss'
})
export class ExerciseComponent {
  constructor(
    private readonly _exerciseservice : ExerciseService,
    private readonly _subjectservice : SubjectListService

  ){
    

  }
}
