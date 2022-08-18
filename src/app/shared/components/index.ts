import { TabBarComponent } from './navigation/tab-bar/tab-bar.component';
import { MainMenuComponent } from './navigation/main-menu/main-menu.component';
import { DefaultLayoutComponent } from './layout/default/default.component';
import { CharacterBarComponent } from './character-bar/character-bar.component';
import { PassiveStatComponent } from './passive-stat/passive-stat.component';
import { InspirationButtonComponent } from './inspiration-button/inspiration-button.component';
import { commonComponents } from './common';


export const sharedComponents = [
    MainMenuComponent,
    TabBarComponent,
    DefaultLayoutComponent,
    CharacterBarComponent,
    PassiveStatComponent,
    InspirationButtonComponent,
    ...commonComponents
];
