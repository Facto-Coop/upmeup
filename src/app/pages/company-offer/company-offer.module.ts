import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TagInputModule } from 'ngx-chips';

import { CompanyOfferPageRoutingModule } from './company-offer-routing.module';
import { CompanyOfferPage } from './company-offer.page';

@NgModule({
  imports: [
    CommonModule,
    TagInputModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CompanyOfferPageRoutingModule
  ],
  declarations: [CompanyOfferPage]
})
export class CompanyOfferPageModule {}
