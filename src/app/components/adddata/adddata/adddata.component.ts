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
  exercises = [
    {
      "id": "1",
      "question": "Lequel de ces nombres est un nombre premier ?",
      "options": ["A. 21", "B. 37", "C. 50", "D. 60"],
      "correctAnswer": "B",
      "feedback": "37 est un nombre premier car il n'a que deux diviseurs : 1 et lui-même.",
      "subjectId": "VckMwbJvRpp8zvqhbzLh",
      "level": 1,
      "type": "multiple_choice"
    },
    {
      "id": "2",
      "question": "Lequel de ces nombres est un nombre premier ?",
      "options": ["A. 15", "B. 45", "C. 61", "D. 81"],
      "correctAnswer": "C",
      "feedback": "61 est un nombre premier car aucun nombre ne le divise à part 1 et 61.",
      "subjectId": "VckMwbJvRpp8zvqhbzLh",
      "level": 1,
      "type": "multiple_choice"
    },
    {
      "id": "3",
      "question": "Lequel de ces nombres est un nombre premier ?",
      "options": ["A. 29", "B. 49", "C. 55", "D. 77"],
      "correctAnswer": "A",
      "feedback": "29 est un nombre premier car il n'a pas de diviseurs autres que 1 et 29.",
      "subjectId": "VckMwbJvRpp8zvqhbzLh",
      "level": 1,
      "type": "multiple_choice"
    },
    {
      "id": "4",
      "question": "Lequel de ces nombres est un nombre premier ?",
      "options": ["A. 44", "B. 51", "C. 53", "D. 63"],
      "correctAnswer": "C",
      "feedback": "53 est un nombre premier car il n'a que deux diviseurs : 1 et lui-même.",
      "subjectId": "VckMwbJvRpp8zvqhbzLh",
      "level": 1,
      "type": "multiple_choice"
    },
    {
      "id": "5",
      "question": "Lequel de ces nombres à 3 chiffres est un nombre premier ?",
      "options": ["A. 101", "B. 150", "C. 200", "D. 250"],
      "correctAnswer": "A",
      "feedback": "101 est un nombre premier car il ne se divise que par 1 et 101.",
      "subjectId": "VckMwbJvRpp8zvqhbzLh",
      "level": 2,
      "type": "multiple_choice"
    },
    {
      "id": "6",
      "question": "Lequel de ces nombres à 3 chiffres est un nombre premier ?",
      "options": ["A. 102", "B. 110", "C. 137", "D. 140"],
      "correctAnswer": "C",
      "feedback": "137 est un nombre premier car il n'a pas de diviseurs autres que 1 et 137.",
      "subjectId": "VckMwbJvRpp8zvqhbzLh",
      "level": 2,
      "type": "multiple_choice"
    },
    {
      "id": "7",
      "question": "Lequel de ces nombres à 3 chiffres est un nombre premier ?",
      "options": ["A. 201", "B. 209", "C. 223", "D. 300"],
      "correctAnswer": "C",
      "feedback": "223 est un nombre premier car il ne se divise que par 1 et 223.",
      "subjectId": "VckMwbJvRpp8zvqhbzLh",
      "level": 2,
      "type": "multiple_choice"
    },
    {
      "id": "8",
      "question": "Lequel de ces nombres à 3 chiffres est un nombre premier ?",
      "options": ["A. 310", "B. 313", "C. 320", "D. 400"],
      "correctAnswer": "B",
      "feedback": "313 est un nombre premier car aucun autre nombre ne le divise.",
      "subjectId": "VckMwbJvRpp8zvqhbzLh",
      "level": 2,
      "type": "multiple_choice"
    },
    {
      "id": "9",
      "question": "Quelle est la décomposition en facteurs premiers de 28 ?",
      "options": ["A. 2 × 2 × 7", "B. 3 × 3 × 3", "C. 2 × 5 × 5", "D. 4 × 7"],
      "correctAnswer": "A",
      "feedback": "28 se décompose en 2 × 2 × 7 car c'est le produit de ses facteurs premiers.",
      "subjectId": "VckMwbJvRpp8zvqhbzLh",
      "level": 3,
      "type": "multiple_choice"
    },
    {
      "id": "10",
      "question": "Quelle est la décomposition en facteurs premiers de 45 ?",
      "options": ["A. 3 × 3 × 5", "B. 2 × 5 × 5", "C. 5 × 5", "D. 2 × 3 × 3"],
      "correctAnswer": "A",
      "feedback": "45 se décompose en 3 × 3 × 5 car ces nombres sont ses seuls facteurs premiers.",
      "subjectId": "VckMwbJvRpp8zvqhbzLh",
      "level": 3,
      "type": "multiple_choice"
    },
    {
      "id": "11",
      "question": "Quelle est la décomposition en facteurs premiers de 56 ?",
      "options": ["A. 2 × 2 × 2 × 7", "B. 3 × 3 × 7", "C. 5 × 2 × 7", "D. 2 × 7 × 7"],
      "correctAnswer": "A",
      "feedback": "56 se décompose en 2 × 2 × 2 × 7, tous des facteurs premiers.",
      "subjectId": "VckMwbJvRpp8zvqhbzLh",
      "level": 3,
      "type": "multiple_choice"
    },
    {
      "id": "12",
      "question": "Quelle est la décomposition en facteurs premiers de 99 ?",
      "options": ["A. 3 × 3 × 11", "B. 2 × 5 × 11", "C. 3 × 7", "D. 11 × 5"],
      "correctAnswer": "A",
      "feedback": "99 se décompose en 3 × 3 × 11 car ce sont ses facteurs premiers.",
      "subjectId": "VckMwbJvRpp8zvqhbzLh",
      "level": 3,
      "type": "multiple_choice"
    },
    {
      "id": "13",
      "question": "Quelle est la décomposition en facteurs premiers de 130 ?",
      "options": ["A. 2 × 5 × 13", "B. 5 × 13", "C. 2 × 10 × 13", "D. 2 × 5 × 11"],
      "correctAnswer": "A",
      "feedback": "130 se décompose en 2 × 5 × 13, les seuls facteurs premiers.",
      "subjectId": "VckMwbJvRpp8zvqhbzLh",
      "level": 4,
      "type": "multiple_choice"
    },
    {
      "id": "14",
      "question": "Quelle est la décomposition en facteurs premiers de 231 ?",
      "options": ["A. 3 × 7 × 11", "B. 2 × 11 × 13", "C. 3 × 11", "D. 2 × 7 × 11"],
      "correctAnswer": "A",
      "feedback": "231 se décompose en 3 × 7 × 11 car ce sont ses facteurs premiers.",
      "subjectId": "VckMwbJvRpp8zvqhbzLh",
      "level": 4,
      "type": "multiple_choice"
    },
    {
      "id": "15",
      "question": "Quelle est la décomposition en facteurs premiers de 315 ?",
      "options": ["A. 3 × 3 × 5 × 7", "B. 3 × 5 × 7", "C. 5 × 7 × 9", "D. 5 × 5 × 7"],
      "correctAnswer": "A",
      "feedback": "315 se décompose en 3 × 3 × 5 × 7, tous des facteurs premiers.",
      "subjectId": "VckMwbJvRpp8zvqhbzLh",
      "level": 4,
      "type": "multiple_choice"
    },
    {
      "id": "16",
      "question": "Quel est le plus grand nombre premier inférieur à 50 ?",
      "options": ["A. 47", "B. 43", "C. 41", "D. 37"],
      "correctAnswer": "A",
      "feedback": "47 est le plus grand nombre premier inférieur à 50.",
      "subjectId": "VckMwbJvRpp8zvqhbzLh",
      "level": 5,
      "type": "multiple_choice"
    },
    {
      "id": "17",
      "question": "Quel est le plus grand nombre premier inférieur à 100 ?",
      "options": ["A. 97", "B. 89", "C. 83", "D. 79"],
      "correctAnswer": "A",
      "feedback": "97 est le plus grand nombre premier inférieur à 100.",
      "subjectId": "VckMwbJvRpp8zvqhbzLh",
      "level": 5,
      "type": "multiple_choice"
    },
    {
      "id": "18",
      "question": "Quel est le plus grand nombre premier inférieur à 150 ?",
      "options": ["A. 149", "B. 137", "C. 131", "D. 127"],
      "correctAnswer": "A",
      "feedback": "149 est le plus grand nombre premier inférieur à 150.",
      "subjectId": "VckMwbJvRpp8zvqhbzLh",
      "level": 5,
      "type": "multiple_choice"
    },
    {
      "id": "19",
      "question": "Quel est le plus grand nombre premier inférieur à 200 ?",
      "options": ["A. 199", "B. 197", "C. 191", "D. 181"],
      "correctAnswer": "A",
      "feedback": "199 est le plus grand nombre premier inférieur à 200.",
      "subjectId": "VckMwbJvRpp8zvqhbzLh",
      "level": 5,
      "type": "multiple_choice"
    },
    {
      "id": "20",
      "question": "Quel est le plus grand nombre premier inférieur à 300 ?",
      "options": ["A. 293", "B. 281", "C. 277", "D. 269"],
      "correctAnswer": "A",
      "feedback": "293 est le plus grand nombre premier inférieur à 300.",
      "subjectId": "VckMwbJvRpp8zvqhbzLh",
      "level": 5,
      "type": "multiple_choice"
    }
  ]

  ngOnInit() {
    this.exercises.forEach(exercise => {
      this._exerciseService.addExercise(exercise);
    });
    console.log('data added successfully !')
  }

}
