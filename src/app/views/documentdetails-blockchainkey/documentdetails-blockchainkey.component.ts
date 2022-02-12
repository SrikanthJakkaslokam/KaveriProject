import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-documentdetails-blockchainkey',
  templateUrl: './documentdetails-blockchainkey.component.html',
  styleUrls: ['./documentdetails-blockchainkey.component.scss']
})
export class DocumentdetailsBlockchainkeyComponent implements OnInit {

  loggedinUser: string = "";
  errorMessage: string = "";

  constructor(public router: Router) { }

  ngOnInit(): void {
    this.loggedinUser = localStorage.getItem('loggedinuser');
  }
  gotToECSearch(){
    this.router.navigate(['/ec-search']);
  }

}
