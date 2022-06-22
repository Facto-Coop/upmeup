import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyOfferPage } from './company-offer.page';
import { CreateOfferPageModule } from './../create-offer/create-offer.module';
import { EditOfferPageModule } from '../edit-offer/edit-offer.module';

const routes: Routes = [
  {
    path: '',
    component: CompanyOfferPage,
    children: [
      {
          path: 'create',
          component: CreateOfferPageModule
      },
      {
          path: 'edit',
          component: EditOfferPageModule
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyOfferPageRoutingModule {}
