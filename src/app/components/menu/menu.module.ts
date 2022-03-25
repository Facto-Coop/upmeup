/*import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuPageRoutingModule } from './menu-routing.module';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: 'menu',
    component: MenuPage,
    children: [
      {
        path: 'access',
        loadChildren: () => import('../access/access.module').then( m => m.AccessPageModule)
      },
      {
        path: 'login',
        loadChildren: () => import('../login/login.module').then( m => m.LoginPageModule)
      },
      {
        path: 'home',
        loadChildren: () => import('../../home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'offer-list',
        loadChildren: () => import('../offer-list/offer-list.module').then( m => m.OfferListPageModule)
      },
      {
        path: 'offer-detail/:id',
        loadChildren: () => import('../offer-detail/offer-detail.module').then( m => m.OfferDetailPageModule)
      },
      {
        path: 'user-profile',
        loadChildren: () => import('../user-profile/user-profile.module').then( m => m.UserProfilePageModule)
      },
      {
        path: 'entity-list',
        loadChildren: () => import('../entity-list/entity-list.module').then( m => m.EntityListPageModule)
      },
      {
        path: 'values-modal',
        loadChildren: () => import('../../shared/modals/values-modal/values-modal.module').then( m => m.ValuesModalPageModule)
      },
      {
        path: 'company-profile',
        loadChildren: () => import('../company-profile/company-profile.module').then( m => m.CompanyProfilePageModule)
      },
      {
        path: 'menu',
        loadChildren: () => import('../menu/menu.module').then( m => m.MenuPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuPageRoutingModule
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
*/