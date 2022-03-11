import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OfferListPage } from './offer-list.page';

const routes: Routes = [
  {
    path: '',
    component: OfferListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfferListPageRoutingModule {}
