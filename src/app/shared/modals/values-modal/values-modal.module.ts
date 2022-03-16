import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ValuesModalPageRoutingModule } from './values-modal-routing.module';

import { ValuesModalPage } from './values-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ValuesModalPageRoutingModule
  ],
  declarations: [ValuesModalPage]
})
export class ValuesModalPageModule {}
