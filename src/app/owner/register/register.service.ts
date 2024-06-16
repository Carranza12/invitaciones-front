import {  Injectable } from '@angular/core';
import { environment } from '../../../environment';
import { HttpClient } from '@angular/common/http';
import { empty, finalize } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private validaCompanyURL = environment.backendHost+'/api/owner/validate/';

  constructor(private http: HttpClient) {}

  existCompanyName(companyName: string){
    return this.http.get(`${this.validaCompanyURL}${companyName}`, {})
  }
}
