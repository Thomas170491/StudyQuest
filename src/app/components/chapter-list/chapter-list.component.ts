import { Component, EventEmitter, Output } from '@angular/core';
import { Chapter } from '../../interfaces';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChapterService } from '../../services/chapters/chapters.service';
import { Observable } from 'rxjs';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonSpinner, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { book } from 'ionicons/icons';
import { Router } from '@angular/router';
const UIElements = [
 IonContent,
 IonList,
 IonItem,
 IonButton,
 IonSpinner,
 IonListHeader,
 IonLabel,
 IonTitle,
 IonCard,
 IonCardContent,
 IonCardHeader,
 IonHeader,
 IonToolbar,
 IonCardTitle,
 IonIcon,
 
 

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
    private router: Router
  ) {
    this.chapters$ = this._service.getChapters();
    addIcons({
      book
    })
  }

  @Output() selectedChapter: EventEmitter<string> = new EventEmitter<string>(); 

  onChapterSelect(id: string): void {
    console.log(id);

    this.selectedChapter.emit(id);
   
}

goBack() {
  this.router.navigate(['/profile']);
}

  }


