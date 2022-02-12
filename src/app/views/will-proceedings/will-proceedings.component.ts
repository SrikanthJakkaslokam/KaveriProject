import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-will-proceedings',
  templateUrl: './will-proceedings.component.html',
  styleUrls: ['./will-proceedings.component.scss']
})
export class WillProceedingsComponent implements OnInit {
  loggedinUser: string = "";
  constructor() { }

  ngOnInit() {
    this.loggedinUser = localStorage.getItem('loggedinuser');
  }

}
