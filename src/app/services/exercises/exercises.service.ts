import { Injectable } from '@angular/core';
import { Exercise } from '../../interfaces';
import { Observable, BehaviorSubject, map, first } from 'rxjs';
import { ExerciseData } from '../../data'; // Assume this is the initial data

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  private exercises: Exercise[] = ExerciseData;
  private exerciseSubject: BehaviorSubject<Exercise[]> = new BehaviorSubject<Exercise[]>(this.exercises);

  constructor() { }

  // Get all exercises
  getExercises(): Observable<Exercise[]> {
    return this.exerciseSubject.asObservable();
  }

  // Get a single exercise by ID
  getExerciseById(id: string): Observable<Exercise | undefined> {
    return this.exerciseSubject.pipe(
      map(exercises => exercises.find(exercise => exercise.id === id))
    );
  }

  // Get exercises by level
  getExercisesByLevel(level: number): Observable<Exercise[]> {
    return this.exerciseSubject.pipe(
      map(exercises => exercises.filter(exercise => exercise.level === level))
    );
  }

  // Add a new exercise
  addExercise(exercise: Exercise): void {
    this.exercises.push(exercise);
    this.exerciseSubject.next(this.exercises);
  }

  // Update an exercise
  updateExercise(updatedExercise: Exercise): void {
    const index = this.exercises.findIndex(exercise => exercise.id === updatedExercise.id);
    if (index !== -1) {
      this.exercises[index] = updatedExercise;
      this.exerciseSubject.next(this.exercises);
    }
  }

  // Delete an exercise
  deleteExercise(id: string): void {
    this.exercises = this.exercises.filter(exercise => exercise.id !== id);
    this.exerciseSubject.next(this.exercises);
  }


}


