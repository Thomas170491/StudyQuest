import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../../../services/exercises/exercises.service';

@Component({
  selector: 'app-adddata',
  templateUrl: './adddata.component.html',
  styleUrls: ['./adddata.component.scss'],
})
export class AdddataComponent  implements OnInit {

  constructor(
    private readonly _exerciseService : ExerciseService
  ) { }
  exercises = {
    "id" : "1",
    "question": "Lequel de ces nombres n'est pas un nombre premier?",
    "options": ["A. 11", "B. 17", "C. 21", "D. 23"],
    "correctAnswer": "C",
    "feedback": "21 n'est pas un nombre premier, car il est divisible par 1, 3, 7, et 21.",
    "subjectId": "VckMwbJvRpp8zvqhbzLh",
    "level": 1,
    "type": "multiple_choice"
  }

  ngOnInit() {
    this._exerciseService.addExercise({...this.exercises})
    console.log('data added successfully !')
  }

}
