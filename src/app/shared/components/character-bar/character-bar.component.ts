import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FirestoreService } from '../../services/firebase/firestore/firestore.service';
import { LocalstorageService } from '../../services/localstorage/localstorage.service';
import { ScoreCalculatorService } from '../../services/score-calculator/score-calculator.service';

@Component({
  selector: 'app-character-bar',
  templateUrl: './character-bar.component.html',
  styleUrls: ['./character-bar.component.scss'],
})
export class CharacterBarComponent implements OnInit {
  character;
  avatarUrl: string;
  currentHp: number;
  initiative: number;
  armorClass: number;
  proficiencyBonus: number;

  constructor(
    private localStorageService: LocalstorageService,
    private firestoreService: FirestoreService,
    private scoreCalculatorService: ScoreCalculatorService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    // Get the currect character form local storage
    this.character = this.localStorageService.getStorageItem('character');
    // Set the current character's the currenct hp
    this.setCurrentHp();
    // Set the current character
    this.setCharacter();
  }

  // Update the character in local storage and on the database
  updateCharacter(character) {
    this.localStorageService.setStorageItem('character', character);
    this.character = character;
  }

  // Set the character's current hitpoints
  setCurrentHp(newHp: number = null) {
    let hp: number;

    // Check if the character object has current hp
    if(!this.character.currentHp) {
      // If not set the current hp to the maximum hp
      hp = this.character.totalHp;
    } else {
      // If so keep the current hp
      hp = this.character.currentHp;
    }

    // Check if the newHp param exists
    if(newHp) {
      // If so set the hp to the new hp value
      hp = newHp;
    }

    // Update the character with the hp in local storage and on the database
    this.firestoreService.updateCharacter(this.character.id, {currentHp: hp});
    this.updateCharacter({
      ...this.character,
      currentHp: hp
    });
  }

  // Set the character
  setCharacter() {
    // Check if the current character object has initiative
    if(!this.character.initiative) {
      // If not calculate the initiative
      const initiativeScore = this.scoreCalculatorService.calcAbilityMod(this.character.abilities.dex);

      // Update the character with new initative in local store and on th database
      this.firestoreService.updateCharacter(this.character.id, {initiative: initiativeScore});
      this.updateCharacter({
        ...this.character,
        initiative: initiativeScore
      });
    }

    // Add a visual plus sign to the initiative score
    this.initiative = this.scoreCalculatorService.addPlusSign(this.character.initiative);

    // Check if the current character object has a proficiency bonus
    if(!this.character.proficiencyBonus) {
      // If not calculate the proficiency bonus
      const proficiencyBonusScore = this.scoreCalculatorService.calcProficiencyMod(this.character.level);

      // Update character with new proficiency bonus in local storage and in database
      this.firestoreService.updateCharacter(this.character.id, {proficiencyBonus: proficiencyBonusScore});
      this.updateCharacter({
        ...this.character,
        proficiencyBonus: proficiencyBonusScore
      });
    }

    // Add a visual plus sign to the initiative score
    this.proficiencyBonus= this.scoreCalculatorService.addPlusSign(this.character.proficiencyBonus);
  }

  // Create a hitpoints alert with a small form to adjust the current hp and set the currenthp
  async hpAlert() {
    const alert = await this.alertController.create({
      header: 'Set your current Hitpoints',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
      },
      {
          text: 'Ok',
          handler: (alertData) => { //takes the data
              this.setCurrentHp(alertData.newHp);
          }
      }
      ],
      inputs: [
        {
          name: 'newHp',
          type: 'number',
          placeholder: 'HP',
          min: 0,
          max: this.character.totalHp,
          value: this.character.currentHp
        },
      ],
    });

    await alert.present();
  }

  // Handle the hp on click event
  async onClickHp() {
   this.hpAlert();
  }
}

