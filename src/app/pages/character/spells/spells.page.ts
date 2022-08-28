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
  // Get the character from the local storage
  character = this.localstorageService.getStorageItem('character');
  // Get the spells list from the api
  spells$ = this.apiService.getCharacterSpells(this.character.class, this.character.level).pipe();
  // Keep track of the currently selected spell
  currentSpell;

  constructor(
    private localstorageService: LocalstorageService,
    private apiService: ApiService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }

  // Create an alert with the currently selected spell info
  async showSpellInfoAlert(spell) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: spell.name,
      message: spell.desc[0],
      buttons: ['close'],
    });

    await alert.present();
  }

  // Handle the spell item on click event
  onClickSpell(spellIndex: string) {
  // Get the specific spell from the api and transfer the data to the alert function
  this.apiService.getCharacterSpell(spellIndex).pipe(
    ).subscribe(data => this.showSpellInfoAlert(data));
  }

}
