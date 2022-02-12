import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DepartmentService } from '../../services/department.service';
import { Storage } from '../../shared/utils/storage';
import notify from "devextreme/ui/notify";

@Component({
  selector: 'deo-portal',
  templateUrl: './deo-portal-allocated-application.component.html',
  styleUrls: ['./deo-portal-allocated-application.component.scss']
})
export class DeoPortalAllocatedApplicationComponent implements OnInit {
  DepartmentUser: string;
  DepartmentUserDesignation: string;
  allocatedApp = [];
  reAllocatedApp = [];
  deoList = [];
  AllocatedApplications: any;
  ReAllocatedApplications: any;

  totalApplicationReceived: any;
  totalApplicationAllocated: any;
  totalApplicationClosed: any;
  allocated: MatTableDataSource<any>;
  reAllocated: MatTableDataSource<any>;
  displayedColumns1 = ['sno', 'applicationNum', 'applicationDate', 'time', 'serviceName', 'Action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  failureMessage: string = "";
  //Applications Received
  colorAppRcvd = '#2d71dc';
  modeAppRcvd = 'determinate';
  valueAppRcvd = 100;
  bufferValueAppRcvd = 75;
  //Applications Allocated
  colorAppAlctd = '#28b244';
  modeAppAlctd = 'determinate';
  valueAppAlctd = 50;
  bufferValueAppAlctd = 75;
  //Applications Closed
  colorAppClsd = '#28b244';
  modeAppClsd = 'determinate';
  valueAppClsd = 75;
  bufferValueAppClsd = 75;

  private isButtonVisible = true;
  private isreButtonVisible = true;
  showHoldModal = false;
  putOnHoldRemarks: any;
  message: any;
  type: any;
  currentApp: any = {};
  deptData: any;
  @ViewChild('allocatedPaginator', { read: MatPaginator }) allocatedPaginator: MatPaginator;
  @ViewChild("allocatedsorter") allocatedsorter: MatSort;

  

  constructor(private departmentService: DepartmentService, private router: Router, public snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.DepartmentUser = localStorage.getItem('deptUser');
    this.DepartmentUserDesignation = localStorage.getItem('deptUserDesignation');
    const deptData = JSON.parse(localStorage.getItem("deptData"));
    this.deptData = deptData && deptData[0] ? deptData[0] : {};
    this.allocateApplications();
    this.applicationCountData();
    this.allocated = new MatTableDataSource(this.AllocatedApplications);
  }

  ngAfterViewInit() {
    this.allocated.paginator = this.allocatedPaginator;
  }
  allocateApplications() {
    var application = {
      deoid: this.deptData.userid.toString()
    }
    this.departmentService.fetchApplicationDEODataAsync(application).subscribe(
      (data: any) => {
        console.log(data);
        this.AllocatedApplications = data;
        const filterdata = this.filterrowdataSLNO(data);
        this.allocatedApp = [...filterdata];
        this.allocated = new MatTableDataSource(this.AllocatedApplications);
        this.allocated.paginator = this.allocatedPaginator;
        this.allocated.sort = this.allocatedsorter;
        // if (data[0].responseCode == 1001) {
        //   this.failureMessage = data[0].responseMessage;
        //   this.openSnackBarFailure();
        // }
      }
    );
  }

  applicationCountData() {
    var count = {
      // "srocode": 1
      "srocode": localStorage.getItem('deptSroCode')
    }
    this.departmentService.applicationCount(count).subscribe(
      (data: any) => {
        console.log(data);
        this.totalApplicationReceived = data[0].totalCount;
        this.totalApplicationAllocated = data[0].totalAllocatedCount;
      }
    );
  }

  filterrowdataSLNO(data) {
    data.forEach((currentValue, index) => {
      currentValue["sno"] = index + 1;
      if (currentValue.applicationDate != null) {
        currentValue.applicationDate = this.formatDate(currentValue.applicationDate);
      }
      currentValue.Action = 'Allocated';
    });
    // if(data.length >=1 || data.length != undefined){
    //   data = data[0]   
    // }
    return data;
  }
  openSnackBarFailure(message = this.failureMessage, action = '') {
    this.snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: "bottom",
      horizontalPosition: "center",
      panelClass: ["custom-style2"]
    });
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.allocated.filter = filterValue;
    this.reAllocated.filter = filterValue;
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

  startRegistration(application) {
    if (application && application.applicationNum) {
      Storage.setLocalItem('d-applicationData', application);
      Storage.setLocalItem('applicationNo', application.applicationNum);
      this.router.navigate(['/document/party-details']);
    } else {
      this.failureMessage = 'Invalid application no';
      this.openSnackBarFailure();
    }
  }
  endorsement(appl) {
    Storage.setLocalItem('d-applicationData', appl);
    Storage.setLocalItem('applicationNo', appl.applicationNum);
    this.router.navigate(['/document/endorsement']);
  }
  printAcknowledgement(appl) {
    Storage.setLocalItem('d-applicationData', appl);
    Storage.setLocalItem('applicationNo', appl.applicationNum);
    this.router.navigate(['/document/acknowledgement-slip']);
  }
  putOnHoldCTA() {
    const updateStatusReq: any = { UpdatedBy: '4', CurrentStatus: 'CD111', Remarks: this.putOnHoldRemarks, applicationnumber: this.currentApp ? this.currentApp.applicationNum : null };
    this.departmentService.updateDeoRegistrationStatus(updateStatusReq).subscribe(res => {
      if (res.status === 200 && res['body']['responseCode'] === 1000) {
        this.message = 'Application has been put on hold successfully.';
        this.putOnHoldRemarks = '';
        this.type = 'success';
        this.showToast();
        this.allocateApplications();
      } else {
        this.message = 'Failed in putting hold.';
        this.type = 'error';
        this.showToast();
      }
    }, err => {
      this.message = 'Failed in putting hold.';
      this.type = 'error';
      this.showToast();
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

export class Element {
  sno: string;
  applicationNum: string;
  applicationDate: string;
  time: string;
  serviceName: string;
  currentStatus: string;
}
const ELEMENT_DATA: Element[] = [
  {
    sno: '01',
    applicationNum: "AP212001335016514",
    applicationDate: "08-08-2021",
    time: "09.00AM",
    serviceName: "Property Registration",
    currentStatus: "Approved"
  },
  {
    sno: '02',
    applicationNum: "AP212001335016514",
    applicationDate: "08-08-2021",
    time: "09.00AM",
    serviceName: "Property Registration",
    currentStatus: "Approved"
  },
  {

    sno: '03',
    applicationNum: "AP212001335016514",
    applicationDate: "08-08-2021",
    time: "09.00AM",
    serviceName: "Property Registration",
    currentStatus: "Approved"
  },
  {
    sno: '04',
    applicationNum: "AP212001335016514",
    applicationDate: "08-08-2021",
    time: "09.00AM",
    serviceName: "Property Registration",
    currentStatus: "Not Approved"
  },
  {
    sno: '05',
    applicationNum: "AP212001335016514",
    applicationDate: "08-08-2021",
    time: "09.00AM",
    serviceName: "Property Registration",
    currentStatus: "Approved"
  },
  {
    sno: '01',
    applicationNum: "AP212001335016514",
    applicationDate: "08-08-2021",
    time: "09.00AM",
    serviceName: "Property Registration",
    currentStatus: "Approved"
  },
  {
    sno: '02',
    applicationNum: "AP212001335016514",
    applicationDate: "08-08-2021",
    time: "09.00AM",
    serviceName: "Property Registration",
    currentStatus: "Approved"
  },
  {

    sno: '03',
    applicationNum: "AP212001335016514",
    applicationDate: "08-08-2021",
    time: "09.00AM",
    serviceName: "Property Registration",
    currentStatus: "Approved"
  },
  {
    sno: '04',
    applicationNum: "AP212001335016514",
    applicationDate: "08-08-2021",
    time: "09.00AM",
    serviceName: "Property Registration",
    currentStatus: "Not Approved"
  },
  {
    sno: '05',
    applicationNum: "AP212001335016514",
    applicationDate: "08-08-2021",
    time: "09.00AM",
    serviceName: "Property Registration",
    currentStatus: "Approved"
  },
  {
    sno: '06',
    applicationNum: "xyz",
    applicationDate: "08-08-2021",
    time: "09.00AM",
    serviceName: "Property Registration",
    currentStatus: "Approved"
  }
];
