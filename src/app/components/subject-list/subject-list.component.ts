import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from '../../interfaces';
import { SubjectListService } from '../../services/subject-list/subject-list.service';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-subject-list',
  standalone: true,
  imports: [NgIf, AsyncPipe],
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
