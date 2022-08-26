import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  setStorageItem(item: string, data) {
    localStorage.setItem(item, JSON.stringify(data));
  }

  getStorageItem(item: string) {
    return JSON.parse(localStorage.getItem(item));
  }

  removeStorageItem(item: string){
    localStorage.removeItem(item);
  }

  clearStorage() {
    localStorage.clear();
  }

}
