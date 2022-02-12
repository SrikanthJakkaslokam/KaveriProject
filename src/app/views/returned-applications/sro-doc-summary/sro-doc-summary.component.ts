import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../../document-details/document.service';
import { ModalOptions, BsModalService, BsModalRef  } from 'ngx-bootstrap/modal';
import { Storage } from '../../../shared/utils/storage';
import notify from "devextreme/ui/notify";
import { DepartmentService } from '../../../services/department.service';

@Component({
  selector: 'app-sro-doc-summary',
  templateUrl: './sro-doc-summary.component.html',
  styleUrls: ['./sro-doc-summary.component.scss']
})
export class SroDocSummaryComponent implements OnInit {
  applicationNo: string;
  documentSummary: any = {};
  presenterDetails: any = {};
  message: any;
  type: any;
  finalRegNoData: any;
  deptData: any;
  constructor(
    private documentService: DocumentService,
    public options: ModalOptions,
    private bsModalRef: BsModalRef,
    private departmentService: DepartmentService,
    public modalService: BsModalService,
  ) { 
    console.log(this.options.initialState);
  }

  ngOnInit(): void {
    const deptData = JSON.parse(localStorage.getItem("deptData"));
    this.deptData = deptData && deptData[0] ? deptData[0] : {};
    this.fetchDocumentSummary();
  }
  fetchDocumentSummary() {
    const req = {applicationnumber: Storage.getLocalItem('applicationNo'), sroCode: localStorage.getItem("deptSroCode")};
    this.documentService.fetchDocumentSummary(req).subscribe((res: any) => {
      if (res.status === 200 && res.body && res.body.response) {
        this.documentSummary = res.body.response;
        if (this.documentSummary.partyDetails && this.documentSummary.partyDetails.length > 0) {
          this.presenterDetails = this.documentSummary.partyDetails.find(party => party.ispresenter === true);
        }
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
              this.bsModalRef.content.onClose.next(true);
              this.modalService.hide();
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
