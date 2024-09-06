import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomePageComponent } from './components/home/home.component';
import { ChapterListComponent } from './components/chapter-list/chapter-list.component';
import { SubjectListComponent } from './components/subject-list/subject-list.component';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomePageComponent }, 
  { path: 'chapter-list', component : ChapterListComponent},
  { path: 'subject-list', component : SubjectListComponent},


  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirection par défaut vers la page de login
  { path: '**', redirectTo: 'login' } // Gestion des routes non trouvées
];

