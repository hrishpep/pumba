import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditorPage } from './editor.page';
import { SymptomComponent } from './symptom/symptom.component';

const routes: Routes = [
  {
    path: '',
    component: EditorPage
  },
  {
    path: 'sym/:id',
    component: SymptomComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditorPageRoutingModule {}
