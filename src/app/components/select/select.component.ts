import { Component, ViewChild } from '@angular/core';
import { ChapterListComponent } from '../chapter-list/chapter-list.component';
import { SubjectListComponent } from '../subject-list/subject-list.component';
import { ExerciseComponent } from '../exercise/exercise.component';
import { AsyncPipe, NgIf, NgTemplateOutlet } from '@angular/common';
import {  IonButton, IonButtons, IonContent, IonHeader, IonModal, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { LifetokensComponent } from "../lifetokens/lifetokens.component";
import { Observable } from 'rxjs';
import { ChapterService } from '../../services/chapters/chapters.service';
import { Router } from '@angular/router';


const UIElements = [
  IonContent, 
  IonHeader,
  IonTitle, 
  IonToolbar,
  IonModal,
  IonButtons,
  IonButton,
];
@Component({
  selector: 'app-select',
  standalone: true,
  imports: [ChapterListComponent, SubjectListComponent, ExerciseComponent, LifetokensComponent, NgIf, AsyncPipe, NgTemplateOutlet, ...UIElements],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',

})

export class SelectComponent {
  
  
  selectedChapterId! : string  ;
  selectedSubjectId! : string ;
  selectedExercisesId? : string;
  lifetokens$!: Observable<any>;
  
  @ViewChild('modal') modal!: IonModal;
  @ViewChild('subjectModal') subjectModal!: IonModal;

  constructor(
    private readonly _chapterService : ChapterService,
    private readonly router : Router, 
      
    
  ) {}

  presentModal(chapterId : string) {
    this.selectedChapterId= chapterId
    this._chapterService.setCurrentChapterId(chapterId)
    this.modal.present();
  }

  presentSubjectModal(subjectId : string) {
    this.selectedSubjectId= subjectId
    this.subjectModal.present();
  }

  closeModal() {
    this.modal.dismiss();
  }
  closeSubjectModal() {
    this.subjectModal.dismiss();
  }  
  goBack(){
    this.router.navigate(['/profile']);
  }

}