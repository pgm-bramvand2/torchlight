import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CharactersPage } from './pages/characters/characters.page';
import { HomePage } from './pages/home/home.page';
import { DefaultLayoutComponent } from './shared/components/layout/default/default.component';
import { AuthGuard } from './shared/guards/auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch:'full'},
  {
    // canActivate: [AuthGuard],
    path: 'character',
    loadChildren: () => import('./pages/character/character.module').then( m => m.CharacterPageModule)
  },
  {
    path: 'characters',
    loadChildren: () => import('./pages/characters/characters.module').then( m => m.CharactersPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'create-character',
    loadChildren: () => import('./pages/create-character/create-character.module').then( m => m.CreateCharacterPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, enableTracing: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
