import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { StringLiteralLike } from "typescript";
import { DepartmentService } from "../../services/department.service";
import notify from "devextreme/ui/notify";

export interface Element {
  applicationNum: string;
  applicationDate: string;
  serviceName: string;
}

@Component({
  selector: "app-application-allocation",
  templateUrl: "./application-allocation.component.html",
  styleUrls: ["./application-allocation.component.scss"],
})
export class ApplicationAllocationComponent implements OnInit {
  selectedButton = {};
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
  displayedColumns1 = [
    "sno",
    "applicationNum",
    "applicationDate",
    "applicationTime",
    "serviceName",
    "deoName",
    "deleteAction",
  ];
  displayedColumns2 = [
    "sno",
    "applicationNum",
    "applicationDate",
    "applicationTime",
    "serviceName",
    "deoName",
    "Action",
  ];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  failureMessage: string = "";
  //Applications Received
  colorAppRcvd = "#2d71dc";
  modeAppRcvd = "determinate";
  valueAppRcvd = 100;
  bufferValueAppRcvd = 75;
  //Applications Allocated
  colorAppAlctd = "#28b244";
  modeAppAlctd = "determinate";
  valueAppAlctd = 50;
  bufferValueAppAlctd = 75;
  //Applications Closed
  colorAppClsd = "#28b244";
  modeAppClsd = "determinate";
  valueAppClsd = 75;
  bufferValueAppClsd = 75;

  private isreButtonVisible = true;
  evaluatepopupVisible: boolean = false;

  errorMessage: string;
  selectedDEO: any;
  selectedREDEO: any;

  public applicationDetails = {
    applicationNum: "",
    applicationDate: "",
    applicationTime: "",
    serviceName: "",
    currentStatus: "",
  } as any;

  @ViewChild("allocatedPaginator", { read: MatPaginator })
  allocatedPaginator: MatPaginator;
  @ViewChild("reAllocatedPaginator", { read: MatPaginator })
  reAllocatedPaginator: MatPaginator;
  @ViewChild("allocatedsorter") allocatedsorter: MatSort;
  @ViewChild("reallocatedsorter") reallocatedsorter: MatSort;
  message: any;
  type: any;
  deptData: any = {};
  constructor(
    private departmentService: DepartmentService,
    private router: Router,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    const deptData = JSON.parse(localStorage.getItem("deptData"));
    if (deptData && deptData[0]) {
      this.deptData = deptData[0];
    }
    this.DepartmentUser = localStorage.getItem("deptUser");
    this.DepartmentUserDesignation = localStorage.getItem(
      "deptUserDesignation"
    );
    this.allocateApplications();
    this.reAllocateApplications();
    this.deoListData();
    this.applicationCountData();
  }

  allocateApplications() {
    var application = {
      srocode: localStorage.getItem("deptSroCode"),
      currentstatus: "CD108",
    };
    this.departmentService
      .fetchAllocateApplicationsBySRO(application)
      .subscribe((data: any) => {
        data.forEach((element) => {
          element.applicationTime = this.formatTime(element.applicationDate);
          element.isEvaluateVisible = true;
          element.isDropdownEnabled = true;
          element.IsAllocated = false;
        });
        this.AllocatedApplications = data;
        const filterdata = this.filterrowdataSLNO(data);
        this.allocatedApp = [...filterdata];
        this.allocated = new MatTableDataSource(this.AllocatedApplications);
        this.allocated.paginator = this.allocatedPaginator;
        this.allocated.sort = this.allocatedsorter;
        // if (data[0].responseCode == 1001) {
        //   this.failureMessage = data[0].responseMessage;
        //   this.openSnackBarFailure();
        //   }
      });
  }

  reAllocateApplications() {
    var application = {
      srocode: localStorage.getItem("deptSroCode"),
      currentstatus: "CD109",
    };
    this.departmentService
      .fetchAllocateApplicationsBySRO(application)
      .subscribe((data: any) => {
        data.forEach((element) => {
          element.isreButtonVisible = this.isreButtonVisible;
          element.applicationTime = this.formatTime(element.applicationDate);
        });
        this.ReAllocatedApplications = data;
        const filterdata = this.filterrowdataSLNO(data);
        this.reAllocatedApp = [...filterdata];
        this.reAllocated = new MatTableDataSource(this.ReAllocatedApplications);
        this.reAllocated.paginator = this.reAllocatedPaginator;
        this.reAllocated.sort = this.reallocatedsorter;
        // if (data[0].responseCode == 1001) {
        //   this.failureMessage = data[0].responseMessage;
        //   this.openSnackBarFailure();
        //   }
      });
  }

  deoListData() {
    var list = {
      designationid: '4',
      srocode: localStorage.getItem("deptSroCode"),
    };
    this.departmentService.deoData(list).subscribe((data: any) => {
      this.deoList = data;
    });
  }

  applicationCountData() {
    var count = {
      srocode: localStorage.getItem("deptSroCode"),
    };
    this.departmentService.applicationCount(count).subscribe((data: any) => {
      this.totalApplicationReceived = data[0].totalCount;
      this.totalApplicationAllocated = data[0].totalAllocatedCount;
    });
  }

  readRowData(element) {
    this.applicationDetails.applicationNum = element.applicationNum;
    this.applicationDetails.currentStatus = element.currentStatus;
    localStorage.setItem("applnNum", this.applicationDetails.applicationNum);
    localStorage.setItem(
      "applnStatusCode",
      this.applicationDetails.currentStatus
    );
  }
  onAllocateClick(element) {
    console.log(element);
  }
  onReAllocateClick(element) {
    console.log(element);
    element.isreButtonVisible = false;
    this.AllocateClick(element);
  }
  onDEOchange(value: any, element: any) {
    this.selectedDEO = value;
  }

  onREDEOchange(value: any, element: any) {
    this.selectedDEO = value;
  }

  AllocateApplications() {
    
    var send = {
      applicationnumber: localStorage.getItem("applnNum"),
      currentstatus: "CD108",
      lastupdatedby: localStorage.getItem("deptUserid"),
      "deoid": this.selectedDEO
    };
    console.log(JSON.stringify(send));
    this.departmentService.notApproveSend(send).subscribe(
      (data: any) => {
        if (data.length != 0) {
          console.log(data);
        }
      },
      (e) => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    );
    // this.reloadCurrentRoute();
  }
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
  ApplicationsAllocated() {
    
    var send = {
      applicationnumber: localStorage.getItem("applnNum"),
      currentstatus: "CD109",
      lastupdatedby: localStorage.getItem("deptUserid"),
      requestdetails: [],
    };
    console.log(JSON.stringify(send));
    this.departmentService.notApproveSend(send).subscribe(
      (data: any) => {
        if (data.length != 0) {
          console.log(data);
        }
      },
      (e) => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    );
  }
  filterrowdataSLNO(data) {
    data.forEach((currentValue, index) => {
      currentValue["sno"] = index + 1;
      if (currentValue.applicationDate != null) {
        currentValue.applicationDate = this.formatDate(
          currentValue.applicationDate
        );
      }

      currentValue.Action = "Allocated";
    });
    // if(data.length >=1 || data.length != undefined){
    //   data = data[0]
    // }
    return data;
  }
  openSnackBarFailure(message = this.failureMessage, action = "") {
    this.snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: "bottom",
      horizontalPosition: "center",
      panelClass: ["custom-style2"],
    });
  }
  showEvaluate(element: any) {
    this.evaluatepopupVisible = true;
    if (sessionStorage.getItem("selectedItem"))
      sessionStorage.removeItem("selectedItem");
    sessionStorage.setItem("selectedItem", JSON.stringify(element));
  }
  approvalCTA(mode) {
    let selectedItem = JSON.parse(sessionStorage.getItem("selectedItem"));
    let req: any = {
      applicationnumber: selectedItem['applicationNum'],
      documentid: selectedItem['documentId'],
      IsApproved: mode === 'Approved' ? true : false,
      IsExecutionDateApproved: this.getStatus(this.Evaluation[0]),
      IsPartyApproved: this.getStatus(this.Evaluation[1]),
      IsScheduleApproved: this.getStatus(this.Evaluation[2]),
      IsVoluntaryApproved: this.getStatus(this.Evaluation[3]),
      IsDocClassTypeApproved: this.getStatus(this.Evaluation[4]),
      IsValuationDutyApproved: this.getStatus(this.Evaluation[5]),
      IsPaymentApproved: this.getStatus(this.Evaluation[6]),
    };
    console.log(req);
    this.departmentService.saveEvaluation(req).subscribe(res => {
      console.log(res);
      if (res.responseCode === 1000) {
        this.message = `${mode} successfully`;
        this.type = 'success';
        this.showToast(); 
        this.Evaluation.forEach(evl => evl.status === 'Yes');
        this.AllocatedApplications.forEach((ele) => {
          if (ele.applicationNum === selectedItem.applicationNum) {
            ele.isEvaluateVisible = false;
            ele.isDropdownEnabled = false;
            this.evaluatepopupVisible = false;
          }
        });
        this.allocateApplications();
      } else {
        this.message = `Failed to save`;
        this.type = 'error';
        this.showToast(); 
      }
    });
  }
  getStatus(evalu: any) {
    return evalu.status === 'Yes' ? true : false;
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

  AllocateClick(element: any) {
    if (this.selectedDEO) {
      const reqpayload = {
        "applicationnumber": element.applicationNum,
        "currentstatus": 'CD109',
        "lastupdatedby": this.deptData.userid.toString(),
        deoid: this.selectedDEO
      }
      this.departmentService.allocateSdaFda(reqpayload).subscribe(
        (res: any) => {
          if (res && res[0] && res[0].responseCode === 1000) {
            this.message = `Allocated successfully`;
            this.type = 'success';
            this.selectedDEO = undefined;
            this.showToast();
            this.allocateApplications();
            this.reAllocateApplications();
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
      );
    } else {
      this.message = `Please select deo to allocate`;
      this.type = 'error';
      this.showToast();
    }
  }
  Evaluation = [
    {
      id: 1,
      evaluate: "Confirm Date of Execution",
      status: 'Yes'
    },
    {
      id: 2,
      evaluate: "Confirm Seller and Purchaser Name",
      status: 'Yes'
    },
    {
      id: 3,
      evaluate: "Check Proper Identification and Schedule of the Property",
      status: 'Yes'
    },
    {
      id: 4,
      evaluate: "Confirm Voluntary Execution by the Parties",
      status: 'Yes'
    },
    {
      id: 5,
      evaluate: "Check the Classification of Document",
      status: 'Yes'
    },
    {
      id: 6,
      evaluate: "Check Market Valuation andStamp Duty Payable",
      status: 'Yes'
    },
    {
      id: 7,
      evaluate: "Full Amount Paid",
      status: 'Yes'
    },
  ];
  status = ["Yes", "No"];

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
  private formatTime(date) {
    if (date != '0001-01-01T00:00:00') {
      var currentTime = new Date(date);
      var hours = currentTime.getHours(),
        min = currentTime.getMinutes(),
        sec = currentTime.getSeconds();

      //Note: before converting into 12 hour format
      var suffix = "";
      if (hours > 11) {
        suffix += "PM";
      } else {
        suffix += "AM";
      }

      if (hours > 12) {
        hours -= 12;
      } else if (hours === 0) {
        hours = 12;
      }
      // if (min < 10) {
      var time = hours + "." + "0" + min.toString() + " " + suffix;
      // }
      // var time = hours + "." + min  + " " + suffix;
      return time;
    } else {
      return null;
    }  
  }
  DateParser(dateStr: string): string {
    let date = dateStr.substring(0, 10);
    let time = dateStr.substring(11, 19);
    let millisecond = dateStr.substring(20);
    let validDate = date;
    return validDate;
  }
  timeParser(dateStr: string): string {
    let date = dateStr.substring(0, 10);
    let time = dateStr.substring(11, 19);
    let millisecond = dateStr.substring(20);
    let validDate = time;
    return validDate;
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
