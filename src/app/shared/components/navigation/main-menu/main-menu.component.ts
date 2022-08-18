import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent implements OnInit {

  constructor(
    private menuCtrl: MenuController,
    private router: Router
    ) { }

  ngOnInit() {}

  onOpenMenu() {
    this.menuCtrl.open('main');
  }

  navigate(path){
    this.router.navigate(['/', path]);
  }

}
