import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-on-kaveri',
  templateUrl: './search-on-kaveri.component.html',
  styleUrls: ['./search-on-kaveri.component.scss']
})
export class SearchOnKaveriComponent implements OnInit {
  loggedinUser: string = "";

  constructor() { }

  ngOnInit() {
    this.loggedinUser = localStorage.getItem('loggedinuser');
  }

}
