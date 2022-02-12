import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { DocumentapprovalService } from '../../../services/documentapproval.service';
import { KaveriService } from '../../../services/kaveri.service';
import { DatePipe } from '@angular/common'
import { DepartmentService } from '../../../services/department.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Storage } from '../../../shared/utils/storage';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.scss']
})
export class PaymentDetailsComponent implements OnInit {
  @ViewChild('largeModal') public largeModal: ModalDirective;
  pendingRegNumberData: any = {};
  constructor(private kaveriService: KaveriService, private documentapprovalservice: DocumentapprovalService, public datepipe: DatePipe, private departmentService: DepartmentService, private changeDetectorRef: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.pendingRegNumberData = Storage.getLocalItem('pendingRegNoData');
  }



}
