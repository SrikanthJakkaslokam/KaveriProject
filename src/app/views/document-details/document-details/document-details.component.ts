import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Storage } from '../../../shared/utils/storage';
import { DocumentService } from '../document.service';
import notify from "devextreme/ui/notify";

@Component({
  selector: 'app-document-details',
  templateUrl: './document-details.component.html',
  styleUrls: ['./document-details.component.scss']
})
export class DocumentDetailsComponent implements OnInit {
  DepartmentUser: string;
  DepartmentUserDesignation: string;
  constructor(
    private routet: Router,
    private documentService: DocumentService
  ) { }
  showHoldModal = false;
  showRefuseModal = false;
  currentRoute;
  selectedIndex = 0;
  toggleBtns: any = true;
  refuseAppRemarks: any;
  putOnHoldRemarks: any;
  message: any;
  type: any;
  deptData: any;
  ngOnInit(): void {
    const deptData = JSON.parse(localStorage.getItem("deptData"));
    this.deptData = deptData && deptData[0] ? deptData[0] : {};
    this.DepartmentUser = localStorage.getItem('deptUser');
    this.DepartmentUserDesignation = localStorage.getItem('deptUserDesignation');
    this.currentRoute = this.routet.url;
    this.toggleOperationBtns();
    this.routet.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.currentRoute = event.url;
        this.toggleOperationBtns();
      }
    });
  }
  nav() {
    if (this.deptData.designationid === 1) {
      this.routet.navigateByUrl('/returned-applications')
    } else {
      this.routet.navigateByUrl('/deo-portal')
    }
  }

  toggleOperationBtns() {
    if (['/document/property-details', '/document/party-details',
      '/document/property-schedule', '/document/valuation', '/document/payment-details', '/document'].includes(this.currentRoute)) {
      this.toggleBtns = true;
    } else {
      this.toggleBtns = false;
    }
    switch(this.currentRoute) {
      // case '/document/property-details': {
      //   this.selectedIndex = 0;
      //   break;
      // }
      case '/document': {
        this.selectedIndex = 0;
        break;
      }
      case '/document/party-details': {
        this.selectedIndex = 0;
        break;
      }
      case '/document/property-schedule': {
        this.selectedIndex = 1;
        break;
      }
      case '/document/valuation': {
        this.selectedIndex = 2;
        break;
      }
      case '/document/payment-details': {
        this.selectedIndex = 3;
        break;
      }
      case '/document/summary': {
        this.selectedIndex = 4;
        break;
      }
      case '/document/endorsement': {
        this.selectedIndex = 5;
        break;
      }
      case '/document/scan-and-upload': {
        this.selectedIndex = 6;
        break;
      }
      case '/document/acknowledgement-slip': {
        this.selectedIndex = 7;
        break;
      }
    }

  }

  stepChange(event) {
    // if (event.selectedIndex === 0) {
    //   this.routet.navigateByUrl('/document/property-details')
    // }
    if (event.selectedIndex === 0) {
      this.routet.navigateByUrl('/document/party-details')
    }
    if (event.selectedIndex === 1) {
      this.routet.navigateByUrl('/document/property-schedule')
    }
    if (event.selectedIndex === 2) {
      this.routet.navigateByUrl('/document/valuation')
    }
    if (event.selectedIndex === 3) {
      this.routet.navigateByUrl('/document/payment-details')
    }
    if (event.selectedIndex === 4) {
      this.routet.navigateByUrl('/document/summary')
    }
    if (event.selectedIndex === 5) {
      this.routet.navigateByUrl('/document/endorsement')
    }
    if (event.selectedIndex === 6) {
      this.routet.navigateByUrl('/document/scan-and-upload')
    }
    if (event.selectedIndex === 7) {
      this.routet.navigateByUrl('/document/acknowledgement-slip')
    }
    this.selectedIndex = event.selectedIndex;
  }

  verifyAndContinueCTA() {
    switch (this.currentRoute) {
      case '/document/property-details': {
        this.routet.navigateByUrl('/document/party-details');
        this.selectedIndex = 1;
        break;
      }
      case '/document': {
        this.routet.navigateByUrl('/document/party-details');
        this.selectedIndex = 1;
        break;
      }
      case '/document/party-details': {
        this.routet.navigateByUrl('/document/property-schedule');
        this.selectedIndex = 2;
        break;
      }
      case '/document/property-schedule': {
        this.routet.navigateByUrl('/document/valuation');
        this.selectedIndex = 3;
        break;
      }
      case '/document/valuation': {
        this.routet.navigateByUrl('/document/payment-details');
        this.selectedIndex = 4;
        break;
      }
      case '/document/payment-details': {
        this.routet.navigateByUrl('/document/summary');
        this.selectedIndex = 5;
        break;
      }
    }
  }
  putOnHoldCTA() {
    const updateStatusReq: any = { UpdatedBy: '4', CurrentStatus: 'CD119', Remarks: this.putOnHoldRemarks, applicationnumber: Storage.getLocalItem('applicationNo') };
    const saveDocumentReq: any = {
      applicationnumber: Storage.getLocalItem('applicationNo'),
      documentid: 2286862,
      "executiondatetime": null,
      "isfullfeespaid": null,
      "isimpoundapplication": null,
      "impoundapplicationremarks": null,
      "uploadregistereddocpath": "",
      "uploadannexuredocpath": "",
      "ispropertydetails": false,
      "ispartydetails": false,
      "ispropertyschedule": false,
      "isvaluationfees": false,
      "ispaymentdetails": false,
      "isuploaddocuments": false
    };
    switch (this.currentRoute) {
      case '/document/property-details': {
        saveDocumentReq.ispropertydetails = true;
        break;
      }
      case '/document': {
        saveDocumentReq.ispropertydetails = true;
        break;
      }
      case '/document/party-details': {
        saveDocumentReq.ispartydetails = true;
        break;
      }
      case '/document/property-schedule': {
        saveDocumentReq.ispropertyschedule = true;
        break;
      }
      case '/document/valuation': {
        saveDocumentReq.isvaluationfees = true;
        break;
      }
      case '/document/payment-details': {
        saveDocumentReq.ispaymentdetails = true;
        break;
      }
    }
    this.documentService.updateDeoRegistrationStatus(updateStatusReq).subscribe(res => {
      if (res.status === 200) {
        this.documentService.saveDocumentMaster(saveDocumentReq).subscribe(res => {
          if (res.status === 200) {
            this.message = 'Application has been put on hold successfully.';
            this.type = 'success';
            this.showToast();
            this.routet.navigateByUrl('/deo-portal');
          } else {
            this.message = 'Failed in putting hold.';
            this.type = 'error';
            this.showToast();
          }
        });
      } else {
        this.message = 'Failed in putting hold.';
        this.type = 'error';
        this.showToast();
      }
    });
  }
  refuseApplicationCTA() {
    const updateStatusReq: any = { UpdatedBy: '4', CurrentStatus: 'CD133', Remarks: this.refuseAppRemarks, applicationnumber: Storage.getLocalItem('applicationNo') };
    const saveDocumentReq: any = {
      applicationnumber: Storage.getLocalItem('applicationNo'),
      documentid: 2286862,
      "executiondatetime": null,
      "isfullfeespaid": null,
      "isimpoundapplication": null,
      "impoundapplicationremarks": null,
      "uploadregistereddocpath": "",
      "uploadannexuredocpath": "",
      "ispropertydetails": false,
      "ispartydetails": false,
      "ispropertyschedule": false,
      "isvaluationfees": false,
      "ispaymentdetails": false,
      "isuploaddocuments": false
    };
    switch (this.currentRoute) {
      case '/document/property-details': {
        saveDocumentReq.ispropertydetails = true;
        break;
      }
      case '/document': {
        saveDocumentReq.ispropertydetails = true;
        break;
      }
      case '/document/party-details': {
        saveDocumentReq.ispartydetails = true;
        break;
      }
      case '/document/property-schedule': {
        saveDocumentReq.ispropertyschedule = true;
        break;
      }
      case '/document/valuation': {
        saveDocumentReq.isvaluationfees = true;
        break;
      }
      case '/document/payment-details': {
        saveDocumentReq.ispaymentdetails = true;
        break;
      }
    }
    this.documentService.updateDeoRegistrationStatus(updateStatusReq).subscribe(res => {
      if (res.status === 200) {
        this.documentService.saveDocumentMaster(saveDocumentReq).subscribe(res => {
          if (res.status === 200) {
            this.message = 'Application has been refused successfully.';
            this.type = 'success';
            this.showToast();
            this.routet.navigateByUrl('/deo-portal');
          } else {
            this.message = 'Failed in putting hold.';
            this.type = 'error';
            this.showToast();
          }
        });
      } else {
        this.message = 'Failed in putting hold.';
        this.type = 'error';
        this.showToast();
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

}
