import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from '../app-routing.module';
import { sharedComponents } from './components';

@NgModule({
    declarations: [...sharedComponents],
    imports: [
        CommonModule,
        IonicModule.forRoot(),
    ],
    exports: [...sharedComponents],
    providers: []
})
export class SharedModule {}
