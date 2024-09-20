import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { map, tap, switchMap, } from 'rxjs/operators';
import { FirestoreService } from './firestore/firestore.service'; 
import { Chapter } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ChapterService {
 
  private chapterSubject: BehaviorSubject<Chapter[]> = new BehaviorSubject<Chapter[]>([]);

  constructor(private firestoreService: FirestoreService) {
    this.loadChapters();
  }

  // Load chapters from Firestore
  private async loadChapters(){
    const data = await firstValueFrom(this.firestoreService.loadData('Chapters'))
    
        this.chapterSubject.next(data);
      }
    
  

  // Get all chapters
  getChapters(): Observable<Chapter[]> {
    return this.chapterSubject.asObservable();
  }

  // Get a single chapter by ID
  getChapterById(id: string): Observable<Chapter | undefined> {
    return this.chapterSubject.pipe(
      map(chapters => chapters.find(chapter => chapter.id === id))
    );
  }

  // Add a new chapter
async addChapter(chapter: Chapter[]): Promise<void> {
  try {
    await this.firestoreService.addData('chapters', chapter);
    this.chapterSubject.next(chapter);
  } catch (error) {
    console.error('Error adding chapter:', error);
  }
}

// Update the progress of a specific user in a chapter
updateUserProgress(chapterId: string, userId: string, updatedProgress: number): Observable<void> {
  return this.getChapterById(chapterId).pipe(
    switchMap(chapter => {
      if (chapter) {
        const userProgress = chapter.progress.find(p => p.userId === userId);
        if (userProgress) {
          userProgress.progress = updatedProgress;
        } else {
          chapter.progress.push({ userId, progress: updatedProgress });
        }
        this.chapterSubject.next([chapter]);
        return this.firestoreService.updateData('chapters', chapterId, chapter);
      } else {
        throw new Error('Chapter not found');
      }
    })
  );
}

// Delete a chapter by ID
async deleteChapter(id: string): Promise<void> {
  try {
    await this.firestoreService.deleteData('chapters', id);
    const chapters = this.chapterSubject.value.filter(chapter => chapter.id !== id);
    this.chapterSubject.next(chapters);
  } catch (error) {
    console.error('Error deleting chapter:', error);
  }
}
}