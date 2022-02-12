import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { KaveriService } from '../../services/kaveri.service';
import { MovableService } from '../../services/movable.service';
import notify from "devextreme/ui/notify";
import { Router } from '@angular/router';
@Component({
  selector: 'app-miscellaneous-properties-details',
  templateUrl: './miscellaneous-properties-details.component.html',
  styleUrls: ['./miscellaneous-properties-details.component.scss']
})
export class MiscellaneousPropertiesDetailsComponent implements OnInit {
  subarticleList: any[] = [];
  articleList: any[] = [];
  registrationList: any[] = [];
  errorMessage: string = "";
  article: string = "";
  bookNumber:any="select";
 // PropertytypeForm: FormGroup;
  PropertytypeForm = new FormGroup({
    DescriptionofProperty: new FormControl("", Validators.required)
  })
  subarticle: any;
  ApplicationData:any
  //kaverisearch: FormGroup;
  kaverisearch = new FormGroup({
    article: new FormControl(""),

    subarticle: new FormControl(""),

    regFee: new FormControl(""),
    bookNumber: new FormControl("")
  })
  //DescriptionofProperty
  message;
  stamparticledetails:any
  stamparticle:any
  Propertyid :any = null;
  i:number;
  loggedinUser: string;
  subsubmitted = false;
  submitted = false;
  constructor(private kaveriService: KaveriService,private formBuilder: FormBuilder,private movableService: MovableService,public router: Router ) { }

  MiscellaneousPropertiesDetails :any =
  {
    "propertyid": null,
    "documentid": 0,
    "villagecode": 1,
    "regsrocode": 0,
    "srocode": 0,
    "totalarea": -7472,
    "unitid": 1,
    "northboundary": null,
    "southboundary": null,
    "eastboundary": null,
    "westboundary": null,
    "landmark": null,
    "marketvalue": 0,
    "assessment": null,
    "sdcalculationstring": null,
    "stampduty": 0,
    "transferliabilities": 1,
    "consideration": 0,
    "additionalduty": 0,
    "cessduty": 0,
    "govtduty": 0,
    "isexempted": true,
    "exemptiondescription": "desc",
    "ismovableproperty": true,
    "sdrefund": null,
    "docmarketvalue": null,
    "valid1": null,
    "isimdemnified": true,
    "restriction": null,
    "restrictiontype": null,
    "restrictiondescription": null,
    "enumber": null,
    "claimingblocknumber": null,
    "retainingblocknumber": null,
    "valuationreport": null,
    "loanpurposeid": null,
    "applicationnumber": null,
    "verified": true,
    "issroapproved": null,
    "stamparticlecode": 1,
    "stampruleid": 1,
    "regarticlecode": 1,
    "propertytypeid": 1001,
    "noofscanpages": 0,
    "movablepropertydesc": "Data savd"
  
  }
  ngOnInit(): void {
     this.ApplicationData = localStorage.getItem("ApplicationData");
     this.loggedinUser = localStorage.getItem('loggedinuser');

    //  this.kaverisearch = this.formBuilder.group({
    //   article: [""],
    //   subarticle: [""],
    //   regFee: [""],
    // });
    // this.PropertytypeForm = this.formBuilder.group({
    //   DescriptionofProperty: new FormControl("", Validators.required)
      
    // });
    this.Article();
    
  
  }
 get g() {
  return this.PropertytypeForm.controls;
}

  Article() {
    this.kaveriService.article().subscribe(
      (data: any) => {
        if (data.length != 0) {
          this.articleList = data;
          console.log("this.articleList-->",this.articleList);
          this.Fetchdetails()
        }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
  }
  Fetchdetails(){
    
      //this.selectedIdi;stvalue =this.GetPresenterData[i].districtcode;
      var applicationdetails:any ={
        "applicationnumber":this.ApplicationData
      }
      this.movableService.FetchMiscellaneousPropertiesDetails(applicationdetails).subscribe(
        (data: any) => {
          console.log(data[0]);
          if (data && data.length != 0) {
            this.Propertyid = data[0].propertyid
            this.stamparticledetails = data[0].stamparticle
             this.kaverisearch.controls['article'].setValue(data[0].stamparticlecode);
             this.MiscellaneousPropertiesDetails.stamparticlecode = data[0].stamparticlecode
             this.MiscellaneousPropertiesDetails.movablepropertydesc = data[0].propertywithdescription
             this.PropertytypeForm.controls['DescriptionofProperty'].setValue(data[0].propertywithdescription);
              
             this.GetStampArticle(data[0])
        
            if (data.responseCode == "1000") {
              this.message = data.responseMessage;
              this.showToast();
            }
            //this.registrationList = data;
      
           
          }
        }, e => {
      
          if (e.error) {
            this.errorMessage = e.error.error_description;
          }
        }
      )
    }
    GetStampArticle(articlecode){
      console.log(articlecode)
      var article = {
        "stamparticlecode": articlecode.stamparticlecode,
      };
      var stamparticle = {
        "stamparticle": articlecode.stamparticlecode,
      };
      if (article != undefined) {
        this.kaveriService.subarticle(article).subscribe(
          (data: any) => {
            if (data && data.length != 0) {
              this.subarticleList = data;
              console.log(data)
              this.kaverisearch.controls['subarticle'].setValue(articlecode.stampruleid);
              this.MiscellaneousPropertiesDetails.stampruleid = articlecode.stampruleid
              console.log(JSON.stringify( this.subarticleList));
            }
          }, e => {
  
            if (e.error) {
              this.errorMessage = e.error.error_description;
            }
          }
        )
       this.kaveriService.getRegistrationArticle(stamparticle).subscribe(
         (data1: any) => {
           if (data1 && data1.length != 0) {
             this.registrationList = data1;
             console.log(data1)
             this.kaverisearch.controls['regFee'].setValue(articlecode.regarticlecode);
             this.MiscellaneousPropertiesDetails.regarticlecode = articlecode.regarticlecode
             this.kaverisearch.controls['bookNumber'].setValue(articlecode.bookid);
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
  onarticleChange($event,index) {
    console.log($event,index)
  //   //let nonAgricultureData=JSON.parse(localStorage.getItem("finalNonAgriculture"));
  //   nonAgricultureData[index].stamparticlecode=$event.target.value;
    this.MiscellaneousPropertiesDetails.stamparticlecode = $event.target.value
    if ($event != "") {
     let text1 = $event.target.options[$event.target.options.selectedIndex].text;
     this.article = text1;
   }
  //   localStorage.setItem("finalNonAgriculture",JSON.stringify(nonAgricultureData));
     let articlecode=$event.target.value;
     console.log(articlecode)
     var article = {
       "stamparticlecode": articlecode,
     };
     this.stamparticle = {
      "stamparticle": articlecode,
    };
     if (article != undefined) {
       this.kaveriService.subarticle(article).subscribe(
         (data: any) => {
          console.log(data)
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
   
 
   }
   onsubarticleChange($event,index) {
     console.log($event.target.value)
  //  // let nonAgricultureData=JSON.parse(localStorage.getItem("finalNonAgriculture"));
  //  var nonAgricultureData =[]
  //   nonAgricultureData[index].stampSubarticlecode=$event.target.value;
     this.MiscellaneousPropertiesDetails.stampruleid = $event.target.value
    if ($event != "") {
     let text1 = $event.target.options[$event.target.options.selectedIndex].text;
     console.log(text1)
    // this.subarticle = text1;
   }
   if (this.stamparticle != undefined) {

    this.kaveriService.getRegistrationArticle(this.stamparticle).subscribe(
      (data: any) => {
        console.log(data)
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
    //localStorage.setItem("finalNonAgriculture",JSON.stringify(nonAgricultureData));
  }
  onRegChange($event,index) {
  //   let nonAgricultureData=JSON.parse(localStorage.getItem("finalNonAgriculture"));
  //   nonAgricultureData[index].regArticlecode=$event.target.value;
  this.MiscellaneousPropertiesDetails.regarticlecode = $event.target.value
    if ($event != "") {
     let text1 = $event.target.options[$event.target.options.selectedIndex].text;
    //  this.subarticle = text1;
   //  nonAgricultureData[index].selectedRegArticle=text1;
     let bookObj=this.registrationList.filter((item)=>{return $event.target.value==item.regarticlecode });
     this.bookNumber=bookObj[0].bookid;
    // nonAgricultureData[index].selectedBookNumber=bookObj[0].bookid;
   }
  //   localStorage.setItem("finalNonAgriculture",JSON.stringify(nonAgricultureData));
  }
  onSubmit(){
    this.MiscellaneousPropertiesDetails.movablepropertydesc = this.PropertytypeForm.get('DescriptionofProperty').value
    this.MiscellaneousPropertiesDetails.applicationnumber = this.ApplicationData 
    this.MiscellaneousPropertiesDetails.propertyid = this.Propertyid 
    console.log( this.MiscellaneousPropertiesDetails)
 this.movableService.SaveMiscellaneousPropertiesDetails(this.MiscellaneousPropertiesDetails).subscribe(
  (data: any) => {
    console.log(data);
    if (data && data.length != 0) {
      if (data.responseCode == "1000") {
        this.message = data.responseMessage;
        this.showToast();
        this.router.navigate(['kaveri-result']);
      }
      //this.registrationList = data;

     
    }
  }, e => {

    if (e.error) {
      this.errorMessage = e.error.error_description;
    }
  }
)
 
  }
  showToast() {
    notify({
      message: this.message,
      isVisible: true,
      displayTime: 3000,
      height: 50,
      type: "success"

    });
  }

}
