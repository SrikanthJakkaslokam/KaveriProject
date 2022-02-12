import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nature-of-document',
  templateUrl: './nature-of-document.component.html',
  styleUrls: ['./nature-of-document.component.scss']
})
export class NatureOfDocumentComponent implements OnInit {
  loggedinUser: string = "";
  constructor() { }

  ngOnInit() {
    this.loggedinUser = localStorage.getItem('loggedinuser');
  }

}
