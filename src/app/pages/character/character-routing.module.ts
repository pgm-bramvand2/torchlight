import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CharacterPage } from './character.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: CharacterPage,
    children: [
      {
        path: 'overview',
        loadChildren: () => import('./overview/overview.module').then( m => m.OverviewPageModule)
      },
      {
        path: 'actions',
        loadChildren: () => import('./actions/actions.module').then( m => m.ActionsPageModule)
      },
      {
        path: 'spells',
        loadChildren: () => import('./spells/spells.module').then( m => m.SpellsPageModule)
      },
      {
        path: 'inventory',
        loadChildren: () => import('./inventory/inventory.module').then( m => m.InventoryPageModule)
      },
      {
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
