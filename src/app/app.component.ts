import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IonBreadcrumbs, IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IonRouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'StudyQuest';
}
