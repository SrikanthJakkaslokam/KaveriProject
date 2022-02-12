import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DFAComponent } from './dfa/dfa.component';

const routes: Routes = [
  { path: '', component: DFAComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DFARoutingModule { }
