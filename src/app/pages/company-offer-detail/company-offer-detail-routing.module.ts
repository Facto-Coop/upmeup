import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyOfferDetailPage } from './company-offer-detail.page';

const routes: Routes = [
  {
    path: '',
    component: CompanyOfferDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyOfferDetailPageRoutingModule {}
