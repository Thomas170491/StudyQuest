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


  // A voir avec Nico
//   initSwipeGesture() {
//     const gesture = this._gestureController.create({
//       el: document.querySelector('app-professor') as HTMLElement,
//       gestureName: 'swipe',
//       onMove: ev  => {
//         const deltaX = ev.deltaX;
//         const deltaY = ev.deltaY; 

//         // Use deltaX and deltaY to determine the swipe direction
//         if (Math.abs(deltaX) > Math.abs(deltaY)) {
//           if (deltaX > 0) {
//             console.log('Swipe right');
//             this.toggleVisibility();
//           } else {
//             console.log('Swipe left');
//           }
//         }else {
//           if (deltaY > 0) {
//             console.log('Swipe down');
//           } else {
//             console.log('Swipe up');
//           }
//       }
//     }
//   }
// );
//     gesture.enable()
//   }


}
