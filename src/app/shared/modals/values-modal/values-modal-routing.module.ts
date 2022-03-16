import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValuesModalPage } from './values-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ValuesModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ValuesModalPageRoutingModule {}
