import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyOfferPage } from './company-offer.page';

const routes: Routes = [
  {
    path: '',
    component: CompanyOfferPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyOfferPageRoutingModule {}
