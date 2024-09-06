import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from '../../interfaces';
import { SubjectListService } from '../../services/subject-list/subject-list.service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChapterListComponent } from '../chapter-list/chapter-list.component';

@Component({
  selector: 'app-subject-list',
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe, ChapterListComponent],
  templateUrl: './subject-list.component.html',
  styleUrl: './subject-list.component.scss'
})
export class SubjectListComponent {
  subjects$ : Observable<Subject[]>;
  constructor(
    private readonly _service : SubjectListService
  ){  
  this.subjects$ = this._service.getSubjects(); 
  }


}
  