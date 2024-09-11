import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Exercise } from '../../interfaces';
import { ExerciseData } from '../../data'; // Assume this is the initial data

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private exercises: Exercise[] = ExerciseData;
  private exerciseSubject: BehaviorSubject<Exercise[]> = new BehaviorSubject<Exercise[]>(this.exercises);
  private currentIndex$ : BehaviorSubject<number>= new BehaviorSubject<number>(0);

  constructor() {}

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

  // Get exercises by Subject
  getExercisesBySubject(subjectId: string): Observable<Exercise[]> {
    return this.exerciseSubject.pipe(
      map(exercises => exercises.filter(exercise => exercise.subjectId === subjectId))
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

  // Get the current exercise based on subjectId and current index
  getCurrentExercise(subjectId: string): Observable<Observable<Exercise>> {

    return this.currentIndex$.pipe(
      map(index => this.exerciseSubject.pipe(
        map(exercises => exercises.filter(e => e.subjectId === subjectId)),
        map(filteredExercises => filteredExercises[index])
      )),
      map(exercise$ => exercise$)
    );
  }

  // Navigate to the next exercise
  goToNextExercise(): void {
    this.currentIndex$.pipe(
      map(index => this.exercises.length > index + 1 ? index + 1 : index)
    ).subscribe(nextIndex => this.currentIndex$.next(nextIndex));
  }

  // Navigate to the previous exercise
  goToPreviousExercise(): void {
    this.currentIndex$.pipe(
      map(index => index > 0 ? index - 1 : index)
    ).subscribe(previousIndex => this.currentIndex$.next(previousIndex));
  }

  // Get the current index
  getCurrentIndex(): Observable<number> {
    return this.currentIndex$.asObservable();
  }

  // Reset the index to the first exercise
  resetIndex(): void {
    this.currentIndex$.next(0);
  }
}
