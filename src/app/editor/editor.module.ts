import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditorPageRoutingModule } from './editor-routing.module';

import { EditorPage } from './editor.page';
import { SymptomComponent } from './symptom/symptom.component'
import { OptionComponent } from './option/option.component'
import { RangeComponent } from './range/range.component'

@NgModule({
  declarations: [SymptomComponent, OptionComponent, RangeComponent, EditorPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditorPageRoutingModule
  ],
})
export class EditorPageModule {}
