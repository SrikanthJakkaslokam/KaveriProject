import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { KaveriService } from '../../services/kaveri.service';
import {MatRadioModule} from '@angular/material/radio';
@Component({
  selector: 'app-bhoomi-search',
  templateUrl: './bhoomi-search.component.html',
  styleUrls: ['./bhoomi-search.component.scss']
})
export class BhoomiSearchComponent implements OnInit {
 
  // bhumiForm = new FormGroup({
  //   district: new FormControl("", Validators.required),
  //   taluka: new FormControl("", Validators.required),
  //   hobli: new FormControl("", Validators.required),
  //   village: new FormControl("", Validators.required),
  //   surveyno: new FormControl("", Validators.required)
  // });
  bhumiForm: FormGroup;
  bhoomicode: FormGroup;
  dataSource: any[];
  BhoomiOwners: any[];
  popupVisible = false;
  bhumipopupVisible = false;
  positionOf: string;
  errorMessage: string = "";
  selecteddistvalue: string = "";
  selectedtalukvalue: string = "";
  selectedhoblivalue: string = "";
  selectedvillagevalue: string = "";
  extentselectdvale: String = "";
  loggedinUser: string = "";
  submitted = false;
  selectedroadvalue;
  distmodel: boolean = false;
  talukmodel: boolean = false;
  hoblimodel: boolean = false;
  villagemodel: boolean = false;
isArray:any=false;
hissano:any=[];
  disTrict: string = "";
  talUka: string = "";
  town: string = "";
  vilLage: string = "";
  surVey: string = "";
  extent: string = "";
  isSketchNo: boolean = false;
  propertymaster:any=[];
  districtList: Array<any> = [];
  talukaList: Array<any> = [];
  hobliList: Array<any> = [];
  villageList: Array<any> = [];
  hissaList: Array<any> = [];
  roadList: Array<any> = [];
  multiOwnersdata: Array<any> = [];
  test: any;
  testone: any;
  courttest: any;
  courttestone: any;
  courtorder: any[] = [];
  multiCourtOrderdata: Array<any> = [];
  bhoomiData:any = [];
  DummyDatasurvayno:any; 
  isPropertySelected:any=false;
  enableSearch:any=false;
  surnoc: string;
  mojniData: any={};
  sketchNo: string;
  survayNo:any=null;
  constructor(public router: Router, private kaveriService: KaveriService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
this.DummyDatasurvayno =
  {
    "bhoomi_surveyno": {
        "surveynodetails": {
            "surveyno": [
                {
                    "districtcode": "21",
                    "hissano": "1",
                    "hoblicode": "1",
                    "landcode": "1",
                    "noofowners": "1",
                    "restriction": "N",
                    "restrictiondescription": null,
                    "restrictiontype": null,
                    "surnoc": "*",
                    "surveyno": "1",
                    "talukacode": "1",
                    "villagecode": "1",
                    "villageexemptedfromsketch": "N"
                },
                {
                    "districtcode": "21",
                    "hissano": "2",
                    "hoblicode": "1",
                    "landcode": "2",
                    "noofowners": "1",
                    "restriction": "N",
                    "restrictiondescription": null,
                    "restrictiontype": null,
                    "surnoc": "*",
                    "surveyno": "1",
                    "talukacode": "1",
                    "villagecode": "1",
                    "villageexemptedfromsketch": "N"
                },
                {
                    "districtcode": "21",
                    "hissano": "3",
                    "hoblicode": "1",
                    "landcode": "3",
                    "noofowners": "1",
                    "restriction": "N",
                    "restrictiondescription": null,
                    "restrictiontype": null,
                    "surnoc": "*",
                    "surveyno": "1",
                    "talukacode": "1",
                    "villagecode": "1",
                    "villageexemptedfromsketch": "N"
                },
                {
                    "districtcode": "21",
                    "hissano": "5",
                    "hoblicode": "1",
                    "landcode": "1249",
                    "noofowners": "1",
                    "restriction": "N",
                    "restrictiondescription": null,
                    "restrictiontype": null,
                    "surnoc": "*",
                    "surveyno": "1",
                    "talukacode": "1",
                    "villagecode": "1",
                    "villageexemptedfromsketch": "N"
                },
                {
                    "districtcode": "21",
                    "hissano": "6",
                    "hoblicode": "1",
                    "landcode": "1250",
                    "noofowners": "1",
                    "restriction": "N",
                    "restrictiondescription": null,
                    "restrictiontype": null,
                    "surnoc": "*",
                    "surveyno": "1",
                    "talukacode": "1",
                    "villagecode": "1",
                    "villageexemptedfromsketch": "N"
                },
                {
                    "districtcode": "21",
                    "hissano": "7",
                    "hoblicode": "1",
                    "landcode": "1251",
                    "noofowners": "1",
                    "restriction": "N",
                    "restrictiondescription": null,
                    "restrictiontype": null,
                    "surnoc": "*",
                    "surveyno": "1",
                    "talukacode": "1",
                    "villagecode": "1",
                    "villageexemptedfromsketch": "N"
                },
                {
                    "districtcode": "21",
                    "hissano": "8",
                    "hoblicode": "1",
                    "landcode": "1252",
                    "noofowners": "1",
                    "restriction": "N",
                    "restrictiondescription": null,
                    "restrictiontype": null,
                    "surnoc": "*",
                    "surveyno": "1",
                    "talukacode": "1",
                    "villagecode": "1",
                    "villageexemptedfromsketch": "N"
                }
            ]
        }
    }
  }


    this.bhumiForm = this.formBuilder.group({
      district: ["", Validators.required],
      taluka: ["", Validators.required],
      hobli: ["", Validators.required],
      village: ["", Validators.required],
      surveyno: ["", Validators.required],
      hissno: ["", Validators.required],
      extent: [""],
      hissa: [""],
      esketch: [""],
      Roadcode: [""],
      road: [""],
      hissavalue: [""],

    });
    this.bhoomicode = this.formBuilder.group({
      bhoomitalukcode: ["", Validators.required],

    })

    // this.gethissaList();
    this.District();
    
    localStorage.removeItem('multiOwnersdata')
    this.loggedinUser = localStorage.getItem('loggedinuser');
    if(localStorage.getItem('multiOwnersdata') && localStorage.getItem('multiOwnersdata').length==0){
      localStorage.setItem('multiOwnersdata', JSON.stringify(this.multiOwnersdata));
    }
    this.multiOwnersdata = JSON.parse(localStorage.getItem('multiOwnersdata'))

  }
  get f() {
    return this.bhumiForm.controls;
  }
  showInfo() {
    this.popupVisible = true;
  }
  getSketchNo($event){
    this.sketchNo=$event.target.value;
    
  }
  showbhumiInfo() {
    this.bhumipopupVisible = true;
  }
  handleChange(e) {
    this.isPropertySelected=true;
    var owner = e.target.value;
    this.multiOwnersdata=this.multiOwnersdata.filter((elem)=>{ return elem.ownerno==owner})
    // console.log("target-->",target.value);
    
  }
  // onSubmit() { }
  GetSurvayNoist() {
    debugger

    // console.log(this.bhumiForm);
    localStorage.setItem('Roadcode', this.bhumiForm.get("road").value);

    var bhoomi = {
      "districtCode": parseInt(localStorage.getItem('bhoomiDistrictCode')),
      "talukCode": parseInt(localStorage.getItem('bhoomitalukcode')),
      "hobliCode": parseInt(localStorage.getItem('bhoomihoblicode')),
      "villageCode": parseInt(localStorage.getItem('bhoomivillagecode')),
      "surveyNo": parseInt(this.bhumiForm.get("surveyno").value, 10),
      //"hissaNo": parseInt(localStorage.getItem('hissno')),

    };
    localStorage.setItem('districtname', this.disTrict);
    localStorage.setItem('talukaname', this.talUka);
    localStorage.setItem('hobliname', this.town);
    localStorage.setItem('villagename', this.vilLage);
    localStorage.setItem('surveynumber', this.bhumiForm.get("surveyno").value);
    localStorage.setItem('BhoomiCodeDetails', JSON.stringify(bhoomi));

    // var villagecodejson = JSON.parse(localStorage.getItem('indexvillage')) ;
    // localStorage.setItem("villagecode",villagecodejson['villagecode']);



    console.log(JSON.stringify(bhoomi));
    this.kaveriService.bhoomisearch(bhoomi).subscribe(
      (data: any) => {
       
        
        this.survayNo=data['surveyno'];
        data = data['bhoomi_surveyno'];
        data = data['surveynodetails'];
        data = data['surveyno'];
        if(data && data.length){
          this.survayNo=data[0].surveyno;        
        }
        const filterdata = this.filterrowdata(data);
        this.dataSource = [...filterdata];
        this.hissaList = data;
        
        if(this.hissaList && this.hissaList.length){
          if(this.hissaList[0].noofowners==1){
            this.isArray=false
          }else{
            this.isArray=true
          }
        }
        // console.log(this.hissaList);
        localStorage.setItem('LocalhissaList', JSON.stringify(this.hissaList));
        // console.log(this.hissaList)
        // localStorage.setitem('gethissano',this.dataSource);

        // this.dataSource= JSON.parse(localStorage.getItem('gethissano'));
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
  }
  continueSearch(){
    if(this.sketchNo && this.sketchNo!=""){
      let propschedule = {
        "propertyid": null,
        "documentid": 1,
        "villagecode": localStorage.getItem("villagecode"),
        "regsrocode": 0,
        // "srocode": previousData[i].SROCode,
        "srocode": localStorage.getItem("SROCode"),
        "totalarea": Number(localStorage.getItem("TotalArea")),
        "unitid": 1,
        "northboundary": "",
        "southboundary": "",
        "eastboundary": "",
        "westboundary":"",
        "landmark": "",
        "marketvalue": 0,
        "assessment": "",
        "sdcalculationstring": "",
        "stampduty":0,
        "transferliabilities": 0,
        "consideration": 0,
        "additionalduty": 0,
        "cessduty": 0,
        "govtduty": 0,
        "isexempted": false,
        "exemptiondescription": "",
        "ismovableproperty":false,
        "sdrefund": 0,
        "docmarketvalue": 0,
        "valid1": 0,
        "isimdemnified": false,
        "restriction": "",
        "restrictiontype": "NA",
        "restrictiondescription": "NA",
        "enumber": "enumber",
        "claimingblocknumber": "C",
        "retainingblocknumber": "R",
        "valuationreport": "valution",
        "loanpurposeid": 10,
        "applicationnumber": localStorage.getItem('ApplicationData'),
        "verified": true,
        "issroapproved": "E",
         "stamparticlecode": null,
        //"stamparticlecode": 4,
         "stampruleid": null,
        //"stampruleid":1
        "regarticlecode":null,
        "propertytypeid": localStorage.getItem("PropertyTypeid"),
        "noofscanpages": 0,
        "roadcode": this.bhumiForm.get("road").value,
        "propertynumberdetails":[{
          "propertyid": null,
          "srocode": localStorage.getItem("SROCode"),
          "currentpropertytypeid": 1,
          "currentnumber": this.mojniData[0].PreMutationSketch.Transferor.LandBlock.SurveyNo+this.mojniData[0].PreMutationSketch.Transferor.LandBlock.Surnoc+this.mojniData[0].PreMutationSketch.Transferor.LandBlock.Hissano,
          "survey_no":this.mojniData && this.mojniData[0].PreMutationSketch?this.mojniData[0].PreMutationSketch.Transferor.LandBlock.SurveyNo:"-",
          "hissa_no": this.mojniData[0].PreMutationSketch.Transferor.LandBlock.Hissano
        }
        ] 
      };
      // console.log(propschedule)
      this.propertymaster.push(propschedule);
      this.kaveriService.SavePropertyScheduleMaster(this.propertymaster).subscribe(
        (propertySaveSuccess: any) => {
          
          let propertyId=propertySaveSuccess[0].propertyId
          let partyInfoData:any=[
            {
              "partyid": null,
              "srocode": localStorage.getItem("SROCode"),
              "documentid": 2,
              "partytypeid": 2,
              "firstname": this.mojniData[0].PreMutationSketch.Transferor.Name,
              "middlename": "",
              "lastname": "",
              "address": "",
              "age": "",
              "sex": 1,
              "isexecutor": true,
              "ispresenter": false,
              "admissiondate": "2021-11-19T11:28:40.553Z",
              "aliasname": "",
              "correctedname": "",
              "relationship": this.mojniData[0].PreMutationSketch.Transferor.Relationship,
              "relativename": this.mojniData[0].PreMutationSketch.Transferor.Relativename,
              "epic": "",
              "pan": "",
              "phonenumber": "",
              "availableextacre": this.mojniData[0].PreMutationSketch.Transferor.LandBlock.Ext_acre,
              "availableextgunta": this.mojniData[0].PreMutationSketch.Transferor.LandBlock.Ext_gunta,
              "availableextfgunta": "1",
              "bincom": "",
              "category": this.mojniData[0].PreMutationSketch.Transferor.Ownercategory,
              "dateofdeath": "2021-11-19T11:28:40.553Z",
              "fingerid": 10,
              "fingerverificationstatusid": 10,
              "ispartofrtc": true,
              "landcode":this.mojniData[0].PreMutationSketch.Transferor.LandBlock["land_code"],
              "mainownerno": null,
              "ownerno": null,
              "partypoa": "party",
              "photopath": "path",
              "poaadmission": 10,
              "poapresentation": 10,
              "primaryseller": true,
              "profession": null,
              "restriction": "",
              "restrictiondescription": "",
              "restrictiontype": "",
              "section88exemption": true,
              "thumbmatchfailedreasonid": 10,
              "thumbminutiae": null,
              "thumbpath": "thum",
              "totalextacre": 0,
              "totalextgunta": 0,
              "totalextfgunta": 0,
              "transactextacre": null,
              "transactextgunta": null,
              "transactextfgunta": null,
              "volumename": "volume",
              "hasgpa": true,
              "isaua": true,
              "importedpartyparentid": 10,
              "salutationid": 1,
              "isorganization": false,
              "organizationid":null,
              "applicationnumber": localStorage.getItem('ApplicationData'),
              "verified": true,
              "issroapproved": "E",
              "districtcode": this.mojniData[0].PreMutationSketch.Transferor.LandBlock["district_code"],
              "talukcode":this.mojniData[0].PreMutationSketch.Transferor.LandBlock["taluka_code"],
              "hoblicode": this.mojniData[0].PreMutationSketch.Transferor.LandBlock["hobli_code"],
              "villagecode": this.mojniData[0].PreMutationSketch.Transferor.LandBlock["village_code"],
              "tanno": "tt",
              "yearofincorp": 1780,
              "orgpoaauthsignfname": null,
              "orgpoaauthsignmname":null,
              "orgpoaauthsignlname": null,
              "linkpartyid": null,
              "housenumber": "12",
              "pin": 12,
              "propertyid": propertyId
            }
          ]
          // console.log("partyInfo-->",JSON.stringify(partyInfoData));
          
          this.kaveriService.SavePartyInfoData(partyInfoData).subscribe(
            (partySaveSuccess: any) => {
               this.router.navigate(['kaveri-result'])
              
            }, e => {
              if (e.error) {
                this.errorMessage = e.error.error_description;
              }
            }
          )
        }, e => {
          if (e.error) {
            debugger;
            this.errorMessage = e.error.error_description;
          }
        }
      )
    }else{
    let propschedule = {
      "propertyid": null,
      "documentid": 1,
      "villagecode": localStorage.getItem("villagecode"),
      "regsrocode": 0,
      // "srocode": previousData[i].SROCode,
      "srocode": localStorage.getItem("SROCode"),
      "totalarea": Number(localStorage.getItem("TotalArea")),
      "unitid": 1,
      "northboundary": "",
      "southboundary": "",
      "eastboundary": "",
      "westboundary":"",
      "landmark": "",
      "marketvalue": 0,
      "assessment": "",
      "sdcalculationstring": "",
      "stampduty":0,
      "transferliabilities": 0,
      "consideration": 0,
      "additionalduty": 0,
      "cessduty": 0,
      "govtduty": 0,
      "isexempted": false,
      "exemptiondescription": "",
      "ismovableproperty":false,
      "sdrefund": 0,
      "docmarketvalue": 0,
      "valid1": 0,
      "isimdemnified": false,
      "restriction": this.multiOwnersdata[0].restriction?this.multiOwnersdata[0].restriction:"",
      "restrictiontype": this.multiOwnersdata[0].restrictiontype?this.multiOwnersdata[0].restrictiontype:"NA",
      "restrictiondescription": this.multiOwnersdata[0].restrictiontype?this.multiOwnersdata[0].restrictiontype:"NA",
      "enumber": this.multiOwnersdata[0].enumber?this.multiOwnersdata[0].enumber:"enumber",
      "claimingblocknumber": this.multiOwnersdata[0].claimingblocknumber?this.multiOwnersdata[0].claimingblocknumber:"C",
      "retainingblocknumber": this.multiOwnersdata[0].retainingblocknumber?this.multiOwnersdata[0].retainingblocknumber:"R",
      "valuationreport": this.multiOwnersdata[0].valuationreport?this.multiOwnersdata[0].valuationreport:"valution",
      "loanpurposeid": this.multiOwnersdata[0].loanpurposeid?this.multiOwnersdata[0].loanpurposeid:10,
      "applicationnumber": localStorage.getItem('ApplicationData'),
      "verified": this.multiOwnersdata[0].verified?this.multiOwnersdata[0].verified:true,
      "issroapproved": this.multiOwnersdata[0].issroapproved?this.multiOwnersdata[0].issroapproved:"E",
       "stamparticlecode": null,
      //"stamparticlecode": 4,
       "stampruleid": null,
      //"stampruleid":1
      "regarticlecode":null,
      "propertytypeid": localStorage.getItem("PropertyTypeid"),
      "noofscanpages": 0,
      "movablepropertydesc":null,
      "roadcode": this.bhumiForm.get("road").value,
      "propertynumberdetails":[{
        "propertyid": null,
        "srocode": localStorage.getItem("SROCode"),
        "currentpropertytypeid": 1,
        "currentnumber": this.bhumiForm.get("surveyno").value+this.surnoc+localStorage.getItem("selectedHissa"),
        "survey_no":Number(this.bhumiForm.get("surveyno").value),
        "hissa_no": localStorage.getItem("selectedHissa")
      }
      ] 
    };
    // console.log(propschedule)
    this.propertymaster.push(propschedule);
    this.kaveriService.SavePropertyScheduleMaster(this.propertymaster).subscribe(
      (propertySaveSuccess: any) => {
        let propertyId=propertySaveSuccess[0].propertyId
        let partyInfoData:any=[
          {
            "partyid": null,
            "srocode": localStorage.getItem("SROCode"),
            "documentid": 2,
            "partytypeid": 2,
            "firstname": this.multiOwnersdata[0].owner?this.multiOwnersdata[0].owner:"",
            "middlename": "",
            "lastname": "",
            "address": "",
            "age": "",
            "sex": 1,
            "isexecutor": true,
            "ispresenter": false,
            "admissiondate": "2021-11-19T11:28:40.553Z",
            "aliasname": "",
            "correctedname": "",
            "relationship": this.multiOwnersdata[0].relationship?this.multiOwnersdata[0].relationship:"",
            "relativename": this.multiOwnersdata[0].relativename?this.multiOwnersdata[0].relativename:"",
            "epic": "",
            "pan": "",
            "phonenumber": "",
            "availableextacre": this.multiOwnersdata[0].availableextents?parseInt(this.multiOwnersdata[0].availableextents.avl_ext_acre):0,
            "availableextgunta": this.multiOwnersdata[0].availableextents?parseInt(this.multiOwnersdata[0].availableextents.avl_ext_gunta):0,
            "availableextfgunta": this.multiOwnersdata[0].availableextents?parseInt(this.multiOwnersdata[0].availableextents.avl_ext_fgunta):0,
            "bincom": this.multiOwnersdata[0].bincom?this.multiOwnersdata[0].bincom:"",
            "category": this.multiOwnersdata[0].category?this.multiOwnersdata[0].category:"",
            "dateofdeath": "2021-11-19T11:28:40.553Z",
            "fingerid": 10,
            "fingerverificationstatusid": 10,
            "ispartofrtc": true,
            "landcode":this.multiOwnersdata[0].landcode?this.multiOwnersdata[0].landcode:"",
            "mainownerno": this.multiOwnersdata[0].mainownerno?this.multiOwnersdata[0].mainownerno:"",
            "ownerno": this.multiOwnersdata[0].ownerno?this.multiOwnersdata[0].ownerno:"",
            "partypoa": "party",
            "photopath": "path",
            "poaadmission": 10,
            "poapresentation": 10,
            "primaryseller": true,
            "profession": null,
            "restriction": this.multiOwnersdata[0].restriction?this.multiOwnersdata[0].restriction:"",
            "restrictiondescription": this.multiOwnersdata[0].restrictiondescription?this.multiOwnersdata[0].restrictiondescription:"",
            "restrictiontype": this.multiOwnersdata[0].restrictiontype?this.multiOwnersdata[0].restrictiontype:"",
            "section88exemption": true,
            "thumbmatchfailedreasonid": 10,
            "thumbminutiae": null,
            "thumbpath": "thum",
            "totalextacre": this.multiOwnersdata[0].totalextents?parseInt(this.multiOwnersdata[0].totalextents.ext_acre):0,
            "totalextgunta": this.multiOwnersdata[0].totalextents?parseInt(this.multiOwnersdata[0].totalextents.ext_gunta):0,
            "totalextfgunta": this.multiOwnersdata[0].totalextents?parseInt(this.multiOwnersdata[0].totalextents.ext_fgunta):0,
            "transactextacre": null,
            "transactextgunta": null,
            "transactextfgunta": null,
            "volumename": "volume",
            "hasgpa": true,
            "isaua": true,
            "importedpartyparentid": 10,
            "salutationid": 1,
            "isorganization": false,
            "organizationid":null,
            "applicationnumber": localStorage.getItem('ApplicationData'),
            "verified": true,
            "issroapproved": "E",
            "districtcode": this.multiOwnersdata[0].districtcode?this.multiOwnersdata[0].districtcode:"",
            "talukcode":this.multiOwnersdata[0].talukacode?this.multiOwnersdata[0].talukacode:"",
            "hoblicode": this.multiOwnersdata[0].hoblicode?this.multiOwnersdata[0].hoblicode:"",
            "villagecode": this.multiOwnersdata[0].villagecode?this.multiOwnersdata[0].villagecode:"",
            "tanno": "tt",
            "yearofincorp": 1780,
            "orgpoaauthsignfname": null,
            "orgpoaauthsignmname":null,
            "orgpoaauthsignlname": null,
            "linkpartyid": null,
            "housenumber": "12",
            "pin": 12,
            "propertyid": propertyId
          }
        ]
        // console.log("partyInfo-->",JSON.stringify(partyInfoData));
        
        this.kaveriService.SavePartyInfoData(partyInfoData).subscribe(
          (partySaveSuccess: any) => {
             this.router.navigate(['kaveri-result'])
            
          }, e => {
            if (e.error) {
              debugger;
              this.errorMessage = e.error.error_description;
            }
          }
        )
      }, e => {
        if (e.error) {
          debugger;
          this.errorMessage = e.error.error_description;
        }
      }
    )
  }
    // let searchData=JSON.parse(localStorage.getItem("multiOwnersdata"));
    // let courtData=JSON.parse(localStorage.getItem('courtNewData'));
    // console.log("courtData-->",courtData);
    // if(courtData!=null){
    //   searchData[0].courtData=courtData[0];
    // }
  
    // searchData[0].districtname=localStorage.getItem("districtname");
    // searchData[0].talukaname=localStorage.getItem("talukaname"); 
    // searchData[0].hobliname=localStorage.getItem("hobliname");
    // searchData[0].villagename=localStorage.getItem("villagename");
    // searchData[0].surveynumber=localStorage.getItem("surveynumber");
    // searchData[0].SROCode=localStorage.getItem("SROCode");
    // searchData[0].TotalArea=localStorage.getItem("TotalArea");
    // searchData[0].PropertyTypeid=localStorage.getItem("PropertyTypeid");
    // searchData[0].RoadCode=localStorage.getItem("Roadcode");
    // searchData[0].VillageCodeK=localStorage.getItem("villagecode");
    // searchData[0].RegSROCode=0;
    // if(localStorage.getItem("kaveriResult") && localStorage.getItem("kaveriResult").length!=0){
    //   console.log("inside If-->");
    //   let prevData=JSON.parse(localStorage.getItem("kaveriResult"));
    //   if(JSON.stringify(prevData[0])!==JSON.stringify(searchData[0])){
    //     let kaveriData=JSON.parse(localStorage.getItem("kaveriResult"));
    //     kaveriData.push(searchData[0]);
    //     localStorage.setItem("kaveriResult",JSON.stringify(kaveriData))
    //   }
      
    // }else{
    //   console.log("inside else-->");
    //   localStorage.setItem("kaveriResult",JSON.stringify(searchData));
    // }
    
      // console.log("searchData--->",searchData);
    // this.router.navigate(['kaveri-result'])
  }
  GetBhoomiOwners() {
    if(this.sketchNo && this.sketchNo!=""){
      var sketchNumber = {
        sketchNumber: "21010415523696001"
  
      };
  
      this.kaveriService.MojiniSearch(sketchNumber).subscribe(
        (data: any) => {
          this.mojniData=[data];

          // console.log("mojniData-->",this.mojniData[0].PreMutationSketch)
      //  console.log("mojniData-->",this.mojniData.PreMutationSketch.PMSnumber);
       
         
        }, e => {
          if (e.error) {
            this.errorMessage = e.error.error_description;
          }
  
        }
      )
    }else{
      console.log(JSON.stringify(this.bhoomiData));
      
      this.multiOwnersdata=this.bhoomiData;
      this.TotalAria();
    }
 
    // 
    //  this.submitted = true;
    //   if (this.bhumiForm.invalid) {
    //     return;
    // }
    // if (this.bhumiForm.valid) {
    //   this.router.navigateByUrl('/bhoomi-search-result');
    // }
//     localStorage.setItem('esketch', this.bhumiForm.get("esketch").value);
//     localStorage.setItem('surveyno', this.bhumiForm.get("surveyno").value);
//     localStorage.setItem('hissa', this.bhumiForm.get("hissa").value);
//     // localStorage.setItem('hissano', this.bhumiForm.get("hissa").value);

//     var esketch = this.bhumiForm.get("esketch").value;
//     localStorage.setItem('sketchNumber', this.bhumiForm.get("esketch").value);
//     if (esketch !== "" && esketch !== undefined) {
//       this.router.navigate(['/mojini-esketch']);
//     }
//     else {
//       // if( parseInt(this.bhumiForm.get("surveyno").value, 10)==1)
//       // {
//       var bhoomi = {
//         "districtCode": parseInt(localStorage.getItem('bhoomiDistrictCode')),
//         "talukCode": parseInt(localStorage.getItem('bhoomitalukcode')),
//         "hobliCode": parseInt(localStorage.getItem('bhoomihoblicode')),
//         "villageCode": parseInt(localStorage.getItem('bhoomivillagecode')),
//         "surveyNo": parseInt(this.bhumiForm.get("surveyno").value, 10),
//         "landCode": localStorage.getItem('landCode'),

//       };
// console.log("bhoomi-->",bhoomi);

//       this.kaveriService.getOwners(bhoomi).subscribe(
//         (data: any) => {
//           console.log("data-->",data);
//           if(data && data.bhoomi_survey_owners && data.bhoomi_survey_owners.surveynodetails.surveyno){
            
//             this.bhoomiData=data.bhoomi_survey_owners.surveynodetails.surveyno;
//           }
//           data = data['bhoomi_survey_owners'];
//           data = data['surveynodetails'];
//           data = data['surveyno'];
//           this.testone = data;

//           this.test = JSON.stringify(data);
          
          
//           if (data["availableextents"] === undefined) {
//             console.log("available");
            
//             this.isSketchNo = true;
//           }
//           // else {
//             console.log("available else");
//             data = this.test;

//             // const filterdata = this.filterrowdata(data);
//             this.testone['HissaNo'] = localStorage.getItem('hissano');
//             this.testone['SurveyNo'] = localStorage.getItem('surveynumber');

//             let singledata = this.testone
//             this.BhoomiOwners = [];
//             this.BhoomiOwners.push(singledata);
//             this.multiOwnersdata=[];
//             this.multiOwnersdata=this.bhoomiData
//             // this.multiOwnersdata.push(singledata);
//             console.log("this.multiOwnersdata->",this.multiOwnersdata);
//             localStorage.setItem('BhoomiOwnersList', JSON.stringify(this.BhoomiOwners));
//             if(localStorage.getItem('multiOwnersdata') && localStorage.getItem('multiOwnersdata').length!=0){
//               localStorage.removeItem('multiOwnersdata')
//             }
//             localStorage.setItem('multiOwnersdata', JSON.stringify(this.multiOwnersdata));
//             // this.TotalAria();
//             var acrs = this.BhoomiOwners
//           // }
//         }, e => {
//           if (e.error) {
//             this.errorMessage = e.error.error_description;
//           }

//         }
//       )
//       // }
//     }
  }

  courtOrderD() {
    
    var court = {

      "SROCode": parseInt(localStorage.getItem('SROCode')),
      "surveyNo": parseInt(localStorage.getItem('surveyno')),
      "hissano": localStorage.getItem('hissano')
    };
    // console.log(JSON.stringify(court));

    this.kaveriService.courtorder(court).subscribe(
      (data: any) => {
        
        // console.log(data);
        localStorage.setItem("courtNewData",JSON.stringify(data));
        this.courtorder = data;
        const filterdata = this.filterrowdataSLNO(data);
        this.courtorder = [...filterdata];
        this.multiCourtOrderdata = [...(this.courtorder)];
        this.multiCourtOrderdata.push(this.courtorder);
        // console.log("this.multiCourtOrderdata-->",this.multiCourtOrderdata);
        
        localStorage.setItem('multiCourtdata', JSON.stringify(this.multiCourtOrderdata));

        //test
        
        // this.courttestone = data;

        // this.courttest = JSON.stringify(data);
        // data = this.courttest;
        // let singledata = this.testone
        // this.courtorder = [];
        // this.courtorder.push(singledata);
        // this.multiCourtOrderdata.push(singledata);
        // localStorage.setItem('BhoomiOwnersList', JSON.stringify(this.courtorder));
        // localStorage.setItem('multiCourtdata', JSON.stringify(this.multiCourtOrderdata));

        //localStorage.setItem("SROCode",data[0].sroCode);
    
      }, e => {
        if (e.error) {
          
          this.errorMessage = e.error.error_description;
        }
      }
    )
  }
  TotalAria() {
    debugger;
    // var Acre = JSON.parse(localStorage.getItem('BhoomiOwnersList'));
    var Acre = this.multiOwnersdata;
    var acr = parseInt(Acre[0].availableextents.avl_ext_acre);
    var gunta = parseInt(Acre[0].availableextents.avl_ext_gunta);
    var fgunta = parseInt(Acre[0].availableextents.avl_ext_fgunta);


    localStorage.setItem('acr', acr.toString());
    localStorage.setItem('gunta', gunta.toString());
    localStorage.setItem('fgunta', fgunta.toString());
    var guntatoAcre = gunta / 40
    var fractionofgunta=fgunta/16
    var fguntatoAcr=fractionofgunta/40
    guntatoAcre=fguntatoAcr+guntatoAcre;
    acr = guntatoAcre + acr;
    localStorage.setItem('TotalArea', acr.toString());


  }
  ondistrictChange($event) {
    if ($event != "") {
      let text1 = $event.target.options[$event.target.options.selectedIndex].text;
      this.disTrict = text1;
    }
  }
  ontalukaChange($event) {

    if ($event != "") {
      let text2 = $event.target.options[$event.target.options.selectedIndex].text;
      this.talUka = text2;
    }
  }

  hissavalue: any;
  onhissachange($event) {
    var selectedHissa = $event.target.value;
    
    this.hissano = this.hissaList.filter((res) => { return res.hissano == selectedHissa });
    localStorage.setItem("landCode",this.hissano[0].landcode);
    // console.log('hissano[0]----->',hissano[0]);
    this.surnoc = this.hissano[0].surnoc;
    if(this.hissano[0] && this.hissano[0].restrictiontype && this.hissano[0].restrictiontype=="PY"){
      this.isSketchNo=true;
    }
    
    var bhoomi = {
      "districtCode": parseInt(localStorage.getItem('bhoomiDistrictCode')),
      "talukCode": parseInt(localStorage.getItem('bhoomitalukcode')),
      "hobliCode": parseInt(localStorage.getItem('bhoomihoblicode')),
      "villageCode": parseInt(localStorage.getItem('bhoomivillagecode')),
      "surveyNo": parseInt(this.bhumiForm.get("surveyno").value, 10),
      "landCode": localStorage.getItem('landCode'),

    };
    localStorage.setItem("selectedHissa",selectedHissa);
// console.log("bhoomi-->",bhoomi);

    this.kaveriService.getOwners(bhoomi).subscribe(
      (data: any) => {
        
        if(data && data.bhoomi_survey_owners && data.bhoomi_survey_owners.surveynodetails.surveyno){
          
          this.bhoomiData=data.bhoomi_survey_owners.surveynodetails.surveyno;
          // console.log("this.bhoomiData-->",this.bhoomiData);
          if(this.bhoomiData && this.bhoomiData.length ){
            // console.log("bhoomiData if-->");
            // this.bhoomiData.forEach(element => {
            //   if(element.noofowner == 1){
                
            //   }
        
            // });
          }else{
            this.bhoomiData=[this.bhoomiData]
            // console.log("bhoomiData else-->");
          }
          this.enableSearch=true;
        }
       
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }

      }
    )
    // var restriction = hissano[0].restriction;
    // var restrictiontype = hissano[0].restrictiontype;
    // var description = hissano[0].restrictiondescription;
    // localStorage.setItem('restriction', hissano[0].restriction);
    // localStorage.setItem('restrictiontype', hissano[0].restrictiontype);
    // localStorage.setItem('description', hissano[0].description);
    // localStorage.setItem('landCode', hissano[0].landcode);
    // localStorage.setItem('hissano', hissano[0].hissano);
    // localStorage.setItem('noofowners', hissano[0].noofowners);

    // var WhetherPyKI;
    // var screenRestriction;
    // if (restriction == "Y" && restrictiontype == "PY" && description == "PyKi RTC") {
    //   WhetherPyKI = "Y";
    //   screenRestriction = "N";
    // }
    // else if (restriction == "N" && restrictiontype == null && description == null) {
    //   // this.isSketchNo = true;
    //   WhetherPyKI = "N";
    //   screenRestriction = "Y";
    // }
    // else if (restriction == "Y" && restrictiontype == null && description == null) {
    //   // this.isSketchNo = true;
    //   WhetherPyKI = "N";
    //   screenRestriction = "Y";
    // }
    // if (WhetherPyKI == "Y" || screenRestriction == "Y") {
    //   this.isSketchNo = true;
    // }
    // else {
    //   this.isSketchNo = false;
    // }
    // console.log(JSON.stringify(this.hissavalue));
    // localStorage.setItem('LocalhissaList', JSON.stringify(this.hissaList));

    // var selected= localStorage.getItem('LocalhissaList',hissano);
  }
  onhobliChange($event) {
    if ($event != "") {
      let text3 = $event.target.options[$event.target.options.selectedIndex].text;
      // console.log("========hobli code ", this.hobliList);
      this.town = text3;
      this.hobliList.forEach(element => {
        if (element.hoblinamee == this.town) {

          localStorage.setItem("bhoomihoblicode", element.bhoomihoblicode);
          localStorage.setItem("hobliname", element.hoblinamee);
        }

      });
    }
  }
  onvillageChange($event) {
    
    if ($event != "") {
      let text4 = $event.target.options[$event.target.options.selectedIndex].text;
      // console.log("========hobli code ", this.villageList);

      this.vilLage = text4;
      this.villageList.forEach(element => {
        if (element.villagenamee == this.vilLage) {

          localStorage.setItem("bhoomiDistrictCode", element.bhoomiDistrictCode);
          localStorage.setItem("bhoomitalukcode", element.bhoomitalukcode);
          localStorage.setItem("bhoomivillagecode", element.bhoomivillagecode);
          localStorage.setItem("villagecode", element.villagecode);
          localStorage.setItem("villagename", element.villagenamee);

        }

      });
    }
  }
  
  District() {

    this.kaveriService.district().subscribe(
      (data: any) => {
        // console.log(data);
        if (data.length != 0) {
          this.districtList = data;
          if (this.bhumiForm.get("district").value != 0) {
            this.Taluka();
          }
        }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
  }

  ondistrictValuechange(distValue) {
    this.talukaList = [];
    this.hobliList = [];
    this.selectedhoblivalue = "";
    this.villageList = [];
    this.roadList = [];
    this.selecteddistvalue = distValue;
    if (this.bhumiForm.get("district").value != 0) {
      
      this.Taluka();
    }
  }

  Taluka() {
    
    var taluk = {
      "districtCode": this.selecteddistvalue,
    };
    // console.log(JSON.stringify(taluk))
    if (taluk != undefined) {
      this.kaveriService.taluka(taluk).subscribe(
        (data: any) => {
          // console.log(data);
          if (data.length != 0) {
            this.selectedtalukvalue = this.bhumiForm.get("taluka").value;
            this.talukaList = data;
            if (this.bhumiForm.get("taluka").value != 0) {
              this.Hobli();
            }
          }
        }, e => {
          if (e.error) {
            this.errorMessage = e.error.error_description;
          }
        }
      )
    }
  }

  ontalukValuechange(talukValue) {
    this.hobliList = [];
    this.selectedhoblivalue = "";
    this.villageList = [];
    this.roadList = [];
    this.selectedtalukvalue = talukValue;
    if (this.bhumiForm.get("taluka").value != 0) {
      this.Hobli();
    }
  }

  Hobli() {
    var hoblireq = {
      "talukaCode": this.selectedtalukvalue,
    };
    if (hoblireq != undefined) {
      this.kaveriService.hobli(hoblireq).subscribe(
        (data: any) => {
          // console.log(data);
          if (data.length != 0) {
            this.hobliList = data;
            this.selectedhoblivalue = this.bhumiForm.get("hobli").value;
            // if(this.bhumiForm.get("hobli").value != 0) {
            // this.Village();
            // }
          }
        }, e => {
          if (e.error) {
            this.errorMessage = e.error.error_description;
          }
        }
      )
    }
  }

  onhobliValuechange(hobliValue) {
    this.villageList = [];
    this.roadList = [];
    this.selectedhoblivalue = hobliValue;
    if (this.bhumiForm.get("hobli").value != 0) {
      this.Village();
    }
  }

  Village() {
    var index = {
      "hobliCode": this.selectedhoblivalue,
    };
    if (index != undefined) {
      this.kaveriService.village(index).subscribe(
        (data: any) => {
          // console.log(data);
          if (data.length != 0) {
            this.villageList = data;
          }
        }, e => {
          if (e.error) {
            this.errorMessage = e.error.error_description;
          }
        }
      )
    }


  }


  onExtentChange(extentvalue) {
    this.enableSearch=true;
    // console.log(this.bhumiForm.get("extent").value);
    var extents = this.bhumiForm.get("extent").value;
    if (extents == "Full Extent") {
      this.isSketchNo = false;
    }
    else {
      this.isSketchNo = true;
    }
  }

  getRoadDetails($event) {
    
    if ($event != "") {
      let text4 = $event.target.options[$event.target.options.selectedIndex].text;
      // console.log("========hobli code ", this.villageList);

      this.vilLage = text4;
      this.villageList.forEach(element => {
        if (element.villagenamee == this.vilLage) {

          localStorage.setItem("bhoomiDistrictCode", element.bhoomiDistrictCode);
          localStorage.setItem("bhoomitalukcode", element.bhoomitalukcode);
          localStorage.setItem("bhoomivillagecode", element.bhoomivillagecode);
          localStorage.setItem("villagecode", element.villagecode);
          localStorage.setItem("villagename", element.villagenamee);
          localStorage.setItem("SROCode", element.sroCode);
          localStorage.setItem("isurban", element.isurban);
          localStorage.setItem('Roadcode', this.bhumiForm.get("road").value);
        }

      });
    }
    var villageCode = {
      "villageCode": this.bhumiForm.get("village").value,
    };
    if (villageCode != undefined) {
      this.kaveriService.road(villageCode).subscribe(
        (data: any) => {
          // console.log(data);
          if (data.length != 0) {
            this.roadList = data;

          }
        }, e => {
          if (e.error) {
            this.errorMessage = e.error.error_description;
          }
        }
      )
    }
  }

  // gethissaList() {

  //   var serveyno = {
  //     "surveyno": this.bhumiForm.get("surveyno").value,
  //   };
  //   if (serveyno != undefined) {
  //     this.kaveriService.hissa(serveyno).subscribe(
  //       (data: any) => {
  //         console.log(data);
  //         if (data.length != 0) {
  //           this.hissaList = data;

  //         }
  //       }, e => {
  //         if (e.error) {
  //           this.errorMessage = e.error.error_description;
  //         }
  //       }
  //     )
  //   }
  // }
  // filterrowdata(data) {
  //   data.forEach((currentValue, index) => {
  //     if (currentValue.restriction == "Y" && currentValue.restrictiontype  == "PY") {
  //       currentValue.restrictiondescription = "PyKi RTC";
  //       // console.log(currentValue.restrictiondescription);
  //     }
  //     if (currentValue.restriction == "N" && currentValue.restrictiontype == null) {
  //       currentValue.restrictiondescription = null;
  //     }
  //   });
  //   return data;
  // }

  filterrowdata(data) {
    data.forEach((currentValue, index) => {
      // localStorage.setItem('landCode', currentValue.landcode);
      if (currentValue.restriction == "Y" && currentValue.restrictiontype == "PY") {
        // currentValue.restrictiondescription = "Y";
        // console.log(currentValue.restrictiondescription);
      }
      // else currentValue.restrictiondescription = "N";
    });
    return data;
  }
  filterrowdataSLNO(data) {
    data.forEach((currentValue, index) => {

      currentValue.sno = index + 1;
    });
    return data;
  }

  fitercodes() {

  }
}
