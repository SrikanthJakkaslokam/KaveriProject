import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import notify from 'devextreme/ui/notify';
import { KaveriService } from '../../services/kaveri.service';

@Component({
  selector: 'app-view-property-non-agricultural',
  templateUrl: './view-property-non-agricultural.component.html',
  styleUrls: ['./view-property-non-agricultural.component.scss']
})
export class ViewPropertyNonAgriculturalComponent implements OnInit {
  subselectedarticle;
  alert:boolean = false;
  submitted = false;
  kaverisearch: FormGroup;
  bhumipopupVisible = false;
  disTrict: string = "";
  talUka: string = "";
  town: string = "";
  vilLage: string = "";
  surVey: string = "";
  article: string =""
  dataSource: any[];
  surveynum: any[] = [];
  errorMessage: string = "";
  loggedinUser: string = "";
  bhoomidata: any[] = [];
  bhoomisource:any[]=[];
  courtorder: any[] = [];
  articleList :  any[] = [];
  subarticleList :  any[] = [];
  manualpopupVisible = false;
  BhoomiOwners: any[];
  selectedarticle: string = "";
  newselectedarticle:  any[] = [];
  testselectedarticle: string = "";
  multiOwnersdata: Array<any> = [];
  multiCourtOrderdata: Array<any> = [];
  Ownersdetails:any = [{
    "sno":"1",
    "ownername" :"",
    "propertyid" :"",
    "propertydescription" : "",
    "buyername" :"",
    "dateoftransaction":""
    }];
  message: any;
  propertyid: string;
  eaasthidata: any;
  KaveriObject: any;
  KaveriMultyobject: any;
  constructor(private kaveriService: KaveriService, private formBuilder: FormBuilder,public router: Router) { }

  ngOnInit(): void {
    this.kaverisearch = this.formBuilder.group({
      article: ["", Validators.required],
      subarticle: ["", Validators.required],
    });
    this.disTrict = localStorage.getItem('dist');
    this.talUka = localStorage.getItem('taluk');
    this.town = localStorage.getItem('hoblitown');
    this.vilLage = localStorage.getItem('indexvillage');
    this.surVey = localStorage.getItem('surveynumber');
    this.article = localStorage.getItem('articleList');
    this.propertyid = localStorage.getItem('propertyid');
    
    
    // this.kaveriResult();
    // this.BhoomiResult();
    this.viewProperty();
   this.courtOrderD();
   this.Article();
  }
  get f(){
    return this.kaverisearch.controls;
  }

  viewProperty() {
       
    var aasthi = {
      "propertyId": this.propertyid,
    };
    console.log(JSON.stringify(aasthi));
    this.kaveriService.eaasthi(aasthi).subscribe(
      (data: any) => {
        console.log(data);
        data = data["eAASTHIResponse"]
        var propertydetails = data["khathadetails"]
        var ownersdetails = data["ownerdetails"]
        ownersdetails = ownersdetails["owner"]
        this.Ownersdetails[0].propertyid= propertydetails.propertyid
        this.Ownersdetails[0].ownername= ownersdetails.ownername
        this.Ownersdetails[0].propertydescription = propertydetails.propertyclassification
       // this.doc = data;
        this.eaasthidata = this.Ownersdetails;
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
  }
  courtOrderD() {
    debugger;
      var court = {
        "SROCode": parseInt(localStorage.getItem('SROCode')),
        "surveyNo":parseInt(localStorage.getItem('surveyno')), 
        "hissano":localStorage.getItem('hissano')
       };
    console.log(JSON.stringify(court));
    
    this.kaveriService.courtorder(court).subscribe(    
      (data: any) => {
        debugger;
        console.log(data);
      this.courtorder = data;
      const filterdata = this.filterrowdataSLNO(data);
      this.courtorder=[...filterdata];
      //localStorage.setItem("SROCode",data[0].sroCode);
      debugger;
      }, e => {
        if (e.error) {
          debugger;
          this.errorMessage = e.error.error_description;
        }
      }
    )
  }
  Article() {
    debugger;
    this.kaveriService.article().subscribe(
      (data: any) => {
        console.log(data);
        if(data.length != 0) {
          this.articleList = data;
    
        }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
  }
  
  
  onarticleValuechange(distValue) {
   debugger;
   var article = this.kaverisearch.get("article").value;
   console.log(article);
   console.log(article.stamparticlecode);
    //this.testselectedarticle = article.stamparticlecode;
    if(this.testselectedarticle != "") {
    this.SubArticle();
    }
  }
  onarticleChange($event){
    debugger;
    if($event!=""){
    let text1 = $event.target.options[$event.target.options.selectedIndex].text;
    this.article = text1;
    }
    }
  
  
  SubArticle() {
    var articlecode = this.kaverisearch.get("article").value;
    var article = {
      "stamparticlecode": articlecode.stamparticlecode,
    };
    console.log(JSON.stringify(article))
    if(article != undefined) {
      this.kaveriService.subarticle(article).subscribe(
        (data: any) => {
          console.log(data);
          if(data.length != 0) {
          
          this.subarticleList = data;
        
          }
        }, e => {
          if (e.error) {
            this.errorMessage = e.error.error_description;
          }
        }
      )
    }
  }
  
  filterrowdataSLNO(data) {
    data.forEach((currentValue, index) => {
    
          currentValue.sno = index + 1;
    });
     return data;
      }
  onSubmit() {
        debugger;
        this.submitted = true;
        this.alert=true;
      if (this.kaverisearch.invalid) {
        return;
      }
      else{
        debugger
        //Property schedule Master
        var propschedule = {
          "_documentid": 1,
          "_villagecode": 2,
          "_regsrocode": 2,
          "_srocode": 2,
          "_totalarea": 100,
          "_unitid": 0,
          "_northboundary": "north",
          "_southboundary": "south",
          "_eastboundary": "east",
          "_westboundary": "west",
          "_landmark": "landmark",
          "_marketvalue": 100,
          "_assessment": "assess",
          "_sdcalculationstring": "sdc",
          "_stampduty": 10,
          "_transferliabilities": 10,
          "_consideration": 10,
          "_additionalduty": 10,
          "_cessduty": 10,
          "_govtduty": 10,
          "_isexempted": true,
          "_exemptiondescription": "exem",
          "_ismovableproperty": true,
          "_sdrefund": 10,
          "_docmarketvalue": 10,
          "_valid1": 10,
          "_isimdemnified": true,
          "_restriction": "R",
          "_restrictiontype": "Re",
          "_restrictiondescription": "RES desc",
          "_enumber": "enumber",
          "_claimingblocknumber": "C",
          "_retainingblocknumber": "R",
          "_valuationreport": "valution",
          "_loanpurposeid": 10,
          "_applicationnumber": "ECC-01112021-00005",
          "_verified": true,
          "_issroapproved": "E"
        };
        console.log(JSON.stringify(propschedule));
        this.kaveriService.SavePropertyScheduleMaster(propschedule).subscribe(
          (data: any) => {
            debugger;
            console.log(data);
           // this.router.navigate(['/market-valuation']);
            if (data.responseCode == "1000") {
              this.message = data.responseMesg;
              this.showToast();
             // this.router.navigate(['/market-valuation']);
            }
          
          }, e => {
            if (e.error) {
              debugger;
              this.errorMessage = e.error.error_description;
            }
          }
        )
        //Property schedule master
        this.router.navigateByUrl('/party-details');
      }
        localStorage.setItem('Article',JSON.stringify(this.kaverisearch.get("article").value));
        // localStorage.setItem('Subarticle',this.kaverisearch.get("subarticle").value);
        localStorage.setItem('Subarticle',JSON.stringify(this.kaverisearch.get("subarticle").value));
        var test=JSON.parse(localStorage.getItem('Subarticle'));
        console.log(test.issurchargepercentage);
        // console.log(JSON.parse(localStorage.getItem('Subarticle')));
        console.log(this.kaverisearch.get("subarticle").value);
        if (this.surveynum.length>0) {
          this.router.navigateByUrl('/party-details');
      }
     
      }
      showToast() {
        notify({
            message: this.message,
            isVisible: true,
            displayTime: 3000,
            height: 50,
            type:"success"
      
        });
      }

      AddNewProperty(){
        this.AddPropertytoObject();
        this.router.navigate(['/movable-immovable']);
            }
      AddPropertytoObject()
            {
                  
                    this.KaveriObject['districtname'] = parseInt(localStorage.getItem('dist'));
                    this.KaveriObject['talukaname'] = parseInt(localStorage.getItem('taluk'));
                    this.KaveriObject['hobliname'] = parseInt(localStorage.getItem('bhoomihoblicode'));
                    this.KaveriObject['villagename'] = parseInt(localStorage.getItem('villagename'));
                    this.KaveriObject['surveyno'] = parseInt(localStorage.getItem('surveyno'));
                    this.KaveriObject['hissno'] = parseInt(localStorage.getItem('hissano'));
                    this.KaveriObject['Roadcode'] = parseInt(localStorage.getItem('Roadcode'));
                    this.KaveriObject['villagecode'] = parseInt(localStorage.getItem('villagecode'));
        
                    var artice = this.kaverisearch.get("article").value;
                    this.KaveriObject['stamparticlecode']= artice.stamparticlecode;
                    this.KaveriObject['userarticleno'] = artice.userarticleno;
                    this.KaveriObject['articlenamee'] = artice.articlenamee;
                    debugger;
                    var subartice = this.kaverisearch.get("subarticle").value;
                    this.KaveriObject['stampruleid']= subartice.stampruleid;
                    this.KaveriObject['stamparticlecode']= subartice.stamparticlecode;
                    this.KaveriObject['descriptione']= subartice.descriptione;;
                    this.KaveriObject['isslabs']= subartice.isslabs;
                    this.KaveriObject['unitisamount']= subartice.unitisamount;
                    this.KaveriObject['unit']= subartice.unit;
                    this.KaveriObject['value']= subartice.value;
                    this.KaveriObject['minlimit']= subartice.minlimit;
                    this.KaveriObject['maxlimit']= subartice.maxlimit;
                    this.KaveriObject['sdcalcon']= subartice.sdcalcon;
                    this.KaveriObject['isinpercentage']= subartice.isinpercentage;
                    this.KaveriObject['isfixduty']= subartice.isfixduty;
                    this.KaveriObject['isexempted']= subartice.isexempted;
                    this.KaveriObject['isruleactive']= subartice.isruleactive;
                    this.KaveriObject['regvalue']= subartice.regvalue;
                    this.KaveriObject['regispercent']= subartice.regispercent;
                    this.KaveriObject['regmaxlimit']= subartice.regmaxlimit;
                    this.KaveriObject['regminlimit']= subartice.regminlimit;
                    this.KaveriObject['regcalconconsideration']= subartice.regcalconconsideration;
                    this.KaveriObject['issurcharge']= subartice.issurcharge;
                    this.KaveriObject['urbanvalue']= subartice.urbanvalue;
                    this.KaveriObject['ruralvalue']= subartice.ruralvalue;
                    this.KaveriObject['issurchargepercentage']= subartice.issurchargepercentage;
                    this.KaveriObject['iscess']= subartice.iscess;
                    this.KaveriObject['cessvalue']= subartice.cessvalue;
                    this.KaveriObject['iscesspercentage']= subartice.iscesspercentage;
                    this.KaveriMultyobject.push({ ...this.KaveriObject })
                     localStorage.setItem('KaveriMultyobject', JSON.stringify(this.KaveriMultyobject));
                   
                    console.log(this.KaveriMultyobject);
             
            }
}
