import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth/auth.guard';

import { CharacterPage } from './character.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: CharacterPage,
    children: [
      {
        canActivate: [AuthGuard],
        path: 'overview',
        loadChildren: () => import('./overview/overview.module').then( m => m.OverviewPageModule)
      },
      {
        canActivate: [AuthGuard],
        path: 'actions',
        loadChildren: () => import('./actions/actions.module').then( m => m.ActionsPageModule)
      },
      {
        canActivate: [AuthGuard],
        path: 'spells',
        loadChildren: () => import('./spells/spells.module').then( m => m.SpellsPageModule)
      },
      {
        canActivate: [AuthGuard],
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
