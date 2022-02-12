import { Component, OnInit } from '@angular/core';
import { KaveriService } from '../../services/kaveri.service';

@Component({
  selector: 'app-bhoomi-hissa',
  templateUrl: './bhoomi-hissa.component.html',
  styleUrls: ['./bhoomi-hissa.component.scss']
})
export class BhoomiHissaComponent implements OnInit {
  bhumipopupVisible = false;
bhumiLoaderVisible = false ;
  manualpopupVisible = false ;
  disTrict: any ;
  talUka: any;
  town: any;
  vilLage: any;
  disTrictname: any ;
  talUkaname: any;
  townname: any;
  vilLagename: any;
  surVey: string = "";
  loggedinUser: string = "";
  errorMessage: string = "";
  dataSource: any[] ;
  Hissadetails :any ;
  landcode :any;
  hissano :any ;
bhoomisource: any[];
  bhoomidata: any;
  surveynum: any;
  constructor(private kaveriService: KaveriService) { }

  ngOnInit() {
  
    this.disTrictname = localStorage.getItem('dist');
    this.talUkaname = localStorage.getItem('taluk');
    this.townname =localStorage.getItem('hoblitown');
    this.vilLagename =localStorage.getItem('indexvillage');

    this.disTrict = parseInt(localStorage.getItem('bhoomiDistrictCode')),
    this.talUka = parseInt(localStorage.getItem('bhoomitalukcode')),
    this.town = parseInt(localStorage.getItem('bhoomihoblicode')),
    this.vilLage = parseInt(localStorage.getItem('bhoomivillagecode')),
    this.surVey = localStorage.getItem('surveynumber');
    this.loggedinUser = localStorage.getItem('loggedinuser');
    this.Hissadetails = localStorage.getItem('SelectedHissa');
    this.landcode = localStorage.getItem('landCode');
    var hissanumjson = JSON.parse(this.Hissadetails) ;
    this.hissano = hissanumjson['hissano'];
    localStorage.setItem('hissano',this.hissano);
    this.getOwnersList();
  }
 
  getSurvey() {
   // return this.surveynum;
  }
  

getOwnersList() {
  var owners = {
    "districtCode": this.disTrict,
    "talukCode": this.talUka,
    "hobliCode": this.town,
    "villageCode": this.vilLage,
    "landCode": this.landcode,
    "surveyNo": this.surVey
  
  };
  console.log(JSON.stringify(owners));
  this.kaveriService.getOwners(owners).subscribe(
    (data: any) => {
      console.log(data);
      data = data['bhoomi_survey_owners'];
      data = data['surveynodetails'];
      data = data['surveyno'];
      var availableextents = data['availableextents'];
      console.log("display hissa details" , this.Hissadetails)
    //  var hissanum = JSON.parse(this.Hissadetails) ;
      data['hissano'] = this.hissano;
      data['landCode'] = this.landcode;
      data['surveyno'] = this.surVey;
      data ['avl_ext_acre'] = availableextents['avl_ext_acre']
      data ['avl_ext_fgunta'] = availableextents['avl_ext_fgunta']
      data ['avl_ext_gunta'] = availableextents['avl_ext_gunta']
      console.log("After filter data service",data);
      //const filterdata = this.filterrowdata(data);

      this.dataSource = [data];
      console.log("After filter data service =======",this.dataSource);
      // this.dataSource = data;
      // const filterdata = this.filterrowdata(data);
      // this.dataSource = [...filterdata];
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
export class Survey {
  sno: string;
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