import { Injectable } from '@angular/core';
import { Subject } from '../../interfaces'; 
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import { FirestoreService } from '../firestore/firestore.service'; 

@Injectable({
  providedIn: 'root'
})
export class SubjectListService {

  private subjects: Subject[] = [];
  private subjectSubject: BehaviorSubject<Subject[]> = new BehaviorSubject<Subject[]>(this.subjects);

  constructor(private firestoreService: FirestoreService) {
    this.loadSubjects();
  }

  // Load subjects from Firestore
  private loadSubjects(): void {
    this.firestoreService.loadData('subjects').pipe(
      tap((data: Subject[]) => {
        this.subjects = data;
        this.subjectSubject.next(this.subjects);
      })
    ).subscribe();
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
async addSubject(subject: Subject): Promise<void> {
  try {
    await this.firestoreService.addData('subjects', subject);
    this.subjects.push(subject);
    this.subjectSubject.next(this.subjects);
  } catch (error) {
    console.error('Error adding subject:', error);
  }
}

// Update a subject
async updateSubject(id: string, updatedSubject: Subject): Promise<void> {
  try {
    await this.firestoreService.updateData('subjects', id, updatedSubject);
    const index = this.subjects.findIndex(subject => subject.id === id);
    if (index !== -1) {
      this.subjects[index] = updatedSubject;
      this.subjectSubject.next(this.subjects);
    }
  } catch (error) {
    console.error('Error updating subject:', error);
  }
}

// Delete a subject
async deleteSubject(id: string): Promise<void> {
  try {
    await this.firestoreService.deleteData('subjects', id);
    this.subjects = this.subjects.filter(subject => subject.id !== id);
    this.subjectSubject.next(this.subjects);
  } catch (error) {
    console.error('Error deleting subject:', error);
  }
}
}