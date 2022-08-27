import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScoreCalculatorService {

  constructor() { }

  renderAbilityMod(score) {
    return this.addPlusSign(this.calcAbilityMod(score));
  }

  renderProficiencyBonus(level) {
    return this.addPlusSign(this.calcProficiencyMod(level));
  }

  calcAbilityMod(score) {
    return Math.floor((score -10) / 2);
  }

  calcProficiencyMod(level) {
    return Math.floor(2 + (0.25 * (level - 1)));
  }

  calcSavingThrow(score: number, level: number, bonus: string | null) {
    const mod = this.calcAbilityMod(score);

    if(bonus) {
      const saveBonus = this.calcProficiencyMod(level);
      return mod + saveBonus;
    }

    return mod;
  }

  addPlusSign(score) {
    if(score >= 0) {
      return `+ ${score}`;
    }

    return score.toString();
  }
}
