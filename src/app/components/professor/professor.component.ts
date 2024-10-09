import { Component, CUSTOM_ELEMENTS_SCHEMA,  EventEmitter,  Input,  OnInit, Output } from '@angular/core';
import { ProfService } from '../../services/prof/prof.service';
import { IonAvatar, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonFooter, IonIcon, IonItem, IonLabel, IonList, IonRadio, IonRadioGroup, IonSpinner } from '@ionic/angular/standalone';
import '@lottiefiles/lottie-player';
import { ExerciseService } from '../../services/exercises/exercises.service';
import { NgIf } from '@angular/common';
const UIElements = [
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonButton,
  IonSpinner,
  IonRadioGroup,
  IonIcon,
  IonFooter,
  IonAvatar,
  IonCardSubtitle

]
  
@Component({
  selector: 'app-professor',
  standalone: true,
  imports: [...UIElements, NgIf],
  templateUrl: './professor.component.html',
  styleUrl: './professor.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProfessorComponent implements OnInit {

  @Input() isVisible : boolean  = true; 
  currentLevel : number; 
  @Input() message: string =''; 
  @Output() isVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() messageChange = new EventEmitter<string>(); 


  constructor(
    private readonly _profService: ProfService,
    private readonly _exerciseService : ExerciseService
  ) {
    this.currentLevel = this._exerciseService.getCurrentLevel()
  }
    ngOnInit(): void {
      this.showWelcomeMessage();
    }
  
    showWelcomeMessage(): void {
      this.isVisible = true;
      this.message = 'Bienvenue au niveau ' + this.currentLevel;
      this.isVisibleChange.emit(this.isVisible); 
      this.messageChange.emit(this.message);
    }
  
    hideProfessor(): void {
    this.isVisibleChange.emit(this.isVisible);
    this.isVisible = false;
    }
  
    showFeedback(isCorrect: boolean): void {
      this.isVisible = true;
      if (isCorrect) {
        this.message = this._profService.getMessageIfCorrectAnswer();
      } else {
        this.message = this._profService.getMessageIfWrongAnswer();
      }
      this.isVisibleChange.emit(this.isVisible); 
      this.messageChange.emit(this.message);
    }
  }