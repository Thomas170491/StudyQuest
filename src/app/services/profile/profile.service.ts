import { Injectable } from '@angular/core';
import { UserService } from '../users/user-service.service';
import { User } from '../../interfaces';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  

  constructor(
    private readonly _userService: UserService
  ) {}



   updateProfilePicture(Url: string, user: User) {
        const { profilePictureUrl, ...restOfUser } = user;
        this._userService.updateUser({ 
          profilePictureUrl: Url, 
          ...restOfUser
        }, user.id);
      }
   async changeProfilePicture(user: User): Promise<void> {
        try {
          const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: false,
            resultType: CameraResultType.DataUrl,
            source: CameraSource.Camera
          });
    
          if (image && image.dataUrl) {
            await this.updateProfilePicture(image.dataUrl, user);
          }
        } catch (error) {
          console.error('Error taking photo', error);
        }
      }
    }
  


