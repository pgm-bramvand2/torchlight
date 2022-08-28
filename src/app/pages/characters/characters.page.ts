import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { tap } from 'rxjs/operators';
import { FirestoreService } from 'src/app/shared/services/firebase/firestore/firestore.service';
import { LocalstorageService } from 'src/app/shared/services/localstorage/localstorage.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.page.html',
  styleUrls: ['./characters.page.scss'],
})
export class CharactersPage implements OnInit {
  // Get the user from local storage
  user = this.localStorageService.getStorageItem('user');
  // Get the characters belonging to the current user id from the database
  characters$ =  this.fireStoreService.getUserCharacters(this.user.uid).pipe(
    tap((characters) => {
      // Store the user characters in local storage
      this.localStorageService.setStorageItem('characters', characters);
    }));

  constructor(
    private navController: NavController,
    private fireStoreService: FirestoreService,
    private localStorageService: LocalstorageService
  ) { }

  ngOnInit() {
  }

  // Handle create button on click event
  onClickCreate() {
    // Navigate to the create character screen
    this.navController.navigateForward('create-character');
  }

  // Handle the character item on click event
  onClickCharacter(character) {
    // Store selected character in local storage
    this.localStorageService.setStorageItem('character', character);
    // Navigate to the character screen
    this.navController.navigateForward('character');
  }
}
