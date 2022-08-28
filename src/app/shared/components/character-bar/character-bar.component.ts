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
  public character;
  public avatarUrl: string;
  public currentHp: number;
  public initiative: number;
  public armorClass: number;
  public proficiencyBonus: number;

  constructor(
    private localStorageService: LocalstorageService,
    private firestoreService: FirestoreService,
    private scoreCalculatorService: ScoreCalculatorService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.character = this.localStorageService.getStorageItem('character');
    this.setCurrentHp();
    this.setCharacter();
    console.log(this.character);
  }

  updateCharacter(character) {
    this.localStorageService.setStorageItem('character', character);
    this.character = character;
  }


  setCurrentHp(newHp: number = null) {
    let hp: number;
    console.log(this.character.currentHp);

    if(!this.character.currentHp) {
      hp = this.character.totalHp;
      console.log('current if-> ', hp);
    }

    hp = this.character.currentHp;

    if(newHp) {
      console.log('newhp if-> ', hp);
      hp = newHp;
    }
    console.log('after if-> ', hp);

    this.firestoreService.updateCharacter(this.character.id, {currentHp: hp});
    this.updateCharacter({
      ...this.character,
      currentHp: hp
    });
  }


  setCharacter() {
    if(!this.character.initiative) {
      const initiativeScore = this.scoreCalculatorService.calcAbilityMod(this.character.abilities.dex);

      this.firestoreService.updateCharacter(this.character.id, {initiative: initiativeScore});

      this.updateCharacter({
        ...this.character,
        initiative: initiativeScore
      });
    }

    this.initiative = this.scoreCalculatorService.addPlusSign(this.character.initiative);

    if(!this.character.proficiencyBonus) {
      const proficiencyBonusScore = this.scoreCalculatorService.calcAbilityMod(this.character.abilities.dex);
      this.firestoreService.updateCharacter(this.character.id, {initiative: proficiencyBonusScore});

      this.updateCharacter({
        ...this.character,
        proficiencyBonus: proficiencyBonusScore
      });
    }

    this.proficiencyBonus= this.scoreCalculatorService.addPlusSign(this.character.proficiencyBonus);
  }

  async hpAlert() {
    const alert = await this.alertController.create({
      header: 'Set your current Hitpoints',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
              console.log('Confirm Cancel');
          }
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

  async onClickHp() {
   this.hpAlert();
  }
}

