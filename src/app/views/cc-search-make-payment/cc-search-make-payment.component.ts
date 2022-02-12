import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cc-search-make-payment',
  templateUrl: './cc-search-make-payment.component.html',
  styleUrls: ['./cc-search-make-payment.component.scss']
})
export class CcSearchMakePaymentComponent implements OnInit {

  loggedinUser: string = "";
  applicationData: string = "";

  constructor() { }

  ngOnInit(): void {
    this.loggedinUser = localStorage.getItem('loggedinuser');
    this.applicationData = localStorage.getItem('ApplicationData');
  }

}
