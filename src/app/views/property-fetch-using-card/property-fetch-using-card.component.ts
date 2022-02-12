import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KaveriService } from '../../services/kaveri.service';

@Component({
  selector: 'app-property-fetch-using-card',
  templateUrl: './property-fetch-using-card.component.html',
  styleUrls: ['./property-fetch-using-card.component.scss']
})
export class PropertyFetchUsingCardComponent implements OnInit {
  loggedinUser: string = "";
  bhumipopupVisible = false;
  disTrict: string = "";
  talUka: string = "";
  town: string = "";
  vilLage: string = "";
  surVey: string = "";
  dataSource: any[];
  errorMessage: string = "";
  surveynum: any[] = [];
  constructor(private kaveriService: KaveriService, public router: Router) { }

  ngOnInit() {
    this.loggedinUser = localStorage.getItem('loggedinuser');
  }

}
