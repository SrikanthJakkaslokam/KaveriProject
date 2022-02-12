import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ec-application-for-submit',
  templateUrl: './ec-application-for-submit.component.html',
  styleUrls: ['./ec-application-for-submit.component.scss']
})
export class EcApplicationForSubmitComponent implements OnInit {

  loggedinUser: string = "";
  disTrict: string = "";
  talUka: string = "";
  town: string = "";
  vilLage: string = "";
  west: string = "";
  north: string = "";
  east: string = "";
  south: string = "";
  eastToWest: string = "";
  northToSouth: string = "";
  units: string = "";
  description: string = "";

  applicationData: string = "";

  propertyTypeData: Array<any> = [];

  popup = false;


  constructor() { }

  ngOnInit(): void {

    this.loggedinUser = localStorage.getItem('loggedinuser');
    this.applicationData = localStorage.getItem('ApplicationData');
    this.disTrict = localStorage.getItem('districtname');
    this.talUka = localStorage.getItem('talukname');
    this.town = localStorage.getItem('hobliname');
    this.vilLage = localStorage.getItem('villagename');
    this.west = localStorage.getItem('west');
    this.north = localStorage.getItem('north');
    this.east = localStorage.getItem('east');
    this.south = localStorage.getItem('south');
    this.eastToWest = localStorage.getItem('easttowest');
    this.northToSouth = localStorage.getItem('northtoeast');
    this.units = localStorage.getItem('unit');
    this.description = localStorage.getItem('description');

    this.propertyTypeData = [...JSON.parse(localStorage.getItem('propertyNumberTypeAndDetails'))];

    console.log("prpdata", this.propertyTypeData);
    console.log("prpdata", this.propertyTypeData.length);
  }

}
