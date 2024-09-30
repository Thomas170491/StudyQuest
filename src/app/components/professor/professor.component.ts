import { Component, CUSTOM_ELEMENTS_SCHEMA,  OnInit } from '@angular/core';
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

  isVisible : boolean  = true;
  message! : string ;
  currentLevel : number = 0; 
 



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
    }
  
    hideProfessor(): void {
      this.isVisible = false;
    }
  
    showFeedback(isCorrect: boolean): void {
      this.isVisible = true;
      if (isCorrect) {
        this.message = this._profService.getMessageIfCorrectAnswer();
      } else {
        this.message = this._profService.getMessageIfWrongAnswer();
      }
    }
  }