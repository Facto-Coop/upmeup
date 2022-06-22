import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CompanyOfferPageRoutingModule } from './company-offer-routing.module';

import { CompanyOfferPage } from './company-offer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CompanyOfferPageRoutingModule
  ],
  declarations: [CompanyOfferPage]
})
export class CompanyOfferPageModule {}
