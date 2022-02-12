import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { KaveriService } from '../../services/kaveri.service';
import { MovableService } from '../../services/movable.service';
@Component({
  selector: 'app-miscellaneous-fee-calculation',
  templateUrl: './miscellaneous-fee-calculation.component.html',
  styleUrls: ['./miscellaneous-fee-calculation.component.scss']
})
export class MiscellaneousFeeCalculationComponent implements OnInit {
  feecalculationexem =  new FormGroup({
    checkbox: new FormControl("", Validators.required),
    percentage: new FormControl("", Validators.required),
    inpercentageorrupee: new FormControl("", Validators.required),
    exemptiondecription: new FormControl("", Validators.required),
    file: new FormControl("", Validators.required),

  });

  feecalculation =  new FormGroup({
    considerationamount: new FormControl("", Validators.required),
    denonation: new FormControl("", Validators.required),
    pages: new FormControl("", Validators.required)
  });
  mutatoinfee:number;
  scanningrate:number;
  governmentduty: number = 0;
  submitted = false;
  considerationvalue : number = 0;
  applicationnumber:any;
  propertydata:any;
  numofprop:any;
  item:number = 0;
  stamparticle:any
  stamparticledes:any;
  stampruleid:any;
  stampruledes:any;
  displaypropertytypeNum: number ;
  feedata : Array<any> = [];
  isslabcheck : object ;
  feecalculationformobj : Array<any> = [];
  amount: number = 0;
  feecalculationobject = {
    governmentDuty : 0,
    cessValue : 0,
    surchargeValue : 0,
    scanningFees : 0,
    mutationFees : 0,
    denonationofStampDuty : 0,
    totalStampDuty : 0,
    totalRegistrationFees : 0,
    totalPayableAmount : 0,
  }
  GovernmentDutyafterExcemption : number ;
  SurchargeValue : number ;
  CessValue : number ;
  ScanningFees : number ;
  MutationFees : number ;
  DenonationofStampDuty : number ;
  TotalStampDuty : number ;
  TotalRegistrationFees : number;
  TotalPayableAmount : number;
  feecalculationMultyobject : Array<any> = []
  showtbl: boolean = false ;
  considerationamount: number = 0;
  denonation: number = 0;
  pages: number = 0;
  show: boolean;
  isVisible: boolean;
  type:string;
  loggedinUser: string;
  message: string;
  constructor(private kaveriService: KaveriService,private movableService: MovableService) { }

  ngOnInit(): void {
    this.loggedinUser = localStorage.getItem('loggedinuser');

    this.applicationnumber = localStorage.getItem("ApplicationData");
    this.getfeerate();
    this.getpropertydata();
    this.displaypropertytypeNum = 1;
   // this.getregiontype();
  }
  getfeerate() {
    this.kaveriService.getfeerate().subscribe(
      (data: any) => {
        console.log(data);
        if(data.length != 0) {
        this.scanningrate = data[0].value;
        this.mutatoinfee = data[1].value;
        console.log(data[0].value);
        console.log(this.mutatoinfee);
        }
      }
    )
  }

  // getregiontype() {
  //   this.kaveriService.getregiontype(this.vlgcode).subscribe(
  //     (data: any) => {
  //       console.log(data);
  //       if(data.length != 0) {
  //       this.regiontype = data.regionname ;
  //       }
  //     }
  //   )
  // }
  get f() {
    return this.feecalculation.controls;
  }
  getpropertydata(){
    var applicationdetails:any ={
      "applicationnumber":this.applicationnumber
    }
    this.movableService.FetchMiscellaneousPropertiesDetails(applicationdetails).subscribe(
      (data: any) => {
        console.log((data))
        if(data){

          this.propertydata = data;
          this.numofprop = this.propertydata.length;

          if(this.propertydata[this.item] && this.propertydata[this.item] != null ){
          var changebhoomiObject = this.propertydata[this.item];


          this.stamparticle = changebhoomiObject.stamparticlecode ;
          this.stamparticledes = changebhoomiObject.articlename;
          this.stampruleid = changebhoomiObject.stampruleid;
          this.stampruledes = changebhoomiObject.stamprulename;
          
          var feeformobj = {
            "considerationamount": 0,
            "denonation": 0,
            "pages": 0
          }
         feeformobj.considerationamount = changebhoomiObject.consideration ;
         feeformobj.denonation = changebhoomiObject.additionalduty ;
         feeformobj.pages = changebhoomiObject.noofscanpages ;
          console.log("feeformobj",feeformobj);
         this.feecalculation.setValue(feeformobj);

         }
        }

      }
    )
  }
  oncalculate(){
    this.submitted = true;
    this.item = this.displaypropertytypeNum - 1;
    console.log(this.item);
  
  
  
    if(this.propertydata[this.item] && this.propertydata[this.item] != null ){
      var formula = this.propertydata[this.item];
    }
    else{
      // if(this.bhoomiMultyobject[this.item].SubArticle[0] && this.bhoomiMultyobject[this.item].SubArticle[0] != null ){
      // var formula =  this.bhoomiMultyobject[this.item].SubArticle[0];
      // }
      // else{
  
      // }
    }
  
  
    this.considerationvalue = this.feecalculation.get('considerationamount').value;

    if(this.feecalculation.valid)
    {
      var isfixduty = formula.isfixduty;
      console.log(isfixduty);
      var isslabs = formula.isslabs;
      console.log(isslabs);
      var value = formula.value;
      var ispersentage = formula.isinpercentage;
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
            this.amount = this.considerationvalue;
          var i = 0;
          while(this.isslabcheck[i] != null){
            if(this.amount < this.isslabcheck[i].slabamtto){
              this.governmentduty = (this.amount * (this.isslabcheck[i]/this.isslabcheck[i].unit)) + this.isslabcheck[i].plusthisamount;
              break;
            }
            else if(this.isslabcheck[i].slabamtto == -1){
              this.governmentduty = (this.amount * (this.isslabcheck[i]/this.isslabcheck[i].unit)) + this.isslabcheck[i].plusthisamount;
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
        else if(isslabs == true){
  
        }
      }
      else{
        this.governmentduty = 0;
      }
      console.log(this.governmentduty);
  
      var regispersent = formula.regispercent;
      var regvalue = formula.regvalue ;
      var regminlimit = formula.regminlimit ;
      var regmaxlimit = formula.regmaxlimit ;
      // Regestration Amount:---
      if(regispersent == true){
  
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
      else{
        regamount = regvalue;
      }
  
      var issurcharge = formula.issurcharge ;
      var isurban = Boolean(localStorage.getItem("isurban"));
      var ruralvalue = formula.urbanvalue ;
      var urbanvalue = formula.ruralvalue;
  
  
  
      // Scanning Fee:---
      if(this.feecalculation.get('pages').value != 0)
      {
        var pages = this.feecalculation.get('pages').value + 2;
        var scanningamount = this.scanningrate * pages;
      }
      else{
        var scanningamount = 0;
      }
  
      
     }
  
     this.feecalculationformobj[this.item] = this.feecalculation.value;
  
        this.feecalculationobject = {
          "governmentDuty" : 0,
          "cessValue" : 0,
          "surchargeValue" : 0,
          "scanningFees" : 0,
          "mutationFees" : 0,
          "denonationofStampDuty" : 0,
          "totalStampDuty" : 0,
          "totalRegistrationFees" : 0,
          "totalPayableAmount" : 0,
          }
  
          this.GovernmentDutyafterExcemption = this.governmentduty;
          
          // this.SurchargeValue = surchargeamount;
          this.ScanningFees = scanningamount;
          // this.MutationFees = mutationamount;
          this.DenonationofStampDuty = this.feecalculation.get('denonation').value;
          this.TotalStampDuty = this.GovernmentDutyafterExcemption + this.ScanningFees - this.DenonationofStampDuty;
          this.TotalRegistrationFees = regamount;
          this.TotalPayableAmount = this.TotalStampDuty + regamount;
  
          this.feecalculationobject.governmentDuty = this.GovernmentDutyafterExcemption;
          this.feecalculationobject.scanningFees = this.ScanningFees;
          this.feecalculationobject.denonationofStampDuty = this.DenonationofStampDuty;
          this.feecalculationobject.totalStampDuty = this.TotalStampDuty;
          this.feecalculationobject.totalRegistrationFees = this.TotalRegistrationFees;
          this.feecalculationobject.totalPayableAmount = this.TotalPayableAmount;
  
          // this.item = this.displaypropertytypeNum - 1;
  
          this.feecalculationMultyobject[this.item] = this.feecalculationobject;
  
          console.log(this.feecalculationMultyobject);
  
  
          // localStorage.setItem("GovernmentDuty",this.GovernmentDutyafterExcemption.toString());
          // localStorage.setItem("CessValue",this.CessValue.toString());
          // localStorage.setItem("SurchargeValue",this.SurchargeValue.toString());
          // localStorage.setItem("ScanningFees",this.ScanningFees.toString());
          // localStorage.setItem("MutationFees",this.MutationFees.toString());
          // localStorage.setItem("DenonationofStampDuty",this.DenonationofStampDuty.toString());
          // localStorage.setItem("TotalStampDuty",this.TotalStampDuty.toString());
          // localStorage.setItem("TotalRegistrationFees",this.TotalRegistrationFees.toString());
          // localStorage.setItem("TotalPayableAmount",this.TotalPayableAmount.toString());
  
          this.showtbl = true;
    }
  

}
