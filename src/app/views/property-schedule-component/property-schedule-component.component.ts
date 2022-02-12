import { Component, OnInit } from '@angular/core';
import { KaveriService } from '../../services/kaveri.service';
import {FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material/tabs';
import notify from "devextreme/ui/notify";
import { BooleanLiteral } from 'typescript';
@Component({
  selector: 'app-property-schedule-component',
  templateUrl: './property-schedule-component.component.html',
  styleUrls: ['./property-schedule-component.component.scss']

})
export class PropertyScheduleComponentComponent implements OnInit {
  disTrict: string = "";
  talUka: string = "";
  town: string = "";
  vilLage: string = "";
  surVey: string = "";
  DescriptionofProperty;
  loggedinUser: string = "";
  submitted = false;
  totalArea;
  easttowest;
  NorthtoSouth;

  PropertyscheduleForm: FormGroup;
  // PropertyscheduleCode:FormGroup;
  PropertyMasterForm: FormGroup;

  errorMessage: string = "";
  ScheduleTypeList: Array<any>;
  UnitsList: Array<any> = [];
  selectedScheduleTypevalue: string = "";
  PropertyTypeId :any;
  propertyscheduleformobj : Array<any> = [];
  propertymasterformobj : Array<any> = [];
  propertymasterbounmultiobj = {
    "easttowest":"",
    "northtosouth":"",
    "East" : "",
    "West" : "",
    "North" : "",
    "South" : ""
  };

  propertyschedulemultiformobj : Array<any> = [];

  // multiproperty>>>>>>>>>>>>>
  displaypropertytypeNum: number = 1;
  scheduletype : string = "A";

  item: number;

  finalpropschedule: Array<any> = [];
  forpropertyscheduleid: Array<any> = [];
  Scheduleover: string;
  scheduledata: Array<any> = [];
  tbldata: Array<any> = [];
  deleteover: string;
  propertydata: Array<any> = [];
  numofprop : number = 0 ;
  applicationnumber = localStorage.getItem('ApplicationData');
  savescheduledata: Array<any> = [];
  unit: string;
  scheduleapidata: Array<any> = [];
  propertymasterboun: Array<any> = [];
  class: string;
  numberofmovableproperty: number;


  constructor(private kaveriService: KaveriService,private formBuilder: FormBuilder,public router: Router) { }
  message;

  ngOnInit(): void {
  debugger;

    this.PropertyMasterForm = this.formBuilder.group({
      easttowest: new FormControl("", Validators.required),
      northtosouth: new FormControl("", Validators.required),
      East: new FormControl("", Validators.required),
      West: new FormControl("", Validators.required),
      North: new FormControl("", Validators.required),
      South: new FormControl("", Validators.required)
    });
    this.PropertyscheduleForm = this.formBuilder.group({
      DescriptionofProperty: new FormControl("", Validators.required)

    });
    this.loggedinUser = localStorage.getItem('loggedinuser');

    // var changeObject = this.propertydata[0];
    // this.PropertyTypeId = changeObject.propertytypeid;
    
    this.Fetchproperty();
    this.FetchSchedule();
    this.changeproperty();
  }
 
  get f() {
    return this.PropertyMasterForm.controls;

  }
  get g() {
    return this.PropertyscheduleForm.controls;

  }
  Fetchproperty(){
    this.item = 0;
    this.kaveriService.GetPropertyMasterData(this.applicationnumber).subscribe(
      (data: any) => {
        console.log(data)
        if(data){
          this.propertydata = data;
          this.numberofmovableproperty = 0;
          var ind = 0;
          var len = this.propertydata.length;
          while(ind<len){
            var temp3 = this.propertydata[ind]
            if(temp3.ismovableproperty == true){
              this.numberofmovableproperty++;
              ind++;
            }
            else{
              ind++;
            }
          }
          this.item = this.displaypropertytypeNum - 1;
          var i = 0;
          var j = 0;
          while(i<this.propertydata.length){
            var temp = this.propertydata[i] 
            if(temp.ismovableproperty && temp.ismovableproperty != null){

            }
            else{
              temp.ismovableproperty = false;
            }
            if(this.propertydata[i].ismovableproperty == true){
              this.propertydata.splice(i, 1); 
              i--;
              j++;
            }
            else{

            }
            i++;
          }
          console.log("propertydatafiltered",this.propertydata)
          this.numofprop = this.propertydata.length;
          var changebhoomiObject = this.propertydata[this.item];

          this.disTrict = changebhoomiObject.districtname;
          this.talUka = changebhoomiObject.taluknamee;
          this.town = changebhoomiObject.hoblinamee;
          this.vilLage = changebhoomiObject.villagenamee;
          this.totalArea = changebhoomiObject.totalarea;
          this.unit = changebhoomiObject.units;
          this.PropertyTypeId = changebhoomiObject.propertytypeid;

          if(this.propertydata){
            var len = this.propertydata.length;
            var i = 0;
            while(i<len){
    
            this.propertymasterbounmultiobj = {
              "easttowest":"",
              "northtosouth":"",
              "East" : "",
              "West" : "",
              "North" : "",
              "South" : ""
              };
            
            
            this.propertymasterbounmultiobj.easttowest = "";
            this.propertymasterbounmultiobj.northtosouth =  "";
            this.propertymasterbounmultiobj.East = this.propertydata[i].eastboundary;
            this.propertymasterbounmultiobj.West = this.propertydata[i].westboundary;
            this.propertymasterbounmultiobj.North = this.propertydata[i].northboundary;
            this.propertymasterbounmultiobj.South = this.propertydata[i].southboundary;
    
            this.propertymasterboun[i] = this.propertymasterbounmultiobj;
    
            i++;
          }
        }
          // this.numberofmovableproperty = j;
          if(this.PropertyTypeId == 17){
            // this.class = "true";
            this.PropertyMasterForm.get('easttowest').disable();
            this.PropertyMasterForm.get('northtosouth').disable();
          }
          else{
            
          }
          console.log("this.class",this.class);
          console.log("changebhoomiObject",changebhoomiObject);
          // console.log("",);
          // console.log("",);
        }

      },e => {

        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }

    )
  }
FetchSchedule(){
  this.kaveriService.GetPropertyScheduledetails(this.applicationnumber).subscribe(
    (data: any) => {
      // console.log(data)
      if(data){

        var index = 0;
        var len = this.propertydata.length;
        var i = 0;
        var schapidata = [];
        while(len > 0){

          if(this.propertydata[i].propertyid == data[index].propertyid ){
            schapidata.push(data[index]);
            if(index < data.length - 1){
              index++;
            }
            else{
              this.scheduleapidata[i] = schapidata;
              schapidata = [];
              break;
            }
          }
          else{

            this.scheduleapidata[i] = schapidata;
            console.log(this.scheduleapidata);
            i++;
            len--;
            schapidata = [];
          }
        }
      }
      if(this.scheduleapidata && this.scheduleapidata != null){
        this.propertyschedulemultiformobj = this.scheduleapidata;
      }
      this.tbldata = this.propertyschedulemultiformobj[0]
      // console.log(this.scheduleapidata);
      if(this.propertydata){
        var len = this.propertydata.length;
        var i = 0;
        while(i<len){

        this.propertymasterbounmultiobj = {
          "easttowest":"",
          "northtosouth":"",
          "East" : "",
          "West" : "",
          "North" : "",
          "South" : ""
          };
        var schedulebound = this.propertyschedulemultiformobj[i];
        index = schedulebound.length -1;
        // console.log(this.propertyschedulemultiformobj)
        // console.log(schedulebound)
        if(!schedulebound[index].easttowest && schedulebound[index].easttowest == null){
          schedulebound[index].easttowest = "";
        }
        if(!schedulebound[index].northtosouth && schedulebound[index].northtosouth == null){
          schedulebound[index].northtosouth = "";
        }
        this.propertymasterbounmultiobj.easttowest = schedulebound[index].easttowest;
        this.propertymasterbounmultiobj.northtosouth =  schedulebound[index].northtosouth;
        this.propertymasterbounmultiobj.East = this.propertydata[i].eastboundary;
        this.propertymasterbounmultiobj.West = this.propertydata[i].westboundary;
        this.propertymasterbounmultiobj.North = this.propertydata[i].northboundary;
        this.propertymasterbounmultiobj.South = this.propertydata[i].southboundary;

        this.propertymasterboun[i] = this.propertymasterbounmultiobj;

        i++;
      }



      if(this.propertymasterboun && this.propertymasterboun != null){

        this.PropertyMasterForm.setValue(this.propertymasterboun[0]);
        console.log(this.propertymasterboun);
        }

        var changeObject = this.propertydata[0];
        this.PropertyTypeId = changeObject.propertytypeid;
    }
    }
    
  )

}

  onSubmit() {
    debugger;
    this.submitted = true;
    if(this.PropertyMasterForm.valid){
    this.item = this.displaypropertytypeNum - 1;
    if(this.propertydata[this.item] && this.propertydata[this.item] != null ){
      var bhoomiobj = this.propertydata[this.item];
    }
    else{
    // var bhoomiobj = this.bhoomiMultyobject[this.item];
    return
    }


    // this.propertyscheduleformobj[this.item] = this.PropertyscheduleForm.value;
    this.propertymasterformobj[this.item] = this.PropertyMasterForm.value;

    debugger;
    console.log(this.propertymasterformobj[this.item] );
    debugger;
    var propschedule = {

      "propertyid": bhoomiobj.propertyid,
      "documentid": 0,
      "villagecode": bhoomiobj.villagecode,
      "regsrocode": bhoomiobj.regsrocode ,
      "srocode":bhoomiobj.srocode,
      "totalarea": bhoomiobj.totalarea,
      "unitid": bhoomiobj.unitid,
      "northboundary":this.PropertyMasterForm.get('North').value?? "",
      "southboundary": this.PropertyMasterForm.get('South').value?? "",
      "eastboundary": this.PropertyMasterForm.get('East').value?? "",
      "westboundary": this.PropertyMasterForm.get('West').value?? "",
      "landmark": bhoomiobj.landmark,
      "marketvalue": bhoomiobj.marketvalue,
      "assessment": bhoomiobj.assessment,
      "sdcalculationstring": bhoomiobj.sdcalculationstring,
      "stampduty":bhoomiobj.stampduty,
      "transferliabilities":bhoomiobj.transferliabilities,
      "consideration":bhoomiobj.consideration,
      "additionalduty":bhoomiobj.additionalduty,
      "cessduty":bhoomiobj.cessduty,
      "govtduty":bhoomiobj.govtduty,
      "isexempted":true,
      "exemptiondescription":bhoomiobj.exemptiondescription,
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
      "noofscanpages": bhoomiobj.noofscanpages,
    };
    if(this.PropertyscheduleForm.get('DescriptionofProperty').value && this.PropertyscheduleForm.get('DescriptionofProperty').value != null){
      this.AddNewSchedule();
    }
    else{
      if( this.propertyschedulemultiformobj.length == 0){
      return;
      }
      else{
        this.submitted = false;
      }
    }

    if(this.propertyschedulemultiformobj[this.item] && this.propertyschedulemultiformobj[this.item] != null ){
      var scheduleobj = this.propertyschedulemultiformobj[this.item];

      if(scheduleobj && scheduleobj != null){
        var scheduleobjA = scheduleobj[0].scheduleid;
      }

    }
    else{
      scheduleobjA = null;
    }
    var tempmobj = this.tbldata;

    if(tempmobj.length > 0){

        this.savescheduledata[this.item] = tempmobj;

    }

    else{

        var scheduleone = {
          "scheduleid": scheduleobjA,
          "propertyid": bhoomiobj.propertyid,
          "srocode": bhoomiobj.srocode,
          "partyid": 7,
          "scheduletype":this.scheduletype,
          "totalarea": bhoomiobj.totalarea,
          "unitid": bhoomiobj.unitid,
          "description": this.PropertyscheduleForm.get('DescriptionofProperty').value?? "",
          "partyids":"Ids",
          "aileniatedauthorityid":true,
          "alieniatedorder": "alien",
          "bhoomisellerpartyids": "Bhoomi",
          "govtrestricorder": "govt",
          "govtrestrictionid": true,
          "landcode": 10,
          "propertygroup": 10,
          "giftshare": 10,
          "giftsharedetails": "gift",
          "easttowest":this.PropertyMasterForm.get('easttowest').value?? "",
          "northtosouth":this.PropertyMasterForm.get('northtosouth').value?? "",
          "blockchainpropertyid": "345",
          "assignedblockchainpid": "453",
          "applicationnumber": bhoomiobj.applicationnumber,
          "verified":bhoomiobj.verified,
          "issroapproved": bhoomiobj.issroapproved
      };

      this.savescheduledata[this.item] = scheduleone;
      console.log("this.savescheduledata",this.savescheduledata)
    }

    this.finalpropschedule[this.item] = propschedule;
    console.log(this.finalpropschedule);


    if(this.displaypropertytypeNum == this.numofprop)
    {
      this.kaveriService.SavePropertyMaster(this.finalpropschedule).subscribe(
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
    var len = this.savescheduledata.length;
    var i = 0;
    var j = 0;
    for(i = 0 ; i< len; i++) {
      var indexlen = this.savescheduledata[i].length;
      var tempobj = this.savescheduledata[i];
      for(j = 0; j<indexlen; j++){
        this.forpropertyscheduleid.push(tempobj[j])
      }
    }

    console.log("this.forpropertyscheduleid",this.forpropertyscheduleid);
    this.kaveriService.SavePropertyScheduleDetail(this.forpropertyscheduleid).subscribe(
      (data: any) => {
        console.log(data);
        var len = data.length;
        var i = 0;
        var l = len-1;
        while(i<len){
          this.forpropertyscheduleid[i].scheduleid = data[l].scheduleId;
          l--;
          i++;
        }

        this.NavigatetotheRelatedproperty();

        console.log(this.forpropertyscheduleid);
      }
    )


    }
  else{

    this.PropertyMasterForm.reset();
    this.PropertyscheduleForm.reset();
    this.frontbuttonclicks();
    this.scheduletype = "A"
    this.Scheduleover = ""
    this.deleteover = "";
    this.submitted = false;



  }
  }
}
  ScheduleType() {
    this.ScheduleTypeList = ["A","B","C","D"]
  }

  Units() {

    this.kaveriService.getUnits().subscribe(
      (data: any) => {
        console.log(data);
        if(data.length != 0) {
          this.UnitsList = data;

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
        type:"success"

    });
}
AddNewSchedule(){
  debugger;
  if(this.PropertyscheduleForm.valid){

  if(this.propertyschedulemultiformobj[this.item]){
    var tempmobj = this.propertyschedulemultiformobj[this.item];
  }
  else{
    tempmobj =[];
  }
  if(tempmobj.length < 4){


    this.item = this.displaypropertytypeNum - 1;

    if(this.propertydata[this.item] && this.propertydata[this.item] != null ){
      var bhoomiobj = this.propertydata[this.item];
    }
    else{
    // var bhoomiobj = this.bhoomiMultyobject[this.item];
    return
    }

    if(this.propertyschedulemultiformobj[this.item] && this.propertyschedulemultiformobj[this.item] != null ){
      var scheduleobj = this.propertyschedulemultiformobj[this.item];


     if(scheduleobj[0] && scheduleobj[0]!= null){ var scheduleobjA =  scheduleobj[0].scheduleid;}
     else{scheduleobjA = null;}

     if(scheduleobj[1] && scheduleobj[1] != null){var scheduleobjB =  scheduleobj[1].scheduleid;}
     else{scheduleobjB = null;}

     if(scheduleobj[2] && scheduleobj[2] != null){var scheduleobjC =  scheduleobj[2].scheduleid;}
     else{scheduleobjC = null;}

     if(scheduleobj[3] && scheduleobj[3] != null){var scheduleobjD =  scheduleobj[3].scheduleid;}
     else{scheduleobjD = null;}

    }
    else{
      scheduleobjA = null;
      scheduleobjB = null;
      scheduleobjC = null;
      scheduleobjD = null;
    }
    if(tempmobj.length == 0){
      this.scheduletype = "A"

      var scheduledata = {
        "scheduleid": scheduleobjA,
        "propertyid": bhoomiobj.propertyid,
        "srocode": bhoomiobj.srocode,
        "partyid": 7,
        "scheduletype":this.scheduletype,
        "totalarea": bhoomiobj.totalarea,
        "unitid": bhoomiobj.unitid,
        "description": this.PropertyscheduleForm.get('DescriptionofProperty').value?? "",
        "partyids":"Ids",
        "aileniatedauthorityid":true,
        "alieniatedorder": "alien",
        "bhoomisellerpartyids": "Bhoomi",
        "govtrestricorder": "govt",
        "govtrestrictionid": true,
        "landcode": 10,
        "propertygroup": 10,
        "giftshare": 10,
        "giftsharedetails": "gift",
        "easttowest":this.PropertyMasterForm.get('easttowest').value?? "",
        "northtosouth":this.PropertyMasterForm.get('northtosouth').value?? "",
        "blockchainpropertyid": "345",
        "assignedblockchainpid": "453",
        "applicationnumber": bhoomiobj.applicationnumber,
        "verified":bhoomiobj.verified,
        "issroapproved": bhoomiobj.issroapproved
      };
      tempmobj.push(scheduledata);
      this.PropertyscheduleForm.reset();
      this.scheduletype = "B"

    }
    else if(tempmobj.length == 1){
      this.scheduletype = "B"

      scheduledata = {
        "scheduleid": scheduleobjB,
        "propertyid": bhoomiobj.propertyid,
        "srocode": bhoomiobj.srocode,
        "partyid": 7,
        "scheduletype":this.scheduletype,
        "totalarea": bhoomiobj.totalarea,
        "unitid": bhoomiobj.unitid,
        "description": this.PropertyscheduleForm.get('DescriptionofProperty').value?? "",
        "partyids":"Ids",
        "aileniatedauthorityid":true,
        "alieniatedorder": "alien",
        "bhoomisellerpartyids": "Bhoomi",
        "govtrestricorder": "govt",
        "govtrestrictionid": true,
        "landcode": 10,
        "propertygroup": 10,
        "giftshare": 10,
        "giftsharedetails": "gift",
        "easttowest":this.PropertyMasterForm.get('easttowest').value?? "",
        "northtosouth":this.PropertyMasterForm.get('northtosouth').value?? "",
        "blockchainpropertyid": "345",
        "assignedblockchainpid": "453",
        "applicationnumber": bhoomiobj.applicationnumber,
        "verified":bhoomiobj.verified,
        "issroapproved": bhoomiobj.issroapproved
      };
      tempmobj.push(scheduledata);
      this.PropertyscheduleForm.reset();
      this.scheduletype = "C"

    }
    else if(tempmobj.length == 2){
      this.scheduletype = "C"

      scheduledata = {
        "scheduleid": scheduleobjC,
        "propertyid": bhoomiobj.propertyid,
        "srocode": bhoomiobj.srocode,
        "partyid":7,
        "scheduletype":this.scheduletype,
        "totalarea": bhoomiobj.totalarea,
        "unitid": bhoomiobj.unitid,
        "description": this.PropertyscheduleForm.get('DescriptionofProperty').value?? "",
        "partyids":"Ids",
        "aileniatedauthorityid":true,
        "alieniatedorder": "alien",
        "bhoomisellerpartyids": "Bhoomi",
        "govtrestricorder": "govt",
        "govtrestrictionid": true,
        "landcode": 10,
        "propertygroup": 10,
        "giftshare": 10,
        "giftsharedetails": "gift",
        "easttowest":this.PropertyMasterForm.get('easttowest').value?? "",
        "northtosouth":this.PropertyMasterForm.get('northtosouth').value?? "",
        "blockchainpropertyid": "345",
        "assignedblockchainpid": "453",
        "applicationnumber": bhoomiobj.applicationnumber,
        "verified":bhoomiobj.verified,
        "issroapproved": bhoomiobj.issroapproved
      };
      tempmobj.push(scheduledata);
      this.PropertyscheduleForm.reset();
      this.scheduletype = "D"


    }
    else if(tempmobj.length == 3){
      this.scheduletype = "D"

      scheduledata = {
        "scheduleid": scheduleobjD,
        "propertyid": bhoomiobj.propertyid,
        "srocode": bhoomiobj.srocode,
        "partyid": 7,
        "scheduletype":this.scheduletype,
        "totalarea": bhoomiobj.totalarea,
        "unitid": bhoomiobj.unitid,
        "description": this.PropertyscheduleForm.get('DescriptionofProperty').value?? "",
        "partyids": "Ids",
        "aileniatedauthorityid":true,
        "alieniatedorder": "alien",
        "bhoomisellerpartyids": "Bhoomi",
        "govtrestricorder": "govt",
        "govtrestrictionid": true,
        "landcode": 10,
        "propertygroup": 10,
        "giftshare": 10,
        "giftsharedetails": "gift",
        "easttowest":this.PropertyMasterForm.get('easttowest').value?? "",
        "northtosouth":this.PropertyMasterForm.get('northtosouth').value?? "",
        "blockchainpropertyid": "345",
        "assignedblockchainpid": "453",
        "applicationnumber": bhoomiobj.applicationnumber,
        "verified":bhoomiobj.verified,
        "issroapproved": bhoomiobj.issroapproved

      };
      tempmobj.push(scheduledata);
      this.PropertyscheduleForm.reset();

    }
    this.tbldata = tempmobj;
    this.propertyschedulemultiformobj[this.item] = tempmobj  ;
    console.log(this.propertyschedulemultiformobj);


  }
  else{
    this.Scheduleover = "Cannot Add More Schedule"
  }
}
}

//multiproperty:-
//multiproperty:-
Backbuttonclicks(){
  if(this.displaypropertytypeNum == 1){
    return
  }
  else{
    this.displaypropertytypeNum = this.displaypropertytypeNum - 1;
  }

 this.changeproperty();
}
frontbuttonclicks(){
 if(this.displaypropertytypeNum == this.numofprop){
   return
 }
 else{
   this.displaypropertytypeNum = this.displaypropertytypeNum + 1;
 }

 this.changeproperty();
}
changeproperty(){
  debugger;
  this.item = this.displaypropertytypeNum - 1;

  if(this.propertydata[this.item] && this.propertydata[this.item] != null ){
    var changebhoomiObject = this.propertydata[this.item];

    this.disTrict = changebhoomiObject.districtname;
    this.talUka = changebhoomiObject.taluknamee;
    this.town = changebhoomiObject.hoblinamee;
    this.vilLage = changebhoomiObject.villagenamee;
    this.totalArea = changebhoomiObject.totalarea;
    this.unit = changebhoomiObject.units;
    this.PropertyTypeId = changebhoomiObject.propertytypeid;
    if(this.PropertyTypeId == 17){
      // this.class = "true";
      this.PropertyMasterForm.get('easttowest').disable();
      this.PropertyMasterForm.get('northtosouth').disable();
    }
    else{
      this.PropertyMasterForm.get('easttowest').enable();
      this.PropertyMasterForm.get('northtosouth').enable();
    }


  }
  else{
    // if(this.bhoomiMultyobject[this.item] && this.bhoomiMultyobject[this.item] != null ){
    //   var changebhoomiObject = this.bhoomiMultyobject[this.item];

    // }
  }

  // this.disTrict = changebhoomiObject.districtname;
  // this.talUka = changebhoomiObject.talukaname;
  // this.town = changebhoomiObject.hobliname;
  // this.vilLage = changebhoomiObject.villagename;


  if(this.propertymasterboun[this.item] && this.propertymasterboun[this.item] != null){

    this.PropertyMasterForm.setValue(this.propertymasterboun[this.item]);
    console.log(this.propertymasterboun);
    }
    else{
      this.PropertyMasterForm.reset();
    }


  if(this.propertyschedulemultiformobj[this.item])
  {
    this.tbldata = this.propertyschedulemultiformobj[this.item];
    console.log(this.tbldata);
  }
  else{
    this.tbldata = [];
  }

  if(this.tbldata.length == 0){
    this.scheduletype = "A"
  }
  if(this.tbldata.length == 1){
    this.scheduletype = "B"
  }
  if(this.tbldata.length == 2){
    this.scheduletype = "C"
  }
  if(this.tbldata.length == 3){
    this.scheduletype = "D"
  }

  if(this.finalpropschedule[this.item]){
    var changepropertyschedule = this.finalpropschedule[this.item]
  }
  else{

  }


}
deletelast(){
  this.item = this.displaypropertytypeNum - 1;
  this.tbldata = this.propertyschedulemultiformobj[this.item] ;
  debugger;
  var index = this.tbldata.length - 1;
  console.log(this.tbldata[index]);
  
  if(this.tbldata[index].scheduleid && this.tbldata[index].scheduleid != null){
    var scheduleid = this.tbldata[index].scheduleid
    var schedule = {
      "scheduleid" : scheduleid 
    }
    this.kaveriService.Deletepropertyschedule(schedule).subscribe(
      (data: any) => {
        
      })
  }
  this.tbldata.pop();
  this.changeproperty();
  this.Scheduleover = ""
  if(this.tbldata.length == 0){
  this.deleteover = "No schedules to delete";
  }
  else{
    this.deleteover = "";
  }
}

validations(){

}

NavigatetotheRelatedproperty(){
if(this.PropertyTypeId == 17){
  this.router.navigate(['/market-valuation']);
}else{
  this.router.navigate(['/market-valuation-NonAgri']);
}
}
}
