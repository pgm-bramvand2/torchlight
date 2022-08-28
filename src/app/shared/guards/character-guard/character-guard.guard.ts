import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalstorageService } from '../../services/localstorage/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class CharacterGuard implements CanActivate {
  constructor(
    private localStorageService: LocalstorageService,
    private router: Router
  ){}

  canActivate(){
    const character = this.localStorageService.getStorageItem('character');

    if(!character) {
      this.router.navigate(['characters']);
    }
    return true;
  }

}
