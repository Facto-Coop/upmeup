import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'access',
    loadChildren: () => import('./pages/access/access.module').then( m => m.AccessPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'offer-list',
    loadChildren: () => import('./pages/offer-list/offer-list.module').then( m => m.OfferListPageModule)
  },
  {
    path: 'offer-detail/:id',
    loadChildren: () => import('./pages/offer-detail/offer-detail.module').then( m => m.OfferDetailPageModule)
  },
  {
    path: 'user-profile',
    loadChildren: () => import('./pages/user-profile/user-profile.module').then( m => m.UserProfilePageModule)
  },
  {
    path: 'entity-list',
    loadChildren: () => import('./pages/entity-list/entity-list.module').then( m => m.EntityListPageModule)
  },
  {
    path: 'values-modal',
    loadChildren: () => import('./shared/modals/values-modal/values-modal.module').then( m => m.ValuesModalPageModule)
  },
  {
    path: 'company-profile',
    loadChildren: () => import('./pages/company-profile/company-profile.module').then( m => m.CompanyProfilePageModule)
  },
  {
    path: 'company-offer',
    loadChildren: () => import('./pages/company-offer/company-offer.module').then( m => m.CompanyOfferPageModule)
  },
  {
    path: 'company-offer-detail/:id',
    loadChildren: () => import('./pages/company-offer-detail/company-offer-detail.module').then( m => m.CompanyOfferDetailPageModule)
  },
  {
    path: 'create-offer',
    loadChildren: () => import('./pages/create-offer/create-offer.module').then( m => m.CreateOfferPageModule)
  },  {
    path: 'edit-offer',
    loadChildren: () => import('./pages/edit-offer/edit-offer.module').then( m => m.EditOfferPageModule)
  },
  {
    path: 'candidatures',
    loadChildren: () => import('./pages/candidatures/candidatures.module').then( m => m.CandidaturesPageModule)
  },






 /*{
    path: 'menu',
    loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule)
  },*/

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
