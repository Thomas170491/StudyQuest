import { Component } from '@angular/core';
import { getAuth,Auth, GoogleAuthProvider,signInWithPopup } from '@angular/fire/auth';
import { Router } from '@angular/router'; 
import { FirestoreService } from '../../services/firestore/firestore.service';
import { UserService } from '../../services/users/user-service.service';
import { map } from 'rxjs';
import { doc, getDoc } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
import { Progress, User } from '../../interfaces';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  constructor(
    private router : Router,
    private readonly _auth : Auth,
    private readonly _firestoreService : FirestoreService,
    private readonly _firestore : Firestore,
    private readonly _userService : UserService
   ){}
    
    authentificateUser = async () => {
      const provider = new GoogleAuthProvider();
      const credential = await signInWithPopup(this._auth, provider);
      const user = credential.user;
      console.log(user);
      
      if(user){
        const userDocRef = doc(this._firestore,'Users', user.uid);
        const userDoc = await getDoc(userDocRef);

        let completedExercises: Progress[] = [];

        const userExist : User = {
          id: user.uid,
          username: user.displayName ?? '',
          email: user.email ?? '',
          profilePictureUrl: user.photoURL,
          schoolYear: '9ème',
          group: 'R3',
          isAuth: true,
          completedExercises: []
        };

        if (!userDoc.exists()) {
          this._userService.addUser(userExist);
          this._firestoreService.addData('Users', userExist);
        } else {
          const existingUserData = userDoc.data() as User; 
          completedExercises = existingUserData.completedExercises;
          this._userService.updateUser({ ...existingUserData, isAuth: true, completedExercises : completedExercises });
          this._firestoreService.updateData('Users', user.uid, { isAuth : true, completedExercises : completedExercises });
        }
        this.router.navigate(['/select']);
      }
      this.router.navigate(['/home']);
      }

      signOut = async () => {
        const userId = this._auth.currentUser?.uid;
        await this._auth.signOut();
        
        if (userId) {
          this._firestoreService.updateData('Users', userId, { isAuth: false });
          this._userService.getUserById(userId).pipe(
            map(user => {
            if (user) {
              this._userService.updateUser({ ...user, isAuth: false });
            }
          }));
        }
        this.router.navigate(['/home']);
      }
      
   }
  


