import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { DiceRollerService } from 'src/app/shared/services/dice-roller/dice-roller.service';
import { LocalstorageService } from 'src/app/shared/services/localstorage/localstorage.service';
import { ScoreCalculatorService } from 'src/app/shared/services/score-calculator/score-calculator.service';

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

  // Keep track of the subject to show the correct content
  subject = 'abilities';

  // Get the abilities list from the api and keep track of the loading state
  abilities$ = this.apiService.getCharacterAbilities().pipe();
  characterAbilitiesLoading$ = this.apiService.loadingAbilities;

  // Get the skills list from the api and keep track of the loading state
  skills$ = this.apiService.getCharacterSkills().pipe();
  characterSkillsLoading$ = this.apiService.loadingSkills;

  // Get the proficiencies list from the api and keep track of the loading state
  characterProficiencies$ = this.apiService.getCharacterClassProficiencies(this.character.class).pipe();
  characterProficienciesLoading$ = this.apiService.loadingProficiencies;



  constructor(
    private localStorageService: LocalstorageService,
    private scoreCalculatorService: ScoreCalculatorService,
    private apiService: ApiService,
    private diceRollerService: DiceRollerService,
  ) { }

  ngOnInit() {}

  // Calculate the ability modifier corresponding to the right ability score
  calcMod(score) {
    return this.scoreCalculatorService.renderAbilityMod(score) ;
  }

  // Calculate the saving throuw corresponding to the right ability score
  calcSavingThrow(ability){
    // Check if character has proficiencies in the ability
    const bonus = this.character.abilityProficiencies.find(prof => prof === ability);
    // Calculate the saving throw
    const savingThrow = this.scoreCalculatorService.calcSavingThrow(this.character.abilities[ability] ,this.character.level, bonus);

    // Return the saving throw with prefix
    return this.scoreCalculatorService.addPlusSign(savingThrow);
  }

  // Check if character has proficiencies for the skill
  checkSkillProficiency(skill) {
    return this.character.proficiencies.includes(skill);
  }

  // Calculate the skill check bonus to the corresponding skill
  calcSkillCheckBonus(skill) {
    // Calculate the ability proficiency modifier
    const mod: number = this.scoreCalculatorService.calcAbilityMod(this.character.abilities[skill.ability_score.index]);

    // Return the bonus with prefix
    return this.scoreCalculatorService.addPlusSign(mod + this.character.proficiencyBonus);
  }

  // Handle the dice roll on click event by showing an alert with the diceroll result
  onClickDiceRoll(bonus){
    this.diceRollerService.showDiceRollAlert(bonus);
  }

  // Handle selection of subject
  onSubjectChange(subject) {
    // Set the current subject to the selected subject
    this.subject = subject.detail.value;
  }
}
