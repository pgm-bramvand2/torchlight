import { Component, OnInit } from '@angular/core';
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
  // Get character object from local storage
  character = this.localStorageService.getStorageItem('character');

  constructor(
    private localStorageService: LocalstorageService,
    private scoreCalculatorService: ScoreCalculatorService,
    private diceRollerService: DiceRollerService,
  ) { }

  ngOnInit() {
  }

  // Calculate to hit roll and return the result with the appropriate prefix
  calcToHit(ability){
    // Calculate the ability modifier
    const abilityMod = this.scoreCalculatorService.calcAbilityMod(this.character.abilities[ability]);

    return this.scoreCalculatorService.addPlusSign(abilityMod + this.character.proficiencyBonus);
  }

  // Calculate the on hit roll
  onRollToHitClick(bonus) {
    this.diceRollerService.showDiceRollAlert(bonus);
  }

  // Calculate the damage roll
  onRollDamageClick(bonus) {
    this.diceRollerService.showDamageRollAlert(bonus, this.character.proficiencyBonus);
  }
}
