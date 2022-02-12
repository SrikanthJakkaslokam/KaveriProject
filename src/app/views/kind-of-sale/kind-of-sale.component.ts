import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kind-of-sale',
  templateUrl: './kind-of-sale.component.html',
  styleUrls: ['./kind-of-sale.component.scss']
})
export class KindOfSaleComponent implements OnInit {
  loggedinUser: string = "";
  constructor() { }

  ngOnInit() {
    this.loggedinUser = localStorage.getItem('loggedinuser');
  }

}
