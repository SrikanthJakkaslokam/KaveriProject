import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-power-of-attorney',
  templateUrl: './power-of-attorney.component.html',
  styleUrls: ['./power-of-attorney.component.scss']
})
export class PowerOfAttorneyComponent implements OnInit {
  loggedinUser: string = "";
  constructor() { }

  ngOnInit() {
    this.loggedinUser = localStorage.getItem('loggedinuser');
  }

}
