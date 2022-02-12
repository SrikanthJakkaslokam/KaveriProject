import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KaveriService } from '../../services/kaveri.service';

@Component({
  selector: 'app-kaveri-blockchain-key-results',
  templateUrl: './kaveri-blockchain-key-results.component.html',
  styleUrls: ['./kaveri-blockchain-key-results.component.scss']
})
export class KaveriBlockchainKeyResultsComponent implements OnInit {
  loggedinUser: string = "";
  bhumipopupVisible = false;
  disTrict: string = "";
  talUka: string = "";
  town: string = "";
  vilLage: string = "";
  surVey: string = "";
  dataSource: any[];
  errorMessage: string = "";
  surveynum:any[];
  constructor(private kaveriService: KaveriService, public router: Router) { }

  ngOnInit() {
    this.loggedinUser = localStorage.getItem('loggedinuser');
   
  }
  

}
