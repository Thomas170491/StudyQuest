import { Injectable } from '@angular/core';
import { User } from '../../interfaces';
import { Observable, BehaviorSubject, map, catchError, of, firstValueFrom, from, switchMap } from 'rxjs';
import { FirestoreService } from '../firestore/firestore.service';
import { Auth } from '@angular/fire/auth';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {



  
  constructor(
    private readonly _firestoreService: FirestoreService,
    private readonly _auth: Auth,
    private readonly _firestore : Firestore
  ) {
      this.loadUsers()    
    };
  

  private usersSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  private async loadUsers(){
    const data = await firstValueFrom(this._firestoreService.loadData('Users'))
    this.usersSubject.next(data)
  }

  getUsers(): Observable<User[]> {
    return this.usersSubject.asObservable();
  }

  // Get a single user by ID
  getUserById(id: string) {
    return this.usersSubject.pipe(
      map(users => users.find(user => user.id === id)))
  }

  // Add a new user
  async addUser(user: User): Promise<void> {
    try{
      const currentUser = this._auth.currentUser
    
      if (currentUser) {
        const fbDoc = doc(this._firestore,`Users/${currentUser.uid}`)
        await setDoc(fbDoc, {...user}).catch(err => console.error('Error adding User to database:', err));
        const users = this.usersSubject.value;
        users.push(user);
        this.usersSubject.next(users);
      } else {
        throw new Error('No authenticated user found');
      }
      const users = this.usersSubject.value;
      users.push(user);
      this.usersSubject.next(users);
    }catch(error){
      console.error('Error adding user:', error)
    }
  }

  // Update an existing user
  async updateUser(updatedUser: User, id: string): Promise<User[]> {
    try {
      await this._firestoreService.updateData('Users', id, { ...updatedUser });
      const users = this.usersSubject.value;
      const index = users.findIndex(s => s.id === id);
      if (index !== -1) {
        users[index] = updatedUser;
        this.usersSubject.next(users);
      } else {
        console.warn(`User with id ${id} not found in local state`);
      }
      return users;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }
  
  
  // Delete a user
  async deleteUser(id: string): Promise<void> {
    try {
      await this._firestoreService.deleteData('Users', id)
      const users = this.usersSubject.value.filter(user => user.id !== id)
      this.usersSubject.next(users)
    } catch(error){
      console.error('Error deleting user:', error)
    }
  }
 getConnctedUsers(): Observable<User[] |undefined >  {
    return this.usersSubject.asObservable().pipe(
      
      map(users => {
        if(users){
          return users.filter(user => user.isAuth === true);
          
        }
        return undefined;
      }),
      catchError(error => {
        console.error('Error fetching current user:', error)
        return of(undefined)
      }))
      
    ;
  }
  getCurrentUser(): Observable<User | undefined> { 
    return this.getConnctedUsers().pipe(
      map(
        users => (users ?? []).find(user => user.id === this._auth.currentUser?.uid)
    )); 
  }
  
}
