import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private menuController: MenuController,
    private navController: NavController
    ) {}

  async openMenu() {
    await this.menuController.open();
  }

  navigate(route: string) {
    this.navController.navigateForward(route);
  }
}
