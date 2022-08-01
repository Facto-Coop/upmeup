import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TagInputModule } from 'ngx-chips';

import { CompanyOfferDetailPageRoutingModule } from './company-offer-detail-routing.module';
import { CompanyOfferDetailPage } from './company-offer-detail.page';

@NgModule({
  imports: [
    CommonModule,
    TagInputModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CompanyOfferDetailPageRoutingModule
  ],
  declarations: [CompanyOfferDetailPage]
})
export class CompanyOfferDetailPageModule {}
