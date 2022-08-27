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
  skills$ = this.apiService.getCharacterSkills().pipe(
    tap(console.log)
    );



  constructor(
    private localStorageService: LocalstorageService,
    private scoreCalculatorService: ScoreCalculatorService,
    private apiService: ApiService
    ) { }

    ngOnInit() {
  }

  calcMod(score) {
    return this.scoreCalculatorService.renderAbilityMod(score) ;
  }

  calcSavingThrow(ability){
    const bonus = this.character.abilityProficiencies.find(prof => prof === ability);

    return this.scoreCalculatorService.calcSavingThrow(this.character.abilities[ability] ,this.character.level, bonus) ;
  }

  checkSkillProficiency(skill) {
    return this.character.proficiencies.includes(skill);
  }

  calcSkillCheckBonus(skill) {
   const mod = this.scoreCalculatorService.renderAbilityMod(this.character.abilities[skill.ability_score.index]);
   const bonus = this.scoreCalculatorService.calcProficiencyMod(this.character.level);

   return mod + bonus;
  }

  onChange(event) {
    this.subject = event.detail.value;
  }
}
