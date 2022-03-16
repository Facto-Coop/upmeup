import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyProfilePage } from './company-profile.page';

const routes: Routes = [
  {
    path: '',
    component: CompanyProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyProfilePageRoutingModule {}
