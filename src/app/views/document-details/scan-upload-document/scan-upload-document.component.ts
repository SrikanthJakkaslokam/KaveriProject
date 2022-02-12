import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ScanDocumentComponent } from './scan-document/scan-document.component';
import { PreviewDocumentComponent } from './preview-document/preview-document.component';
import { UploadAllDocumentsComponent } from './upload-all-documents/upload-all-documents.component';
import { Storage } from '../../../shared/utils/storage';
import { DocumentService } from '../document.service';
import notify from "devextreme/ui/notify";
import { Router } from '@angular/router';
declare var scanner;

@Component({
  selector: 'app-scan-upload-document',
  templateUrl: './scan-upload-document.component.html',
  styleUrls: ['./scan-upload-document.component.scss']
})
export class ScanUploadDocumentComponent implements OnInit {
  dateOfExecution: any;
  pendingRegNumberData: any = {};
  finalRegNoData: any = {};
  message: any;
  imagesScanned = [];
  type: any;
  constructor(
    private modalService: BsModalService,
    private documentService: DocumentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.pendingRegNumberData = Storage.getLocalItem('pendingRegNoData');
    this.dateOfExecution = JSON.parse(localStorage.getItem('kaveri-dateOfExecution'));
    this.fetchFinalRegNo();
  }
  fetchFinalRegNo() {
    const req = { applicationnumber: Storage.getLocalItem('applicationNo'), sroCode: '217' };
    this.documentService.fetchFinalRegNumberDataAsync(req).subscribe((res: any) => {
      if (res.status === 200 && res.body) {
        this.finalRegNoData = res.body;
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

  scanToPdfWithThumbnails() {
    scanner.scan(this.displayImagesOnPage,
      {
        "output_settings": [
          {
            "type": "return-base64",
            "format": "jpg",
          }
        ]
      }
    );
  }
  /** Processes the scan result */
  displayImagesOnPage(successful, mesg, response) {
    if (!successful) { // On error
      console.error('Failed: ' + mesg);
      return;
    }

    if (successful && mesg != null && mesg.toLowerCase().indexOf('user cancel') >= 0) { // User cancelled.
      console.info('User cancelled');
      return;
    }

    var scannedImages = scanner.getScannedImages(response, true, false); // returns an array of ScannedImage
    localStorage.setItem('scannedImages', JSON.stringify(scannedImages));
  };

  /** Upload scanned images by submitting the form */
  submitFormWithScannedImages() {
    if (scanner.submitFormWithImages('form1', this.imagesScanned, function (xhr) {
      if (xhr.readyState == 4) { // 4: request finished and response is ready
        document.getElementById('server_response').innerHTML = "<h2>Response from the server: </h2>" + xhr.responseText;
        document.getElementById('images').innerHTML = ''; // clear images
        this.imagesScanned = [];
      }
    })) {
      document.getElementById('server_response').innerHTML = "Submitting, please stand by ...";
    } else {
      document.getElementById('server_response').innerHTML = "Form submission cancelled. Please scan first.";
    }
  }
  previewDocumentCTA() {
    this.modalService.show(PreviewDocumentComponent, { class: 'modal-lg' });
  }
  uploadAllDocumentsCTA() {
    this.modalService.show(UploadAllDocumentsComponent, { class: 'modal-md modal-dialog-centered' });
  }
  navToAck() {
    const saveDocumentReq: any = {
      applicationnumber: Storage.getLocalItem('applicationNo'),
      documentid: 0,
      "executiondatetime": new Date(),
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
      "isuploaddocuments": true
    };
    this.documentService.saveDocumentMaster(saveDocumentReq).subscribe(res => {
      if (res.status === 200 && res['body'].responseCode === 1000) {
        this.router.navigateByUrl('/document/acknowledgement-slip');
      } else {
        this.message = 'Failed in saving.';
        this.type = 'error';
        this.showToast();
      }
    });
  }

}


