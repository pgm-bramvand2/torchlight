import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth/auth.guard';
import { CharacterGuard } from 'src/app/shared/guards/character-guard/character-guard.guard';

import { CharacterPage } from './character.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: CharacterPage,
    children: [
      {
        canActivate: [AuthGuard, CharacterGuard],
        path: 'overview',
        loadChildren: () => import('./overview/overview.module').then( m => m.OverviewPageModule)
      },
      {
        canActivate: [AuthGuard, CharacterGuard],
        path: 'actions',
        loadChildren: () => import('./actions/actions.module').then( m => m.ActionsPageModule)
      },
      {
        canActivate: [AuthGuard, CharacterGuard],
        path: 'spells',
        loadChildren: () => import('./spells/spells.module').then( m => m.SpellsPageModule)
      },
      {
        canActivate: [AuthGuard, CharacterGuard],
        path: 'inventory',
        loadChildren: () => import('./inventory/inventory.module').then( m => m.InventoryPageModule)
      },
      {
        canActivate: [AuthGuard],
        path:'',
        redirectTo:'/character/tabs/overview',
        pathMatch: 'full'
      },
    ]
  },
  {
    path:'',
    redirectTo:'/character/tabs/overview',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CharacterPageRoutingModule {}
