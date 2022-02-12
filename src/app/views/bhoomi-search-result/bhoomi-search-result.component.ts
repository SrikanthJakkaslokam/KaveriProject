import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KaveriService } from '../../services/kaveri.service';

@Component({
  selector: 'app-bhoomi-search-result',
  templateUrl: './bhoomi-search-result.component.html',
  styleUrls: ['./bhoomi-search-result.component.scss']
})
export class BhoomiSearchResultComponent implements OnInit {
  bhumipopupVisible = false;
  SketchNumberpopupVisible= false;
  disTrict: string = "";
  talUka: string = "";
  town: string = "";
  vilLage: string = "";
  surVey: string = "";
  landCode: string = "";
  loggedinUser: string = "";
  errorMessage: string = "";
  SketchNumber :string ="";
  dataSource: any[];
  selecteddata;
  selectedType :boolean ;
  PartExtentType :boolean;
  FullExtentType :boolean;
  hissadetails:any ;

  constructor(public router: Router, private kaveriService: KaveriService) { }

  ngOnInit() {
    this.disTrict = localStorage.getItem('dist');
    this.talUka = localStorage.getItem('taluk');
    this.town = localStorage.getItem('hoblitown');
    this.vilLage = localStorage.getItem('indexvillage');
    this.surVey = localStorage.getItem('surveynumber');
    this.landCode = localStorage.getItem('landCode');
    this.loggedinUser = localStorage.getItem('loggedinuser');
    
    this.bhoomiSearch();
    var selcy = this.selecteddata;
  }
  showbhumiInfo() {
    var pyki = this.hissadetails['restrictiondescription'];
    var noofowners =this.hissadetails['noofowners'] ;
    if(this.PartExtentType == true || pyki == "Y" || noofowners > 1 ){
      // this.router.navigate(['/bhoomi-hissa']);
      this.EnterSketchNumber();
    }
    else{
      this.router.navigate(['/bhoomi-hissa']);
    }
    //this.bhumipopupVisible = true;
    }
 EnterSketchNumber() {
      this.SketchNumberpopupVisible = true;
      }

      GetSketchNumber(sketchNo){
        localStorage.setItem('sketchNumber',sketchNo);
        this.router.navigateByUrl('/mojini-esketch');
      }
  // getSurvey() {
  //   return this.surveynum;
  // }

bhoomiSearch() {
  // var bhoomi1 = {
  //    "districtCode": this.disTrict,
  //     "talukCode": this.talUka,
  //     "hobliCode": this.town,
  //     "villageCode": this.vilLage,
  //     "surveyNo": this.surVey
  //   // "districtCode": 21,

  //   // "talukCode": 1,
  //   // "hobliCode": 1,
  //   // "villageCode": 1,
  //   // "surveyNo": 1

  // };
  //var bhoomi2 = {"districtCode":2,"talukCode":109,"hobliCode":481,"villageCode":17736,"surveyNo":1}
  // console.log(JSON.stringify(bhoomi1));
   var bhoomi =  localStorage.getItem('BhoomiCodeDetails');
 // var bhoomi2 = JSON.parse(bhoomi);

  this.kaveriService.bhoomisearch(bhoomi).subscribe(
    (data: any) => {
      console.log("Bhoomi data based on survey num ",data);
      data = data['bhoomi_surveyno'];
      data = data['surveynodetails'];
      data = data['surveyno'];
      console.log("After filter data service",data);
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
      if (currentValue.restriction == "Y" && currentValue.restrictiontype  == "PY" && currentValue.restrictiondescription == "PyKi RTC") {
        currentValue.restrictiondescription = "Y";
        currentValue.restriction = "N"
        // console.log(currentValue.restrictiondescription);
      }else if (currentValue.restriction == "N" && currentValue.restrictiontype  == null && currentValue.restrictiondescription == null){
        currentValue.restrictiondescription = "N";
        currentValue.restriction = "N"
      }else if(currentValue.restriction == "Y" && currentValue.restrictiontype  == null && currentValue.restrictiondescription == null){
        currentValue.restrictiondescription = "N";
        currentValue.restriction = "Y"
      }else if(currentValue.restriction == "Y" && (currentValue.restrictiontype  != null || currentValue.restrictiondescription != null)){
        currentValue.restrictiondescription = "N";
        currentValue.restriction = "N"
      }
       
    });
    console.log("After filter data ",data);
    return data;
  }

//   surveynum: Survey[] = [
//     {
//       "districtcode": "21",
//       "hissano": "1",
//       "hoblicode": "1",
//       "landcode": "1",
//       "noofowners": "1",
//       "restriction": "N",
//       "restrictiondescription": null,
//       "restrictiontype": null,
//       "surnoc": "*",
//       "surveyno": "1",
//       "talukacode": "1",
//       "villagecode": "1",
//       "villageexemptedfromsketch": "N"
//   },
//   {
//       "districtcode": "21",
//       "hissano": "2",
//       "hoblicode": "1",
//       "landcode": "2",
//       "noofowners": "1",
//       "restriction": "N",
//       "restrictiondescription": null,
//       "restrictiontype": null,
//       "surnoc": "*",
//       "surveyno": "1",
//       "talukacode": "1",
//       "villagecode": "1",
//       "villageexemptedfromsketch": "N"
//   },
//   {
//       "districtcode": "21",
//       "hissano": "3",
//       "hoblicode": "1",
//       "landcode": "3",
//       "noofowners": "1",
//       "restriction": "N",
//       "restrictiondescription": null,
//       "restrictiontype": null,
//       "surnoc": "*",
//       "surveyno": "1",
//       "talukacode": "1",
//       "villagecode": "1",
//       "villageexemptedfromsketch": "N"
//   },
//   {
//       "districtcode": "21",
//       "hissano": "5",
//       "hoblicode": "1",
//       "landcode": "1249",
//       "noofowners": "1",
//       "restriction": "N",
//       "restrictiondescription": null,
//       "restrictiontype": null,
//       "surnoc": "*",
//       "surveyno": "1",
//       "talukacode": "1",
//       "villagecode": "1",
//       "villageexemptedfromsketch": "N"
//   },
//   {
//       "districtcode": "21",
//       "hissano": "6",
//       "hoblicode": "1",
//       "landcode": "1250",
//       "noofowners": "1",
//       "restriction": "N",
//       "restrictiondescription": null,
//       "restrictiontype": null,
//       "surnoc": "*",
//       "surveyno": "1",
//       "talukacode": "1",
//       "villagecode": "1",
//       "villageexemptedfromsketch": "N"
//   },
//   {
//       "districtcode": "21",
//       "hissano": "7",
//       "hoblicode": "1",
//       "landcode": "1251",
//       "noofowners": "1",
//       "restriction": "N",
//       "restrictiondescription": null,
//       "restrictiontype": null,
//       "surnoc": "*",
//       "surveyno": "1",
//       "talukacode": "1",
//       "villagecode": "1",
//       "villageexemptedfromsketch": "N"
//   },
//   {
//       "districtcode": "21",
//       "hissano": "8",
//       "hoblicode": "1",
//       "landcode": "1252",
//       "noofowners": "1",
//       "restriction": "N",
//       "restrictiondescription": null,
//       "restrictiontype": null,
//       "surnoc": "*",
//       "surveyno": "1",
//       "talukacode": "1",
//       "villagecode": "1",
//       "villageexemptedfromsketch": "N"
//   }
// ];
selecthissadata(e){
  var selectdata = e['selectedRowsData'];
   this.hissadetails = selectdata[0]
  var landcode = this.hissadetails['landcode']
  localStorage.setItem('SelectedHissa',JSON.stringify(this.hissadetails));
  localStorage.setItem('landCode',landcode);
 console.log("selected data ",this.hissadetails);
 console.log("selected data landcode ",landcode);
}
changeonselect(e){
  console.log("selected Type item of slect ",e)
}
changeFullExtent(e){
  this.FullExtentType = e.value
  console.log("selected Type item of slect ",this.FullExtentType)
}
changePartExtent(e){
  this.PartExtentType = e.value
  console.log("selected Type item of slect ",this.PartExtentType)
}


}
export class Survey {
  districtcode: string;
  hissano: string;
  hoblicode: string;
  landcode: string;
  noofowners: string;
  restriction: string;
  restrictiondescription: string;
  restrictiontype: string;
  surnoc: string;
  surveyno: string;
  talukacode: string;
  villagecode: string;
  villageexemptedfromsketch: string;
}