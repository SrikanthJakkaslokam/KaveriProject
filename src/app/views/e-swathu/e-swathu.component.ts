import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { KaveriService } from '../../services/kaveri.service';
import jspdf from 'jspdf';  
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-e-swathu',
  templateUrl: './e-swathu.component.html',
  styleUrls: ['./e-swathu.component.scss']
})
export class ESwathuComponent implements OnInit {

  eswathuForm = new FormGroup({
    pid: new FormControl("", Validators.required),
  });

  kaveriForm: FormGroup;
  popupVisible = false;
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
  courtorder:any=[];
  disTrict: string = "";
  talUka: string = "";
  town: string = "";
  vilLage: string = "";
  surVey: string = "";
  extent: string = "";
  isSketchNo: boolean = false;
  propertyIdNumber: string = "";
  districtList: Array<any> = [];
  talukaList: Array<any> = [];
  hobliList: Array<any> = [];
  villageList: Array<any> = [];
  hissaList: Array<any> = [];
  roadList: Array<any> = [];
  multiOwnersdata: Array<any> = [];
  test: any;
  testone: any;
  propertyData: any=[];
  propertyLength:any=[{index:1}];
  selectedProperty:any=[];
  pdf: any;
  eswathudata: any=[];
  easthiApiData: any={};
  obj:any={};
  isPidNo:any=false;
  swathupdfData:any=false;
  propertymaster:any=[];
  eswathuresponse:any={};
  Ownersdetails: any = [{
    "sno": "1",
    "ownername": "",
    "propertyid": "",
    "propertydescription": "",
    "buyername": "",
    "dateoftransaction": ""
  }];
  constructor(public router: Router, private kaveriService: KaveriService,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loggedinUser = localStorage.getItem('loggedinuser');
    this.kaveriForm = this.formBuilder.group({
      district: ["", Validators.required],
      taluka: ["", Validators.required],
      hobli: ["", Validators.required],
      village: ["", Validators.required],
      pid: ["", Validators.required],
      Roadcode: [""],
      road: [""],

    });
    // this.kaveriForm = new FormGroup({
    //   pid: new FormControl("", Validators.required),
    // });
    this.District();
  }
  District(){
    this.kaveriService.district().subscribe(
      (data: any) => {
        console.log(data);
        if (data.length != 0) {
          this.districtList = data;
          if (this.kaveriForm.get("district").value != 0) {
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

    this.selecteddistvalue = distValue;
    if (this.kaveriForm.get("district").value != 0) {
      this.Taluka();
    }
  }
  checkPidNumber():any{
    this.isPidNo=true;
  }
  Taluka() {
    var taluk = {
      "districtCode": this.selecteddistvalue,
    };
    console.log(JSON.stringify(taluk))
    if (taluk != undefined) {
      this.kaveriService.taluka(taluk).subscribe(
        (data: any) => {
          console.log(data);
          if (data.length != 0) {
            this.selectedtalukvalue = this.kaveriForm.get("taluka").value;
            this.talukaList = data;
            if (this.kaveriForm.get("taluka").value != 0) {
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
  get f(){
    return this.kaveriForm.controls; 
  }
  ontalukValuechange(talukValue) {

    this.selectedtalukvalue = talukValue;
    if (this.kaveriForm.get("taluka").value != 0) {
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
          console.log(data);
          if (data.length != 0) {
            this.hobliList = data;
            this.selectedhoblivalue = this.kaveriForm.get("hobli").value;
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
    debugger;
    this.selectedhoblivalue = hobliValue;
    if (this.kaveriForm.get("hobli").value != 0) {
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
          console.log(data);
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
  getRoadDetails($event) {
    debugger;
    if ($event != "") {
      let text4 = $event.target.options[$event.target.options.selectedIndex].text;
      console.log("========hobli code ", this.villageList);

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
          localStorage.setItem('Roadcode', this.kaveriForm.get("road").value);
        }

      });
    }
    var villageCode = {
      "villageCode": this.kaveriForm.get("village").value,
    };
    if (villageCode != undefined) {
      this.kaveriService.road(villageCode).subscribe(
        (data: any) => {
          console.log(data);
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


  onhobliChange($event) {
    if ($event != "") {
      let text3 = $event.target.options[$event.target.options.selectedIndex].text;
      console.log("========hobli code ", this.hobliList);
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
    debugger;
    if ($event != "") {
      let text4 = $event.target.options[$event.target.options.selectedIndex].text;
      console.log("========hobli code ", this.villageList);

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
  showInfo() {
    this.popupVisible = true;
}
continueSearch():any{
  // console.log("eswathudata-->",this.eswathudata);
  // console.log("this.selectedProperty-->",this.selectedProperty);
  let propschedule = {
    "propertyid": null,
    "documentid": 1,
    "villagecode": this.kaveriForm.get("village").value,
    "regsrocode": 1,
    // "srocode": previousData[i].SROCode,
    "srocode": 1,
    "totalarea": this.easthiApiData.propertydetails.eswathuresponse.propertymain.sitearea,
    "unitid": 4,
    "northboundary": this.easthiApiData.propertydetails.eswathuresponse.propertymain.checkbandi_north,
    "southboundary": this.easthiApiData.propertydetails.eswathuresponse.propertymain.checkbandi_south,
    "eastboundary": this.easthiApiData.propertydetails.eswathuresponse.propertymain.checkbandi_east,
    "westboundary":this.easthiApiData.propertydetails.eswathuresponse.propertymain.checkbandi_west,
    "landmark": this.easthiApiData.propertydetails.eswathuresponse.propertymain.propertyclassification,
    "marketvalue": 0,
    "assessment": this.easthiApiData.propertydetails.eswathuresponse.propertymain.propertyid,
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
    "propertytypeid": 28,
    "noofscanpages": 0,
    "movablepropertydesc":null,
    "roadcode": this.kaveriForm.get("road").value,
    "propertynumberdetails":this.selectedProperty,
    // "propertynumberdetails":[{
    //   "propertyid": null,
    //   "srocode": 1,
    //   "currentpropertytypeid": 1,
    //   "currentnumber": this.mojniData[0].PreMutationSketch.Transferor.LandBlock.SurveyNo+this.mojniData[0].PreMutationSketch.Transferor.LandBlock.Surnoc+this.mojniData[0].PreMutationSketch.Transferor.LandBlock.Hissano,
    //   "survey_no":1,
    //   "hissa_no": 1
    // }
    // ] 
  };
  // console.log("propschedule",JSON.stringify(propschedule));
  this.propertymaster.push(propschedule);
  this.kaveriService.SavePropertyScheduleMaster(this.propertymaster).subscribe(
    (propertySaveSuccess: any) => {
      // console.log("propertySaveSuccess-->",propertySaveSuccess);
      
      let propertyId=propertySaveSuccess[0].propertyId
      let partyInfoData:any=[
        {
          "partyid": null,
          "srocode": 1,
          "documentid": 2,
          "partytypeid": 2,
          "firstname": this.easthiApiData.propertydetails.eswathuresponse.owners.owner.ownername,
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
          "relationship": "",
          "relativename": "",
          "epic": "",
          "pan": "",
          "phonenumber": "",
          "availableextacre": "0",
          "availableextgunta": "0",
          "availableextfgunta": "0",
          "bincom": "",
          "category": this.easthiApiData.propertydetails.eswathuresponse.propertymain.propertycategory,
          "dateofdeath": "2021-11-19T11:28:40.553Z",
          "fingerid": 10,
          "fingerverificationstatusid": 10,
          "ispartofrtc": true,
          "landcode":"0",
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
          "districtcode": this.kaveriForm.get("district").value,
          "talukcode":this.kaveriForm.get("taluka").value,
          "hoblicode": this.kaveriForm.get("hobli").value,
          "villagecode": this.kaveriForm.get("village").value,
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
  
}
  addMore():any{
  this.obj={};
  if(this.selectedProperty && this.selectedProperty.length && this.selectedProperty.length==this.propertyLength.length){
    this.propertyLength.push({index:this.propertyLength.length+1});
  }else{

  }
  
}
onKeyup($event,i):any{
  this.obj.propertyid=null;
  this.obj.srocode=1;
  this.obj.currentnumber=$event.target.value;
  this.obj.survey_no=1;
  this.obj.hissa_no="1";
  this.selectedProperty.push(this.obj);
  this.obj={};
}
onProperNumberTypeChange($event,i):any{
  this.obj={};
 if ($event != "") {
   this.obj.index=i;
   this.obj.propertNumberName= $event.target.options[$event.target.options.selectedIndex].text;
   this.obj.currentpropertytypeid= $event.target.value;
   // this.obj.propertNumber= $event.target.value;
  //  console.log("obj-->",this.obj);
   
   // this.selectedProperty.push(obj)
   // kaveriData[index].selectedSubArticle=text1;
  }
 
}
deleteRow(index):any{
  if(this.propertyLength.length!=1){

    // console.log("index-->",index);
    this.selectedProperty.splice(index,1)
    this.propertyLength.splice(index,1)
  }
}
async onSubmit() {
  this.selectedProperty=[];
  this.propertyIdNumber = this.kaveriForm.get("pid").value;
  this.PropertyDocView();
  this.viewProperty();
  this.getProperNumbers();
  this.loggedinUser = localStorage.getItem('loggedinuser');
  // this.Test(this.pdf);
  // this.swathupdfData=true;
 //await this.courtOrderD();
  // console.log(this.kaveriForm);
  // district: ["", Validators.required],
  //     taluka: ["", Validators.required],
  //     hobli: ["", Validators.required],
  //     village: ["", Validators.required],
  //     pid: ["", Validators.required],
  //     Roadcode: [""],
  //     road: [""],
 //   let storageCourt=JSON.parse(localStorage.getItem("courtData"));

  // if(storageCourt && storageCourt.length){
  //   storageCourt[0].disTrictName=this.disTrict;
  //   storageCourt[0].talUkaName=this.talUka;
  //   storageCourt[0].townName=this.town;
  //   storageCourt[0].villageName=this.vilLage;
  //   storageCourt[0].disTrict=this.kaveriForm.get("district").value;
  //   storageCourt[0].talUka=this.kaveriForm.get("taluka").value;
  //   storageCourt[0].town=this.kaveriForm.get("hobli").value;
  //   storageCourt[0].village=this.kaveriForm.get("village").value;
  //   storageCourt[0].pid=this.kaveriForm.get("pid").value;
  //   storageCourt[0].Roadcode=this.kaveriForm.get("Roadcode").value;
  //   storageCourt[0].road=this.kaveriForm.get("road").value;
  //   storageCourt[0].RegSROCode=0;
  //   storageCourt[0].SROCode=localStorage.getItem("SROCode");
  //   if(prevAgr && prevAgr.length){
  //     prevAgr.push(storageCourt[0])
  //     localStorage.setItem("nonAgriculture",JSON.stringify(prevAgr))
  //   }else{
  //     localStorage.setItem("nonAgriculture",JSON.stringify(storageCourt))
  //   }
    
  // }else{
  //   let prevAgr=JSON.parse(localStorage.getItem("nonAgriculture"));
  //   let obj :any={};
  //   obj.disTrictName=this.disTrict;
  //   obj.talUkaName=this.talUka;
  //   obj.townName=this.town;
  //   obj.villageName=this.vilLage;
  //   obj.disTrict=this.kaveriForm.get("district").value;
  //   obj.talUka=this.kaveriForm.get("taluka").value;
  //   obj.town=this.kaveriForm.get("hobli").value;
  //   obj.village = this.kaveriForm.get("village").value;
  //   obj.pid=this.kaveriForm.get("pid").value;
  //   //obj.Roadcode=this.kaveriForm.get("Roadcode").value;
  //   obj.Roadcode = this.kaveriForm.get("road").value;
  //   localStorage.setItem('NonagriRoadcode', this.kaveriForm.get("road").value);
  //   obj.RegSROCode = 0;
  //  // obj.SROCode = localStorage.getItem("SROCode");
  //   obj.SROCode = this.SroCode;
  //   obj.villagecode = this.kaveriForm.get("village").value;
  //   console.log(obj)
  //   if(prevAgr && prevAgr.length){
  //     prevAgr.push(obj)
  //     localStorage.setItem("nonAgriculture",JSON.stringify(prevAgr))
  //   }else{
  //     localStorage.setItem("nonAgriculture",JSON.stringify([obj]))
  //   }
    
 // }
  // let searchedData=[...this.courtorder,...data];
  // var aasthi = {
  //   "propertyId": this.kaveriForm.get("pid").value,
  // };
  // localStorage.setItem('propertyid', this.kaveriForm.get("pid").value);
  // this.kaveriService.eaasthi(aasthi).subscribe(
  //   (data: any) => {
  //     // console.log("kaveriForm",this.kaveriForm.value);
  //     // console.log("data",data);
  //     // console.log(data.eAASTHIResponse.khathadetails.propertyid);
  //     // this.router.navigate(['/view-e-aasthi']);
  //   }, e => {
  //     if (e.error) {
  //       this.errorMessage = e.error.error_description;
  //     }
  //   }
  // )
}
PropertyDocView() {
  // var pid = {
  //   "propertyId": this.kaveriForm.get("pid").value
  // };
  var eswathu={
    "loginid": "SGD",
    "pwd": "CSGD2021",
    "propertyId": this.kaveriForm.get("pid").value,
    // "propertyId": this.eswathuForm.get("pid").value,
    "sroCode": "109"
  }
  //   var swathu = {
  //   "loginid": "SGD",
  //   "pwd": "CSGD2021",
  //   "propertyId": this.eswathuForm.get("pid").value,
  //   "sroCode": "109"
  // };
  this.kaveriService.eswathudocViewJSON(eswathu).subscribe(
    (data: any) => {
      console.log("data",JSON.stringify(data))
      if(data && data.propertydetails){
        this.swathupdfData=true;
        this.eswathuresponse=data.propertydetails.eswathuresponse;
      }
      // this.pdf = (data['pdfPath']);
      //this.pdf = "data:application/pdf;base64,"+ data.result;
      // if (data.result)
      //   this.Test(data.result);
    }
    , e => {
      if (e.error) {
        this.errorMessage = e.error.error_description;
      }
    }
  )
}
Test(base64: any) {
  const byteArray = new Uint8Array(
    atob(base64)
      .split("")
      .map(char => char.charCodeAt(0))
  );
  const file = new Blob([byteArray], { type: "application/pdf" });
  const fileURL = URL.createObjectURL(file);
  //this.pdf =fileURL;
  document.querySelector("iframe").src = fileURL;
  //window.open(fileURL);
}
SavePDF() {
  var data = document.getElementById('eswathuTable');  //Id of the table
  html2canvas(data).then(canvas => {  
    // Few necessary setting options  
    let imgWidth = 208;   
    let pageHeight = 295;    
    let imgHeight = canvas.height * imgWidth / canvas.width;  
    let heightLeft = imgHeight;  

    const contentDataURL = canvas.toDataURL('image/png')  
    let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
    let position = 0;  
    pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
    pdf.save('eSwathu.pdf'); // Generated PDF   
  });  
}
printForm15(){
  const printBtn: HTMLElement = document.getElementById('eswathuTable');
  this.printFoem15('form15Pdf');
}
printFoem15(divId: string) {
  const css = `<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
  integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous">`;
  const printContents = document.getElementById(divId).innerHTML;
  const pageContent = `<!DOCTYPE html><html><head>${css}</head><body onload="window.print()">${printContents}</html>`;
  let popupWindow: Window;
  if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
    popupWindow = window.open(
      '',
      '_blank',
      'width=1200,height=1400,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=Form 16'
    );
    popupWindow.window.focus();
    popupWindow.document.write(pageContent);
      popupWindow.document.close();
    popupWindow.onbeforeunload = event => {
      popupWindow.close();
    };
    popupWindow.onabort = event => {
      popupWindow.document.close();
      popupWindow.close();
    };
  } else {
    popupWindow = window.open('', '_blank', 'width=600,height=600');
    popupWindow.document.open();
    popupWindow.document.write(pageContent);
    popupWindow.document.close();
  }
}
  viewProperty() {

  // var aasthi = {
  //   "propertyId": this.kaveriForm.get("pid").value,
  // };
  var eswathuView={
    "loginid": "SGD",
    "pwd": "CSGD2021",
    "propertyId": this.kaveriForm.get("pid").value,
    "sroCode": "114"
  }
  this.kaveriService.eswathu(eswathuView).subscribe(
    (data: any) => {
      // console.log("data-->",JSON.stringify(data));
      // data = data["eAASTHIResponse"];
     
      this.easthiApiData=data;
      // var propertydetails = data["propertydetails"]
      // var ownersdetails = data["eswathuresponse"]
      // ownersdetails = ownersdetails["owners"];
      // ownersdetails = ownersdetails["owner"];
      // console.log("khathadetails-->",this.easthiApiData.propertydetails.eswathuresponse);
      // console.log("ownersdetails-->",ownersdetails);
      
      this.Ownersdetails[0].propertyid = this.easthiApiData.propertydetails.eswathuresponse.propertymain.propertyid
      // this.Ownersdetails[0].buyername = this.easthiApiData.ulbname
      this.Ownersdetails[0].ownername = this.easthiApiData.propertydetails.eswathuresponse.owners.owner.ownername
      this.Ownersdetails[0].propertydescription = this.easthiApiData.propertydetails.eswathuresponse.propertymain.propertyclassification
      this.Ownersdetails[0].totalArea = this.easthiApiData.propertydetails.eswathuresponse.propertymain.sitearea
      // this.doc = data;
      this.eswathudata = this.Ownersdetails;
      // console.log("this.eswathudata-->",this.eswathudata);
      
      
    }, e => {
      if (e.error) {
        this.errorMessage = e.error.error_description;
      }
    }
  )
}
getProperNumbers() :any{
  this.kaveriService.PropertyType().subscribe(
    (data: any) => {
      // console.log("propertyNumber-->",data);
      this.propertyData=data;
      // this.propertyNumber=data;
    }, e => {
      if (e.error) {
        this.errorMessage = e.error.error_description;
      }
    }
  )
}
courtOrderD() {
  var court = {

    // "SROCode": parseInt(localStorage.getItem('SROCode')),
    "SROCode": 214,
    "surveyNo": parseInt(localStorage.getItem('surveyno')),
    "hissano": localStorage.getItem('hissano')
  };
  // console.log(JSON.stringify(court));

  this.kaveriService.courtorder(court).subscribe(
    (data: any) => {
      // console.log(data);
      // localStorage.setItem("courtNewData",JSON.stringify(data));
      this.courtorder = data;
      localStorage.setItem("courtData",JSON.stringify(this.courtorder));
      // console.log("this.courtorder-->",this.courtorder);
      return
  
    }, e => {
      if (e.error) {
        debugger;
        this.errorMessage = e.error.error_description;
      }
    }
  )
}
// onSubmit() {

  // console.log(this.eswathuForm);
 
  // var swathu = {
  //   "loginid": "SGD",
  //   "pwd": "CSGD2021",
  //   "propertyId": this.eswathuForm.get("pid").value,
  //   "sroCode": "109"
  // };
  // localStorage.setItem('propid', this.eswathuForm.get("pid").value);
  // console.log(JSON.stringify(swathu));
  // this.kaveriService.eswathu(swathu).subscribe(
  //   (data: any) => {
  //     console.log(data);
  //     this.router.navigate(['/view-e-aasthi']);
  //   }, e => {
  //     if (e.error) {
  //       this.errorMessage = e.error.error_description;
  //     }
  //   }
  // )
// }
}
