import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntityListPageModule } from '../entity-list/entity-list.module';
import { CompanyProfilePage } from './company-profile.page';

const routes: Routes = [
  {
    path: '',
    component: CompanyProfilePage,
    children: [
      {
          path: 'values-modal',
          component: EntityListPageModule
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyProfilePageRoutingModule {}
