import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { KaveriService } from '../../services/kaveri.service';

@Component({
  selector: 'app-search-result-without-kaveri',
  templateUrl: './search-result-without-kaveri.component.html',
  styleUrls: ['./search-result-without-kaveri.component.scss']
})
export class SearchResultWithoutKaveriComponent implements OnInit {

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
  
  constructor(public router:Router, private kaveriService: KaveriService) { }

  ngOnInit(): void {
    this.loggedinUser = localStorage.getItem('loggedinuser');
    this.sketchNumber = localStorage.getItem('sketchNumber');

    console.log('sketch number is :' +this.sketchNumber);

    this.Get11EDetails();
  }

  
  Get11EDetails() {
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
  showbhumiloader(){
      
}

}
