import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpellsPageRoutingModule } from './spells-routing.module';

import { SpellsPage } from './spells.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpellsPageRoutingModule
  ],
  declarations: [SpellsPage]
})
export class SpellsPageModule {}
