import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  constructor() {}

  getUserJSON() {
    let userJSON = localStorage.getItem('user');
    if (userJSON) {
      userJSON = JSON.parse(userJSON);
      return userJSON;
    } else {
      return [];
    }
  }
}
