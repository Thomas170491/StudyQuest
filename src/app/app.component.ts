import { Component } from '@angular/core';
import { IonRouterOutlet, IonApp } from '@ionic/angular/standalone';
import { SelectComponent } from "./components/select/select.component";
import { LifetokensComponent } from "./components/lifetokens/lifetokens.component";
import { LoginComponent } from "./components/login/login.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IonRouterOutlet, IonApp, SelectComponent, LifetokensComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'StudyQuest';
}
