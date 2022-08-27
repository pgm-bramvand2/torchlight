import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { LocalstorageService } from 'src/app/shared/services/localstorage/localstorage.service';
import { tap } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-spells',
  templateUrl: './spells.page.html',
  styleUrls: ['./spells.page.scss'],
})
export class SpellsPage implements OnInit {
  character = this.localstorageService.getStorageItem('character');
  spells$ = this.apiService.getCharacterSpells(this.character.class, this.character.level).pipe();
  currentSpell;

  constructor(
    private localstorageService: LocalstorageService,
    private apiService: ApiService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }

  async presentAlertConfirm(spell) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: spell.name,
      message: spell.desc[0],
      buttons: ['close'],
    });

    await alert.present();
  }

  onClickSpell(spellIndex: string) {
  this.apiService.getCharacterSpell(spellIndex).pipe(
    ).subscribe(data => this.presentAlertConfirm(data));
  }

}
