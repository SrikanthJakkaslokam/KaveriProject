import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KaveriService } from '../../services/kaveri.service';

@Component({
  selector: 'app-mojini-esketch',
  templateUrl: './mojini-esketch.component.html',
  styleUrls: ['./mojini-esketch.component.scss']
})
export class MojiniEsketchComponent implements OnInit {

  disTrict: any;
  talUka: any;
  town: any;
  vilLage: any;
  sketchNumber : string ="";
  errorMessage: string = "";
  loggedinUser: string = "";
  dataSource: any[];
  bhumipopupVisible = false;
  bhumiLoaderVisible = false;
  manualpopupVisible: boolean = false;
  
  constructor(public router:Router, private kaveriService: KaveriService) { }

  ngOnInit(): void {
    this.sketchNumber = localStorage.getItem('sketchNumber');

    console.log('sketch number is :' +this.sketchNumber);

    this.Get11EDetails();
    this.disTrict = localStorage.getItem('dist');
    this.talUka = localStorage.getItem('taluk');
    this.town = localStorage.getItem('hoblitown');
    this.vilLage = localStorage.getItem('indexvillage');
  
  }

  
  Get11EDetails() {
    debugger
    var Mojini = {
      "sketchNumber": this.sketchNumber //"21010415523696001"
    };
    console.log(JSON.stringify(Mojini));
    this.kaveriService.MojiniSearch(Mojini).subscribe(
      (data: any) => {
        console.log(data);
       
        this.disTrict = localStorage.getItem('dist');
        this.talUka = localStorage.getItem('taluk');
        this.town = localStorage.getItem('hoblitown');
        this.vilLage = localStorage.getItem('indexvillage');
        data = data['PreMutationSketch'];
        this.dataSource=[data];
      
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
  }
  kaveriResult() {
    debugger;
      var kaveri = {
        "villageCode":parseInt(localStorage.getItem("villagecode")),
        "surveyNo":parseInt(localStorage.getItem("surveynumber")), 
         "HissaNo": localStorage.getItem('hissano'), 
    };
    console.log(JSON.stringify(kaveri));
    
    this.kaveriService.kaveriresult(kaveri).subscribe(
      (data: any) => {
        console.log(data);
        if(data == null || data == "" || data == false || data == [] || data.length == 0){
          this.manualpopupVisible = false;
          this.showkaverimanualInfo();
         }else{
          this.bhumiLoaderVisible = false;
          this.showbhumiInfo();
         }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
  }
  showbhumiloader(){  
    this.bhumiLoaderVisible = true;
    this.kaveriResult();
  }
  
  showbhumiInfo() {
    this.bhumipopupVisible = true;
  }
  showkaverimanualInfo() {
    this.manualpopupVisible = true;
    }


 
}
