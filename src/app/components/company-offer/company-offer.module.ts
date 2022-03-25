import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompanyOfferPageRoutingModule } from './company-offer-routing.module';

import { CompanyOfferPage } from './company-offer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompanyOfferPageRoutingModule
  ],
  declarations: [CompanyOfferPage]
})
export class CompanyOfferPageModule {}
