import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompanyOfferDetailPageRoutingModule } from './company-offer-detail-routing.module';

import { CompanyOfferDetailPage } from './company-offer-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompanyOfferDetailPageRoutingModule
  ],
  declarations: [CompanyOfferDetailPage]
})
export class CompanyOfferDetailPageModule {}
