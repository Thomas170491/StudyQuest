import { Injectable } from '@angular/core';
import { ExerciseService } from '../exercises/exercises.service';
// import { GestureController } from '@ionic/angular/standalone';


@Injectable({
  providedIn: 'root'
})
export class ProfService {

  constructor(
    private readonly _exerciseService: ExerciseService,
    // private readonly _gestureController: GestureController
    
  ) {}


  getMessageIfCorrectAnswer(): string {
    return this._exerciseService.getExerciseFeedback();
  }

  getMessageIfWrongAnswer(): string {
    return 'Désolé, ce n\'est pas la bonne réponse! Essaye encore!';
  }





}
