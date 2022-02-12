import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterValuationComponent } from './master-valuation/master-valuation.component';

const routes: Routes = [
  { path: '', component: MasterValuationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterValuationRoutingModule { }
