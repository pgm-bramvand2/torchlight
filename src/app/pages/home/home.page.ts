import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private menuCtrl: MenuController,
    private router: Router
    ) {}

  async openMenu() {
    await this.menuCtrl.open();
  }

  navigate(route: string) {
    this.router.navigate(['/', route]);
  }
}
