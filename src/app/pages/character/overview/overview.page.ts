import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { DiceRollerService } from 'src/app/shared/services/dice-roller/dice-roller.service';
import { LocalstorageService } from 'src/app/shared/services/localstorage/localstorage.service';
import { ScoreCalculatorService } from 'src/app/shared/services/score-calculator/score-calculator.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.page.html',
  styleUrls: ['./overview.page.scss'],
})
export class OverviewPage implements OnInit {
  character = this.localStorageService.getStorageItem('character');
  senses = [
    {
      name: 'passive perception',
      score: this.scoreCalculatorService.calcAbilityMod(this.character.abilities.wis)
    },
    {
      name: 'passive investigation',
      score: this.scoreCalculatorService.calcAbilityMod(this.character.abilities.int)
    },
    {
      name: 'insight',
      score: this.scoreCalculatorService.calcAbilityMod(this.character.abilities.wis)
    }
  ];

  subject = 'abilities';
  abilities$ = this.apiService.getCharacterAbilities().pipe();
  characterAbilitiesLoading$ = this.apiService.loadingAbilities;
  skills$ = this.apiService.getCharacterSkills().pipe();
  characterSkillsLoading$ = this.apiService.loadingSkills;
  characterProficiencies$ = this.apiService.getCharacterClassProficiencies(this.character.class).pipe();
  characterProficienciesLoading$ = this.apiService.loadingProficiencies;



  constructor(
    private localStorageService: LocalstorageService,
    private scoreCalculatorService: ScoreCalculatorService,
    private apiService: ApiService,
    private diceRollerService: DiceRollerService,
  ) { }

  ngOnInit() {}

  calcMod(score) {
    return this.scoreCalculatorService.renderAbilityMod(score) ;
  }

  calcSavingThrow(ability){
    const bonus = this.character.abilityProficiencies.find(prof => prof === ability);
    const savingThrow = this.scoreCalculatorService.calcSavingThrow(this.character.abilities[ability] ,this.character.level, bonus);
    return this.scoreCalculatorService.addPlusSign(savingThrow);
  }

  checkSkillProficiency(skill) {
    return this.character.proficiencies.includes(skill);
  }

  calcSkillCheckBonus(skill) {
    const mod: number = this.scoreCalculatorService.calcAbilityMod(this.character.abilities[skill.ability_score.index]);
    const bonus: number = this.scoreCalculatorService.calcProficiencyMod(this.character.level);

    return this.scoreCalculatorService.addPlusSign(mod + bonus);
  }

  onClickDiceRoll(bonus){
    this.diceRollerService.showDiceRollAlert(bonus);
  }

  onChange(event) {
    this.subject = event.detail.value;
  }
}
