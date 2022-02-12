import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KaveriService } from '../../services/kaveri.service';

@Component({
  selector: 'app-kaveri-doc-details-results',
  templateUrl: './kaveri-doc-details-results.component.html',
  styleUrls: ['./kaveri-doc-details-results.component.scss']
})
export class KaveriDocDetailsResultsComponent implements OnInit {
  bhumipopupVisible = false;
disTrict: string = "";
  talUka: string = "";
  town: string = "";
  vilLage: string = "";

  propertytype: string = "";
  propertyid: string = "";
  propertynumber: string = "";
  dateTrxn: string = "";
  landCode: string = "";
  loggedinUser: string = "";
  errorMessage: string = "";
  dataSource: any[];
  kaveridocumentdata:any[];
  positionOf: string;
  docNo: string = "";
  bhoomidata: any[] = [];
  bhoomisource:any[]=[];
  
  constructor(private kaveriService: KaveriService, public router: Router) { }

  ngOnInit() {
    
     this.disTrict = localStorage.getItem('dist');
    this.talUka = localStorage.getItem('taluk');
    this.town = localStorage.getItem('hobliname');
    this.vilLage = localStorage.getItem('villagename');

    this.propertytype = localStorage.getItem('proptype');
    this.propertyid = localStorage.getItem('propid');
    this.propertynumber = localStorage.getItem('propno');
    this.dateTrxn = localStorage.getItem('date');
    this.landCode = localStorage.getItem('landCode');
    this.loggedinUser = localStorage.getItem('loggedinuser');
    this.kaveriResult();
    this.BhoomiResult();
   
  }
  showbhumiInfo() {
    this.bhumipopupVisible = true;
    }
   

    BhoomiResult() {
      var bhoomi = {
     
          "districtCode": parseInt(localStorage.getItem('bhoomiDistrictCode')),
          "talukCode":parseInt(localStorage.getItem('bhoomitalukcode')),
          "hobliCode": parseInt(localStorage.getItem('bhoomihoblicode')),
          "villageCode":parseInt(localStorage.getItem('bhoomivillagecode')),
          "surveyNo":parseInt(localStorage.getItem("surveynumber")), 
          "landCode": parseInt(localStorage.getItem('landCode')), 
        
          };
      console.log(JSON.stringify(bhoomi));
      debugger;
      this.kaveriService.getOwners(bhoomi).subscribe(
    
        (data: any) => {
          console.log(data);
          data = data['bhoomi_survey_owners'];
          data = data['surveynodetails'];
          data = data['surveyno'];
          console.log(data);
          //const filterdata = this.filterrowdata(data);
          data['HissaNo'] = localStorage.getItem('hissano');
          data['SurveyNo'] = localStorage.getItem('surveynumber');
          let singledata=data
          this.bhoomisource = [];
          this.bhoomidata.push(singledata);
    
          console.log(this.bhoomidata);
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
      // "villageCode":parseInt(localStorage.getItem("villagecode")),
      // "surveyNo":parseInt(localStorage.getItem("surveynumber")), 
      //  "HissaNo": localStorage.getItem('hissano'),
      
    "districtCode": parseInt(localStorage.getItem('bhoomiDistrictCode')),
    "talukCode": parseInt(localStorage.getItem('bhoomitalukcode')),
    "hobliCode": parseInt(localStorage.getItem('hissano')),
    "villageCode": parseInt(localStorage.getItem('villagecode')),
    "propertyTypeId": parseInt(localStorage.getItem('proptype')),
    "propertyId": localStorage.getItem('propid'),
    "dateofTransaction":localStorage.getItem('date')

      
        
  };
  debugger;
  console.log(JSON.stringify(kaveri));
  
  this.kaveriService.KaveriResultDocumentDetail(kaveri).subscribe(
    (data: any) => {
      console.log(data);
      debugger;
     data[0]['HobliName'] = localStorage.getItem('hobliname');
     data[0]['VillageName'] = localStorage.getItem('villagename');
    this.dataSource = data;
     this.kaveridocumentdata = data;
    }, e => {
      if (e.error) {
        this.errorMessage = e.error.error_description;
      }
    }
  )
  }
}
