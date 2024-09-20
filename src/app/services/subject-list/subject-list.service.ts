import { Injectable } from '@angular/core';
import { Subject } from '../../interfaces'; 
import { Observable, BehaviorSubject,firstValueFrom, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { FirestoreService } from '../firestore/firestore.service'; 

@Injectable({
  providedIn: 'root'
})
export class SubjectListService {

  
  private subjectSubject: BehaviorSubject<Subject[]> = new BehaviorSubject<Subject[]>([]);

  constructor(private firestoreService: FirestoreService) {
    this.loadSubjects();
  }

  // Load subjects from Firestore
  private  async loadSubjects() {
    const data = await firstValueFrom(this.firestoreService.loadData('Subjects'));
    this.subjectSubject.next(data);
  }

  // Get the full list of subjects
  getSubjects(): Observable<Subject[]> {
    return this.subjectSubject.asObservable();
  }

  // Get a single subject by ID
getSubjectById(id: string): Observable<Subject | undefined> {
  return this.subjectSubject.pipe(
    map(subjects => subjects.find(subject => subject.id === id))
  );
}

// Add a new subject
async addSubject(subject: Subject[]): Promise<void> {
  try {
    await this.firestoreService.addData('Subjects', subject);
    this.subjectSubject.next(subject);
  
  } catch (error) {
    console.error('Error adding subject:', error);
  }
}

// Update a subject
updateSubject(id: string, subject: Subject): Observable<Subject[]> {
  return from(this.firestoreService.updateData('Subjects', id, subject)).pipe(
    switchMap(() => {
      const subjects = this.subjectSubject.value;
      const index = subjects.findIndex(s => s.id === id);
      subjects[index] = subject;
      this.subjectSubject.next(subjects);
      return this.subjectSubject;
    })
  );
}
 
// Delete a subject
async deleteSubject(id: string): Promise<void> {
  try {
    await this.firestoreService.deleteData('Subjects', id);
    const subjects= this.subjectSubject.value.filter(subject => subject.id !== id);
    this.subjectSubject.next(subjects);
  } catch (error) {
    console.error('Error deleting subject:', error);
  }
}
}