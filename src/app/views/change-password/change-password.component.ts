import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import notify from 'devextreme/ui/notify';
import { KaveriService } from '../../services/kaveri.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  loggedinUser: string = "";
  isVisible : boolean; 
  changePasswordForm: FormGroup;
  citizenid : string =""; 
  oldpass : string =""; 
  newpass : string ="";
  confirmpass : string ="";
  submitted = false;
  type: string = "info";
  passcheck: string;
  errorMessage: any;
  message: any;
  samepassword: string = "";
  constructor(private fb: FormBuilder,private kaveriService: KaveriService,public router: Router) { }

  ngOnInit(): void {
    this.loggedinUser = localStorage.getItem('loggedinuser');

    this.changePasswordForm = new FormGroup({
      oldpass: new FormControl("", Validators.required),
      newpass: new FormControl("", Validators.required),
      confirmpass: new FormControl("", Validators.required)
    });


    console.log(this.changePasswordForm);
  }
  
  get f() { 
    return this.changePasswordForm.controls; 
  }
  resetform(){
    this.changePasswordForm.reset();
    this.samepassword = "";
    this.passcheck = "";
  }
  
  onSubmit() {
    this.citizenid = localStorage.getItem('citizenid');
    this.oldpass = this.changePasswordForm.get('oldpass').value;
    this.newpass = this.changePasswordForm.get('newpass').value;
    console.log(this.citizenid);
    console.log(this.oldpass);
    console.log(this.newpass);
  debugger;
  
  if(this.changePasswordForm.valid ){
    if(this.oldpass == this.newpass){
      this.samepassword = "Cannot have the New Password same as Old Password "
      return;
    }
      if(this.passcheck == "")
      {
        this.kaveriService.changepassword(this.citizenid,this.oldpass,this.newpass).subscribe(
        (data: any) => {
          console.log(data);
          if(data.responseCode == 1000) {
            this.message = data.responseMesg;
            console.log(this.message);
            this.showToast();
            localStorage.removeItem('loggedinuser');
            localStorage.removeItem('usermobile');
            localStorage.removeItem('citizenid');
            this.router.navigate(['/landing-page']);
            }
            else{
            this.message = data.responseMesg;
            console.log(this.message);
            this.showToastfail();
            }
            }, e => {
            if (e.error) {
              this.errorMessage = e.error.error_description;
            }
          }
        )
      }
    }
    else{
      this.submitted = true;
      return;
    }
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

  showToastfail() {
    notify({
        message: this.message,
        isVisible: true,
        displayTime: 6000,
        height: 50,
        type:"error"

    });
  }

  checkpass(){
    debugger;
    console.log(this.changePasswordForm.get('newpass').value);
    if(this.changePasswordForm.get('newpass').value == this.changePasswordForm.get('confirmpass').value ){
      this.passcheck = "";
    }
    else{
      this.passcheck = "Password does not match with New Password";
    }
  }


}
