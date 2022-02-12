import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-sda-fda-landing-page',
  templateUrl: './sda-fda-landing-page.component.html',
  styleUrls: ['./sda-fda-landing-page.component.scss']
})
export class SdaFdaLandingPageComponent implements OnInit { 
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
 
  displayedColumns1 = ['sno', 'applicationNum', 'applicationDate',  'serviceName', 'currentStatus', 'Action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  failureMessage: string = "";

  @ViewChild('allocatedPaginator', { read: MatPaginator }) allocatedPaginator: MatPaginator;
  @ViewChild("allocatedsorter") allocatedsorter: MatSort;
  deptData: any;
  constructor(private departmentService: DepartmentService, private router: Router, public snackBar: MatSnackBar) { }

  ngOnInit(): void {
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
      sfdaId: this.deptData.userid
    }
    console.log(application)
    this.departmentService.fetchSfdaApplicationsByID(application).subscribe(
      (data: any) => {
        if (data[0].responseCode == 1001) {
          this.failureMessage = data[0].responseMessage;
          this.openSnackBarFailure();
        } else {
          this.AllocatedApplications = data;
          const filterdata = this.filterrowdataSLNO(data);
          this.allocatedApp = [...filterdata];
          this.allocated = new MatTableDataSource(this.AllocatedApplications);
          this.dataSource = new MatTableDataSource(this.AllocatedApplications);
          this.allocated.paginator = this.allocatedPaginator;
          this.allocated.sort = this.allocatedsorter;
        }        
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
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [day, month, year].join('-');
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
      { queryParams: { applicationNo: application.applicationNum, applicationDate: application.applicationDate,
      applicationType: application.serviceName} });
    } else {
      this.failureMessage = 'Invalid application no';
      this.openSnackBarFailure();
    }
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

const ELEMENT_DATA: Element[] = [];


