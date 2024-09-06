

import { Injectable } from '@angular/core';
import { Subject } from '../../interfaces'; // Assuming you have a Subject interface defined
import { Observable, BehaviorSubject, map, first } from 'rxjs';
import { subjectData } from '../../data';

@Injectable({
  providedIn: 'root'
})
export class SubjectListService {

  private subjects = subjectData;
  private subjectSubject: BehaviorSubject<Subject[]> = new BehaviorSubject<Subject[]>(this.subjects);

  constructor() { }

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
  addSubject(subject: Subject): void {
    this.subjects.push(subject);
    this.subjectSubject.next(this.subjects);
  }



  // Delete a subject
  deleteSubject(id: string): void {
    this.subjects = this.subjects.filter(subject => subject.id !== id);
    this.subjectSubject.next(this.subjects);
  }

}


