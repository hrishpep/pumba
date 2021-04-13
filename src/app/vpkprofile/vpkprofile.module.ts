import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VpkprofilePageRoutingModule } from './vpkprofile-routing.module';

import { VpkprofilePage } from './vpkprofile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VpkprofilePageRoutingModule
  ],
  declarations: [VpkprofilePage]
})
export class VpkprofilePageModule {}
