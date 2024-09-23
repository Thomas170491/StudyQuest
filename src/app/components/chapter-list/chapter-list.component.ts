import { Component, EventEmitter, Output } from '@angular/core';
import { Chapter } from '../../interfaces';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChapterService } from '../../services/chapters/chapters.service';
import { Observable } from 'rxjs';
import { IonButton, IonContent, IonItem, IonLabel, IonList, IonListHeader, IonSpinner, IonTitle } from '@ionic/angular/standalone';


const UIElements = [
 IonContent,
 IonList,
 IonItem,
 IonButton,
 IonSpinner,
 IonListHeader,
 IonLabel,
 IonTitle,
 

]
@Component({
  selector: 'app-chapter-list',
  standalone: true,
  imports: [NgFor, NgIf, AsyncPipe,...UIElements],
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
    console.log(id);

    this.selectedChapter.emit(id);
   
}

  }


