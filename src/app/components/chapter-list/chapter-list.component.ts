import { Component, EventEmitter, Output } from '@angular/core';
import { Chapter } from '../../interfaces';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChapterService } from '../../services/chapters.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chapter-list',
  standalone: true,
  imports: [NgFor, NgIf, AsyncPipe],
  templateUrl: './chapter-list.component.html',
  styleUrls: ['./chapter-list.component.scss',] 
})
export class ChapterListComponent {
  chapters$: Observable<Chapter[]>;

  constructor(

    private readonly _service: ChapterService,
  ) {
    this.chapters$ = this._service.getChapters();
  }

  @Output() selectedChapter: EventEmitter<string> = new EventEmitter<string>(); 

  onChapterSelect(id: string): void {
    this.selectedChapter.emit(id);
   
}

  }


