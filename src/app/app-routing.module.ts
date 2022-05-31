import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./components/pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'characters',
    loadChildren: () => import('./components/pages/characters/characters.module').then( m => m.CharactersPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./components/pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./components/pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'character',
    loadChildren: () => import('./components/pages/character/character.module').then( m => m.CharacterPageModule)
  },
  {
    path: 'actions',
    loadChildren: () => import('./components/pages/actions/actions.module').then( m => m.ActionsPageModule)
  },
  {
    path: 'spells',
    loadChildren: () => import('./components/pages/spells/spells.module').then( m => m.SpellsPageModule)
  },
  {
    path: 'inventory',
    loadChildren: () => import('./components/pages/inventory/inventory.module').then( m => m.InventoryPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./components/pages/settings/settings.module').then( m => m.SettingsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
