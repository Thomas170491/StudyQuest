import { Component, EventEmitter, Input , Output } from '@angular/core';
import { Chapter } from '../../interfaces';
import { AsyncPipe, NgFor } from '@angular/common';


@Component({
  selector: 'app-chapter-list',
  standalone: true,
  imports: [NgFor, AsyncPipe],
  templateUrl: './chapter-list.component.html',
  styleUrl: './chapter-list.component.scss',
})
export class ChapterListComponent {


  // constructor(
  //   private readonly _service: ChapterService,
  //   private router: Router
  // ) {
  // this.chapters$ = this._service.getChapters();
  // }

 @Input() chapters! : Chapter[]
 @Output() selectedEvent : EventEmitter<string> = new EventEmitter



}

