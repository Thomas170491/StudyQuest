import { Component } from '@angular/core';
 import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
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
