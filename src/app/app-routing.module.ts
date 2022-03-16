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
    loadChildren: () => import('./components/access/access.module').then( m => m.AccessPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./components/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'offer-list',
    loadChildren: () => import('./components/offer-list/offer-list.module').then( m => m.OfferListPageModule)
  },
  {
    path: 'offer-detail/:id',
    loadChildren: () => import('./components/offer-detail/offer-detail.module').then( m => m.OfferDetailPageModule)
  },
  {
    path: 'user-profile',
    loadChildren: () => import('./components/user-profile/user-profile.module').then( m => m.UserProfilePageModule)
  },
  {
    path: 'entity-list',
    loadChildren: () => import('./components/entity-list/entity-list.module').then( m => m.EntityListPageModule)
  },
  {
    path: 'values-modal',
    loadChildren: () => import('./shared/modals/values-modal/values-modal.module').then( m => m.ValuesModalPageModule)
  },
  {
    path: 'company-profile',
    loadChildren: () => import('./components/company-profile/company-profile.module').then( m => m.CompanyProfilePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
