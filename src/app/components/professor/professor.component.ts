import { Component, CUSTOM_ELEMENTS_SCHEMA,  OnInit } from '@angular/core';
import { ProfService } from '../../services/prof/prof.service';
import { IonAvatar, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonFooter, IonIcon, IonItem, IonLabel, IonList, IonRadio, IonRadioGroup, IonSpinner } from '@ionic/angular/standalone';
import '@lottiefiles/lottie-player';
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
  imports: [...UIElements],
  templateUrl: './professor.component.html',
  styleUrl: './professor.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProfessorComponent implements OnInit {

  isVisable : boolean  = true;
  message! : string ;



  constructor(
    private readonly _profService: ProfService
  ) {}
  ngOnInit(): void {
    this._profService.toggleVisibility(this.isVisable);

  }
  


}
