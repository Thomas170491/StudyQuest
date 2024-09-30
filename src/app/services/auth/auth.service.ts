import { Injectable } from '@angular/core';
import {  Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { FirestoreService } from '../firestore/firestore.service';
import { UserService } from '../users/user-service.service';
import { User, Progress } from '../../interfaces';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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
          
        } else {
          const existingUserData = userDoc.data() as User; 
          completedExercises = existingUserData.completedExercises;
          this._userService.updateUser({ ...existingUserData, isAuth: true, completedExercises : completedExercises }, existingUserData.id);
          
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
              this._userService.updateUser({ ...user, isAuth: false }, user.id);
            }
          }));
        }
        this.router.navigate(['/home']);
      }
      
   }
  


