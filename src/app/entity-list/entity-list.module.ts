import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntityListPageRoutingModule } from './entity-list-routing.module';

import { EntityListPage } from './entity-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntityListPageRoutingModule
  ],
  declarations: [EntityListPage]
})
export class EntityListPageModule {}
