import { Component } from '@angular/core';
import { Chapter } from '../../interfaces';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChapterService } from '../../services/chapters.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chapter-list',
  standalone: true,
  imports: [NgFor, NgIf, AsyncPipe],
  templateUrl: './chapter-list.component.html',
  styleUrl: './chapter-list.component.scss'
})
export class ChapterListComponent {
  chapters$ : Observable<Chapter[]>;

 constructor(
    private readonly _service : ChapterService
  ){
    this.chapters$ = this._service.getChapters()
  }


}

