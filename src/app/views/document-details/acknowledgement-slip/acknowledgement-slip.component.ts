import { Component, OnInit, ChangeDetectorRef, ViewChild,ComponentFactoryResolver, Injector, ApplicationRef, ViewContainerRef } from '@angular/core';
import { DomPortalOutlet, PortalOutlet, TemplatePortal,  } from "@angular/cdk/portal";
import { DatePipe } from '@angular/common'
import { DocumentService } from '../document.service';
import { Storage } from '../../../shared/utils/storage';
import notify from "devextreme/ui/notify";
import { DocRegdCompleteComponent } from './doc-regd-complete/doc-regd-complete.component';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-acknowledgement-slip',
  templateUrl: './acknowledgement-slip.component.html',
  styleUrls: ['./acknowledgement-slip.component.scss']
})
export class AcknowledgementSlipComponent implements OnInit {
  @ViewChild('printDocument') printDocumentRef;
  @ViewChild("iframe") iframe;
  private portalHost: PortalOutlet;
  acknowledgementData: any = {};
  message: any;
  type: any;
  currentDate: any = new Date();
  finalRegNoData: any = {};
  applicationData: any;
  constructor(
    public datepipe: DatePipe, 
    private modalService: BsModalService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef,
    private viewContainerRef: ViewContainerRef,
    private documentService: DocumentService
  ) { }

  ngOnInit(): void {
    this.fetchFinalRegNo();
    this.applicationData = Storage.getLocalItem('d-applicationData') ? Storage.getLocalItem('d-applicationData') : {};
  }
  fetchFinalRegNo() {
    const req = { applicationnumber: Storage.getLocalItem('applicationNo'), sroCode: localStorage.getItem("deptSroCode") };
    this.documentService.fetchFinalRegNumberDataAsync(req).subscribe((res: any) => {
      if (res.status === 200 && res.body) {
        this.finalRegNoData = res.body;
        this.printAcknowledgementDataAsync();
      }
    });
  }
  printAcknowledgementDataAsync() {
    const req = {finalregistrationnumber: this.finalRegNoData.fn_fetch_final_regnumber};
    this.documentService.printAcknowledgementDataAsync(req).subscribe((res: any) => {
      if (res.status === 200 && res.body && res.body[0] && res.body[0].responseCode === 1000) {
        this.acknowledgementData = res.body[0];
      }
    });
  }
  showToast() {
    notify({
      message: this.message,
      isVisible: true,
      displayTime: 6000,
      height: 50,
      type: this.type
    });
  }
  printMainContent(): void {
    const iframe = this.iframe.nativeElement;
    this.portalHost = new DomPortalOutlet(
      iframe.contentDocument.body,
      this.componentFactoryResolver,
      this.appRef,
      this.injector
    );
    const portal = new TemplatePortal(
      this.printDocumentRef,
      this.viewContainerRef
    );
    this.portalHost.attach(portal);
    iframe.contentWindow.print()
  }
  regdCompleteCTA() {
    const updateStatusReq: any = { UpdatedBy: '4', CurrentStatus: 'CD120', Remarks: 'Completed the Registration Process', applicationnumber: Storage.getLocalItem('applicationNo') };
    this.documentService.updateDeoRegistrationStatus(updateStatusReq).subscribe(res => {
      if (res.status === 200 && res['body']['responseCode'] === 1000) {
        this.modalService.show(DocRegdCompleteComponent, { class: 'modal-md modal-dialog-centered' });
      } else {
        this.message = 'Failed in completing registration process.';
        this.type = 'error';
        this.showToast();
      }
    });
  }
}
