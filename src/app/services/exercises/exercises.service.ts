import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, combineLatest, firstValueFrom, from, Observable, of } from 'rxjs';
import { map, tap, switchMap} from 'rxjs/operators';
import { Exercise } from '../../interfaces';
import { FirestoreService } from '../firestore/firestore.service'; 
import { LifetokenserviceService } from '../lifetokenservice/lifetokenservice.service';
import { UserService } from '../users/user-service.service';
import { ChapterService } from '../chapters/chapters.service';
import { RewardService } from '../rewarrds/rewards.service'; 
@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
 
  private exerciseSubject: BehaviorSubject<Exercise[]> = new BehaviorSubject<Exercise[]>([]);
  private currentLevel$ = new BehaviorSubject<number>(1);
  private currentIndex$ = new BehaviorSubject<number>(0);


  currentExercise$ : Observable<Exercise|undefined>; 

  constructor(
    private firestoreService: FirestoreService,
    private readonly lifetokenserviceService: LifetokenserviceService,
    private readonly _userService : UserService,
    private readonly _chapterService : ChapterService,
    

  ) {
    this.loadExercises();
    this.currentExercise$  = combineLatest([
      this.currentLevel$.asObservable(),
      this.exerciseSubject.asObservable(),
      this._userService.getCurrentUser()
    ]).pipe(
      map(([level, exercises, user]) => {

    
        if (!user || !exercises || !level) {

  
          return [];
        }
    
        const currentExercises = exercises.filter(exercise => exercise.level === level);
     
        
        if (!user.completedExercises) {

          return currentExercises;
        }
        
        const filteredExercises = currentExercises.filter(e => {
          const isCompleted = user.completedExercises.some(ce => ce.exerciseId === e.id);
          return !isCompleted;
        });
        
        if (filteredExercises.length === 0) {
    
          let level2 = level + 1;
          
          return exercises.filter(exercise => exercise.level === level2);

          
        }

        if(filteredExercises.length %4 === 0){
          this.lifetokenserviceService.incrementLifetokens();
          alert('Bravo! Tu as terminé tous les exercices de ce niveau!')
        }


        return filteredExercises;
      }),
      map(shuffledExercises => {
        if (Array.isArray(shuffledExercises) && shuffledExercises.length > 0) {
          return shuffledExercises[this.currentIndex$.value];
        }
        return undefined;
      })
    );
  }

  // Load exercises from Firestore
   async loadExercises(): Promise<void> {
    try {
      const data = await firstValueFrom(this.firestoreService.loadData('Exercises'));
      this.exerciseSubject.next(data);
      this.currentIndex$.next(0);

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
  async addExercise(exercise: Exercise): Promise<void> {
    try {
      await this.firestoreService.addData('Exercises', {...exercise});
      this.exerciseSubject.next([...this.exerciseSubject.value, exercise]);
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
 getCurrentExercise(subjectId: string):void{
  const filteredExercise = this.exerciseSubject.value.findIndex(exercise => exercise.subjectId === subjectId);
  if (filteredExercise <= -1) {
   return;
  }
  this.currentIndex$.next(filteredExercise);

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
    // Navigate to the next exercise(
    async goToNextExercise(): Promise<number> {
      const level = await firstValueFrom(this.currentLevel$)
      const exercises = await firstValueFrom(this.getExercisesByLevel(level))
      const currentIndex = await firstValueFrom(this.currentIndex$)
      if (currentIndex < exercises.length - 1) {
         this.currentIndex$.next(currentIndex + 1);
      } else {
        this.proceedToNextLevel();
         this.currentIndex$.next(0); // Reset index for the new level
      }
      return this.currentIndex$.value

  
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
  
  private async handleCorrectAnswer(exercise: Exercise): Promise<void>  {
    alert('Bravo! Ta réponse est juste!' + exercise.feedback);


    await this.goToNextExercise();
  }
  
  private handleIncorrectAnswer(): void {
    alert('Désolé! Ta réponse est incorrecte! Réessaye encore');
    this.lifetokenserviceService.decrementLifetokens();
  }
  
  saveAnswer(questionId: string, answer: string): Observable<Exercise> {

    
    if (!answer) {
      throw new Error('Answer is required');
    }
    
    return this.exerciseSubject.pipe(
      map(exercises => this.findExercise(questionId, exercises)),
      tap(async exercise => {
        if (exercise.correctAnswer === answer) {
          await this.handleCorrectAnswer(exercise);
          const currentUser = await firstValueFrom(this._userService.getCurrentUser())
          if(!currentUser){
            throw new Error('No users found')
          }
          const completedExercises = currentUser.completedExercises || [];
          completedExercises.push({
            userId : currentUser.id,
            chapterId : await firstValueFrom(this._chapterService.currentChapterId$),
            subjectId : exercise.subjectId,
            exerciseId : exercise.id
          })
          currentUser.completedExercises = completedExercises
          this._userService.updateUser(currentUser, currentUser.id)
        
    
       
        } else {
           this.handleIncorrectAnswer();
        }
      })
    );
  }

  getExerciseFeedback(): string {
    let feedback = '';
    this.currentExercise$.pipe(map(exercise => {
      if (exercise) {
        feedback = exercise.feedback;
      }
    }));
     return feedback;   
    }
  
  getCurrentLevel(): number {
    return this.currentLevel$.value;
  }
}
