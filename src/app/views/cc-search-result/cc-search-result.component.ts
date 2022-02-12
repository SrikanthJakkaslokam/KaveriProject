import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cc-search-result',
  templateUrl: './cc-search-result.component.html',
  styleUrls: ['./cc-search-result.component.scss']
})
export class CcSearchResultComponent implements OnInit {

  loggedinUser: string = "";
  applicationData: string = "";

  constructor() { }

  ngOnInit(): void {
    this.loggedinUser = localStorage.getItem('loggedinuser');
    this.applicationData = localStorage.getItem('ApplicationData');
  }

}
