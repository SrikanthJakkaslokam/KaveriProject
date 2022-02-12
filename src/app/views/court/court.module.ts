import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourtRoutingModule } from './court-routing.module';
import { CourtComponent } from './court/court.component';
import { CourtOrderComponent } from './court-order/court-order.component';
import { EditCourtOrderComponent } from './edit-court-order/edit-court-order.component';
import { CancelCourtOrderComponent } from './cancel-court-order/cancel-court-order.component';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { AppHeaderModule, AppFooterModule } from '@coreui/angular';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from '../../shared/shared.module';
import { MatExpansionModule } from '@angular/material/expansion';


@NgModule({
  declarations: [
    CourtComponent,
    CourtOrderComponent,
    EditCourtOrderComponent,
    CancelCourtOrderComponent
  ],
  imports: [
    CommonModule,
    CourtRoutingModule,
    SharedModule,
    ModalModule,
    MatStepperModule,
    MatIconModule,
    AppHeaderModule,
    AppFooterModule,
    MatExpansionModule,
  ]
})
export class CourtModule { }
