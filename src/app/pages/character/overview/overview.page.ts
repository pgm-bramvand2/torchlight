import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { LocalstorageService } from 'src/app/shared/services/localstorage/localstorage.service';
import { ScoreCalculatorService } from 'src/app/shared/services/score-calculator/score-calculator.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.page.html',
  styleUrls: ['./overview.page.scss'],
})
export class OverviewPage implements OnInit {
  abilities = [
    {
      index: 'str',
      name: 'Strength'
    },
    {
      index: 'dex',
      name: 'Dexterity'
    },
    {
      index: 'con',
      name: 'Constitution'
    },
    {
      index: 'int',
      name: 'Intelligence'
    },
    {
      index: 'wis',
      name: 'Wisdom'
    },
    {
      index: 'cha',
      name: 'Charisma'
    },
  ];

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
  skills$ = this.apiService.getCharacterSkills().pipe();
  characterProficiencies$ = this.apiService.getCharacterClassProficiencies(this.character.class).pipe();



  constructor(
    private localStorageService: LocalstorageService,
    private scoreCalculatorService: ScoreCalculatorService,
    private apiService: ApiService
    ) { }

    ngOnInit() {
      console.log(this.characterProficiencies$);
  }

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

  onChange(event) {
    this.subject = event.detail.value;
  }
}
