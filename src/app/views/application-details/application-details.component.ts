import { Component, OnInit } from '@angular/core';
import { KaveriService } from '../../services/kaveri.service';
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-application-details',
  templateUrl: './application-details.component.html',
  styleUrls: ['./application-details.component.scss']
})
export class ApplicationDetailsComponent implements OnInit {
  deptuserId: any;
  applicationnumber: any;
  applicationstartdate: any;
  applicationtype: any;
  errorMessage: string;
  // applicationData: any = [
  //   {
  //     "sno": "1",
  //     "reviewname": "Property Details",
  //     "sroremarks": "No Changes Required",
  //     "action": 0,
  //     "status": "Complete"
  //   },
  //   {
  //     "sno": "2",
  //     "reviewname": "Party Details",
  //     "sroremarks": "No Changes Required",
  //     "action": 0,
  //     "status": "Complete"
  //   },
  //   {
  //     "sno": "3",
  //     "reviewname": "Property Schedule",
  //     "sroremarks": "No Changes Required",
  //     "action": 0,
  //     "status": "Complete"
  //   },
  //   {
  //     "sno": "4",
  //     "reviewname": "Market Valuation",
  //     "sroremarks": "Market valuation is more than calculated",
  //     "action": 1,
  //     "status": "Not Complete"
  //   },
  //   {
  //     "sno": "5",
  //     "reviewname": "Fee Calculation",
  //     "sroremarks": "Fee Calculation need to be recalculated on new market valuation",
  //     "action": 1,
  //     "status": "Not Complete"
  //   }
  // ]
  applicationData:any=[];
  loggedinUser: string;
  constructor(private kaveriService: KaveriService,private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.loggedinUser = localStorage.getItem('loggedinuser');

    const appData=JSON.parse(localStorage.getItem("appData"));
    // localStorage.removeItem("appData");
    this.applicationnumber=appData[0].applicationnumber
    this.applicationstartdate=appData[0].applicationstartdate
    this.applicationtype=appData[0].applicationtype
    
    // this.deptuserId = this.route.snapshot.params['id'];
    var deptuserid = {
      "applicationnumber": this.applicationnumber
    };
    
    this.kaveriService.getApplicatonsReviewData(deptuserid).subscribe(
      (data: any) => {
        if(data && data.length){
          for(let i=0;i<data.length;i++){
            data[i].sno=i+1
          }
        }
        this.applicationData = data;
        console.log("this.applicationData-->",this.applicationData);
        
      }, e => {
        if (e.error) {
          debugger;
          this.errorMessage = e.error.error_description;
        }
      })
  }

}
