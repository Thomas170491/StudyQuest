import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Chapter, Subject } from '../../interfaces';
import { SubjectListService } from '../../services/subject-list/subject-list.service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChapterListComponent } from '../chapter-list/chapter-list.component';
import { ChapterService } from '../../services/chapters.service';
import { FilterSubjectsByChapterPipe } from '../../pipes/FilterByChapter/filter-by-chapter-pipe.pipe';

@Component({
  selector: 'app-subject-list',
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe, ChapterListComponent,FilterSubjectsByChapterPipe],
  templateUrl: './subject-list.component.html',
  styleUrl: './subject-list.component.scss'
})
export class SubjectListComponent {
  subjects$ : Observable<Subject[]>;
  chapters :  Observable<Chapter[]>;
  selectedChapterId : string = '';
  constructor(
    private readonly _service : SubjectListService,
    private readonly _chapterService : ChapterService
    
  ){  
  this.subjects$ = this._service.getSubjects(); 
  this.chapters = this._chapterService.getChapters();
  
  }

}
  