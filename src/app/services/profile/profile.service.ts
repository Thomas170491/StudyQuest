import { Injectable } from '@angular/core';
import { UserService } from '../users/user-service.service';
import { User } from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  

  constructor(
    private readonly _userService: UserService
  ) {}



  async updateProfilePicture(userId: string, Url: string, user: User) {
        const { profilePictureUrl, ...restOfUser } = user;
        this._userService.updateUser({ 
          profilePictureUrl: Url, 
          ...restOfUser,
          id: userId 
        });
      }
}
