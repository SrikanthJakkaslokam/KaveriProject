import { Component, OnInit, ChangeDetectorRef, ViewChild, ComponentFactoryResolver, Injector, ApplicationRef, ViewContainerRef, Renderer2 } from '@angular/core';
import { DomPortalOutlet, PortalOutlet, TemplatePortal, } from "@angular/cdk/portal";
import { DocumentapprovalService } from '../../../services/documentapproval.service';
import { KaveriService } from '../../../services/kaveri.service';
import { DatePipe } from '@angular/common'
import { DepartmentService } from '../../../services/department.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Storage } from '../../../shared/utils/storage';
import { DocumentService } from '../document.service';
import notify from "devextreme/ui/notify";
import { Router } from '@angular/router';

@Component({
  selector: 'app-document-summary',
  templateUrl: './document-summary.component.html',
  styleUrls: ['./document-summary.component.scss']
})
export class DocumentSummaryComponent implements OnInit {
  @ViewChild('printDocument') printDocumentRef;
  @ViewChild("iframe") iframe;
  private portalHost: PortalOutlet;
  finalRegNoData: any = {};
  pendingRegNumberData: any = {};
  dateOfExecution: any;
  message: any;
  type: any;
  documentSummary: any = {};
  isGenerated: any = false;
  presenterDetails: any = {};
  deptData: any;
  applicationData: any;
  constructor(
    public datepipe: DatePipe,
    private departmentService: DepartmentService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef,
    private viewContainerRef: ViewContainerRef,
    private documentService: DocumentService,
    private renderer: Renderer2,
    private router: Router
  ) { }

  ngOnInit(): void {
    const deptData = JSON.parse(localStorage.getItem("deptData"));
    this.applicationData = Storage.getLocalItem('d-applicationData') ? Storage.getLocalItem('d-applicationData') : {};
    this.deptData = deptData && deptData[0] ? deptData[0] : {};
    this.pendingRegNumberData = Storage.getLocalItem('pendingRegNoData');
    this.fetchDocumentSummary();
  }
  printMainContent(): void {
    const childElements = this.iframe.nativeElement.contentDocument.body.children;
    for (let child of childElements) {
      this.renderer.removeChild(this.iframe.nativeElement, child);
    }
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
    this.waitForImageToLoad(
      iframe, 
      () => iframe.contentWindow.print()
    );
  }
  private waitForImageToLoad(iframe: HTMLIFrameElement, done: Function): void {
    const interval = setInterval(() => {
      const allImages = iframe.contentDocument.body.querySelectorAll(
        "img.card-image"
      );
      const loaded = Array.from({ length: allImages.length }).fill(false);
      allImages.forEach((img: HTMLImageElement, idx) => {
        loaded[idx] = img.complete && img.naturalHeight !== 0;
      });
      if (loaded.every(c => c === true)) {
        clearInterval(interval);
        done();
      }
    }, 500);
  }
  generate() {
    if (this.dateOfExecution) {
      this.isGenerated = true;
      localStorage.setItem('kaveri-dateOfExecution', JSON.stringify(new Date(this.dateOfExecution)));
    }
  }
  fetchDocumentSummary() {
    const req = {applicationnumber: Storage.getLocalItem('applicationNo'), sroCode: localStorage.getItem("deptSroCode")};
    this.documentService.fetchDocumentSummary(req).subscribe((res: any) => {
      if (res.status === 200 && res.body && res.body.response) {
        this.documentSummary = res.body.response;
        if (this.documentSummary.finalregistrationnumber) {
          this.isGenerated = true;
        }
        if (this.documentSummary.partyDetails && this.documentSummary.partyDetails.length > 0) {
          this.presenterDetails = this.documentSummary.partyDetails.find(party => party.ispresenter === true);
        }
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
  navToEndorsement() {
    const saveDocumentReq: any = {
      applicationnumber: Storage.getLocalItem('applicationNo'),
      documentid: 0,
      "executiondatetime": new Date(this.dateOfExecution),
      "isfullfeespaid": true,
      "isimpoundapplication": false,
      "impoundapplicationremarks": null,
      "uploadregistereddocpath": "",
      "uploadannexuredocpath": "",
      "ispropertydetails": true,
      "ispartydetails": true,
      "ispropertyschedule": true,
      "isvaluationfees": true,
      "ispaymentdetails": true,
      "isuploaddocuments": false
    };
    this.documentService.saveDocumentMaster(saveDocumentReq).subscribe(res => {
      if (res.status === 200 && res['body'].responseCode === 1000) {
        const reqpayload = {
          "applicationnumber": Storage.getLocalItem('applicationNo'),
          "currentstatus": 'CD110',
          "lastupdatedby": this.deptData.userid.toString(),
        }
        this.departmentService.allocateSdaFda(reqpayload).subscribe(
          (res: any) => {
            if (res && res[0] && res[0].responseCode === 1000) {
              this.message = `Send to SRO for approval`;
              this.type = 'success';
              this.showToast();
              this.router.navigate(['/deo-portal']);
            } else {
              this.message = `Failed to send for approval`;
              this.type = 'error';
              this.showToast();
            }
          }, e => {
          }
        );
      } else {
        this.message = 'Failed in saving.';
        this.type = 'error';
        this.showToast();
      }
    });
  }
  sroApproval() {
    const req = { applicationnumber: Storage.getLocalItem('applicationNo'), sroCode: localStorage.getItem("deptSroCode") };
    this.documentService.fetchFinalRegNumberDataAsync(req).subscribe((res: any) => {
      if (res.status === 200 && res.body) {
        this.finalRegNoData = res.body;
        const reqpayload = {
          "applicationnumber": Storage.getLocalItem('applicationNo'),
          "currentstatus": 'CD111',
          "lastupdatedby": this.deptData.userid.toString(),
        }
        this.departmentService.allocateSdaFda(reqpayload).subscribe(
          (res: any) => {
            if (res && res[0] && res[0].responseCode === 1000) {
              this.message = `Approved successfully`;
              this.type = 'success';
              this.showToast();
              this.router.navigate(['/returned-applications']);
            } else {
              this.message = `Failed to approve`;
              this.type = 'error';
              this.showToast();
            }
          }, e => {
          }
        );
      }
    });
  }
}
