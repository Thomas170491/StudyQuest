import { Component, Input } from '@angular/core';
import { LifetokenserviceService } from '../../services/lifetokenservice/lifetokenservice.service';
import { Observable } from 'rxjs';
import { IonContent, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AsyncPipe } from '@angular/common';
import { addIcons } from 'ionicons';
import { heartSharp } from 'ionicons/icons';



const UIElements = [
  IonHeader,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonContent,
]
@Component({
  selector: 'app-lifetokens',
  standalone: true,
  imports: [AsyncPipe, ...UIElements],
  templateUrl: './lifetokens.component.html',
  styleUrl: './lifetokens.component.scss'
})
export class LifetokensComponent {
  lifetokens$!:Observable<number>;
  constructor(
    lifetokenserviceService: LifetokenserviceService
  ) {
    this.lifetokens$ = lifetokenserviceService.getlifetokens();

    addIcons({
      'heart-sharp': heartSharp,
    })
   }
   @Input() lifetokens!: number;


  ngOnInit(): void {
  }
}
