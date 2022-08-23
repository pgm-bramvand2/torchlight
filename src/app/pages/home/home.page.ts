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

  onChange(event) {
    console.log(event);

  }

  navigate(route: string) {
    console.log(route);
    this.router.navigate(['/', route]);
  }
}
