import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DepartmentService } from '../../services/department.service';
import notify from "devextreme/ui/notify";

export interface Element {
  applicationNum: string;
  applicationDate: string;
  serviceName: string;
}

@Component({
  selector: 'app-pending-application',
  templateUrl: './pending-application.component.html',
  styleUrls: ['./pending-application.component.scss']
})
export class PendingApplicationComponent {
  DepartmentUser: string;
  DepartmentUserDesignation: string;
  errorMessage: string;
  approvedApp = [];
  pendingApp = [];
  PendingApplications: any;
  ApprovedApplications: any;
  selecteduservalue: any;
  sdafdaid: any;

  displayedColumns1 = ['sno', 'applicationNum', 'applicationDate', 'serviceName', 'sdafda', 'wrkFlowStatusNamee', 'Action'];
  displayedColumns2 = ['sno', 'application', 'applicationDate', 'applicationType', 'Status'];
  pending: MatTableDataSource<any>;
  approved: MatTableDataSource<any>;

  failureMessage: string = "";

  isAllocateVisible = true;

  @ViewChild('pendingPaginator', { read: MatPaginator }) pendingPaginator: MatPaginator;
  @ViewChild('approvedPaginator', { read: MatPaginator }) approvedPaginator: MatPaginator;
  @ViewChild('pendingsorter') pendingsorter: MatSort;
  @ViewChild('approvedsorter') approvedsorter: MatSort;
  deoList: any = [];
  public applicationDetails = {
    applicationNum: '',
    applicationDate: '',
    serviceName: '',
    currentStatus: ''
  } as any;
  message: any;
  type: any;
  deptData: any;
  constructor(private departmentService: DepartmentService, private router: Router, public snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.DepartmentUser = localStorage.getItem('deptUser');
    this.DepartmentUserDesignation = localStorage.getItem('deptUserDesignation');
    const deptData = JSON.parse(localStorage.getItem("deptData"));
    this.deptData = deptData && deptData[0] ? deptData[0] : {};
    this.pendingApplications();
    this.approvedApplications();
    this.fetchAllocateApplicationDEODetailsDataAsync();
  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.pending.filter = filterValue;
    this.approved.filter = filterValue;
  }
  pendingApplications() {

    var pending = {
      "srocode": localStorage.getItem('deptSroCode'),
      currentstatus: 'CD102'
    }
    this.departmentService.fetchSfdaApplicationsBySRO(pending).subscribe(
      (data: any) => {
        this.PendingApplications = data;
        const filterdata = this.filterrowdataSLNO(data);
        this.pendingApp = [...filterdata];
        this.pending = new MatTableDataSource(this.PendingApplications);
        this.pending.paginator = this.pendingPaginator;
        this.pending.sort = this.pendingsorter;
        data.forEach(element => {
          element.isAllocateVisible = this.isAllocateVisible;
        });
        // if (data[0].responseCode == 1001) {
        //   this.failureMessage = data[0].responseMessage;
        //   this.openSnackBarFailure();       
        //   }
      }
      , e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    );
  }

  approvedApplications() {
    var approved = {
      "srocode": localStorage.getItem('deptSroCode'),
      currentstatus: 'CD104'
    };
    this.departmentService.fetchSfdaApplicationsBySRO(approved).subscribe(
      (data: any) => {
        this.ApprovedApplications = data;
        const filterdata = this.filterrowdataSLNO(data);
        this.approvedApp = [...filterdata];
        this.approved = new MatTableDataSource(this.ApprovedApplications);
        this.approved.paginator = this.approvedPaginator;
        this.approved.sort = this.approvedsorter;
        // if (data[0].responseCode == 1001) {
        //   this.failureMessage = data[0].responseMessage;
        //   this.openSnackBarFailure();         
        //   }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    );

  }

  readRowData(element) {
    this.applicationDetails.applicationNum = element.applicationNum;
    this.applicationDetails.applicationDate = element.applicationDate;
    this.applicationDetails.serviceName = element.serviceName;
    this.applicationDetails.currentStatus = element.currentStatus;
    localStorage.setItem('applnNum', this.applicationDetails.applicationNum);
    localStorage.setItem('applnDate', this.applicationDetails.applicationDate);
    localStorage.setItem('applnType', this.applicationDetails.serviceName);
    localStorage.setItem('applnStatusCode', this.applicationDetails.currentStatus);
  }

  onAllocateClick(element) {
    element.isAllocateVisible = false;
  }
  fetchAllocateApplicationDEODetailsDataAsync() {
    this.departmentService.fetchAllocateApplicationDEODetailsDataAsync({ srocode: localStorage.getItem('deptSroCode'), designationid: '2,3' }).subscribe((res: any) => {
      if (res && res.length > 0) {
        this.deoList = res;
      }
    });
  }
  onUserValuechange(value: any, element: any) {
    this.selecteduservalue = value;
  }

  ApplicationsAllocated() {
    const deptData = JSON.parse(localStorage.getItem("deptData"));
    
    var send = {
      "applicationnumber": localStorage.getItem('applnNum'),
      "currentstatus": 'CD103',
      "lastupdatedby": deptData[0].userid.toString(),
      "sfdaid": this.selecteduservalue
    }
    this.departmentService.allocateSdaFda(send).subscribe(
      (data: any) => {
        if (data && data[0] && data[0].responseCode === 1000) {
          this.message = `Allocated successfully`;
          this.type = 'success';
          this.showToast();
          this.pendingApplications();
          this.approvedApplications();
        } else {
          this.message = `Failed to allocate`;
          this.type = 'error';
          this.showToast();
        }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
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
  filterrowdataSLNO(data) {
    data.forEach((currentValue, index) => {
      currentValue["sno"] = index + 1;
      if (currentValue.applicationDate != null) {
        currentValue.applicationDate = this.formatDate(currentValue.applicationDate);
      }
    });
    // if(data.length >=1 || data.length != undefined){
    //   data = data[0]   
    // }
    return data;
  }

  private formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [day, month, year].join('-');
  }

  openSnackBarFailure(message = this.failureMessage, action = '') {
    this.snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: "bottom",
      horizontalPosition: "center",
      panelClass: ["custom-style2"]
    });
  }
}

const ELEMENT_DATA: Element[] = [];
