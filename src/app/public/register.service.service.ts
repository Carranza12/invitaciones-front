import { Injectable } from '@angular/core';
import { environment } from '../../environment';
@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {
  private URL_USER = environment.backendHost + '/api/auth/users';
  private URL_COMPANY = environment.backendHost + '/api/owner';
  private URL_OWNER = environment.backendHost + '/api/auth/users';

  constructor() { }

  public createNewOwner(){
    
  }
}
