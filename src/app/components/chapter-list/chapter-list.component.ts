import { Component, EventEmitter, Output } from '@angular/core';
import { Chapter } from '../../interfaces';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChapterService } from '../../services/chapters.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chapter-list',
  standalone: true,
  imports: [NgFor, NgIf, AsyncPipe],
  templateUrl: './chapter-list.component.html',
  styleUrls: ['./chapter-list.component.scss',] // Fixed typo here
})
export class ChapterListComponent {
  chapters$: Observable<Chapter[]>;

  constructor(
    private router: Router,
    private readonly _service: ChapterService,
  ) {
    this.chapters$ = this._service.getChapters();
  }

  @Output() selectedEvent: EventEmitter<string> = new EventEmitter<string>(); 

  redirectToSubjectList(): void { 
    this.router.navigate(['/subject-list']); 
  }
  onChapterSelect(id: string): void {
    this.selectedEvent.emit(id);
    this.redirectToSubjectList();
  }
}


