import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntityListPage } from './entity-list.page';

const routes: Routes = [
  {
    path: '',
    component: EntityListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntityListPageRoutingModule {}
