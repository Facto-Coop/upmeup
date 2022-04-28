import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CreateOfferPageRoutingModule } from './create-offer-routing.module';
import { CreateOfferPage } from './create-offer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreateOfferPageRoutingModule
  ],
  declarations: [CreateOfferPage]
})
export class CreateOfferPageModule {}
