import { Component, OnInit } from '@angular/core';
import { KaveriService } from '../../services/kaveri.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-view-detail-e-aasthi',
  templateUrl: './view-detail-e-aasthi.component.html',
  styleUrls: ['./view-detail-e-aasthi.component.scss']
})
export class ViewDetailEAasthiComponent implements OnInit {
  article: string = "";
  subarticleList: any[] = [];
  registrationList: any[] = [];
  errorMessage: string = "";
  kaveriData:any=[];
  articleList: any[] = [];
  kaverisearch: FormGroup;
  bookNumber:any="select";
  manualpopupVisible = false;
  nonAgricultureApi:any=[];
  loggedinUser: string = "";
  constructor(private kaveriService: KaveriService,public router: Router,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loggedinUser = localStorage.getItem('loggedinuser');
    let nonAgriculture= JSON.parse(localStorage.getItem("finalNonAgriculture"));
    this.nonAgriculture();
    this.kaveriData = nonAgriculture
    this.kaverisearch = this.formBuilder.group({
      article: [""],
      subarticle: [""],
      regFee: [""],
    });
    this.Article();
  }
  nonAgriculture() {
    // let applicationNumber="PRP-03012022-01919";
    let applicationNumber=localStorage.getItem("ApplicationData");
    this.kaveriService.GetPropertyMasterData(applicationNumber).subscribe(
      (data: any) => {
        if (data.length != 0) {
          this.nonAgricultureApi = data;
          console.log("this.nonAgricultureApi-->",this.nonAgricultureApi);
          
        }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
  }
  Article() {
    this.kaveriService.article().subscribe(
      (data: any) => {
        if (data.length != 0) {
          this.articleList = data;
          console.log("this.articleList-->",this.articleList);
          
        }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
  }
  onarticleChange($event,index) {
    let nonAgricultureData=JSON.parse(localStorage.getItem("finalNonAgriculture"));
    nonAgricultureData[index].stamparticlecode=$event.target.value;
    if ($event != "") {
     let text1 = $event.target.options[$event.target.options.selectedIndex].text;
     this.article = text1;
     nonAgricultureData[index].selectedArticle=text1;
     nonAgricultureData[index].selectedArticleCode=$event.target.value;
   }
    localStorage.setItem("finalNonAgriculture",JSON.stringify(nonAgricultureData));
     let articlecode=$event.target.value;
     var article = {
       "stamparticlecode": articlecode,
     };
     var stamparticle = {
      "stamparticle": 21,
    };
     if (article != undefined) {
       this.kaveriService.subarticle(article).subscribe(
         (data: any) => {
           if (data && data.length != 0) {
             this.subarticleList = data;
             console.log(JSON.stringify( this.subarticleList));
           }
         }, e => {
 
           if (e.error) {
             this.errorMessage = e.error.error_description;
           }
         }
       )
     }
     if (stamparticle != undefined) {
      this.kaveriService.getRegistrationArticle(stamparticle).subscribe(
        (data: any) => {
          if (data && data.length != 0) {
            this.registrationList = data;

            console.log(JSON.stringify( this.registrationList));
          }
        }, e => {

          if (e.error) {
            this.errorMessage = e.error.error_description;
          }
        }
      )
    }
 
   }
   onsubarticleChange($event,index) {
    let nonAgricultureData=JSON.parse(localStorage.getItem("finalNonAgriculture"));
    nonAgricultureData[index].stampSubarticlecode=$event.target.value;
    if ($event != "") {
     let text1 = $event.target.options[$event.target.options.selectedIndex].text;
    //  this.subarticle = text1;
     nonAgricultureData[index].selectedSubArticle=text1;
     nonAgricultureData[index].selectedSubArticleCode=$event.target.value;
   }
    localStorage.setItem("finalNonAgriculture",JSON.stringify(nonAgricultureData));
  }
  onRegChange($event,index) {
    let nonAgricultureData=JSON.parse(localStorage.getItem("finalNonAgriculture"));
    nonAgricultureData[index].regArticlecode=$event.target.value;
    if ($event != "") {
     let text1 = $event.target.options[$event.target.options.selectedIndex].text;
    //  this.subarticle = text1;
     nonAgricultureData[index].selectedRegArticle=text1;
     let bookObj=this.registrationList.filter((item)=>{return $event.target.value==item.regarticlecode });
     this.bookNumber=bookObj[0].bookid;
     nonAgricultureData[index].selectedBookNumber=bookObj[0].bookid;
   }
    localStorage.setItem("finalNonAgriculture",JSON.stringify(nonAgricultureData));
  }
  onSubmit() {
    let ApplicationData=localStorage.getItem("ApplicationData");
   let finalStrData= JSON.parse(localStorage.getItem("finalNonAgriculture"));
   let finalData=[];
   if(finalStrData && finalStrData.length){
    for(let i=0;i<finalStrData.length;i++){
      var propertydetails :any = 
        {
          "propertyid": null,
          "documentid": 1,
          "villagecode": finalStrData[i].villagecode,
          "regsrocode": finalStrData[i].RegSROCode,
          "srocode": finalStrData[i].SROCode,
          "totalarea": finalStrData[i].area,
          "unitid": 1,
          "northboundary": finalStrData[i].northBoundary,
          "southboundary": finalStrData[i].southBoundary,
          "eastboundary": finalStrData[i].eastBoundary,
          "westboundary": finalStrData[i].westBoundary,
          "landmark": "",
          "marketvalue": 0,
          "assessment": "assess",
          "sdcalculationstring": "sdc",
          "stampduty": 10,
          "transferliabilities": 10,
          "consideration": 0,
          "additionalduty": 0,
          "cessduty": 10,
          "govtduty": 10,
          "isexempted": true,
          "exemptiondescription": "exem",
          "ismovableproperty": true,
          "sdrefund": 10,
          "docmarketvalue": 10,
          "valid1": 10,
          "isimdemnified": true,
          "restriction": "N",
          "restrictiontype": "NA",
          "restrictiondescription": "RES desc",
          "enumber": "enumber",
          "claimingblocknumber": "C",
          "retainingblocknumber": "R",
          "valuationreport": "valution",
          "loanpurposeid": 10,
          "applicationnumber": ApplicationData,
          "verified": true,
          "issroapproved": "E",
          "stamparticlecode":  finalStrData[i].selectedArticleCode,
          "stampruleid": finalStrData[i].selectedSubArticleCode,
          "regarticlecode": finalStrData[i].regArticlecode,
          "propertytypeid": 17,
          "noofscanpages": 0,   
         
        }
        var Totalproperty :any =[];
        finalStrData[i].selectedProperty.forEach(element => {
          let selectedproperty = new selectedProperty();
          selectedproperty.propertyid = null
          selectedproperty.srocode = finalStrData[i].SROCode
          selectedproperty.currentpropertytypeid =parseInt(element.presentProperty)
          selectedproperty.currentnumber = element.propertNumber
          selectedproperty.survey_no = 4,
          selectedproperty.hissa_no = "3"
          Totalproperty.push(selectedproperty)
        });
        propertydetails["propertynumberdetails"] = Totalproperty
      
    //   let obj :any= {
    //   "propertyid": null,
    //   "documentid": 1,
    //   "villagecode": finalStrData[i].villagecode,
    //   "regsrocode": finalStrData[i].RegSROCode,
    //   "srocode": finalStrData[i].SROCode,
    //   "totalarea": finalStrData[i].area,
    //   "unitid": 0,
    //   "northboundary": finalStrData[i].northBoundary,
    //   "southboundary": finalStrData[i].southBoundary,
    //   "eastboundary": finalStrData[i].eastBoundary,
    //   "westboundary": finalStrData[i].westBoundary,
    //   "landmark": "landmark1",
    //   "marketvalue": 100,
    //   "assessment": "assess",
    //   "sdcalculationstring": "sdc",
    //   "stampduty": 10,
    //   "transferliabilities": 10,
    //   "consideration": 10,
    //   "additionalduty": 10,
    //   "cessduty": 10,
    //   "govtduty": 10,
    //   "isexempted": true,
    //   "exemptiondescription": "exem",
    //   "ismovableproperty": true,
    //   "sdrefund": 10,
    //   "docmarketvalue": 10,
    //   "valid1": 10,
    //   "isimdemnified": true,
    //   "restriction": "R",
    //   "restrictiontype": "Re",
    //   "restrictiondescription": "RES desc",
    //   "enumber": "enumber",
    //   "claimingblocknumber": "C",
    //   "retainingblocknumber": "R",
    //   "valuationreport": "valution",
    //   "loanpurposeid": 10,
    //   "applicationnumber": ApplicationData,
    //   "verified": true,
    //   "issroapproved": "E",
    //   "stamparticlecode": finalStrData[i].selectedArticleCode,
    //   "stampruleid": finalStrData[i].selectedSubArticleCode,
    // }
    finalData.push(propertydetails);
    propertydetails={};
    }
   }
    // let nonAgrDetail=[
    //   {
    //   "propertyid": null,
    //   "documentid": 1,
    //   "villagecode": 2,
    //   "regsrocode": 2,
    //   "srocode": 2,
    //   "totalarea": 100,
    //   "unitid": 0,
    //   "northboundary": "north",
    //   "southboundary": "south",
    //   "eastboundary": "east",
    //   "westboundary": "west",
    //   "landmark": "landmark1",
    //   "marketvalue": 100,
    //   "assessment": "assess",
    //   "sdcalculationstring": "sdc",
    //   "stampduty": 10,
    //   "transferliabilities": 10,
    //   "consideration": 10,
    //   "additionalduty": 10,
    //   "cessduty": 10,
    //   "govtduty": 10,
    //   "isexempted": true,
    //   "exemptiondescription": "exem",
    //   "ismovableproperty": true,
    //   "sdrefund": 10,
    //   "docmarketvalue": 10,
    //   "valid1": 10,
    //   "isimdemnified": true,
    //   "restriction": "R",
    //   "restrictiontype": "Re",
    //   "restrictiondescription": "RES desc",
    //   "enumber": "enumber",
    //   "claimingblocknumber": "C",
    //   "retainingblocknumber": "R",
    //   "valuationreport": "valution",
    //   "loanpurposeid": 10,
    //   "applicationnumber": "ECC-01112021-00005",
    //   "verified": true,
    //   "issroapproved": "E",
    //   "stamparticlecode": 10,
    //   "stampruleid": 10
    // }
    // ]
    this.kaveriService.SaveNonagriculturalPropertyScheduleMaster(finalData).subscribe(
      (data: any) => {
        console.log("dSavePropertyScheduleMasterata-->",data);
          this.router.navigateByUrl('/party-details');
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
    
  }
  deleteProperty (index){
    // let prev= JSON.parse(localStorage.getItem("finalNonAgriculture"));
    // console.log("prev-->",prev);
    // console.log("index-->",index);
    
    if(localStorage.getItem("finalNonAgriculture") && localStorage.getItem("finalNonAgriculture").length){
      let prev= JSON.parse(localStorage.getItem("finalNonAgriculture"));
      if(prev && prev.length==1){
        localStorage.removeItem("finalNonAgriculture");
        window.location.reload();
      }else{
        prev=prev.splice(index,1);
        localStorage.setItem("finalNonAgriculture",JSON.stringify(prev))
        window.location.reload();
      }
      var peoprtyid :any = 1664340
      this.kaveriService.DeleteNonagriculturalpropertydetails(peoprtyid).subscribe(
        (data: any) => {
          console.log("deleted propertyid ",data);
        }, e => {
          if (e.error) {
            this.errorMessage = e.error.error_description;
          }
        }
      )
      
    }


  }
  
  AddNewProperty():any{
    this.router.navigate(['/e-aasthi']);
  }
}
export class selectedProperty {
  propertyid: number
  srocode: number
  currentpropertytypeid: number
  currentnumber:string 
  survey_no: number
  hissa_no: string
}

