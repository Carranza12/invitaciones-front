import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class RegisterServiceService {
  private URL_USER = environment.backendHost + '/api/auth/users';
  private URL_COMPANY = environment.backendHost + '/api/owner';
  private URL_OWNER = environment.backendHost + '/api/auth/users';

  constructor(private _httpSvc: HttpClient) {}

  public createNewOwner(form: any) {
    //crear el usuario
    const user = {
      email: form.email,
      password: form.password,
      name: form.name,
      last_name: form.last_name,
      role: 'owner',
      profileImage: 'default',
    };

    const userResponse:any = this._httpSvc.post(`${this.URL_USER}`, user, {});

    console.log("user response:", userResponse)

    
  }
}
