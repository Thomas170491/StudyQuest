import { Component } from '@angular/core';
import { ChapterListComponent } from '../chapter-list/chapter-list.component';
import { SubjectListComponent } from '../subject-list/subject-list.component';
import { ExerciseComponent } from '../exercise/exercise.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonIcon, IonItem, IonList, IonSpinner, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { LifetokensComponent } from "../lifetokens/lifetokens.component";
import { Observable } from 'rxjs';


@Component({
  selector: 'app-select',
  standalone: true,
  imports: [ChapterListComponent, SubjectListComponent, ExerciseComponent, NgIf, IonContent, LifetokensComponent, AsyncPipe],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent {
  selectedChapterId! : string  ;
  selectedSubjectId! : string ;
  selectedExercisesId? : string;
  lifetokens$!: Observable<any>;



}
