import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kind-of-property-registration',
  templateUrl: './kind-of-property-registration.component.html',
  styleUrls: ['./kind-of-property-registration.component.scss']
})
export class KindOfPropertyRegistrationComponent implements OnInit {
  loggedinUser: string = "";
  constructor() { }

  ngOnInit() {
    this.loggedinUser = localStorage.getItem('loggedinuser');
  }

}
