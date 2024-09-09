import { Component } from '@angular/core';
import { ExerciseService } from '../../services/exercises/exercises.service';
import { SubjectListService } from '../../services/subject-list/subject-list.service';
import { ExerciseData } from '../../data';
import { Observable } from 'rxjs';
import { Exercise } from '../../interfaces';

@Component({
  selector: 'app-exercise',
  standalone: true,
  imports: [],
  templateUrl: './exercise.component.html',
  styleUrl: './exercise.component.scss'
})
export class ExerciseComponent {
  subjectId : string ='';
  question$ : Observable<Exercise[]>;
  constructor(
    private readonly _exerciseservice : ExerciseService,
    private readonly _subjectservice : SubjectListService

  ){
    this.question$= this._exerciseservice.getExerciseBySubject(this.subjectId)
  }
  
 
}
