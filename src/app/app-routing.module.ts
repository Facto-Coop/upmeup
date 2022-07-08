import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canLoad: [AuthService],
    canActivate: [AuthService]
  },
  {
    path: 'offer-list',
    loadChildren: () => import('./pages/offer-list/offer-list.module').then( m => m.OfferListPageModule),
    canLoad: [AuthService],
    canActivate: [AuthService]
  },
  {
    path: 'offer-detail/:id',
    loadChildren: () => import('./pages/offer-detail/offer-detail.module').then( m => m.OfferDetailPageModule),
    canLoad: [AuthService],
    canActivate: [AuthService]
  },
  {
    path: 'user-profile',
    loadChildren: () => import('./pages/user-profile/user-profile.module').then( m => m.UserProfilePageModule),
    canLoad: [AuthService],
    canActivate: [AuthService]
  },
  {
    path: 'entity-list',
    loadChildren: () => import('./pages/entity-list/entity-list.module').then( m => m.EntityListPageModule),
    canLoad: [AuthService],
    canActivate: [AuthService]
  },
  {
    path: 'values-modal',
    loadChildren: () => import('./shared/modals/values-modal/values-modal.module').then( m => m.ValuesModalPageModule),
  },
  {
    path: 'company-profile',
    loadChildren: () => import('./pages/company-profile/company-profile.module').then( m => m.CompanyProfilePageModule),
    canLoad: [AuthService],
    canActivate: [AuthService]
  },
  {
    path: 'company-offer',
    loadChildren: () => import('./pages/company-offer/company-offer.module').then( m => m.CompanyOfferPageModule),
    canLoad: [AuthService],
    canActivate: [AuthService]
  },
  {
    path: 'company-offer-detail/:id',
    loadChildren: () => import('./pages/company-offer-detail/company-offer-detail.module').then( m => m.CompanyOfferDetailPageModule),
    canLoad: [AuthService],
    canActivate: [AuthService]
  },
  {
    path: 'candidatures',
    loadChildren: () => import('./pages/candidatures/candidatures.module').then( m => m.CandidaturesPageModule),
    canActivate: [AuthService]
  },
  {
    path: 'edit-user',
    loadChildren: () => import('./pages/edit-user/edit-user.module').then( m => m.EditUserPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
