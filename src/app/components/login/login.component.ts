import { Component } from '@angular/core';
import { getAuth,Auth, GoogleAuthProvider,signInWithPopup } from '@angular/fire/auth';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  constructor(private router : Router,
    private readonly _auth : Auth,
   ){
    

  }
    
    authentificateUser = async () => {
      const provider = new GoogleAuthProvider();
      const credential = await signInWithPopup(this._auth, provider);
      this.router.navigate(['/select']);
   }
  }


