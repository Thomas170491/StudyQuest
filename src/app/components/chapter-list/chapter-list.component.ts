import { Component } from '@angular/core';
import { Chapter } from '../../interfaces';

@Component({
  selector: 'app-chapter-list',
  standalone: true,
  imports: [],
  templateUrl: './chapter-list.component.html',
  styleUrl: './chapter-list.component.scss'
})
export class ChapterListComponent {
  chapters? : Chapter[];

/*  constructor(
    private readonly _service : GetChaptersFromDataBase 
  ){
    this.chapters = 
  }*/

}

