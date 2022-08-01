import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TagInputModule } from 'ngx-chips';

import { EditOfferPageRoutingModule } from './edit-offer-routing.module';
import { EditOfferPage } from './edit-offer.page';

@NgModule({
  imports: [
    CommonModule,
    TagInputModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditOfferPageRoutingModule
  ],
  declarations: [EditOfferPage]
})
export class EditOfferPageModule {}
