import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntityListPageModule } from '../entity-list/entity-list.module';
import { UserProfilePage } from './user-profile.page';

const routes: Routes = [
  {
    path: '',
    component: UserProfilePage,
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
export class UserProfilePageRoutingModule {}
