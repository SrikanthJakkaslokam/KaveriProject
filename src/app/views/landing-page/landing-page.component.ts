import { Component, Input, EventEmitter, OnInit, Output, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators,FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { KaveriService } from '../../services/kaveri.service';
import { LoginComponent } from '../login/login.component';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import notify from 'devextreme/ui/notify';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  providers: [[DatePipe],
    { provide: CarouselConfig, useValue: { interval: 2500, noPause: false, showIndicators: true } },
  ]
})
export class LandingPageComponent implements OnInit  {
  private formSubmitAttempt: boolean;
  @Input() error: string | null;
  @Output() submitEM = new EventEmitter();
  @Output() loginEmitter = new EventEmitter();
  alert: boolean = false;
  validationMessage: string = "";
  public isVisible: boolean = false;
  public loginForm: FormGroup;
  public loginOtpForm: FormGroup;
  public forgotpass: FormGroup;
  submittedf = false;

  loginotp : string = "";
  otpvalid : boolean = false;

  otpmsg : string = "";
  submitted = false;
  loggedinUser: string = "";
  userName: string = "";
  password: string = "";
  errorMessage: string = "";
  USERNAME: string;
  PASSWORD: string;
  show_button: Boolean = true;
  show_eye: Boolean = true;
  UserNameErrorFlag: boolean = false;
  PasswordErrorFlag: boolean = false;
  OneTimeErrorFlag: boolean = false;

  regestrationamt: number = 0;
  stampdutyamt: number = 0;
  totalamt: number = 0;

  ImageArray = ['2b827','2bg48','2cegf','2cg58','2cgyx','2en7g','2enf4','2fxgd','2g7nm','2g783'];
  ImagePath: string = '';
  img: string = '';

  loginpopupVisible = false;
  otppopupVisible = false;
  forpasspopupVisible= false;
  positionOf: string;
  matDialogRef: MatDialogRef<LoginComponent>;
  slides = [
    {image: 'assets/img/avatars/Scroll Group 5.png', text: 'First'},
    {image: 'assets/img/avatars/Scroll Group.png',text: 'Second'}
 ];
 noWrapSlides = false;
 showIndicator = true;
 displayedColumns = ['snum', 'sro', 'address'];
 dataSource = new MatTableDataSource(ELEMENT_DATA);
 isShown: boolean = false ;

 ECApplicationCount : string ="";
 MarriageApplicationCount : string ="";
 LandDocRegApplicationCount : string ="";
 CertifiedCopyApplicationCount : string ="";
 FirmApplicationCount : string ="";
 ValueationApplicationCount : string ="";
 todayISOString : string = new Date().toISOString();
 currentdate = new Date();
 myDate= new Date();
 LandingPageForm: FormGroup;
 ApplictionFromDate :string ="";
 ApplictionToDate: string = "";
 timeLeft: number = 15;
 class = 'isDisabled' ; 
 loginValidCaptha: boolean = false;
 forgotValidCaptha: boolean = false;
  message: any;
  interval;
  CAPTCHA: string;
 
  constructor(public dialog: MatDialog, private kaveriService: KaveriService, public router: Router,private formBuilder: FormBuilder,private datePipe: DatePipe,private ref:ChangeDetectorRef) {
   
    this.currentdate.setDate( this.currentdate.getDate() - 30 );
    // this.LandingPageForm.set('FromDate').value=this.datePipe.transform(this.currentdate,"yyyy-MM-dd");
     
    // this.currentdate= this.datePipe.transform(this.myDate, 'yyyy-MM-dd');

   }

   ngOnInit(): void {

    this.documentsRegistered();
    this.marriagesRegistered();
    this.revenueGenerated();
    this.forgotpass = new FormGroup({
      email: new FormControl('', Validators.required),
      mobilenumber: new FormControl("", Validators.required),
      // Forgotcaptcha1: new FormControl('', Validators.required),
      ForgotCaptchaUserEntry:new FormControl("", Validators.required),
    });
    this.kaveriService.IsLoggedIn = false;

    this.loginForm = new FormGroup({
      logincaptcha1: new FormControl('', Validators.required),
      loginCaptchaUserInput1:new FormControl('', Validators.required),
      userName: new FormControl('', Validators.required),
      password: new FormControl("", Validators.required)
    });

    this.loginOtpForm = new FormGroup({
      otp: new FormControl("", Validators.required)
    });
    
    

    // this.LandingPageForm = this.formBuilder.group({
    //   FromDate: new FormControl(new Date(), Validators.required),
    //   ToDate: new FormControl(new Date(), Validators.required)
     
    // });
    // this.LandingPageForm = new FormGroup({
    //   FromDate: new FormControl(new Date(), Validators.required),
    //   ToDate: new FormControl(new Date(), Validators.required)
      
    // });
    this.LandingPageForm = this.formBuilder.group({
      FromDate: ['', Validators.required],
      ToDate: ['', Validators.required]
    })
    this.LandingPageForm.get('FromDate').patchValue(this.formatDate(new Date().setDate(new Date().getDate() -1440)));
    this.LandingPageForm.get('ToDate').patchValue(this.formatDate(new Date()));
    
    // this.FormLoadServicesCount();
    this.LoadServicesCount();

  }

  

  startTimer() {

    this.timeLeft = 15;
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
        if(this.timeLeft == 0){
          this.class = '' ; 
        }
        else{
          this.class = 'isDisabled' ; 
        }
      }
    },1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  private formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }
  onFromChange(){
   
    // localStorage.setItem('ApplicationFromDate', this.LandingPageForm.get('FromDate').value);
  
      console.log('From Date Value from UI :'+this.LandingPageForm.get('FromDate').value);
      this.ApplictionFromDate=this.LandingPageForm.get('FromDate').value;
      this.LoadServicesCount();

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
    debugger;
    // this.ECApplicationCount="4756";
    // this.MarriageApplicationCount="1,26,000";
    // this.LandDocRegApplicationCount="2,00,000";
    // this.CertifiedCopyApplicationCount="3489";
    // this.FirmApplicationCount="1254";
    // this.ValueationApplicationCount="20,000 Cr";
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

debugger

    console.log(ApplicantData);
    this.kaveriService.GetServicesApplicationCount(ApplicantData).subscribe(
      (data: any) => {
debugger
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
       debugger;
       console.log(data);

        if(data[0].descriptione == "Registration Fee"){
        this.regestrationamt = data[0].sum;}
        else{
        this.regestrationamt = 0;
        }

        if(data[0].descriptione == "Stamp Duty"){
        this.stampdutyamt = data[0].sum;}
        else if (data[1].descriptione == "Stamp Duty"){
        this.stampdutyamt = data[1].sum;
        }
        else{
        this.stampdutyamt = 0;
        }

        if(data[0].descriptione == "Total Amount"){
        this.totalamt = data[0].sum;}
        else if (data[1].descriptione == "Total Amount"){
        this.totalamt = data[1].sum;
        }
        else if (data[2].descriptione == "Total Amount"){
        this.totalamt = data[2].sum;
        }
        else{
        this.totalamt = 0;
        }
       
       this.doughnutChartData = [this.regestrationamt, this.stampdutyamt];


       


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

//   FormLoadServicesCount(){
//     debugger
//     var currentdate = new Date();
//     this.currentdate = new Date(this.todayISOString);
//     this.currentdate.setDate( this.currentdate.getDate() - 30 );
//     console.log(this.currentdate);
//     console.log('From Date Value from UI :'+this.LandingPageForm.get('FromDate').value);
//     // ; this.todayISOString
//     var ApplicantData = {
     
//       "searchdate": this.datePipe.transform(this.todayISOString,"yyyy-MM-dd"), //"2021-11-02T06:53:42.999Z",
//       "fromdate": this.datePipe.transform(this.currentdate,"yyyy-MM-dd"),
//       "todate":this.datePipe.transform(this.todayISOString,"yyyy-MM-dd"),

//         // this.LandingPageForm.get('todate').value=this.datePipe.transform(this.todayISOString,"yyyy-MM-dd")
     
//     };

// debugger

//     console.log(ApplicantData);
//     this.kaveriService.GetServicesApplicationCount(ApplicantData).subscribe(
//       (data: any) => {
// debugger
//         //console.log(JSON.stringify(data));
//         console.log(data);
//         this.MarriageApplicationCount= data[0].count; //ECC
//         // this.LandDocRegApplicationCount= data[1].count; //MRG
//         this.ECApplicationCount= data[2].count; //PRP
        
//       }, e => {
//         if (e.error) {

//           this.errorMessage = e.error.error_description;
//         }
//       }
//     )


   
//   }

  toggleShow() {
    this.isShown = ! this.isShown;
    }
  showloginInfo() {
    debugger;
    this.Captcha();
    this.loginpopupVisible = true;
  }

  showforgotpassword() {
    debugger;
    this.Captcha();
    this.forpasspopupVisible = true;
    this.loginpopupVisible = false;
    
  }

  showotpInfo() {
  this.otppopupVisible = true;
  }

  get f() { 
    return this.loginForm.controls; 
  }
  get g() { 
    return this.forgotpass.controls; 
  }

  showAlert(): void {
    if (this.isVisible) {
      return;
    }
    this.isVisible = true;
    setTimeout(() => this.isVisible = false, 2500)
  }

  Login() {
   
    debugger;
    var result = this.ValidateLogin()
    if (!result) {
      this.Captcha();
      return;
    }
    
    this.kaveriService.login(this.loginForm.get("userName").value.toLowerCase(), this.loginForm.get("password").value).subscribe(
      
      (data: any) => {
        if (data != undefined) {
          if (data[0].responseCode == 1000) {
          // this.loginEmitter.emit();
          this.loggedinUser = data[0].firstname;
          var citizenid = data[0].citizenid;
          localStorage.setItem('citizenid',citizenid)
          debugger;
          localStorage.setItem('loggedinuser', data[0].firstname);
          localStorage.setItem('usermobile', data[0].phone);
          localStorage.setItem('citizenid', data[0].citizenid);
          console.log(localStorage.getItem('citizenid'));
          this.loginpopupVisible = false;
          this.otppopupVisible = true;
          
          this.sendotp();
          
          console.log(this.loginotp);
            if(this.otpvalid = true){
                
          }
            if (this.loginForm.valid) {
              this.submitEM.emit(this.loginForm.value);
            }
          }
          else if(data[0].responseCode == 1001) {
            this.validationMessage = data[0].responseMessage;
            console.log(this.validationMessage);
            this.loginpopupVisible = true;
            this.otppopupVisible = false;
            this.ref.detectChanges();
            // this.router.navigateByUrl('/landing-page');
          }
       
        }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
          console.log(e.error.error_description);
        }
      }
    )
    // this.alert = true;

  }
  resendotp(){
    this.sendotp();
  }

  Captcha(){
    debugger;
      var num = Math.floor( Math.random() * 10);
      this.img = this.ImageArray[num];
      this.ImagePath = 'assets/img/captcha/'+ this.img +'.png'
  }
 

  //  ValidateCaptcha()
  //  {
  //  debugger;
  // var InputCaptha= this.loginForm.get('loginCaptchaUserInput1').value;
  //  var CapthaValue= this.img

  // if(CapthaValue == InputCaptha)
  //  {
  //    this.loginValidCaptha = true;
  //    if()
  //    this.Login();
  //   }
  //   else{
  //    this.loginValidCaptha = false;
  //   }

  //  }

   forgotValidateCaptcha()
   {
     debugger;
    var InputCaptha= this.forgotpass.get('ForgotCaptchaUserEntry').value;
    var CapthaValue= this.img
   
    if(CapthaValue!=InputCaptha)
    {
     this.forgotpass.get('ForgotCaptchaUserEntry').patchValue('');
      this.forgotValidCaptha = true;
    }
    else{
      this.loginValidCaptha = false;
    }

   }

  sendotp(){
    this.startTimer();
    var mobile = localStorage.getItem('usermobile');
    // var mobile = "8861922367";
    this.kaveriService.loginOtp(mobile).subscribe(
      (dataotp: any) => {
        if (dataotp != undefined) {
          debugger;
          this.loginotp = dataotp.otp;
          
        }
      }
    )
  }
  verifyotp(){
debugger
    if(this.loginOtpForm.get('otp').value == this.loginotp){
    this.otpvalid = true;
    this.pauseTimer();
    this.kaveriService.IsLoggedIn = true;
    this.router.navigateByUrl('/dashboard');
    }
    else{
      this.otpvalid = false;
      if(this.loginOtpForm.get('otp').value != null){
      this.otpmsg = "Enter valid OTP";
      }
      // alert("OTP is incorrect");
    }
    this.router.navigateByUrl('/dashboard');
  }
  resetforgotpass(){
    this.forgotpass.reset();
  }

  ForgotPassword() {
    debugger;
    console.log(this.forgotpass.get("email").value);
    console.log(this.forgotpass.get("mobilenumber").value);
    this.kaveriService.IsForgotPassword = true;
    if(this.forgotpass.invalid){
      this.submittedf = true;
      return;
    }
    this.kaveriService.forgotpassword(this.forgotpass.get("email").value.toLowerCase(), this.forgotpass.get("mobilenumber").value).subscribe( 
      (data: any) => {
      debugger;
      console.log(data);
      if (data.responseCode == "1000") {
        this.message = data.responseMesg ;
        console.log(this.message);
        this.showToast();
        this.showToastsms();
        this.forpasspopupVisible = false;
        this.resetforgotpass();
      }
      else{
        this.message = data.responseMesg;
        console.log(this.message);
        this.showToastfailed();
      }
    }
    );
    this.kaveriService.IsForgotPassword = true;
  }
  showToast() {
    notify({
        message: this.message,
        isVisible: true,
        displayTime: 6000,
        height: 50,
        type:"success"
    });
  }
  showToastsms() {
    notify({
        message:"New Username and Password is sent to your Mobile Number",
        isVisiblesms: true,
        displayTime: 3000,
        height: 50,
        type:"info"
    });
    
  }
  
  showToastfailed() {
    notify({
        message: this.message,
        isVisiblefail: true,
        displayTime: 3000,
        height: 50,
        type:"error"
  
    });
    
  }


  ValidateLogin() {
    debugger;
    let result = true;
    if (this.loginForm.get("userName").value == "" || this.loginForm.get("userName").value == undefined) {
      this.UserNameErrorFlag = true;
      result = false;
      this.USERNAME = 'Username is required';
    }
    else{
      this.USERNAME = "";
    }

    if (this.loginForm.get("password").value == "" || this.loginForm.get("password").value == undefined) {
      this.PasswordErrorFlag = true;
      result = false;
      this.PASSWORD = 'Password is required';
    }
    else{
      this.PASSWORD = "";
    }

    var InputCaptha= this.loginForm.get('loginCaptchaUserInput1').value;
    var CapthaValue= this.img

    if(CapthaValue == InputCaptha)
    {
      this.loginValidCaptha = true;
    }
    else{
      this.loginValidCaptha = false;
    }
    // console.log(this.loginForm.get('loginCaptchaUserInput1').value);
    
      if(this.loginValidCaptha != true){
        result = false;
        this.CAPTCHA = 'Captcha is invalid';
      } 
      else{
        let result = true;
        this.CAPTCHA = ""
      }
    

    
    console.log(result);
    


    return result;
    this.alert = true;

  }

  isFieldInvalid(field: string) {
    return (
      (!this.loginForm.get(field).valid && this.loginForm.get(field).touched) ||
      (this.loginForm.get(field).untouched && this.formSubmitAttempt)
    );
  }
  showPassword() {
    this.show_button = !this.show_button;
    this.show_eye = !this.show_eye;
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




  element: Element[] = [
    {
      snum: 1,
      sro: "Jayanagar",
      address: "12th Main Rd, 4th Blo.." 
  },
  {
    snum: 2,
    sro: "Bommanahalli",
    address: "2nd Floor, 7th Cross,..." 
  },
  { snum: 3,
    sro: "Kengeri",
    address: "SLN complex, Mysore..." 
  },
  {
    snum: 4,
    sro: "Begur",
    address: "No.1105/9C, 1st Floor,..." 
  },
  {
    snum: 5,
    sro: "Rajarajeshwari Nagar",
    address: "No.25, DM Chambers..." 
  }
];

}
export class Element {
  snum: number;
  sro: string;
  address: string;
}
const ELEMENT_DATA: Element[] = [];