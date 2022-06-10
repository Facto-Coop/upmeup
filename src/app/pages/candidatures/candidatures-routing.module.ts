import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CandidaturesPage } from './candidatures.page';

const routes: Routes = [
  {
    path: '',
    component: CandidaturesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CandidaturesPageRoutingModule {}
