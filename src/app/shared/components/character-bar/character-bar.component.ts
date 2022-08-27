import { Component, Input, OnInit } from '@angular/core';
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
  ) { }

  ngOnInit() {
    this.character = this.localStorageService.getStorageItem('character');
    this.setCurrentHp();
    this.setCharacter();
  }

  updateCharacter(character) {
    this.localStorageService.setStorageItem('character', character);
    this.character = character;
  }


  setCurrentHp() {
    if(!this.character.currentHp) {
      this.firestoreService.updateCharacter(this.character.id, {currentHp: this.character.totalHp});
      this.updateCharacter({
        ...this.character,
        currentHp: this.character.totalHp
      });
    }
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

}
