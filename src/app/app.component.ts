import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonRouterOutlet } from '@ionic/angular/standalone';
import { UpdatesNotificationComponent } from './components/update-notification/update-notification.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IonRouterOutlet, UpdatesNotificationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  title = 'StudyQuest';
 


}
