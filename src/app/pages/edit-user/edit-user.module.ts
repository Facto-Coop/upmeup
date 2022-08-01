import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TagInputModule } from 'ngx-chips';

import { EditUserPageRoutingModule } from './edit-user-routing.module';
import { EditUserPage } from './edit-user.page';

@NgModule({
  imports: [
    CommonModule,
    TagInputModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditUserPageRoutingModule
  ],
  declarations: [EditUserPage]
})
export class EditUserPageModule {}
