import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { KaveriService } from '../../services/kaveri.service';
import notify from "devextreme/ui/notify";
import { MatSnackBar } from '@angular/material/snack-bar';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-departmental-login',
  templateUrl: './departmental-login.component.html',
  styleUrls: ['./departmental-login.component.scss'],
  providers: [[DatePipe]
  ]
})
export class DepartmentalLoginComponent implements OnInit {
  MarriageApplicationCount : string ="";
  LandDocRegApplicationCount : string ="";
  ECApplicationCount : string ="";
  errorMessage: string ="";
  currentdate = new Date(); 
  todayISOString : string = new Date().toISOString();
  LandingPageForm: FormGroup;
  deptLoginForm: FormGroup;
  ApplictionFromDate: string = "";
  ApplictionToDate: string = "";
  submitted = false;
  message;
  failureMessage: string = "";
  isVisiblefail: boolean = false;
  type : string;
  regestrationamt: number = 0;
  stampdutyamt: number = 0;
  totalamt: number = 0;

  constructor(private kaveriService: KaveriService, private formBuilder: FormBuilder, private datePipe: DatePipe, private router: Router, public snackBar: MatSnackBar, private departmentService: DepartmentService) { 
    this.currentdate.setDate( this.currentdate.getDate() - 30 );
  }

  ngOnInit() {

    this.deptLoginForm = new FormGroup({
      deptuser: new FormControl('', Validators.required),
      deptpassword: new FormControl("", Validators.required)
    });

    this.documentsRegistered();
    this.marriagesRegistered();
    this.revenueGenerated();
    this.LandingPageForm = this.formBuilder.group({
      FromDate: ['', Validators.required],
      ToDate: ['', Validators.required]
    })
    this.LandingPageForm.get('FromDate').patchValue(this.formatDate(new Date().setDate(new Date().getDate() -1440)));
    this.LandingPageForm.get('ToDate').patchValue(this.formatDate(new Date()));
    
    // this.FormLoadServicesCount();
    this.LoadServicesCount();
  }

  Login() {
    
    this.submitted = true;
    if (this.deptLoginForm.invalid) {
      return;
  }
    var user = {
      "loginname": this.deptLoginForm.get('deptuser').value,
      "password": this.deptLoginForm.get('deptpassword').value
    }
    this.departmentService.deptlogin(user).subscribe(
      
      (data: any) => {
        console.log(data);
        localStorage.setItem('deptData',JSON.stringify(data));
        localStorage.setItem('deptUser',data[0].username);
        localStorage.setItem('deptSroCode',data[0].srocode);
        localStorage.setItem('deptDesgId',data[0].designationid);
        localStorage.setItem('deptUserDesignation',data[0].designame);
        localStorage.setItem('deptUserid',data[0].userid);
        if (data != undefined) {
          if (data[0].designationid == 1) {
            this.router.navigateByUrl('/pending-application');                
          }  
          if (data[0].designationid == 4) {
            this.router.navigateByUrl('/deo-portal');                
          }  
          if (data[0].designationid == 2 || data[0].designationid == 3) {
            this.router.navigateByUrl('/sda-fda-landing-page');                
          }
          if (data[0].responseCode == 1001) {
            this.failureMessage = data[0].responseMessage;
          }
        }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
          console.log(e.error.error_description);
        }
      }
    )
  }
 
  get f() {
    return this.deptLoginForm.controls;
  }
  onFromChange(){
   
    // localStorage.setItem('ApplicationFromDate', this.LandingPageForm.get('FromDate').value);
  
      console.log('From Date Value from UI :'+this.LandingPageForm.get('FromDate').value);
      this.ApplictionFromDate=this.LandingPageForm.get('FromDate').value;
    }

    onToChange(){
     
      // localStorage.setItem('ApplicationToDate',this.LandingPageForm.get("ToDate").value );
        this.ApplictionToDate = this.LandingPageForm.get('ToDate').value;
        console.log('To Date Value from UI :'+this.LandingPageForm.get('ToDate').value);

        if(this.LandingPageForm.get('FromDate').value ==""){
          alert('Please select From Date.');
          return false;
        }

        this.LoadServicesCount();
      }
  LoadServicesCount(){
    
   
    console.log('From Date Value from UI :'+this.LandingPageForm.get('FromDate').value);
    this.ApplictionFromDate = this.LandingPageForm.get('FromDate').value;
    this.ApplictionToDate = this.LandingPageForm.get('ToDate').value;
    console.log('To Date Value from UI :'+this.LandingPageForm.get('ToDate').value);
    // ; this.todayISOString
    this.documentsRegistered();
    this.marriagesRegistered();
    this.revenueGenerated();
    var ApplicantData = {
     
      "searchdate": this.datePipe.transform(this.todayISOString,"yyyy-MM-dd"), //"2021-11-02T06:53:42.999Z",
      "fromdate": this.ApplictionFromDate,
      "todate": this.ApplictionToDate
    };


    console.log(ApplicantData);
    this.kaveriService.GetServicesApplicationCount(ApplicantData).subscribe(
      (data: any) => {
        //console.log(JSON.stringify(data));
        console.log(data);
        this.MarriageApplicationCount= data[0].count; //ECC
        // this.LandDocRegApplicationCount= data[1].count; //MRG
        this.ECApplicationCount= data[2].count; //PRP
        
      }, e => {
        if (e.error) {

          this.errorMessage = e.error.error_description;
        }
      }
    )


   
  }

  revenueGenerated() {
    var dates = {
     "fromdate": this.ApplictionFromDate,
     "todate": this.ApplictionToDate
    }
    console.log(dates);
    this.kaveriService.GetRevenueGenerated(this.ApplictionFromDate , this.ApplictionToDate).subscribe(
     (data: any) => {
       
       console.log(data);
       this.regestrationamt = data[0].sum;
       this.stampdutyamt = data[1].sum;
       this.doughnutChartData = [ data[0].sum,data[1].sum];
       this.totalamt = data[2].sum;
       console.log(this.regestrationamt);
       console.log(this.stampdutyamt);
       console.log(this.totalamt);

     }, e => {
       if (e.error) {
 
         this.errorMessage = e.error.error_description;
       }
     }
   )
 }
  onSubmit() {
    console.log(this.LandingPageForm);
  }
   showToast() {
    notify({
        message: this.message,
        isVisiblefail: true,
        displayTime: 3000,
        height: 50,
        type:"error"
  
    });
  }
  FormLoadServicesCount(){
    this.currentdate = new Date(this.todayISOString);
    this.currentdate.setDate( this.currentdate.getDate() - 30 );
    console.log(this.currentdate);
    console.log('From Date Value from UI :'+this.LandingPageForm.get('FromDate').value);
    var ApplicantData = {
      "searchdate": this.datePipe.transform(this.todayISOString,"yyyy-MM-dd"), //"2021-11-02T06:53:42.999Z",
      "fromdate": this.datePipe.transform(this.currentdate,"yyyy-MM-dd"),
      "todate":this.datePipe.transform(this.todayISOString,"yyyy-MM-dd")
    };
    console.log(ApplicantData);
    this.kaveriService.GetServicesApplicationCount(ApplicantData).subscribe(
      (data: any) => {
        console.log(data);
        this.MarriageApplicationCount= data[0].count; //ECC
        this.LandDocRegApplicationCount= data[1].count; //MRG
        this.ECApplicationCount= data[2].count; //PRP
        
      }, e => {
        if (e.error) {

          this.errorMessage = e.error.error_description;
        }
      }
    )


   
  }
  documentsRegistered() {
    var docs = {
     "fromdate": this.ApplictionFromDate,
     "todate": this.ApplictionToDate
    }
    console.log(docs);
    this.kaveriService.GetDocumentRegisteredCount(docs).subscribe(
     (data: any) => {
       console.log(data);
       this.barChartData1 = [      {
         data: data.map(item => item.bookcount),
       }]
      this.barChartLabels1 = data.map(item => "Book " + item.bookid);
      // this.barChartLabels1 = data.map(item =>  item.bookid);
       this.LandDocRegApplicationCount = data[0].totalcount;
     }, e => {
       if (e.error) {
 
         this.errorMessage = e.error.error_description;
       }
     }
   )
 }
 
 marriagesRegistered() {
   
   var count = {
    "fromdate": this.formatDate(new Date().setDate(new Date().getDate() -30)),
    "todate": this.formatDate(new Date())
   }
   this.kaveriService.GetMarriageRegisteredCount(count).subscribe(
    (data: any) => {
      console.log(data);
      this.barChartData2 = [      {
       data: data.map(item => item.count),
     }]
     this.barChartLabels2 = data.map(item => item.month);
     this.MarriageApplicationCount = data.map(item => item.count);
    }, e => {
      if (e.error) {
 
        this.errorMessage = e.error.error_description;
      }
    }
  )
 }

 public barChartColours1: Array<any> = [{
  backgroundColor: ['#66c2a5','#66c2a5','#66c2a5','#66c2a5','#66c2a5','#66c2a5','#66c2a5','#66c2a5','#66c2a5','#66c2a5','#66c2a5','#66c2a5']
}];

public barChartOptions1: any = {
  legend: {
    display: false
  },
  plugins: {
    legend: {
      display: false
    }
  },
  scaleShowVerticalLines: false,
  responsive: true,
  scales: {
    xAxes: [{
        gridLines: {
            display:false
        }
    }],
    yAxes: [{
        gridLines: {
            display:false
        }   
    }],
   
}
};
public barChartLabels1: string[] = [];
public barChartType1 = 'bar';
public barChartLegend1 = true;

public barChartData1: any[] = [
  {data: [], label: ['']},
];

public barChartColours2: Array<any> = [{
  backgroundColor: ['#5e85c2','#5e85c2','#5e85c2','#5e85c2','#5e85c2','#5e85c2','#5e85c2','#5e85c2','#5e85c2','#5e85c2','#5e85c2','#5e85c2']
}];
public barChartOptions2: any = {
  legend: {
    display: false
  },
  plugins: {
    legend: {
      display: false
    }
  },
  scaleShowVerticalLines: false,
  responsive: true,
  scales: {
    xAxes: [{
      gridLines: {
        drawBorder: true,
        display: false,
        beginAtZero: true
      }  
    }],
    yAxes: [{
        gridLines: {
          drawBorder: true,
          display: false,
          beginAtZero: true
        }   
    }],
   
}
};
public barChartLabels2: string[] = ['Hindu', 'Special', 'Special Other',''];
public barChartType2 = 'bar';
public barChartLegend2 = true;

public barChartData2: any[] = [
  {data: [80000, 40000, 20000,0], label: ['']},
];


public chartLabels: string[] = ['Stamp Duty', 'Registration Fees'];
public chartData = [this.stampdutyamt,this.regestrationamt];
public chartType: 'doughnut';
public chartColors: Array<any> = [{
  backgroundColor: [
    '#66c2a5', '#5e85c2'
  ]
}];
public chartOptions: any = {
  legend: {position: 'bottom'},
  pieceLabel: {
    render: function (args) {
      const label = args.label,
        value = args.value;
      return label + ': ' + value;
    }
  }
}
public doughnutChartLabels: string[] = ['Stamp Duty', 'Registration Fees'];
public doughnutChartData: number[] = [this.stampdutyamt,this.regestrationamt];
public doughnutChartType = 'doughnut';

  private formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }
  openSnackBarFailure(message = this.failureMessage, action = '') {
    this.snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: "bottom",
      horizontalPosition: "right",
      panelClass: ["custom-style2"]
    });
  }
}
