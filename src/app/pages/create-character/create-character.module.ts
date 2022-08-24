import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateCharacterPageRoutingModule } from './create-character-routing.module';

import { CreateCharacterPage } from './create-character.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateCharacterPageRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [CreateCharacterPage]
})
export class CreateCharacterPageModule {}
