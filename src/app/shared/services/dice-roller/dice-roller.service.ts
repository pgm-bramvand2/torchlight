import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DiceRollerService {

  constructor(
    private alertController: AlertController
  ) { }

  dieRoll(max: number, min: number = 1 ) {
    return min + Math.floor(Math.random()* (max - min + 1));
  }

  diceRoll( die: number, bonus: number = 0, amount: number= 1) {
    const roll = this.dieRoll(die);
    const total = roll + bonus;

    return {total, roll};
  }

  async diceRollAlert(bonus: number, die: number, roll, amount: number = 1) {
    const alert = await this.alertController.create({
      cssClass: 'diceroll-alert',
      header: `You rolled ${amount} D${die} and got :`,
      message: `
      <span>
        ${roll.roll} ${bonus < 0 ? bonus : '+ ' + bonus } =
      </span>
      
      <span class='diceroll-total'>
        ${roll.total}
      </span>

      `,
      buttons: ['close'],
    });

    await alert.present();
  }

  showDiceRollAlert(bonus){
    bonus = bonus.srcElement.innerText;
    let amount: number;
    if(bonus.includes('D')) {
      const splitString = bonus.split('D');
      bonus = splitString[1];
      amount = Number(splitString[0]);
    }

    bonus = Number(bonus);
    const die= 20;
    const roll = this.diceRoll(die, bonus);

    this.diceRollAlert(bonus, die, roll , amount);
  }

  showDamageRollAlert(dice, bonus) {
    dice = dice.srcElement.innerText;
    let amount: number;
    let die: number;

    if(dice.includes('D')) {
      const splitString = dice.split('D');
      die = splitString[1];
      amount = Number(splitString[0]);
    }

    die = Number(die);
    const roll = this.diceRoll(die, bonus, amount );

    this.diceRollAlert(bonus, die, roll , amount);
  }
}
