import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import { Exercise } from '../../interfaces';
import { FirestoreService } from '../firestore/firestore.service'; // Assuming you have a FirestoreService defined

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private exercises: Exercise[] = [];
  private exerciseSubject: BehaviorSubject<Exercise[]> = new BehaviorSubject<Exercise[]>(this.exercises);
  private currentIndex$ = new BehaviorSubject<number>(0);

  constructor(private firestoreService: FirestoreService) {
    this.loadExercises();
  }

  // Load exercises from Firestore
  private loadExercises(): void {
    this.firestoreService.loadData('exercises').pipe(
      tap((data: Exercise[]) => {
        this.exercises = data;
        this.exerciseSubject.next(this.exercises);
      })
    )
  }

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
  async addExercise(exercise: Exercise): Promise<void> {
    try {
      await this.firestoreService.addData('exercises', exercise);
      this.exercises.push(exercise);
      this.exerciseSubject.next(this.exercises);
    } catch (error) {
      console.error('Error adding exercise:', error);
    }
  }

  // Update an exercise
  async updateExercise(id: string, updatedExercise: Exercise): Promise<void> {
    try {
      await this.firestoreService.updateData('exercises', id, updatedExercise);
      const index = this.exercises.findIndex(exercise => exercise.id === id);
      if (index !== -1) {
        this.exercises[index] = updatedExercise;
        this.exerciseSubject.next(this.exercises);
      }
    } catch (error) {
      console.error('Error updating exercise:', error);
    }
  }

  // Delete an exercise
  async deleteExercise(id: string): Promise<void> {
    try {
      await this.firestoreService.deleteData('exercises', id);
      this.exercises = this.exercises.filter(exercise => exercise.id !== id);
      this.exerciseSubject.next(this.exercises);
    } catch (error) {
      console.error('Error deleting exercise:', error);
    }
  }
}