import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomePageComponent } from './components/home/home.component';
import { SelectComponent } from './components/select/select.component';




export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomePageComponent }, 
  { path: 'select', component : SelectComponent},




  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirection par défaut vers la page de login
  { path: '**', redirectTo: 'login' } // Gestion des routes non trouvées
];

