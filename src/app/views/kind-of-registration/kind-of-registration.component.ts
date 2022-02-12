import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kind-of-registration',
  templateUrl: './kind-of-registration.component.html',
  styleUrls: ['./kind-of-registration.component.scss']
})
export class KindOfRegistrationComponent implements OnInit {
  loggedinUser: string = "";
  constructor() { }

  ngOnInit() {
    this.loggedinUser = localStorage.getItem('loggedinuser');
  }

}
