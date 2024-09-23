import { Component } from '@angular/core';
import { IonRouterOutlet, IonApp } from '@ionic/angular/standalone';
import { SelectComponent } from "./components/select/select.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IonRouterOutlet, IonApp, SelectComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'StudyQuest';
}
