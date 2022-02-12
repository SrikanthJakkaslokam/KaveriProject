import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DFARoutingModule } from './dfa-routing.module';
import { DFAComponent } from './dfa/dfa.component';
import { MatIconModule } from '@angular/material/icon';
import { AppHeaderModule, AppFooterModule } from '@coreui/angular';
import { SharedModule } from '../../shared/shared.module';
import { DxPopupModule, DxScrollViewModule, DxTemplateModule } from 'devextreme-angular';
import { NonAgricultureComponent } from './non-agriculture/non-agriculture.component';
import { FeeCalculationComponent } from './fee-calculation/fee-calculation.component';


@NgModule({
  declarations: [
    DFAComponent,
    NonAgricultureComponent,
    FeeCalculationComponent
  ],
  imports: [
    CommonModule,
    DFARoutingModule,
    AppHeaderModule,
    AppFooterModule,
    SharedModule,
    DxPopupModule,
    DxScrollViewModule,
    DxTemplateModule,
    MatIconModule
  ]
})
export class DFAModule { }
