import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-non-agricultural-search',
  templateUrl: './non-agricultural-search.component.html',
  styleUrls: ['./non-agricultural-search.component.scss']
})
export class NonAgriculturalSearchComponent implements OnInit {
  loggedinUser: string = "";
  constructor() { }

  ngOnInit() {
    this.loggedinUser = localStorage.getItem('loggedinuser');
  }

}
