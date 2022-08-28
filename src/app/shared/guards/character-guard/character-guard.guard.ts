import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { LocalstorageService } from '../../services/localstorage/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class CharacterGuard implements CanActivate {
  constructor(
    private localStorageService: LocalstorageService,
    private navController: NavController
    ){}

  canActivate(){
    const character = this.localStorageService.getStorageItem('character');

    if(!character) {
      this.navController.navigateBack('characters');
    }
    return true;
  }

}
