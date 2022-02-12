import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentDetailsComponent } from './document-details/document-details.component';
import { PartyDetailsComponent } from './party-details/party-details.component';
import { PropertyDetailsComponent } from './property-details/property-details.component';
import { PropertyScheduleDetailsComponent } from './property-schedule/property-schedule.component';
import { ValuationAndFeesComponent } from './valuation-and-fees/valuation-and-fees.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { DocumentSummaryComponent } from './document-summary/document-summary.component';
import { DocumentEndorsementComponent } from './document-endorsement/document-endorsement.component';
import { ScanUploadDocumentComponent } from './scan-upload-document/scan-upload-document.component';
import { AcknowledgementSlipComponent } from './acknowledgement-slip/acknowledgement-slip.component';
// import { PartyEkycComponent } from './party-ekyc/party-ekyc.component';

const routes: Routes = [
  { path: '', component: DocumentDetailsComponent, children: [
    { path: 'property-details', component: PropertyDetailsComponent },
    { path: 'property-schedule', component: PropertyScheduleDetailsComponent },
    { path: 'party-details', component: PartyDetailsComponent },
    { path: 'valuation', component: ValuationAndFeesComponent },
    { path: 'payment-details', component: PaymentDetailsComponent },
    { path: 'summary', component: DocumentSummaryComponent },
    { path: 'endorsement', component: DocumentEndorsementComponent },
    { path: 'scan-and-upload', component: ScanUploadDocumentComponent },
    { path: 'acknowledgement-slip', component: AcknowledgementSlipComponent },
    { path: '**', component: PartyDetailsComponent },
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentDetailsRoutingModule { }
