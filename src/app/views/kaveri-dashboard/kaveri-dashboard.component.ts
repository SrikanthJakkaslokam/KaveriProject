import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { KaveriService } from '../../services/kaveri.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-kaveri-dashboard',
  templateUrl: './kaveri-dashboard.component.html',
  styleUrls: ['./kaveri-dashboard.component.scss']
})
export class KaveriDashboardComponent implements OnInit {
  loggedinUser: string = "";
  displayedColumns = ['sno', 'applicationnumber', 'applicationstartdate', 'applicationtype', 'wrkflowstatusnamee', 'Action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  errorMessage: string;
  ApplnData: any[];
  citizenid: any;
  result: any;
  constructor(private kaveriService: KaveriService, private router: Router, public dialog: MatDialog,) { }

  ngOnInit() {
    this.loggedinUser = localStorage.getItem('loggedinuser');
    this.citizenid = localStorage.getItem('citizenid');
    debugger
    var citizenid = {
      "citizenid": this.citizenid
    };


    console.log(citizenid);
    console.log("loggedinUser->", this.loggedinUser);
    this.kaveriService.getApplicatonsDetails(citizenid).subscribe(
      (data: any) => {
        this.ApplnData = data;
        console.log("this.ApplnData-->", this.ApplnData);

      }, e => {
        if (e.error) {
          debugger;
          this.errorMessage = e.error.error_description;
        }
      }
    )


  }
  view(applicationnumber: any) {

    const appData = this.ApplnData.filter((res) => { return res.applicationnumber == applicationnumber })
    localStorage.setItem("appData", JSON.stringify(appData))
    this.router.navigate(['application-details']);
  }
  scheduleAppointment(applicationnumber: any) {

    const appData = this.ApplnData.filter((res) => { return res.applicationnumber == applicationnumber })
    localStorage.setItem("appointmentApp", JSON.stringify(appData[0].applicationnumber))
    this.router.navigate(['schedule-appointment']);
  }
  Edit(applicationnumber: any) {
    debugger
    const appData = this.ApplnData.filter((res) => { return res.applicationnumber == applicationnumber })
    localStorage.setItem("appData", JSON.stringify(appData))
    localStorage.setItem("ApplicationData", applicationnumber)
    this.router.navigate(['kaveri-result']);
  }


  MakePayment(applicationnumber: any) {

    let khajaneUrl = "";
    let encData = "";
    let deptRefNum = '';
    let subDeptRefnum = '';
    
    const applicationNum = applicationnumber;

    encData = "15xgfxDV5qWXHFn/N4MrCKqstEKbdVI6xrq7e/A0yaJVTfatBy5yy5Vk+SRQ784rn55YUURNVXqGfvtUlsZMq9zF73wvTgmJ66HOkNWmmrRL9KJw9hEuZJFEKDK2Y1+u2I4Y1UCfhp/f0ZbvCltkzG5YQm3Kp+9T/XHqo+3+ABs=";

    if(encData){
      debugger;
      let redirectUrl = "https://preprodk2.karnataka.gov.in/wps/portal/Home/DepartmentPayment/?uri=receiptsample:com.tcs.departmentpage:departmentportlet&encdata=" + encData + "&dept_code=33E";
      window.location.href = redirectUrl;
    }
    

    let applicationnumber1 = {
      // "applicationnumber" : applicationNum
      "khajanaNumber" : 'BSG-ECC-B-00055-2021-22'
      //"khajanaNumber" : 'PRP-21012022-02564'
    }

    // this.kaveriService.GetPaymentDetailsPRP(applicationnumber1).subscribe(
    //   (data: any) => {
    //     if (data) {
    //       console.log('payment',data)
    //       // encData = data.encryptedStr;
    //       encData = "15xgfxDV5qWXHFn/N4MrCKqstEKbdVI6xrq7e/A0yaJVTfatBy5yy5Vk+SRQ784rn55YUURNVXqGfvtUlsZMq9zF73wvTgmJ66HOkNWmmrRL9KJw9hEuZJFEKDK2Y1+u2I4Y1UCfhp/f0ZbvCltkzG5YQm3Kp+9T/XHqo+3+ABs=";
    //       if(encData){
    //         let redirectUrl = "https://preprodk2.karnataka.gov.in/wps/portal/Home/DepartmentPayment/?uri=receiptsample:com.tcs.departmentpage:departmentportlet&encdata=" + encData + "&dept_code=33E";
    //         window.location.href = redirectUrl;
    //       }
    //     }
    //   }, e => {
    //     if (e.error) {
    //       this.errorMessage = e.error.error_description;
    //     }
    //   }
    // )
  }


  // MakePayment(applicationnumber: any) {
    
  //   let khajaneUrl = "";
  //   let encData = "";
  //   let deptRefNum = '';
  //   let subDeptRefnum = '';

  //   const applicationNum = applicationnumber;

  //   let applicationnumber1 = {
  //     // "applicationnumber" : applicationNum
  //     "khajanaNumber" : 'BSG-ECC-B-00055-2021-22'
  //     //"khajanaNumber" : 'PRP-21012022-02564'
  //   }

  //   this.kaveriService.getPaymentData(applicationnumber1).subscribe(
  //     (data: any) => {
  //       if (data) {
  //         console.log('payment',data)

  //         khajaneUrl = "https://49.206.243.85:8443/PaymentGateway/api/PaymentGateway/PaymentGateway?refCode=" + data.deptreferencecode + "&subRefCode=" + data.deptrefcode;

  //             this.kaveriService.PaymentGateWay(khajaneUrl).subscribe(
  //               (data: any) => {
  //                 console.log(data);
  //                 if (data) {
  //                   console.log('encdata',data);
  //                   //encData = data.encryptedStr;
  //                 }
  //                 if (encData) {
  //                   //let encData = "EwWP7w513mJ5kEOen+5V7AYINidKHgq/IUjUeUrOUGVe8emO/jh265Bua7KqFCskhNGt2rJn/raIgNZPUHCwM86U5jZgsClxo1kQh81AKkAHWNsSjovh+LzL3/AOD/B4mjr0ALE1lD/oD0ckZQ2iV+r/0e6RGB9vxhNEMH7rVug=";

  //                   let redirectUrl = "https://preprodk2.karnataka.gov.in/wps/portal/Home/DepartmentPayment/?uri=receiptsample:com.tcs.departmentpage:departmentportlet&encdata=" + encData + "&dept_code=33E";
  //                   window.location.href = redirectUrl;
  //                 }
                  
  //               }
  //           )
  //       }
  //     }, e => {
  //       if (e.error) {
  //         this.errorMessage = e.error.error_description;
  //       }
  //     }
  //   )
  // }



  //   khajaneUrl = "https://49.206.243.85:8443/PaymentGateway/api/PaymentGateway/PaymentGateway?refCode=" + deptRefNum + "&subRefCode=" + subDeptRefnum;
  //   this.kaveriService.PaymentGateWay(khajaneUrl).subscribe(
  //     (data: any) => {
  //       console.log(data);
  //       if (data) {
  //         encData = data.encryptedStr;
  //       }
  //     }
  //   )
  //   if (encData) {
  //   //let encData = "EwWP7w513mJ5kEOen+5V7AYINidKHgq/IUjUeUrOUGVe8emO/jh265Bua7KqFCskhNGt2rJn/raIgNZPUHCwM86U5jZgsClxo1kQh81AKkAHWNsSjovh+LzL3/AOD/B4mjr0ALE1lD/oD0ckZQ2iV+r/0e6RGB9vxhNEMH7rVug=";
  //   let redirectUrl = "https://preprodk2.karnataka.gov.in/wps/portal/Home/DepartmentPayment/?uri=receiptsample:com.tcs.departmentpage:departmentportlet&encdata=" + encData + "&dept_code=33E";
  //   window.location.href = redirectUrl;

  //   }
  // }

  viewApplication(applicationnumber: any) {
    const applicationNum = applicationnumber;
    localStorage.setItem("ViewApplicationNum", applicationNum)
    this.router.navigate(['view-document-for-approval']);
  }


  // element : Element[]= [{"applicationnumber":"ECC-01112021-00005","applicationstartdate":"11/01/2021 10:05:31","applicationtype":"EC Application","wrkflowstatusnamee":"Application In Progress"},{"applicationnumber":localStorage.getItem('ApplicationData'),"applicationstartdate":"11/01/2021 06:08:25","applicationtype":"EC Application","wrkflowstatusnamee":"Application In Progress"},{"applicationnumber":"PRP-28102021-00003","applicationstartdate":"10/28/2021 15:19:10","applicationtype":"Land Document Registration Application","wrkflowstatusnamee":"Application In Progress"}];

  //   element: Element[] = [
  //     {
  //       //sno: 1,
  //       applicationnumber: "A1554S545455112",
  //       applicationstartdate: "08-08-2021",
  //       applicationtype: "Property Registration",
  //       wrkflowstatusnamee: "Pending"
  //   },
  //   {
  //     //sno: 2,
  //     applicationnumber: "POA5ASDD555112",
  //     applicationstartdate: "06-08-2021",
  //     applicationtype: "Power of Attorney",
  //     wrkflowstatusnamee: "Completed"
  //   },
  //   { //sno: 3,
  //     applicationnumber: "M1554S545445112",
  //     applicationstartdate: "08-05-2020",
  //     applicationtype: "Marriage Registration",
  //     wrkflowstatusnamee: "Completed"
  //   },
  //   {
  //     //sno: 4,
  //     applicationnumber: "A1554S545455112",
  //     applicationstartdate: "08-08-2021",
  //     applicationtype: "Property Registration",
  //     wrkflowstatusnamee: "Pending"
  //   },

  // ];
  Makepaymentkajane() {
    window.location.href = "https://k2.karnataka.gov.in/wps/portal/Khajane-II/!ut/p/z1/fZBPb4JAEMU_DUeZkT8b7I2griLtujUg7sWAwZUEWYO0pN--S_XQanVuM-_38l4GBKQg6uyzlFlbqjqr9L4RZOt4QTBkATJvHI2QM5bEUTgbIiKsfwAyW5A5OhjR14Sgz5d2-EZ63QXxW2Yh1zKhdDqNLUtfrv4nAb0fH4zf-8XfCOrQiW7gWon3btu4wjvgvuINsIx9DYwSlxNuIZIr8KRFCEJWKr88zK9z25MgmmJfNEVjfjT6fGjb0_nFQAO7rjOlUrIqzJ0yy9rA_0wHdW4hvWXhdIxTLOcDkX9137omCes!/dz/d5/L2dBISEvZ0FBIS9nQSEh/";
    //  window.open("https://k2.karnataka.gov.in/wps/portal/Khajane-II/!ut/p/z1/fZBPb4JAEMU_DUeZkT8b7I2griLtujUg7sWAwZUEWYO0pN--S_XQanVuM-_38l4GBKQg6uyzlFlbqjqr9L4RZOt4QTBkATJvHI2QM5bEUTgbIiKsfwAyW5A5OhjR14Sgz5d2-EZ63QXxW2Yh1zKhdDqNLUtfrv4nAb0fH4zf-8XfCOrQiW7gWon3btu4wjvgvuINsIx9DYwSlxNuIZIr8KRFCEJWKr88zK9z25MgmmJfNEVjfjT6fGjb0_nFQAO7rjOlUrIqzJ0yy9rA_0wHdW4hvWXhdIxTLOcDkX9137omCes!/dz/d5/L2dBISEvZ0FBIS9nQSEh/", "_blank");
  }
  rescheduleAppointment(applicationnumber): any {
    console.log("applicationnumber-->", applicationnumber);
    const appData = this.ApplnData.filter((res) => { return res.applicationnumber == applicationnumber })
    localStorage.setItem("appointmentApp", JSON.stringify(appData[0].applicationnumber))
    this.router.navigate(['schedule-appointment']);

  }
}
export class Element {
  // districtcode: string;
  // hissano: string;
  // hoblicode: string;
  // landcode: string;
  // noofowners: string;
  // restriction: string;
  // restrictiondescription: string;
  // restrictiontype: string;
  // surnoc: string;
  // surveyno: string;
  // talukacode: string;
  // villagecode: string;
  // villageexemptedfromsketch: string;
  //sno: number;
  applicationnumber: string;
  applicationstartdate: string;
  applicationtype: string;
  wrkflowstatusnamee: string;
}
const ELEMENT_DATA: Element[] = [];
