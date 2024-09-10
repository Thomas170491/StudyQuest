import { Component } from '@angular/core';
import { ExerciseService } from '../../services/exercises/exercises.service';
import { Observable } from 'rxjs';
import { Exercise } from '../../interfaces';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { SubjectListComponent } from "../subject-list/subject-list.component";;
import { FilterbySubjectIdPipe } from '../../pipes/filterby-subject-id.pipe';
@Component({
  selector: 'app-exercise',
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe, SubjectListComponent,FilterbySubjectIdPipe],
  templateUrl: './exercise.component.html',
  styleUrl: './exercise.component.scss'
})
export class ExerciseComponent {
  subjectId : string ='';
  questions$ : Observable<Exercise[]>;
  constructor(
    private readonly _exerciseservice : ExerciseService,
    

  ){
    this.questions$= this._exerciseservice.getExercises()
  }
  
 
}
