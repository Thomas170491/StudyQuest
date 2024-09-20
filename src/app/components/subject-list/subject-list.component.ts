import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Exercise, Subject } from '../../interfaces';
import { SubjectListService } from '../../services/subject-list/subject-list.service';
import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { ChapterListComponent } from '../chapter-list/chapter-list.component';;
import { Router } from '@angular/router';
import { FilterSubjectsByChapterPipe } from '../../pipes/FilterByChapter/filter-by-chapter-pipe.pipe';

@Component({
  selector: 'app-subject-list',
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe,JsonPipe, ChapterListComponent,FilterSubjectsByChapterPipe],
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.scss'] // Fixed typo from `styleUrl` to `styleUrls`
})
export class SubjectListComponent {
  subjects$: Observable<Subject[]>;
  
  selectedChapterId: string = '';

  constructor(
    private readonly _service: SubjectListService,
 
    private router: Router
  ) {
    this.subjects$ = this._service.getSubjects(); 

  }
  @Input() chapiterId!: string;
  @Output() SubjectSelected: EventEmitter<string> = new EventEmitter<string>(); 


  onSubjectSelect(id: string): void {
    console.log(id);
    this.SubjectSelected.emit(id);

  }
}
