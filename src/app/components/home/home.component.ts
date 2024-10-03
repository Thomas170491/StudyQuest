import { Component } from '@angular/core';
 import { Router } from '@angular/router';
import { IonButton, IonContent } from '@ionic/angular/standalone';

const UIElements = [
  IonContent,
  IonButton
]

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [...UIElements],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomePageComponent {
  title = 'StudyQuest';
 constructor(private router : Router){

 }
   
   redirectToLogin = () => {
      this.router.navigate(['/login']);
  }

  
  
}
