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
    this.setCharacter();
    this.setCurrentHp();
    this.initiative = this.scoreCalculatorService.addPlusSign(this.character.initiative);
    this.proficiencyBonus= this.scoreCalculatorService.addPlusSign(this.character.proficiencyBonus);
  }


  setCurrentHp() {
    if(!this.character.currentHp) {
      this.firestoreService.updateCharacter(this.character.id, {currentHp: this.character.totalHp});
      this.localStorageService.setStorageItem('character', {
        ...this.character,
        currentHp: this.character.totalHp
      });
    }
  }

  setCharacter() {
    const scores = {
      initiative: this.scoreCalculatorService.calcAbilityMod(this.character.abilities.dex),
      proficiencyBonus: this.scoreCalculatorService.calcProficiencyMod(this.character.level),
    };

    this.firestoreService.updateCharacter(this.character.id, { ...scores });

    this.localStorageService.setStorageItem('character', {
      ...this.character,
      ...scores
    });
  }
}
