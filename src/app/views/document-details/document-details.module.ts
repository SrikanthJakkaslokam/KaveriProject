import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from '../../shared/shared.module';

import { DocumentDetailsRoutingModule } from './document-details-routing.module';
import { DocumentDetailsComponent } from './document-details/document-details.component';
import { AppFooterModule, AppHeaderModule } from '@coreui/angular';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { PropertyDetailsComponent } from './property-details/property-details.component';
import { PartyDetailsComponent } from './party-details/party-details.component';
import { PropertyScheduleDetailsComponent } from './property-schedule/property-schedule.component';
import { ValuationAndFeesComponent } from './valuation-and-fees/valuation-and-fees.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { DocumentSummaryComponent } from './document-summary/document-summary.component';
import { DocumentEndorsementComponent } from './document-endorsement/document-endorsement.component';
import { ScanUploadDocumentComponent } from './scan-upload-document/scan-upload-document.component';
import { AcknowledgementSlipComponent } from './acknowledgement-slip/acknowledgement-slip.component';
import { ScanDocumentComponent } from './scan-upload-document/scan-document/scan-document.component';
import { PreviewDocumentComponent } from './scan-upload-document/preview-document/preview-document.component';
import { UploadAllDocumentsComponent } from './scan-upload-document/upload-all-documents/upload-all-documents.component';

import { BrowserModule } from '@angular/platform-browser';
import { DocumentService } from './document.service';
import { DocRegdCompleteComponent } from './acknowledgement-slip/doc-regd-complete/doc-regd-complete.component';
import { SafehtmlPipe } from './safehtml.pipe';
import { AmountToWordPipe } from './pipes/amount-to-word/amount-to-word.pipe';

@NgModule({
  declarations: [
    // SafehtmlPipe,
    // AmountToWordPipe,
    DocumentDetailsComponent,
    PropertyDetailsComponent,
    PartyDetailsComponent,
    PropertyScheduleDetailsComponent,
    ValuationAndFeesComponent,
    PaymentDetailsComponent,
    DocumentSummaryComponent,
    DocumentEndorsementComponent,
    ScanUploadDocumentComponent,
    AcknowledgementSlipComponent,
    ScanDocumentComponent,
    PreviewDocumentComponent,
    UploadAllDocumentsComponent,
    DocRegdCompleteComponent,
  ],
  providers: [
    // DocumentService
  ],
  imports: [
    CommonModule,
    SharedModule,
    ModalModule,
    DocumentDetailsRoutingModule,
    MatStepperModule,
    MatIconModule,
    AppHeaderModule,
    AppFooterModule,
  ]
})
export class DocumentDetailsModule { }
