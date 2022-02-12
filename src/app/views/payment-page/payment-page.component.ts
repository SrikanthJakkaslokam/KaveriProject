import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { KaveriService } from '../../services/kaveri.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.scss']
})
export class PaymentPageComponent implements OnInit {
  paymentForm: FormGroup;
  loggedinUser: string = "";
  alert:boolean = false;
  submitted = false;
  errorMessage: string;
  number: number;
  ammount: number;
  date: Date;
  
  constructor(private fb: FormBuilder,private kaveriService: KaveriService,public router: Router) { }

  ngOnInit(): void {

    this.loggedinUser = localStorage.getItem('loggedinuser');
    this.submitted = false
    this.paymentForm =  new FormGroup({
      number: new FormControl("", Validators.required),
      amount: new FormControl("", Validators.required),
      date: new FormControl("", Validators.required),
    });

    
    var paymentForm = {
   
      "_number": this.paymentForm.get('number').value,
      "_ammount": this.paymentForm.get('amount').value,
      "_date":parseInt(this.paymentForm.get('date').value),
     
     
    };
  }
  onSubmit(){
    this.number=this.paymentForm.get("number").value;
    
    this.ammount=this.paymentForm.get("ammount").value
    this.date=this.paymentForm.get("date").value
  }
  get f() {
    return this.paymentForm.controls;
  }
  
}

       
    