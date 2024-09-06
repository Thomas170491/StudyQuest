import { Injectable } from '@angular/core';
import { Chapter } from '../interfaces';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { chapterData } from '../data';

@Injectable({
  providedIn: 'root'
})
export class ChapterService {


  constructor() { }
  private chapters = chapterData;

  private chapterSubject: BehaviorSubject<Chapter[]> = new BehaviorSubject<Chapter[]>(this.chapters);

  getChapters(): Observable<Chapter[]> {
    return this.chapterSubject.asObservable();
  }

  // Get a single chapter by ID
  getChapterById(id: string) {
    return this.chapterSubject.pipe(map(chapters => chapters.find(chapter =>  chapter.id === id))
    )
  }

  // Add a new chapter
  addChapter(chapter: Chapter): void {
    this.chapters.push(chapter);
    this.chapterSubject.next(this.chapters);
  }

    // Update the progress of a specific user in a chapter
    updateUserProgress(chapterId: string, userId: string, updatedProgress: number): void {
      this.getChapterById(chapterId).pipe(map(chapter => {
        if (chapter) {
          // Find the user progress entry or create a new one if it doesn't exist
          const userProgress = chapter.progress.find(p => p.userId === userId);
          if (userProgress) {
            userProgress.progress = updatedProgress;
          } else {
            chapter.progress.push({ userId, progress: updatedProgress });
          }
          // Notify subscribers about the update
          this.chapterSubject.next(this.chapters);
        }
      }))
    };


  // Delete a chapter
  deleteChapter(id: string): void {
    this.chapters = this.chapters.filter(chapter => chapter.id !== id);
    this.chapterSubject.next(this.chapters);
  }

}

  