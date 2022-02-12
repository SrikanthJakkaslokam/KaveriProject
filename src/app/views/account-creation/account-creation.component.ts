import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { KaveriService } from '../../services/kaveri.service';
import { Router } from '@angular/router';
import notify from "devextreme/ui/notify";

@Component({
  selector: 'app-account-creation',
  templateUrl: './account-creation.component.html',
  styleUrls: ['./account-creation.component.scss'],

})
export class AccountCreationComponent implements OnInit {

  alert:boolean = false;
  registrationForm: FormGroup;
  submitted = false;
  errorMessage: string;
  genderList: Array<any> = [];
  SecQuestionList:Array<any>=[];
  captchaValue: string = "";
  ValidCaptha: boolean = false;
  ImageArray = ['2b827','2bg48','2cegf','2cg58','2cgyx','2en7g','2enf4','2fxgd','2g7nm','2g783'];
  ImagePath: string = '';
  img: string = '';
  captcha: string;
  constructor(private fb: FormBuilder,private kaveriService: KaveriService,public router: Router) { }

  message;
  isVisible: boolean = false;
  isVisiblesms: boolean = false;
  isVisiblefail: boolean = false;
  // CaptchaCode: string = "";
  type: string = "info";
 // constructor(private fb: FormBuilder,private MyCaptchaService: MyCaptchaService,private kaveriService: KaveriService,public router: Router) { }


  ngOnInit() {
    this.submitted = false;
    this.registrationForm =  new FormGroup({
      firstname: new FormControl("", Validators.required),
      middlename: new FormControl("", Validators.minLength(0) ),
      lastname: new FormControl("", Validators.required),
      gender: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required),
      mobilenumber: new FormControl("", Validators.required),
      securityque: new FormControl("", Validators.required),
      secanswer: new FormControl("", Validators.required),
       CaptchaUserInput:new FormControl("", Validators.required)
    });
    this.GetGender();
    this.GetSecQuestion();
    this.captchaValue = "";
    this.Captcha();
  }
  Captcha(){
    var num = Math.floor( Math.random() * 10);
    this.img = this.ImageArray[num];
    this.ImagePath = 'assets/img/captcha/'+ this.img +'.png'
}

  ValidateCaptcha()
  {
    debugger;
   var InputCaptha= this.registrationForm.get('CaptchaUserInput').value;
   var CapthaValue= this.img
   if(CapthaValue==InputCaptha)
   {
    this.ValidCaptha = true;
    this.captcha = "";
   }
   else{
    this.ValidCaptha = false;
    this.captcha = "Invalid Captcha";
   }

  }
  GetGender() {
    this.kaveriService.getGender().subscribe(
      (data: any) => {
        console.log(data);
        if(data.length != 0) {
          this.genderList = data;
        }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
  }
  GetSecQuestion() {
    this.kaveriService.getSecQuestion().subscribe(
      (data: any) => {
        console.log(data);
        if(data.length != 0) {
          this.SecQuestionList = data;
        }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
  }

  onSubmit() {
    debugger;
    this.ValidateCaptcha();
   if(this.ValidCaptha){ 
     this.submitted = true;
      this.alert=true;
    if (this.registrationForm.invalid) {
      return;
  }
  debugger;
  var registration = {
   
    "_email": this.registrationForm.get('email').value,
    "_firstname": this.registrationForm.get('firstname').value,
    "_gender":parseInt(this.registrationForm.get('gender').value),
    "_lastname": this.registrationForm.get('lastname').value,
    "_loginname": this.registrationForm.get('email').value,
    "_middlename": this.registrationForm.get('middlename').value,
    "_password": "csg@123",
     "_phone": parseInt(this.registrationForm.get('mobilenumber').value),
     "_secanswer": this.registrationForm.get('secanswer').value,
    "_secquestion":parseInt(this.registrationForm.get('securityque').value)
   
  };

    console.log(JSON.stringify(registration));
    this.kaveriService.SaveUserRegistration(registration).subscribe(
      (data: any) => {
        debugger;
        console.log(data);
        if (data.responseCode == "1000") {
          this.message = data.responseMesg;
          console.log(this.message);
          this.showToast();
          this.showToastsms();
          this.router.navigateByUrl('/landing-page')
        }
        else if (data.responseCode == "1001") {
          this.message = data.responseMesg;
          console.log(this.message);
          this.showToastfailed();
        }

      }, e => {
        if (e.error) {
          debugger;
          this.errorMessage = e.error.error_description;
        }
      }
    )
    this.onload();
  }
  }

  showToast() {
    debugger;
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
get f() { 
  return this.registrationForm.controls; 
}

onload() {
  this.submitted = false;
  this.registrationForm =  new FormGroup({
    firstname: new FormControl("", Validators.required),
    middlename: new FormControl("", Validators.required),
    lastname: new FormControl("", Validators.required),
    gender: new FormControl("", Validators.required),
    email: new FormControl("", Validators.required),
    mobilenumber: new FormControl("", Validators.required),
    securityque: new FormControl("", Validators.required),
    secanswer: new FormControl("", Validators.required)
  });
}
closeAlert()
{
  this.alert=false;
}
}
