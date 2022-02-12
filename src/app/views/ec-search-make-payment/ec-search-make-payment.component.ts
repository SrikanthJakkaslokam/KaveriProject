import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ec-search-make-payment',
  templateUrl: './ec-search-make-payment.component.html',
  styleUrls: ['./ec-search-make-payment.component.scss']
})
export class EcSearchMakePaymentComponent implements OnInit {

  loggedinUser: string = "";
  applicationData: string = "";

  constructor() { }

  ngOnInit(): void {
    this.loggedinUser = localStorage.getItem('loggedinuser');
    this.applicationData = localStorage.getItem('ApplicationData');
  }

}
