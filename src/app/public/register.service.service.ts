import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private URL_COMPANY_CREATE = environment.backendHost + '/api/owner/create';

  constructor(private _httpSvc: HttpClient) {}

  public createNewOwner(data: any) {
    return this._httpSvc.post(`${this.URL_COMPANY_CREATE}`, data, {});
  }
}
