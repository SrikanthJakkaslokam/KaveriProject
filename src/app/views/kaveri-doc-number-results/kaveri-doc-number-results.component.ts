import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KaveriService } from '../../services/kaveri.service';

@Component({
  selector: 'app-kaveri-doc-number-results',
  templateUrl: './kaveri-doc-number-results.component.html',
  styleUrls: ['./kaveri-doc-number-results.component.scss']
})
export class KaveriDocNumberResultsComponent implements OnInit {
  loggedinUser: string = "";
  bhumipopupVisible = false;
  disTrict: string = "";
  talUka: string = "";
  town: string = "";
  vilLage: string = "";
  docNo: string = "";
  dateTrxn: string = "";
  errorMessage: string = "";
  landCode: string = "";
  dataSource: any[];
  positionOf: string;
  bhoomidata: any[] = [];
  bhoomisource:any[]=[];
  surveynum: any[] = [];
  constructor(private kaveriService: KaveriService, public router: Router) { }

  ngOnInit() {
    this.loggedinUser = localStorage.getItem('loggedinuser');
    this.disTrict = localStorage.getItem('dist');
    this.talUka = localStorage.getItem('taluk');
    this.town = localStorage.getItem('hobliname');
    this.vilLage = localStorage.getItem('villagename');
    this.docNo = localStorage.getItem('docNo');
    this.dateTrxn = localStorage.getItem('date');
    this.landCode = localStorage.getItem('landCode');
    this.kaveriResult();
    this.BhoomiResult();
  }
  showbhumiInfo() {
    this.bhumipopupVisible = true;
    }

bhoomiSearch() {
  var result = {
     "districtCode": this.disTrict,
      "talukCode": this.talUka,
      "hobliCode": this.town,
      "villageCode": this.vilLage,
      "documentNo": this.docNo,
      "date": this.dateTrxn
  };
  console.log(JSON.stringify(result));
  this.kaveriService.bhoomisearch(result).subscribe(
    (data: any) => {
      console.log(data);
      data = data['bhoomi_surveyno'];
      data = data['surveynodetails'];
      data = data['surveyno'];
      console.log(data);
      const filterdata = this.filterrowdata(data);
      this.dataSource = [...filterdata];
    }, e => {
      if (e.error) {
        this.errorMessage = e.error.error_description;
      }
    }
  )
}

  getOwnersList() {
    debugger;
    var owners = {
      "districtCode": this.disTrict,
      "talukCode": this.talUka,
      "hobliCode": this.town,
      "villageCode": this.vilLage,
      "landCode": this.landCode,
      "surveyNo": this.surveynum
     
    };
    console.log(JSON.stringify(owners));
    this.kaveriService.getOwners(owners).subscribe(
      (data: any) => {
        console.log(data);
        data[0]['SurveyNo'] = localStorage.getItem('surveynumber');
        this.dataSource = data;
        const filterdata = this.filterrowdata(data);
        this.dataSource = [...filterdata];
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
  }

  filterrowdata(data) {
    data.forEach((currentValue, index) => {
      if (currentValue.restriction == "Y" && currentValue.restrictiontype  == "PY") {
        currentValue.restrictiondescription = "Y";
        // console.log(currentValue.restrictiondescription);
      }
       else currentValue.restrictiondescription = "N";
    });
    return data;
  }

//
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
    
    "documentNo": localStorage.getItem('docNo'),
      "dateofTransaction":localStorage.getItem('date')
      
};
debugger;
console.log(JSON.stringify(kaveri));

this.kaveriService.kaveriresultDocumentNo(kaveri).subscribe(
  (data: any) => {
    console.log(data);
    debugger;
   
    
   data[0]['HobliName'] = localStorage.getItem('hobliname');
   data[0]['VillageName'] = localStorage.getItem('villagename');

  this.dataSource = data;
   this.surveynum = data;
  }, e => {
    if (e.error) {
      this.errorMessage = e.error.error_description;
    }
  }
)
}
// >>>>>>>>>>>>>>>>>>>>>>>
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
this.kaveriService.getOwners(bhoomi).subscribe(
(data: any) => {
  debugger;
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


//


}
