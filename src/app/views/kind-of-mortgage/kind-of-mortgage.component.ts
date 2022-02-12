import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kind-of-mortgage',
  templateUrl: './kind-of-mortgage.component.html',
  styleUrls: ['./kind-of-mortgage.component.scss']
})
export class KindOfMortgageComponent implements OnInit {

  loggedinUser: string = "";
  constructor() { }

  ngOnInit(): void {
  }

}
