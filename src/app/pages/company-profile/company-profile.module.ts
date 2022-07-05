import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CompanyProfilePageRoutingModule } from './company-profile-routing.module';
import { CompanyProfilePage } from './company-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CompanyProfilePageRoutingModule
  ],
  declarations: [CompanyProfilePage]
})
export class CompanyProfilePageModule {}
