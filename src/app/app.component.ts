import { Component } from '@angular/core';
import { IonRouterOutlet, IonApp, IonContent } from '@ionic/angular/standalone';
import { SelectComponent } from "./components/select/select.component";
import { LifetokensComponent } from "./components/lifetokens/lifetokens.component";
import { LoginComponent } from "./components/login/login.component";
import { ProfessorComponent } from './components/professor/professor.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IonRouterOutlet, IonApp,IonContent, SelectComponent, LifetokensComponent, LoginComponent,ProfessorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'StudyQuest';
}
