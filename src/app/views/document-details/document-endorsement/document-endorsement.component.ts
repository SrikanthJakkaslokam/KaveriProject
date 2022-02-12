import { Component, OnInit, ChangeDetectorRef, ViewChild, ComponentFactoryResolver, Injector, ApplicationRef, ViewContainerRef, Renderer2 } from '@angular/core';
import { DomPortalOutlet, PortalOutlet, TemplatePortal, } from "@angular/cdk/portal";
import { Storage } from '../../../shared/utils/storage';
import { DocumentService } from '../document.service';
import notify from "devextreme/ui/notify";
import { Router } from '@angular/router';

@Component({
  selector: 'app-document-endorsement',
  templateUrl: './document-endorsement.component.html',
  styleUrls: ['./document-endorsement.component.scss']
})
export class DocumentEndorsementComponent implements OnInit {
  @ViewChild('printDocument') printDocumentRef;
  @ViewChild("iframe") iframe;
  private portalHost: PortalOutlet;
  dateOfExecution: any;
  pendingRegNumberData: any = {};
  finalRegNoData: any = {};
  message: any;
  type: any;
  currentDate: any = new Date();
  documentSummary: any = {};
  executants: any = [];
  claimants: any = [];
  constructor(
    private documentService: DocumentService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef,
    private viewContainerRef: ViewContainerRef,
    private renderer: Renderer2,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.pendingRegNumberData = Storage.getLocalItem('pendingRegNoData');
    this.dateOfExecution = JSON.parse(localStorage.getItem('kaveri-dateOfExecution'));
    this.fetchFinalRegNo();
    this.fetchDocumentSummary();
  }
  fetchFinalRegNo() {
    const req = { applicationnumber: Storage.getLocalItem('applicationNo'), sroCode: localStorage.getItem("deptSroCode") };
    this.documentService.fetchFinalRegNumberDataAsync(req).subscribe((res: any) => {
      if (res.status === 200 && res.body) {
        this.finalRegNoData = res.body;
      }
    });
  }
  fetchDocumentSummary() {
    const req = {applicationnumber: Storage.getLocalItem('applicationNo'), sroCode: localStorage.getItem("deptSroCode")};
    this.documentService.fetchDocumentSummary(req).subscribe((res: any) => {
      if (res.status === 200 && res.body && res.body.response) {
        this.documentSummary = res.body.response;
        this.claimants = this.documentSummary.partyinfo.filter(party => party.partytypename === 'Claimant');
        this.executants = this.documentSummary.partyinfo.filter(party => party.partytypename === 'Executant');
      }
    });
  }
  showToast() {
    notify({
      message: this.message,
      isVisible: true,
      displayTime: 3000,
      height: 50,
      type: this.type
    });
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
  saveContinueCTA() {
    this.router.navigateByUrl('/document/scan-and-upload');
  }
}
