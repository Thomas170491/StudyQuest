import { Component,ViewChild } from '@angular/core';
import { ChapterListComponent } from '../chapter-list/chapter-list.component';
import { SubjectListComponent } from '../subject-list/subject-list.component';
import { ExerciseComponent } from '../exercise/exercise.component';
import { AsyncPipe, NgIf } from '@angular/common';
import {  AnimationController, IonContent, IonHeader, IonModal, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { LifetokensComponent } from "../lifetokens/lifetokens.component";
import { Observable } from 'rxjs';

const UIElements = [
  IonContent, 
  IonHeader,
  IonTitle, 
  IonToolbar,
  IonModal,
  

  

];
@Component({
  selector: 'app-select',
  standalone: true,
  imports: [ChapterListComponent, SubjectListComponent, ExerciseComponent, LifetokensComponent, NgIf, AsyncPipe, ...UIElements],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent {
  @ViewChild('modal', { static: true }) modal!: IonModal;

  constructor(
    private animationCtrl: AnimationController
  ){}

  selectedChapterId! : string  ;
  selectedSubjectId! : string ;
  selectedExercisesId? : string;
  lifetokens$!: Observable<any>;

  



}
