import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, from, Observable, of } from 'rxjs';
import { map, tap, switchMap, catchError } from 'rxjs/operators';
import { Exercise } from '../../interfaces';
import { FirestoreService } from '../firestore/firestore.service'; 
import { LifetokenserviceService } from '../lifetokenservice/lifetokenservice.service';
@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
 
  private exerciseSubject: BehaviorSubject<Exercise[]> = new BehaviorSubject<Exercise[]>([]);
  private currentLevel$ = new BehaviorSubject<number>(1);
  private currentIndex$ = new BehaviorSubject<number>(0);
  currentExercise$ = this.currentLevel$.pipe(
    switchMap(level => this.exerciseSubject.pipe(
      map(exercises => exercises.filter(exercise => exercise.level === level)),
      map(filteredExercises => this.shuffleArray(filteredExercises)),
      map(shuffledExercises => shuffledExercises[this.currentIndex$.value]) // Select the first exercise from the shuffled array
    ))
  );

  constructor(
    private firestoreService: FirestoreService,
    private readonly lifetokenserviceService: LifetokenserviceService

  ) {
    this.loadExercises();
  }

  // Load exercises from Firestore
   async loadExercises(): Promise<void> {
    try {
      const data = await firstValueFrom(this.firestoreService.loadData('Exercises'));
      this.exerciseSubject.next(data);
      //console.log('Exercises loaded:', data);
      console.log('Exercises loaded:', this.exerciseSubject.value);
    } catch (error) {
      console.error('Error loading exercises:', error);
    }
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
    this.currentLevel$.next(level);
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
  async addExercise(exercise: Exercise[]): Promise<void> {
    try {
      await this.firestoreService.addData('Exercises', exercise);
      this.exerciseSubject.next(exercise);
    } catch (error) {
      console.error('Error adding exercise:', error);
    }
  }

  // Update an exercise
 updateExercise(id: string, exercise: Exercise): Observable<Exercise[]> { 
    return from(this.firestoreService.updateData('Exercises', id, exercise)).pipe( 
      switchMap(() => { 
        const exercises = this.exerciseSubject.value; 
        const index = exercises.findIndex(e => e.id === id); 
        exercises[index] = exercise; 
        this.exerciseSubject.next(exercises); 
        return this.exerciseSubject; 
      }) 
    );
 }
 getCurrentExercise(subjectId: string): Observable<Exercise | undefined> {
  const filteredExercise = this.exerciseSubject.value.findIndex(exercise => exercise.subjectId === subjectId);
  console.log('Filtered Exercises:', filteredExercise);
  if (filteredExercise <= -1) {
    console.error('No exercises found for the given subjectId and level.');
    throw new Error('No exercises found for the given subjectId and level.');
  }
  this.currentIndex$.next(filteredExercise);
  return this.currentExercise$;
}

  // Delete an exercise
  async deleteExercise(id: string): Promise<void> {
    try {
      await this.firestoreService.deleteData('Exercises', id);
      const exercises = this.exerciseSubject.value.filter(exercise => exercise.id === id);
      this.exerciseSubject.next(exercises);
    } catch (error) {
      console.error('Error deleting exercise:', error);
    }
  }


  getRandomExerciseByLevel(): Observable<Exercise> {
    return this.currentLevel$.pipe(
      switchMap(level => this.exerciseSubject.pipe(
        map(exercises => exercises.filter(exercise => exercise.level === level)),
        map(filteredExercises => this.shuffleArray(filteredExercises)),
        map(shuffledExercises => shuffledExercises[0]) // Select the first exercise from the shuffled array
      ))
    );
  }


  checkAnswer(exercise: Exercise, answer: string): boolean {
    return exercise.correctAnswer === answer
  }

  // Shuffle an array
  private shuffleArray(array: Exercise[]): Exercise[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Proceed to the next level
  proceedToNextLevel(): void {
    this.currentLevel$.next(this.currentLevel$.value + 1);
  }
    // Navigate to the next exercise
    goToNextExercise(): Observable<number> {
      return this.currentLevel$.pipe(
        switchMap(level => this.getExercisesByLevel(level).pipe(
          map(exercises => ({ level, exercises }))
        )),
        switchMap(({ exercises }) => this.currentIndex$.pipe(
          map(index => {
            if (index < exercises.length - 1) {
              return index + 1;
            } else {
              this.proceedToNextLevel();
              return 0; // Reset index for the new level
            }
          }),
          tap(index => this.currentIndex$.next(index))
        ))
      )
}
// Navigate to the previous exercise
goToPreviousExercise(): void {
 this.currentIndex$.pipe(
    map(index => index > 0 ? index - 1 : index)
 )
  }
  private findExercise(questionId: string, exercises: Exercise[]): Exercise {
    const exercise = exercises.find(e => e.id === questionId);
    if (!exercise) {
      throw new Error('Exercise not found');
    }
    return exercise;
  }
  
  private handleCorrectAnswer(exercise: Exercise): void {
    console.log('Correct answer!');
    alert('Bravo! Ta réponse est juste!' + exercise.feedback);
    this.goToNextExercise();
  }
  
  private handleIncorrectAnswer(): void {
    alert('Désolé! Ta réponse est incorrecte! Réessaye encore');
    this.lifetokenserviceService.decrementLifetokens();
  }
  
  saveAnswer(questionId: string, answer: string): Observable<Exercise> {
    console.log('Saving answer for questionId:', questionId);
    console.log('Answer:', answer);
  
    if (!answer) {
      throw new Error('Answer is required');
    }
    
    return this.exerciseSubject.pipe(
      map(exercises => this.findExercise(questionId, exercises)),
      tap(exercise => {
        console.log('Exercise correct answer:', exercise.correctAnswer);
        if (exercise.correctAnswer === answer) {
          this.handleCorrectAnswer(exercise);
        } else {
          this.handleIncorrectAnswer();
        }
      })
    );
  }
}
