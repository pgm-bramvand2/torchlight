import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  setUser(data) {
    localStorage.setItem('user', JSON.stringify(data));
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  removeUser(){
    localStorage.removeItem('user');
  }
}
