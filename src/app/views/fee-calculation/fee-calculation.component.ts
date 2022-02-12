import { HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BOOL_TYPE } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { KaveriService } from '../../services/kaveri.service';
import {Location,DecimalPipe,CommonModule } from '@angular/common';
import notify from 'devextreme/ui/notify';
import { nextTick } from 'process';
import { ThisReceiver } from '@angular/compiler';



@Component({
  selector: 'app-fee-calculation',
  templateUrl: './fee-calculation.component.html',
  styleUrls: ['./fee-calculation.component.scss']
})
export class FeeCalculationComponent implements OnInit {
  show: boolean = false;
  showtbl: boolean = true;
  submitted = false;
  exedec : string = "";


  considerationamount: number = 0;
  governmentduty: number = 0;
  denonation: number = 0;
  pages: number = 0;
  stampduty: string ;
  regiontype: string ;
  disTrict: string = "";
  talUka: string = "";
  town: string = "";
  vilLage: string = "";
  marketvalue: number = 0 ;
  amount: number = 0;
  considerationvalue : number = 0;
   applicationnumber = localStorage.getItem('ApplicationData');

  stamparticle : string = "" ;
  stamparticledes : string = "";
  stampruleid: string ="";
  stampruledes: string ="";

  mutatoinfee:number;
  scanningrate:number;


  GovernmentDutyafterExcemption : number ;
  SurchargeValue : number ;
  CessValue : number ;
  ScanningFees : number ;
  MutationFees : number ;
  DenonationofStampDuty : number ;
  TotalStampDuty : number ;
  TotalRegistrationFees : number;
  TotalPayableAmount : number;

  isexempted : boolean = false;

  isslabcheck : object ;

  loggedinUser: string = "";

  feecalculation: FormGroup;
  feecalculationexem: FormGroup;

  fileName = '';

  //Multiproperty>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  Unitcode:any = 0;
  codedetails:any;

  feecalculationobject = {
    governmentDuty : 0,
    cessValue : 0,
    surchargeValue : 0,
    scanningFees : 0,
    mutationFees : 0,
    denonationofStampDuty : 0,
    totalRegistrationFees : 0,
  }

  feecalculationMultyobject : Array<any> = [];
  item: number = 0;

  finalfeecal : Array<any> = [];
  message: any;
  isVisible: boolean = false;

  type: string = "info";

  feecalculationformobj : Array<any> = [];
  bhoomiObject: Array<any> = [];
  feedata : Array<any> = [];
  formuladata: Array<any> = [];
  propertydata: Array<any> = [];

  numofprop : number = 0 ;

  displaypropertytypeNum: number ;
  propmaster: Array<any> = [];
  errorMessage: any;
  vlgcode: number;
  feecalculationconst: FormGroup;
  shownext: boolean = true;
  isrt: number = 0;
  showncalc: boolean = false;
  consandmarket: Array<any> = [];
  showcard: boolean;
  ismovable: boolean;
  iscalculate: boolean = false;
  submittedcons: boolean;
  filteredproperty: Array<any> = [];
  finalfeecalculated= {
    governmentDuty : 0,
    cessValue : 0,
    surchargeValue : 0,
    scanningFees : 0,
    mutationFees : 0,
    totalStampduty : 0,
    denonationofStampDuty : 0,
    totalRegistrationFees : 0,
    totalPayableamount : 0
  };
  numberofagri: number = 0;
  nextbutton: string = "Next";
  isnotmovable: boolean;


  constructor(private http: HttpClient,  private kaveriService: KaveriService, public router: Router,private _location: Location ) {}


  ngOnInit(): void {

    this.loggedinUser = localStorage.getItem('loggedinuser');

    this.feecalculationexem =  new FormGroup({
      checkbox: new FormControl("", Validators.required),
      percentage: new FormControl("", Validators.required),
      inpercentageorrupee: new FormControl("", Validators.required),
      exemptiondecription: new FormControl("", Validators.required),
      file: new FormControl("", Validators.required),

    });
    this.feecalculationconst =  new FormGroup({
      denonationdesc: new FormControl("", Validators.required),
      denonation: new FormControl("", Validators.required),
      pages: new FormControl("", Validators.required)
    });



    this.feecalculation =  new FormGroup({
      considerationamount: new FormControl("", Validators.required)
    });

    

    if(this.regiontype == "" || this.regiontype == null){
        this.regiontype = "BBMP"
    }

  this.showcard = true;
 this.showtbl = false;
  // this.showcard = false;

    this.marketvalue = 0
    this.displaypropertytypeNum = 1;
    this.getfeerate();
    this.getregiontype();
    this.getpropertydata();
    // this.getfeedata();
     this.changeprop();

    
  }

 

  onFileSelected(event) {

    const file:File = event.target.files[0];

    if (file) {

        this.fileName = file.name;

        const formData = new FormData();

        formData.append("thumbnail", file);

        const upload$ = this.http.post("/api/thumbnail-upload", formData);

        upload$.subscribe();
     }
  }

  getfeerate() {
    this.kaveriService.getfeerate().subscribe(
      (data: any) => {
        console.log(data);
        if(data.length != 0) {
        this.scanningrate = data[0].value;
        this.mutatoinfee = data[1].value;
        // console.log(data[0].value);
        // console.log(this.mutatoinfee);
        }
      }
    )
  }

  getregiontype() {
    this.kaveriService.getregiontype(this.vlgcode).subscribe(
      (data: any) => {
        console.log(data);
        if(data.length != 0) {
        this.regiontype = data.regionname ;
        }
      }
    )
  }

  getpropertydata(){
    this.kaveriService.GetPropertyMasterData(this.applicationnumber).subscribe(
      (data: any) => {
        console.log((data))
        if(data){
          this.propertydata = data;
          this.consandmarket = JSON.parse(JSON.stringify(this.propertydata));
          this.numofprop = this.propertydata.length;
          if(this.numofprop == 1){this.nextbutton = "Save and Continue"}
          
          
          if(this.propertydata[this.item] && this.propertydata[this.item] != null ){
          if(this.propertydata[this.item].ismovableproperty == true){
          var changebhoomiObject = this.propertydata[this.item];
          
            if(changebhoomiObject.ismovableproperty == false){
              this.isnotmovable = true;
            }
           
          this.disTrict = "";
          this.talUka =  "";
          this.town =  "";
          this.vilLage =  "";

          this.stamparticle = changebhoomiObject.stamparticlecode ;
          this.stamparticledes = changebhoomiObject.articlename;
          this.stampruleid = changebhoomiObject.stampruleid;
          this.stampruledes = changebhoomiObject.stamprulename;
          
          this.marketvalue = 0;

          var feeformobj = {
            "considerationamount": 0
          }
          var feeforpg = {
            "denonationdesc":"",
            "denonation": 0,
            "pages": 0
          }
          feeformobj.considerationamount = changebhoomiObject.consideration ;
          feeforpg.denonationdesc = changebhoomiObject.exemptiondescription ;
          feeforpg.denonation = changebhoomiObject.additionalduty ;
          feeforpg.pages = changebhoomiObject.noofscanpages ;
          if(feeformobj != null && feeforpg != null){
          this.feecalculation.setValue(feeformobj);
          this.feecalculationconst.setValue(feeforpg);
          }
          }
          else{
          var changebhoomiObject = this.propertydata[this.item];
          if(changebhoomiObject.ismovableproperty == false){
            this.isnotmovable = true;
          }
          this.disTrict = changebhoomiObject.districtname;
          this.talUka = changebhoomiObject.taluknamee;
          this.town = changebhoomiObject.hoblinamee;
          this.vilLage = changebhoomiObject.villagenamee;

          this.stamparticle = changebhoomiObject.stamparticlecode ;
          this.stamparticledes = changebhoomiObject.articlename;
          this.stampruleid = changebhoomiObject.stampruleid;
          this.stampruledes = changebhoomiObject.stamprulename;
          
          this.marketvalue = changebhoomiObject.marketvalue;
          this.ismovable = !changebhoomiObject.ismovableproperty;
          var feeformobj = {
            "considerationamount": 0
          }
          var feeforpg = {
            "denonationdesc":"",
            "denonation": 0,
            "pages": 0
          }
          feeformobj.considerationamount = changebhoomiObject.consideration ;
          feeforpg.denonationdesc = changebhoomiObject.exemptiondescription ;
          feeforpg.denonation = changebhoomiObject.additionalduty ;
          feeforpg.pages = changebhoomiObject.noofscanpages ;
          if(feeformobj != null && feeforpg != null){
          this.feecalculation.setValue(feeformobj);
          this.feecalculationconst.setValue(feeforpg);
          }
}
         }
        }

      }
    )
  }
  getfeedata(){
    this.kaveriService.Fetchfeecalculationdata(this.applicationnumber).subscribe(
      (data: any) => {
        //  console.log("feedata===>",data)
         if(data){
           this.feedata = data;
           this.showtbl = true;
           var i = 0;
           var len = this.feedata.length;
           while(i<len){
           var feecaldata ;
           feecaldata = this.feedata[i];

           var feeobj ={
            "governmentDuty": 0,
            "cessValue": 0,
            "surchargeValue": 0,
            "scanningFees": 0,
            "mutationFees": 0,
            "denonationofStampDuty": 0,
            "totalStampDuty": 0,
            "totalRegistrationFees": 0,
            "totalPayableAmount": 0
          };
          
           feeobj.governmentDuty = feecaldata.stampduty;
           feeobj.cessValue = feecaldata.cess;
           feeobj.surchargeValue = feecaldata.surcharge;
           feeobj.scanningFees = feecaldata.servicecharge;
           feeobj.mutationFees = feecaldata.mutationfee;
           feeobj.denonationofStampDuty = feecaldata.deficitstampduty;
           feeobj.totalStampDuty = feecaldata.stampduty + feecaldata.cess + feecaldata.surcharge + feecaldata.servicecharge + feecaldata.mutationfee - feecaldata.deficitstampduty;
           feeobj.totalRegistrationFees = feecaldata.registrationfee;
           feeobj.totalPayableAmount = feeobj.totalStampDuty + feecaldata.registrationfee;
           
           this.feecalculationMultyobject[i] = feeobj;
           i++;
           console.log("feecalculationMultyobject===>",data)

           }
           feeobj = this.feecalculationMultyobject[0];
           
           this.governmentduty  = feeobj.governmentDuty
           this.GovernmentDutyafterExcemption = feeobj.governmentDuty;
           this.CessValue = feeobj.cessValue;
           this.SurchargeValue = feeobj.surchargeValue;
           this.ScanningFees = feeobj.scanningFees;
           this.MutationFees = feeobj.mutationFees;
           this.DenonationofStampDuty = feeobj.denonationofStampDuty;
           this.TotalStampDuty = feeobj.totalStampDuty;
           this.TotalRegistrationFees = feeobj.totalRegistrationFees;
           this.TotalPayableAmount = feeobj.totalPayableAmount;

       }

      }
    )
  }

  back(){
    this._location.back();
  }

  get f() {
    return this.feecalculation.controls;
  }


  Nextproperty(){
    this.submittedcons = true;
    if(this.feecalculation.valid){
      var temp = JSON.parse(JSON.stringify(this.consandmarket[this.item]));
      temp.consideration = this.feecalculation.get('considerationamount').value;
      this.consandmarket[this.item] =  JSON.parse(JSON.stringify(temp));
      // this.consandmarket[this.item].consideration = this.feecalculation.get('considerationamount').value;
      
    if(this.displaypropertytypeNum == this.numofprop - 1){
      this.nextbutton = "Save and Continue"
    }

    if(this.displaypropertytypeNum == this.numofprop){
      var u = 0;
      var len = this.propertydata.length;
      while(u<len){
        this.propertydata[u].consideration = this.consandmarket[u].consideration;
        u++;
      }
      this.shownext = false;
      // this.showncalc = true;
      this.filterproperty();
      this.iscalculate = true;
      
    }
    else{
      this.feecalculation.reset();
      this.frontbuttonclicks();
    }

    }
    else{

    }
    
  }


  filterproperty(){
    var len = this.numofprop;
    var p = 0;
    var j = 0;
    while(p < len){
      j = p;
      while(j < len){
        if(p != j){
          var temp = this.consandmarket[p];
          var temp2 = this.consandmarket[j];
          if(temp.stampruleid == temp2.stampruleid && temp.propertytypeid == temp2.propertytypeid ){
            temp.marketvalue = temp.marketvalue + temp2.marketvalue;
            temp.consideration = temp.consideration + temp2.consideration;
            this.consandmarket[p] = temp;
            this.consandmarket.splice(j, 1);
            len--
            j++;
          }
          else{
            j++;
          }
        }
        else{
          j++;
        } 
      }
      p++;
    }
     var i = 0;
     len = this.numofprop
    while(i<len){
      var tempagri = this.propertydata[i];
      if(tempagri.propertytypeid == 17){
        this.numberofagri++;
        i++;
      }
      else{i++;}
    }
    console.log(this.consandmarket);
    console.log(this.numberofagri);
    var changebhoomiObject = this.propertydata[0];
    var feeforpg = {
      "denonationdesc":"",
      "denonation": 0,
      "pages": 0
    }
    feeforpg.denonationdesc = changebhoomiObject.exemptiondescription ;
    feeforpg.denonation = changebhoomiObject.additionalduty ;
    feeforpg.pages = changebhoomiObject.noofscanpages ;
    if(feeforpg != null){
    this.feecalculationconst.setValue(feeforpg);
    }
  }


oncalculate(){
  var i = 0;
  var len =  this.consandmarket.length;
 while(i<len){

  var formula = this.consandmarket[i];
  

  this.considerationvalue = formula.consideration
  this.marketvalue = formula.marketvalue


  if(this.feecalculation.valid)
  {
    var isfixduty = formula.isfixduty;
    console.log(isfixduty);
    var isslabs = formula.isslabs;
    console.log(isslabs);
    var value = formula.value;
    var ispersentage = formula.isinpercentage;
    var sdcalcon = formula.sdcalcon;
    var unit = formula.unit;
    var minlimit = formula.minlimit;
    var maxlimit = formula.maxlimit;
    console.log(value);
    console.log(unit);

    if(unit == 0){
      unit = 1;
    }

    // Government Duty:---
    if(isfixduty == true){
      if(isslabs == false){
        this.governmentduty = value;
      }
      else if(isslabs == true){
        if(sdcalcon == "C " ){
          amount = this.considerationvalue;
        }
        else if(sdcalcon == "M " ){
          amount = this.marketvalue;
        }
        else if(sdcalcon == "H " ){
          if(this.considerationvalue>this.marketvalue){
            amount = this.considerationvalue;
          }
          else{
            amount = this.marketvalue;
          }
        }
        var i = 0;
        while(this.isslabcheck[i] != null){
          if(amount < this.isslabcheck[i].slabamtto){
            this.governmentduty = (amount * (this.isslabcheck[i]/this.isslabcheck[i].unit)) + this.isslabcheck[i].plusthisamount;
            break;
          }
          else if(this.isslabcheck[i].slabamtto == -1){
            this.governmentduty = (amount * (this.isslabcheck[i]/this.isslabcheck[i].unit)) + this.isslabcheck[i].plusthisamount;
            break;
          }
          else{
            this.governmentduty = 0;
          }
          i++;
        }
      }
    }
    else if(ispersentage == true){
      if(isslabs == false){
        if(sdcalcon == "C "){

          this.governmentduty = (this.considerationvalue * (value/unit));

          if(this.governmentduty<minlimit){
            this.governmentduty = minlimit;
          }
          else if(this.governmentduty>maxlimit){
            if(maxlimit == -1){

            }
            else{
            this.governmentduty = maxlimit;
            }
          }

        }
        else if(sdcalcon == "M "){
          this.governmentduty = (this.marketvalue * (value/unit));

          if(this.governmentduty<minlimit){
            this.governmentduty = minlimit;
          }
          else if(this.governmentduty>maxlimit){
            if(maxlimit == -1){

            }
            else{
            this.governmentduty = maxlimit;
            }
          }
        }
        else if(sdcalcon == "H "){

          if(this.considerationvalue>this.marketvalue){
            var amount = this.considerationvalue;
          }
          else{
            amount = this.marketvalue;
          }
          this.governmentduty = (amount * (value/unit));

          if(this.governmentduty<minlimit){
            this.governmentduty = minlimit;
          }
          else if(this.governmentduty>maxlimit){
            if(maxlimit == -1){

            }
            else{
            this.governmentduty = maxlimit;
            }
          }
        }
        else if(sdcalcon == "CS"){

        }
      }
      else if(isslabs == true){

      }
    }
    else{
      this.governmentduty = 0;
    }
    console.log(this.governmentduty);

    var regispersent = formula.regispercent;
    var regsdcalcon = formula.regcalconconsideration ;
    var regvalue = formula.regvalue ;
    var regminlimit = formula.regminlimit ;
    var regmaxlimit = formula.regmaxlimit ;
    // Regestration Amount:---
    if(regispersent == true){
      if(regsdcalcon == "C "){

        var regamount = (this.considerationvalue * (regvalue/100));

        if(regamount<regminlimit){
          regamount = regminlimit;
        }
        else if(regamount>regmaxlimit){
          if(regmaxlimit == -1){

          }
          else{
            regamount = regmaxlimit;
          }
        }

      }
      if(regsdcalcon == "M "){

        var regamount = (this.marketvalue * (regvalue/100));

        if(regamount<regminlimit){
          regamount = regminlimit;
        }
        else if(regamount>regmaxlimit){
          if(regmaxlimit == -1){

          }
          else{
            regamount = regmaxlimit;
          }
        }

      }
      if(regsdcalcon == "H "){
        if(this.considerationvalue>this.marketvalue){
          var amount = this.considerationvalue;
        }
        else{
          amount = this.marketvalue;
        }

        var regamount = (amount * (regvalue/100));

        if(regamount < regminlimit){
          regamount = regminlimit;
        }
        else if(regamount > regmaxlimit){
          if(regmaxlimit == -1){
            regamount;
          }
          else{
            regamount = regmaxlimit;
          }
        }

      }
    }
    else{
      regamount = regvalue;
    }

    var iscess = formula.iscess ;
    var cessvalue = formula.cessvalue ;
    var issurcharge = formula.issurcharge ;
    var isurban = Boolean(localStorage.getItem("isurban"));
    var ruralvalue = formula.urbanvalue ;
    var urbanvalue = formula.ruralvalue;



    // Cess value:---
    if(iscess == true){
    var cessamount = (cessvalue/100) * this.governmentduty;
    }
    else{
    cessamount = 0;
    }


    // Surcharge value:---
    if(issurcharge == true){
      if(isurban == false){
        var surchargeamount = (ruralvalue/100) * this.governmentduty;
      }
      else if(isurban == true){
        surchargeamount = (urbanvalue/100) * this.governmentduty;
      }
    }
    else{
        surchargeamount = 0;
    }


    // Scanning Fee:---
    if(this.feecalculationconst.get('pages').value != 0)
    {
      var pages = this.feecalculationconst.get('pages').value + 2;
      var scanningamount = this.scanningrate * pages;
    }
    else{
      var scanningamount = 0;
    }

    // Mutation Fee:---
    if(formula.propertytypeid == 17){
      var mutationamount = this.mutatoinfee;
    }
    else{
      var mutationamount = 0;
    }
   }

  //  this.feecalculationformobj[this.item] = this.feecalculation.value;

      this.feecalculationobject = {
        "governmentDuty" : 0,
        "cessValue" : 0,
        "surchargeValue" : 0,
        "scanningFees" : 0,
        "mutationFees" : 0,
        "denonationofStampDuty" : 0,
        "totalRegistrationFees" : 0,
        }

        this.GovernmentDutyafterExcemption = this.governmentduty;
        this.CessValue = cessamount;
        this.SurchargeValue = surchargeamount;
        this.ScanningFees = scanningamount;
        this.MutationFees = mutationamount;
        this.DenonationofStampDuty = this.feecalculationconst.get('denonation').value;
        // this.TotalStampDuty = this.GovernmentDutyafterExcemption + this.CessValue + this.SurchargeValue + this.ScanningFees + this.MutationFees - this.DenonationofStampDuty;
        this.TotalRegistrationFees = regamount;
        // this.TotalPayableAmount = this.TotalStampDuty + regamount;

        this.feecalculationobject.governmentDuty = this.GovernmentDutyafterExcemption;
        this.feecalculationobject.cessValue = this.CessValue;
        this.feecalculationobject.surchargeValue = this.SurchargeValue;
        this.feecalculationobject.scanningFees = this.ScanningFees;
        this.feecalculationobject.mutationFees = this.MutationFees;
        this.feecalculationobject.denonationofStampDuty = this.DenonationofStampDuty;
        // this.feecalculationobject.totalStampDuty = this.TotalStampDuty;
        this.feecalculationobject.totalRegistrationFees = this.TotalRegistrationFees;
        // this.feecalculationobject.totalPayableAmount = this.TotalPayableAmount;

        this.feecalculationMultyobject[i] = this.feecalculationobject;
        i++;
      }


      var p = 0;
      var ind = this.feecalculationMultyobject.length;
      this.finalfeecalculated = {
        "governmentDuty" : 0,
        "cessValue" : 0,
        "surchargeValue" : 0,
        "scanningFees" : 0,
        "mutationFees" : 0,
        "totalStampduty" : 0,
        "denonationofStampDuty" : 0,
        "totalRegistrationFees" : 0,
        "totalPayableamount" : 0
        }

      while(p<ind){
      var tempobj = this.feecalculationMultyobject[p]
      this.finalfeecalculated.governmentDuty = this.finalfeecalculated.governmentDuty + tempobj.governmentDuty
      this.finalfeecalculated.cessValue = this.finalfeecalculated.cessValue + tempobj.cessValue;
      this.finalfeecalculated.surchargeValue = this.finalfeecalculated.surchargeValue + tempobj.surchargeValue;
      this.finalfeecalculated.scanningFees = tempobj.scanningFees;
      this.finalfeecalculated.mutationFees = this.mutatoinfee * this.numberofagri;
      this.finalfeecalculated.denonationofStampDuty = tempobj.denonationofStampDuty;
      this.finalfeecalculated.totalRegistrationFees = this.finalfeecalculated.totalRegistrationFees + tempobj.totalRegistrationFees;
      p++;
      } 
      console.log(this.feecalculationMultyobject);
      console.log(this.finalfeecalculated);
      this.finalfeecalculated.totalStampduty = this.finalfeecalculated.governmentDuty + this.finalfeecalculated.cessValue + this.finalfeecalculated.surchargeValue - this.finalfeecalculated.denonationofStampDuty
      this.finalfeecalculated.totalPayableamount = this.finalfeecalculated.totalStampduty + this.finalfeecalculated.scanningFees + this.finalfeecalculated.mutationFees + this.finalfeecalculated.totalRegistrationFees;
      
      this.GovernmentDutyafterExcemption = this.finalfeecalculated.governmentDuty;
      this.CessValue = this.finalfeecalculated.cessValue;
      this.SurchargeValue = this.finalfeecalculated.surchargeValue;
      this.ScanningFees = this.finalfeecalculated.scanningFees;
      this.MutationFees = this.finalfeecalculated.mutationFees;
      this.DenonationofStampDuty = this.finalfeecalculated.denonationofStampDuty;
      this.TotalStampDuty = this.finalfeecalculated.totalStampduty;
      this.TotalRegistrationFees = this.finalfeecalculated.totalRegistrationFees;
      this.TotalPayableAmount = this.finalfeecalculated.totalPayableamount;
      
      this.showtbl = true;


  }



savedata(){
  var p = 0;
  var len = this.propertydata.length;
  while(p<len){
    
    if(this.show == true){
    this.exedec = this.feecalculationexem.get('exemptiondecription').value;
    }
    else{
      this.exedec = "";
    }
    var bhoomiobj = this.propertydata[p]

    var propschedule = {
      "propertyid": bhoomiobj.propertyid,
      "documentid": 0,
      "villagecode": bhoomiobj.villagecode,
      "regsrocode": bhoomiobj.regsrocode ,
      "srocode":bhoomiobj.srocode,
      "totalarea": bhoomiobj.totalarea,
      "unitid": bhoomiobj.unitid,
      "northboundary":bhoomiobj.northboundary,
      "southboundary": bhoomiobj.southboundary,
      "eastboundary": bhoomiobj.eastboundary,
      "westboundary": bhoomiobj.westboundary,
      "landmark": bhoomiobj.landmark,
      "marketvalue": this.marketvalue,
      "assessment": bhoomiobj.assessment,
      "sdcalculationstring": bhoomiobj.sdcalculationstring,
      "stampduty":bhoomiobj.stampduty,
      "transferliabilities":bhoomiobj.transferliabilities,
      "consideration": bhoomiobj.consideration,
      "additionalduty":this.feecalculationconst.get('denonation').value,
      "cessduty":bhoomiobj.cessduty,
      "govtduty":bhoomiobj.govtduty,
      "isexempted":false,
      "exemptiondescription":this.feecalculationconst.get('denonationdesc').value,
      "ismovableproperty":bhoomiobj.ismovableproperty,
      "sdrefund":bhoomiobj.sdrefund,
      "docmarketvalue":bhoomiobj.docmarketvalue,
      "valid1":bhoomiobj.valid1,
      "isimdemnified":bhoomiobj.isimdemnified,
      "restriction":bhoomiobj.restriction,
      "restrictiontype":bhoomiobj.restrictiontype,
      "restrictiondescription": bhoomiobj.restrictiondescription,
      "enumber": bhoomiobj.enumber,
      "claimingblocknumber": bhoomiobj.claimingblocknumber,
      "retainingblocknumber": bhoomiobj.retainingblocknumber,
      "valuationreport":bhoomiobj.valuationreport,
      "loanpurposeid": bhoomiobj.loanpurposeid,
      "applicationnumber":bhoomiobj.applicationnumber,
      "verified":bhoomiobj.verified,
      "issroapproved": bhoomiobj.issroapproved,
      "stamparticlecode": bhoomiobj.stamparticlecode,
      "stampruleid": bhoomiobj.stampruleid,
      "regarticlecode":bhoomiobj.regarticlecode,
      "propertytypeid":bhoomiobj.propertytypeid,
      "noofscanpages": this.feecalculationconst.get('pages').value
    };
  
    this.propmaster[p] = propschedule;
    p++;
  }
  console.log(this.propmaster);
  
  var objFeecal = {
    governmentDuty : 0,
    cessValue : 0,
    surchargeValue : 0,
    scanningFees : 0,
    mutationFees : 0,
    denonationofStampDuty : 0,
    totalRegistrationFees : 0,
  };

  bhoomiobj = this.propertydata[0];
  objFeecal = this.finalfeecalculated;
  console.log(objFeecal);

  // localStorage.setItem('SROCode', (182).toString())
  var stampduty = {
      "documentid": null,
      "feerulecode": 36,
      "isexempted": this.show,
      "exemptdescription": this.exedec,
      "isactive": true,
      "feecalculationstring": "36",
      "srocode": bhoomiobj.srocode,
      "isonline": true,
      "amountrequired": objFeecal.governmentDuty,
      "applicationnumber": bhoomiobj.applicationnumber,
      "propertyid": bhoomiobj.propertyid
    };
  var cessamount = {
      "documentid": null,
      "feerulecode": 59,
      "isexempted": this.show,
      "exemptdescription": this.exedec,
      "isactive": true,
      "feecalculationstring": "59",
      "srocode": bhoomiobj.srocode,
      "isonline": true,
      "amountrequired": objFeecal.cessValue,
      "applicationnumber": bhoomiobj.applicationnumber,
      "propertyid": bhoomiobj.propertyid
    };
  var surchargevalue = {
      "documentid": null,
      "feerulecode": 58,
      "isexempted": this.show,
      "exemptdescription": this.exedec,
      "isactive": true,
      "feecalculationstring": "58",
      "srocode": bhoomiobj.srocode,
      "isonline": true,
      "amountrequired": objFeecal.surchargeValue,
      "applicationnumber": bhoomiobj.applicationnumber,
      "propertyid": bhoomiobj.propertyid
    };
  var scanningfees = {
      "documentid": null,
      "feerulecode": 2,
      "isexempted": this.show,
      "exemptdescription": this.exedec,
      "isactive": true,
      "feecalculationstring": "2",
      "srocode": bhoomiobj.srocode,
      "isonline": true,
      "amountrequired": objFeecal.scanningFees,
      "applicationnumber": bhoomiobj.applicationnumber,
      "propertyid": bhoomiobj.propertyid
    };
  var mutationfees = {
      "documentid": null,
      "feerulecode": 6,
      "isexempted": this.show,
      "exemptdescription": this.exedec,
      "isactive": true,
      "feecalculationstring": "6",
      "srocode":bhoomiobj.srocode,
      "isonline": true,
      "amountrequired": objFeecal.mutationFees,
      "applicationnumber": bhoomiobj.applicationnumber,
      "propertyid": bhoomiobj.propertyid
    };
  var denonationofstampDuty = {
      "documentid": null,
      "feerulecode": 35,
      "isexempted": this.show,
      "exemptdescription": this.exedec,
      "isactive": true,
      "feecalculationstring": "35",
      "srocode": bhoomiobj.srocode,
      "isonline": true,
      "amountrequired": objFeecal.denonationofStampDuty,
      "applicationnumber": bhoomiobj.applicationnumber,
      "propertyid": bhoomiobj.propertyid
    };
  var registrationFees = {
      "documentid": null,
      "feerulecode": 1,
      "isexempted": this.show,
      "exemptdescription": this.exedec,
      "isactive": true,
      "feecalculationstring": "1",
      "srocode": bhoomiobj.srocode,
      "isonline": true,
      "amountrequired": objFeecal.totalRegistrationFees,
      "applicationnumber": bhoomiobj.applicationnumber,
      "propertyid": bhoomiobj.propertyid
    };
    // console.log(stampduty);
    // console.log(cessamount);
    // console.log(surchargevalue);
    // console.log(scanningfees);
    // console.log(mutationfees);
    // console.log(denonationofstampDuty);
    // console.log(registrationFees);

    var thisproperty = [stampduty, cessamount, surchargevalue, scanningfees, mutationfees, denonationofstampDuty, registrationFees]

    this.finalfeecal.push(stampduty);
    this.finalfeecal.push(cessamount);
    this.finalfeecal.push(surchargevalue);
    this.finalfeecal.push(scanningfees);
    this.finalfeecal.push(mutationfees);
    this.finalfeecal.push(denonationofstampDuty);
    this.finalfeecal.push(registrationFees);

    console.log(this.finalfeecal);

    this.kaveriService.SavePropertyMaster(this.propmaster).subscribe(
      (data: any) => {
        debugger;
        console.log(data);
      }, e => {
        if (e.error) {
          debugger;
          this.errorMessage = e.error.error_description;
        }
      }
    )

    this.kaveriService.Savefeecalculationdata(this.finalfeecal).subscribe(
      (data: any) => {
        this.message = "Data Saved Successfully";
        this.showToast();
      }
  )
   this.router.navigate(['/party-details']);
  
}

showToast() {
  debugger;
  notify({
      message: this.message,
      isVisible: true,
      displayTime: 6000,
      height: 50,
      type:"success"

  });
}

//multiproperty:-
Backbuttonclicks(){
   if(this.displaypropertytypeNum == 1){
     return
   }
   else{
     this.displaypropertytypeNum = this.displaypropertytypeNum - 1;
     this.item = this.displaypropertytypeNum - 1;
     if(this.feecalculationMultyobject[this.item] && this.feecalculationMultyobject[this.item] != null){
      this.showtbl = true;
      }
      else{
        this.showtbl = false;
      }
   }


   this.changeprop();

}
frontbuttonclicks(){
  if(this.displaypropertytypeNum == this.numofprop){
    return
  }
  else{
    this.displaypropertytypeNum = this.displaypropertytypeNum + 1;
    this.item = this.displaypropertytypeNum - 1;
    if(this.feecalculationMultyobject[this.item] && this.feecalculationMultyobject[this.item] != null){
    this.showtbl = true;
    }
    else{
      this.showtbl = false;
    }
  }

   this.changeprop();
}

changeprop(){

 debugger;
  this.item = this.displaypropertytypeNum - 1;
  // console.log(this.item);

  if(this.propertydata[this.item] && this.propertydata[this.item] != null ){
    var changebhoomiObject = this.propertydata[this.item];
      if(changebhoomiObject.ismovableproperty == true){
       
        this.isnotmovable = true;
   
        this.disTrict = "";
        this.talUka =  "";
        this.town =  "";
        this.vilLage =  "";

        this.stamparticle = changebhoomiObject.stamparticlecode ;
        this.stamparticledes = changebhoomiObject.articlename;
        this.stampruleid = changebhoomiObject.stampruleid;
        this.stampruledes = changebhoomiObject.stamprulename;
        
        this.marketvalue = 0;

        var feeformobj = {
          "considerationamount": 0
        }
        
        feeformobj.considerationamount = changebhoomiObject.consideration ;
        if(feeformobj != null){
        this.feecalculation.setValue(feeformobj);
    }
  }
    else{
    

    this.disTrict = changebhoomiObject.districtname;
    this.talUka = changebhoomiObject.taluknamee;
    this.town = changebhoomiObject.hoblinamee;
    this.vilLage = changebhoomiObject.villagenamee;

    this.stamparticle = changebhoomiObject.stamparticlecode ;
    this.stamparticledes = changebhoomiObject.articlename;
    this.stampruleid = changebhoomiObject.stampruleid;
    this.stampruledes = changebhoomiObject.stamprulename;
    this.ismovable = !changebhoomiObject.ismovableproperty;
    this.vlgcode = changebhoomiObject.villagecode;
            
    var feeformobj = {
      "considerationamount": 0
    }
    feeformobj.considerationamount = changebhoomiObject.consideration ;
    if(feeformobj != null){
    this.feecalculation.setValue(feeformobj);
  }
    }
  }
    else{
      if(this.feecalculationformobj[this.item]){
        this.feecalculation.setValue(this.feecalculationformobj[this.item]);
      }
    
    }
  if(this.propertydata)
  {
  var temp = this.propertydata[this.item];
  this.marketvalue = temp.marketvalue;
  }
  else{this.marketvalue = 0}

  // this.disTrict = changebhoomiObject.districtname;
  // this.talUka = changebhoomiObject.talukaname;
  // this.town = changebhoomiObject.hobliname;
  // this.vilLage = changebhoomiObject.villagename;
  // var feeobj = {
  //   "governmentDuty" : 0,
  //   "cessValue" : 0,
  //   "surchargeValue" : 0,
  //   "scanningFees" : 0,
  //   "mutationFees" : 0,
  //   "denonationofStampDuty" : 0,
  //   "totalStampDuty" : 0,
  //   "totalRegistrationFees" : 0,
  //   "totalPayableAmount" : 0,
  // }
  // if(this.feedata[this.item] && this.feedata[this.item] != null){
  //   var feecaldata = this.feedata[this.item];
  //   feeobj.governmentDuty = feecaldata.stampduty;
  //   feeobj.cessValue = feecaldata.cess;
  //   feeobj.surchargeValue = feecaldata.surcharge;
  //   feeobj.scanningFees = feecaldata.servicecharge;
  //   feeobj.mutationFees = feecaldata.mutationfee;
  //   feeobj.denonationofStampDuty = feecaldata.deficitstampduty;
  //   feeobj.totalStampDuty = feecaldata.stampduty + feecaldata.cess + feecaldata.surcharge + feecaldata.servicecharge + feecaldata.mutationfee - feecaldata.deficitstampduty;
  //   feeobj.totalRegistrationFees = feecaldata.registrationfee;
  //   feeobj.totalPayableAmount = feeobj.totalStampDuty + feecaldata.registrationfee;
  // }
  // // else{
  // if(this.feecalculationMultyobject[this.item] ){
  //   feeobj = this.feecalculationMultyobject[this.item];
  // }
  // else{}
  // this.governmentduty  = feeobj.governmentDuty
  // this.GovernmentDutyafterExcemption = feeobj.governmentDuty;
  // this.CessValue = feeobj.cessValue;
  // this.SurchargeValue = feeobj.surchargeValue;
  // this.ScanningFees = feeobj.scanningFees;
  // this.MutationFees = feeobj.mutationFees;
  // this.DenonationofStampDuty = feeobj.denonationofStampDuty;
  // this.TotalStampDuty = feeobj.totalStampDuty;
  // this.TotalRegistrationFees = feeobj.totalRegistrationFees;
  // this.TotalPayableAmount = feeobj.totalPayableAmount;
}





  validateform(){

  }

}
