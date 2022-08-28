import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent implements OnInit {

  constructor(
    private menuCtrl: MenuController,
    private navController: NavController
    ) { }

  ngOnInit() {}

  onOpenMenu() {
    this.menuCtrl.open('main');
  }

  navigate(path){
    this.navController.navigateForward(path);
  }

}
