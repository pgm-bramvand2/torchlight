import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from '../app-routing.module';
import { sharedComponents } from './components';
import { FileSizePipe } from './pipes/file-size.pipe';

@NgModule({
    declarations: [...sharedComponents, FileSizePipe],
    imports: [
        CommonModule,
        IonicModule.forRoot(),
    ],
    exports: [...sharedComponents],
    providers: []
})
export class SharedModule {}
