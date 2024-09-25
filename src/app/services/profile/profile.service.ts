import { Injectable } from '@angular/core';
import { UserService } from '../users/user-service.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  

  constructor(
    private readonly _userService: UserService
  ) {}



  async updateProfilePicture(userId: string, profilePictureUrl: string) {
    this._userService.updateUser({ id: userId, profilePictureUrl });
 
   
    
  }

