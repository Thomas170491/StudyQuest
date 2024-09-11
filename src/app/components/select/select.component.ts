import { Component } from '@angular/core';
import { ChapterListComponent } from '../chapter-list/chapter-list.component';
import { SubjectListComponent } from '../subject-list/subject-list.component';
import { ExerciseComponent } from '../exercise/exercise.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [ChapterListComponent,SubjectListComponent,ExerciseComponent, NgIf],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent {
  selectedChapterId! : string  ;
  selectedSubjectId! : string ;
  selectedExercisesId? : string;



}
