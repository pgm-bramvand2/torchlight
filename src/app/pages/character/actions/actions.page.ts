import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { DiceRollerService } from 'src/app/shared/services/dice-roller/dice-roller.service';
import { LocalstorageService } from 'src/app/shared/services/localstorage/localstorage.service';
import { ScoreCalculatorService } from 'src/app/shared/services/score-calculator/score-calculator.service';
import weapons from './mock/weapons.json';
@Component({
  selector: 'app-actions',
  templateUrl: './actions.page.html',
  styleUrls: ['./actions.page.scss'],
})
export class ActionsPage implements OnInit {
  weapons= weapons;
  character = this.localStorageService.getStorageItem('character');

  constructor(
    private localStorageService: LocalstorageService,
    private scoreCalculatorService: ScoreCalculatorService,
    private diceRollerService: DiceRollerService,
  ) { }

  ngOnInit() {
  }

  calcToHit(ability){
    const abilityMod = this.scoreCalculatorService.calcAbilityMod(this.character.abilities[ability]);
    const proficiencyMod = this.scoreCalculatorService.calcProficiencyMod(this.character.level);

    return this.scoreCalculatorService.addPlusSign(abilityMod + proficiencyMod);
  }

  onRollToHitClick(bonus) {
    this.diceRollerService.showDiceRollAlert(bonus);
  }

  onRollDamageClick(bonus) {
    this.diceRollerService.showDiceRollAlert(bonus);
  }
}
