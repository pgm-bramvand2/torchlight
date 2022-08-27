import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { FirestoreService } from 'src/app/shared/services/firebase/firestore/firestore.service';
import { LocalstorageService } from 'src/app/shared/services/localstorage/localstorage.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.page.html',
  styleUrls: ['./characters.page.scss'],
})
export class CharactersPage implements OnInit {
  user = this.localStorageService.getStorageItem('user');
  characters$ =  this.fireStoreService.getUserCharacters(this.user.uid).pipe(
    tap(console.log),
    tap((characters) => {
      this.localStorageService.setStorageItem('characters', characters);
    }));

  constructor(
    private router: Router,
    private fireStoreService: FirestoreService,
    private localStorageService: LocalstorageService
  ) { }

  ngOnInit() {

  }

  onClickCreate() {
    this.router.navigate(['create-character']);
  }

  onClickCharacter(character) {
    this.localStorageService.setStorageItem('character', character);
    this.router.navigate(['character']);
  }
}
