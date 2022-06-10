import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CandidaturesPageRoutingModule } from './candidatures-routing.module';

import { CandidaturesPage } from './candidatures.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CandidaturesPageRoutingModule
  ],
  declarations: [CandidaturesPage]
})
export class CandidaturesPageModule {}
