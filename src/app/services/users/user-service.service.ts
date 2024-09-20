import { Injectable } from '@angular/core';
import { User } from '../../interfaces';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { FirestoreService } from '../firestore/firestore.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {



  private users!: User[];
  
  constructor(
    private readonly _firestoreService: FirestoreService
  ) {
    this._firestoreService.loadData('users').pipe(
      map(data => {
      this.users = data;
      this.usersSubject.next(this.users);
      })
    )
    };
  

  private usersSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(this.users);

  getUsers(): Observable<User[]> {
    return this.usersSubject.asObservable();
  }

  // Get a single user by ID
  getUserById(id: string) {
    return this.usersSubject.pipe(
      map(users => users.find(user => user.id === id)))
  }

  // Add a new user
  addUser(user: User): void {
    this.users.push(user);
    this.usersSubject.next(this.users);
  }

  // Update an existing user
  updateUser(updatedUser: User): void {
    const index = this.users.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
      this.users[index] = updatedUser;
      this.usersSubject.next(this.users);
    }
  }

  // Delete a user
  deleteUser(id: string): void {
    this.users = this.users.filter(user => user.id !== id);
    this.usersSubject.next(this.users);
  }

}

  
    
    
  





