import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private menuCtrl: MenuController) {}

  async openMenu() {
    await this.menuCtrl.open();
  }

  onChange(event) {
    console.log(event);

  }
}
