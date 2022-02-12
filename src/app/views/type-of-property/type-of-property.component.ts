import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-type-of-property',
  templateUrl: './type-of-property.component.html',
  styleUrls: ['./type-of-property.component.scss']
})
export class TypeOfPropertyComponent implements OnInit {
  loggedinUser: string;

  constructor() { }

  ngOnInit(): void {
    this.loggedinUser = localStorage.getItem('loggedinuser');

  }

}
