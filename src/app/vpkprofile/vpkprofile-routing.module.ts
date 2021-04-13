import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VpkprofilePage } from './vpkprofile.page';

const routes: Routes = [
  {
    path: '',
    component: VpkprofilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VpkprofilePageRoutingModule {}
