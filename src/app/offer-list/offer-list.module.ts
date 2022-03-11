import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OfferListPageRoutingModule } from './offer-list-routing.module';

import { OfferListPage } from './offer-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OfferListPageRoutingModule
  ],
  declarations: [OfferListPage]
})
export class OfferListPageModule {}
