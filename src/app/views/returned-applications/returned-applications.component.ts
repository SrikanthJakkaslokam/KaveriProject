import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DepartmentService } from '../../services/department.service';
import { Storage } from '../../shared/utils/storage';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SroDocSummaryComponent } from './sro-doc-summary/sro-doc-summary.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-returned-applications',
  templateUrl: './returned-applications.component.html',
  styleUrls: ['./returned-applications.component.scss']
})
export class ReturnedApplicationsComponent implements OnInit {

  DepartmentUser: string;
  DepartmentUserDesignation: string;
  
  allocated: MatTableDataSource<any>;
  regApplications: MatTableDataSource<any>;
  showDocumentSummaryModal: boolean = false;
  displayedColumns1 = ['sno', 'applicationNum', 'applicationDate', 'serviceName', 'currentStatus', 'Action'];
  @ViewChild('allocatedPaginator', { read: MatPaginator }) allocatedPaginator: MatPaginator;
  @ViewChild("allocatedsorter") allocatedsorter: MatSort;
  @ViewChild('regAppsPaginator', { read: MatPaginator }) regAppsPaginator: MatPaginator;
  @ViewChild("regAppsSorter") regAppsSorter: MatSort;
  failureMessage: string = "";
  documentSummary: any = {};
  presenterDetails: any = {};
  bsModalRef: BsModalRef;
  deptData: any = {};
  constructor(
    private departmentService: DepartmentService, 
    private router: Router, 
    public snackBar: MatSnackBar,
    private modalService: BsModalService,
  ) { }

  ngOnInit(): void {
    this.DepartmentUser = localStorage.getItem('deptUser');
    this.DepartmentUserDesignation = localStorage.getItem('deptUserDesignation');
    const deptData = JSON.parse(localStorage.getItem("deptData"));
    this.deptData = deptData && deptData[0] ? deptData[0] : {};
    this.allocateApplications();
    this.registeredApplications();
    this.allocated = new MatTableDataSource([]);
    this.regApplications = new MatTableDataSource([]);
  }
  ngAfterViewInit() {
    this.allocated.paginator = this.allocatedPaginator;
  }
  allocateApplications() {
    const payload = {
      "srocode": localStorage.getItem('deptSroCode'),
      currentstatus: 'CD104'
    }
    this.departmentService.fetchSfdaApplicationsBySRO(payload).subscribe(
      (data: any) => {
        if (data[0].responseCode == 1001) {
          this.failureMessage = 'Failed to fetch verified applications';
          this.openSnackBarFailure();
        } else {
          const filterdata = this.filterrowdataSLNO(data);
          this.allocated = new MatTableDataSource(filterdata);
          this.allocated.paginator = this.allocatedPaginator;
          this.allocated.sort = this.allocatedsorter;
        }        
    }, e => {
      }
    );
  }
  registeredApplications() {
    const payload = {
      "srocode": localStorage.getItem('deptSroCode'),
      currentstatus: 'CD110'
    }
    this.departmentService.fetchAllocateApplicationsBySRO(payload).subscribe(
      (data: any) => {
        if (data[0].responseCode == 1001) {
          this.failureMessage = 'Failed to fetch registered applications';
          this.openSnackBarFailure();
        } else {
          const filterdata = this.filterrowdataSLNO(data);
          this.regApplications = new MatTableDataSource(filterdata);
          this.regApplications.paginator = this.regAppsPaginator;
          this.regApplications.sort = this.regAppsSorter;
        }          
    }, e => {
      }
    );
  }
  openSnackBarFailure(message = this.failureMessage, action = '') {
    this.snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: "bottom",
      horizontalPosition: "center",
      panelClass: ["custom-style2"]
    });
  }
  filterrowdataSLNO(data) {
    data.forEach((currentValue, index) => {
      currentValue["sno"] = index + 1;
      if (currentValue.applicationDate != null) {
        currentValue.applicationDate = this.formatDate(currentValue.applicationDate);
      }
    });
    return data;
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.allocated.filter = filterValue;
  }
  private formatDate(date) {
    if (date != '0001-01-01T00:00:00') {
      const d = new Date(date);
      let month = '' + (d.getMonth() + 1);
      let day = '' + d.getDate();
      const year = d.getFullYear();
      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;
      return [day, month, year].join('-');
    } else {
      return null;
    }
  }
  DateParser(dateStr: string): string {
    let date = dateStr.substring(0, 10);
    let time = dateStr.substring(11, 19);
    let millisecond = dateStr.substring(20)
    let validDate = date;
    return validDate;
  }
  timeParser(dateStr: string): string {
    let date = dateStr.substring(0, 10);
    let time = dateStr.substring(11, 19);
    let millisecond = dateStr.substring(20)
    let validDate = time;
    return validDate;
  }

  onClick(application) {
    if (application && application.applicationNum) {
      this.router.navigate(['/dfa'],
        { queryParams: { applicationNo: application.applicationNum } });
    }
  }
  onRegisteredAppCTA(appl: any) {
    Storage.setLocalItem('applicationNo', appl.applicationNum);
    this.bsModalRef =  this.modalService.show(SroDocSummaryComponent, Object.assign({}, { class: 'modal-lg'}));
    this.bsModalRef.content.onClose = new Subject<boolean>();

    this.bsModalRef.content.onClose.subscribe(result => {
        this.registeredApplications();
     })
  }
}
