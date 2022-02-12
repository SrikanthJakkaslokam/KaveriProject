import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from './login.user';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { KaveriService } from '../../services/kaveri.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  tabs = [
    { text: "Live Dashboard" },
    { text: "Services for Guest User" },
    { text: "Services for Registered User" },
    { text: "Important Instructions" }
];
  private formSubmitAttempt: boolean;

  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();


  @Output() loginEmitter = new EventEmitter<any>();
  alert: boolean = false;
  validationMessage: string = "";

  public isVisible: boolean = false;
  public loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder, public router: Router, private http: HttpClient, private kaveriService: KaveriService) {

  }
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
  captchaValue: string = "";
  ValidCaptha: boolean = false;
  ngOnInit(): void {
    
    this.loginForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl("", Validators.required),
      captchaValue: new FormControl("", Validators.required),
       CaptchaUserInput:new FormControl("", Validators.required)
    });
    this.kaveriService.IsLoggedIn = false;
    this.captchaValue = "";
    this.Captcha();
  }

  Captcha() {
    debugger
    let alpha = new Array('1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
    let i = 0, a = "", b = "", c = "", d = "", e = "", f = "", g = "";
    for (i = 0; i < 6; i++) {
      a = alpha[Math.floor(Math.random() * alpha.length)];
      b = alpha[Math.floor(Math.random() * alpha.length)];
      c = alpha[Math.floor(Math.random() * alpha.length)];
      d = alpha[Math.floor(Math.random() * alpha.length)];
      e = alpha[Math.floor(Math.random() * alpha.length)];
      f = alpha[Math.floor(Math.random() * alpha.length)];
      g = alpha[Math.floor(Math.random() * alpha.length)];
    }
    let code = a  + b + c  + d  + e  + f + g;
    this.captchaValue = code;
    // this.registrationForm.get('captchaValue').=code;
   
    // this.CaptchaCode = code;
    this.loginForm.get('captchaValue').patchValue(code);
    sessionStorage.setItem("Captcha", code);

  }
  ValidateCaptcha()
  {
    debugger;
   var InputCaptha= this.loginForm.get('CaptchaUserInput').value;
   var CapthaValue= this.loginForm.get('captchaValue').value;
   if(CapthaValue!=InputCaptha)
   {
    this.loginForm.get('CaptchaUserInput').patchValue('');
    this.ValidCaptha = true;
   }
   else{
    this.ValidCaptha = false;
   }

  }

  selectTab(e) {
    // this.tabContent = this.longtabs[e.itemIndex];
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
    if (!this.ValidateLogin()) {
      return;
    }
    this.kaveriService.login(this.loginForm.get("userName").value.toLowerCase(), this.loginForm.get("password").value).subscribe(
      (data: any) => {
        if (data != undefined) {
          if (data[0].responseCode == 1000) {
            debugger
            this.kaveriService.IsLoggedIn = true;

            this.loginEmitter.emit();
            console.log(data);
          
            this.router.navigateByUrl('/landing-page');
           
            if (this.loginForm.valid) {
              this.submitEM.emit(this.loginForm.value);
            }

          }
          else if(data[0].responseCode != 1000) {
            this.validationMessage = data[0].responseMessage;
            console.log(this.validationMessage);
            this.router.navigateByUrl('/login');

          }
       
        }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
          console.log(e.error.error_description);
        }
      }
    )
    this.alert = true;

  }
  ForgotPassword() {
    this.kaveriService.IsForgotPassword = true;
  }
  ValidateLogin() {
    let result = true;
    if (this.loginForm.get("userName").value == "" || this.loginForm.get("userName").value == undefined) {
      this.UserNameErrorFlag = true;
      result = false;
      // this.USERNAME = 'Username is required';
    }

    if (this.loginForm.get("password").value == "" || this.loginForm.get("password").value == undefined) {
      this.PasswordErrorFlag = true;
      result = false;
      // this.PASSWORD = 'Password is required';
    }


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
}

