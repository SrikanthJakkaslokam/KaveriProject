import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterValuationRoutingModule } from './master-valuation-routing.module';
import { MasterValuationComponent } from './master-valuation/master-valuation.component';
import { AppFooterModule, AppHeaderModule } from '@coreui/angular';
import { SharedModule } from '../../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    MasterValuationComponent,

  ],
  imports: [
    CommonModule,
    MasterValuationRoutingModule,
    AppHeaderModule,
    AppFooterModule,
    SharedModule,
    MatIconModule
  ]
})
export class MasterValuationModule { }
