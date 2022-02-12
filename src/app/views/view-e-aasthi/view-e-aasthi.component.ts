import { Component, OnInit } from '@angular/core';
import { KaveriService } from '../../services/kaveri.service';
import { saveAs } from 'file-saver';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-view-e-aasthi',
  templateUrl: './view-e-aasthi.component.html',
  styleUrls: ['./view-e-aasthi.component.scss']
})
export class ViewEAasthiComponent implements OnInit {
  doc: any;
  pdf: any;
  obj:any={};
  errorMessage: string = "";
  propertyIdNumber: string = "";
  propertyData: any=[];
  loggedinUser: string = "";
  bhumipopupVisible = false;
  dataSource: any[];
  eaasthidata: any;
  positionOf: string;
  indeterminateValue: any = false;
  nonAgriculturesearch: FormGroup;
  propertyLength:any=[{index:1}];
  selectedProperty:any=[];
  courtorder:any = [];
  Ownersdetails: any = [{
    "sno": "1",
    "ownername": "",
    "propertyid": "",
    "propertydescription": "",
    "buyername": "",
    "dateoftransaction": ""
  }];

  constructor(public router: Router,private kaveriService: KaveriService) { }

  ngOnInit() {
    this.selectedProperty=[];
    this.propertyIdNumber = localStorage.getItem('propertyid');
    this.PropertyDocView();
    this.viewProperty();
    this.getProperNumbers();
    this.loggedinUser = localStorage.getItem('loggedinuser');
    this.Test(this.pdf);
  }
  viewProperty() {

    var aasthi = {
      "propertyId": this.propertyIdNumber,
    };
    // console.log(JSON.stringify(aasthi));
    this.kaveriService.eaasthi(aasthi).subscribe(
      (data: any) => {
        // console.log(data);
        data = data["eAASTHIResponse"]
        var propertydetails = data["khathadetails"]
        var ownersdetails = data["ownerdetails"]
        ownersdetails = ownersdetails["owner"]
        this.Ownersdetails[0].propertyid = propertydetails.propertyid
        this.Ownersdetails[0].ownername = ownersdetails.ownername
        this.Ownersdetails[0].propertydescription = propertydetails.propertyclassification
        // this.doc = data;
        this.eaasthidata = this.Ownersdetails;
        console.log("this.eaasthidata ----------------",this.eaasthidata)
        
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
  }
  getProperNumbers() :any{
    var aasthi = {
      "propertyId": this.propertyIdNumber,
    };
    this.kaveriService.PropertyType().subscribe(
      (data: any) => {
        console.log("propertyNumber-->",data);
        this.propertyData=data;
        // this.propertyNumber=data;
      }, e => {
        if (e.error) {
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
  deleteRow(index):any{
    if(this.propertyLength.length!=1){

      console.log("index-->",index);
      this.selectedProperty.splice(index,1)
      this.propertyLength.splice(index,1)
    }
  }
  PropertyDocView() {
    debugger;
    var pid = {
      "propertyId": this.propertyIdNumber
    };
    this.kaveriService.eaasthidocView(pid).subscribe(
      (data: any) => {
        // console.log(data.result)
        // this.pdf = (data['pdfPath']);
        //this.pdf = "data:application/pdf;base64,"+ data.result;
        if (data.result)
          this.Test(data.result);
      }
      , e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
  }
  Test(base64: any) {
    debugger
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
  async showbhumiInfo() {
    await this.courtOrderD();
    setTimeout(() => {
      this.setEasthidetails()
    }, 2000);
  
  }
  setEasthidetails(){

    let nonAgriculturePrevValue = JSON.parse(localStorage.getItem("nonAgriculture"));
    nonAgriculturePrevValue[0].selectedProperty=this.selectedProperty;
    nonAgriculturePrevValue[0].Courtorders = this.courtorder;
    console.log(nonAgriculturePrevValue)
    nonAgriculturePrevValue=[{...nonAgriculturePrevValue[0],...this.eaasthidata[0]}]
    console.log(nonAgriculturePrevValue)
    // let isFinalData=localStorage.getItem("finalNonAgriculture");
    if(localStorage.getItem('finalNonAgriculture') && localStorage.getItem('finalNonAgriculture').length != 0){
      let isFinalData=JSON.parse(localStorage.getItem("finalNonAgriculture"));
      isFinalData.push(nonAgriculturePrevValue[0])
      localStorage.setItem("finalNonAgriculture",JSON.stringify(isFinalData));
    }else{
      localStorage.setItem("finalNonAgriculture",JSON.stringify(nonAgriculturePrevValue));
    }
    
    this.bhumipopupVisible = true;
    this.router.navigate(['view-property-non-agricultural'])
  }
  courtOrderD(){
    let ApplicationData=localStorage.getItem("ApplicationData");
    var court ={
      "sroCode": 8,
      "applicationnumber": ApplicationData,
      "currentpropertytypeid": parseInt(this.selectedProperty[0].presentProperty),
      "oldpropertytypeid": parseInt(this.selectedProperty[0].presentProperty),
      "currentnumber": this.selectedProperty[0].propertNumber,
      "oldnumber": this.selectedProperty[0].propertNumber
    }
    
      console.log(court);
    
      this.kaveriService.Nonagriculturalcourtorder(court).subscribe(
        (data: any) => {
          console.log(data);
          // localStorage.setItem("courtNewData",JSON.stringify(data));
          this.courtorder = data;
       //   localStorage.setItem("courtData",JSON.stringify(this.courtorder));
          // console.log("this.courtorder-->",this.courtorder);
          return this.courtorder
      
        }, e => {
          if (e.error) {
            debugger;
            this.errorMessage = e.error.error_description;
          }
        }
      )
    
  }
  onProperNumberTypeChange($event,i):any{
     this.obj={};
    if ($event != "") {
      this.obj.index=i;
      this.obj.propertNumberName= $event.target.options[$event.target.options.selectedIndex].text;
      this.obj.currentpropertytypeid= $event.target.value;
      // this.obj.propertNumber= $event.target.value;
      console.log("obj-->",this.obj);
      
      // this.selectedProperty.push(obj)
      // kaveriData[index].selectedSubArticle=text1;
     }
    
  }
  onKeyup($event,i):any{
    this.obj.currentnumber=$event.target.value;
    this.selectedProperty.push(this.obj);
    this.obj={};
  }
  surveynum: Survey[] = [
    {
      "sno": "",
      "districtcode": "",
      "hissano": "",
      "hoblicode": "",
      "landcode": "",
      "noofowners": "",
      "restriction": "",
      "restrictiondescription": null,
      "restrictiontype": null,
      "surnoc": "",
      "surveyno": "",
      "talukacode": "",
      "villagecode": "",
      "villageexemptedfromsketch": ""
    },
    // {
    //     "districtcode": "21",
    //     "hissano": "2",
    //     "hoblicode": "1",
    //     "landcode": "2",
    //     "noofowners": "1",
    //     "restriction": "N",
    //     "restrictiondescription": null,
    //     "restrictiontype": null,
    //     "surnoc": "*",
    //     "surveyno": "1",
    //     "talukacode": "1",
    //     "villagecode": "1",
    //     "villageexemptedfromsketch": "N"
    // },
    // {
    //     "districtcode": "21",
    //     "hissano": "3",
    //     "hoblicode": "1",
    //     "landcode": "3",
    //     "noofowners": "1",
    //     "restriction": "N",
    //     "restrictiondescription": null,
    //     "restrictiontype": null,
    //     "surnoc": "*",
    //     "surveyno": "1",
    //     "talukacode": "1",
    //     "villagecode": "1",
    //     "villageexemptedfromsketch": "N"
    // },
    // {
    //     "districtcode": "21",
    //     "hissano": "5",
    //     "hoblicode": "1",
    //     "landcode": "1249",
    //     "noofowners": "1",
    //     "restriction": "N",
    //     "restrictiondescription": null,
    //     "restrictiontype": null,
    //     "surnoc": "*",
    //     "surveyno": "1",
    //     "talukacode": "1",
    //     "villagecode": "1",
    //     "villageexemptedfromsketch": "N"
    // },
    // {
    //     "districtcode": "21",
    //     "hissano": "6",
    //     "hoblicode": "1",
    //     "landcode": "1250",
    //     "noofowners": "1",
    //     "restriction": "N",
    //     "restrictiondescription": null,
    //     "restrictiontype": null,
    //     "surnoc": "*",
    //     "surveyno": "1",
    //     "talukacode": "1",
    //     "villagecode": "1",
    //     "villageexemptedfromsketch": "N"
    // },
    // {
    //     "districtcode": "21",
    //     "hissano": "7",
    //     "hoblicode": "1",
    //     "landcode": "1251",
    //     "noofowners": "1",
    //     "restriction": "N",
    //     "restrictiondescription": null,
    //     "restrictiontype": null,
    //     "surnoc": "*",
    //     "surveyno": "1",
    //     "talukacode": "1",
    //     "villagecode": "1",
    //     "villageexemptedfromsketch": "N"
    // },
    // {
    //     "districtcode": "21",
    //     "hissano": "8",
    //     "hoblicode": "1",
    //     "landcode": "1252",
    //     "noofowners": "1",
    //     "restriction": "N",
    //     "restrictiondescription": null,
    //     "restrictiontype": null,
    //     "surnoc": "*",
    //     "surveyno": "1",
    //     "talukacode": "1",
    //     "villagecode": "1",
    //     "villageexemptedfromsketch": "N"
    // }
  ];
  surveynum1: any = {
    "eAASTHIResponse": {
      "apartmentdetails": {
        "apartment": {
          "additionalarea": "NA",
          "blocknumber": "NA",
          "buildingtype": "NA",
          "carpetarea": "NA",
          "flatno": "NA",
          "floortype": "NA",
          "landpropertyid": "NA",
          "landsharearea": "NA",
          "landsharefraction": "NA",
          "landshareno": "NA",
          "numberofparkingunits": "NA",
          "parkingarea": "NA",
          "parkingavailable": "NA",
          "rooftype": "NA",
          "rrno": "NA",
          "superbuiltuparea": "NA",
          "woodtype": "NA"
        }
      },
      "dimensions": {
        "dimension": {
          "cornersite": "N",
          "easttowest": "27.4320+32.0040/2",
          "northtosouth": "23.042926",
          "oddsite": "Y"
        }
      },
      "documentversion": {
        "versionnumber": "version:1.0.0.0"
      },
      "floordetails": {
        "floor": [
          {
            "buildingtype": "ವಾಣಿಜ್ಯ",
            "constructiondemolitiontype": "ಹೊಸ ಕಟ್ಟಡ",
            "constructiondemolitionyear": "2000",
            "feature": "ದೊಡ್ಡ ಸಂಸ್ಥೆಗಳು ಕಚೇರಿ",
            "featurehead": "ಕಚೇರಿ",
            "floorarea": "209.15",
            "floornumber": "ನೆಲ ಮಹಡಿ",
            "floortype": "ಗ್ರನೈಟ್",
            "floorusage": "ಬಾಡಿಗೆ",
            "rooftype": "ಅರ್ ಸಿ ಸಿ",
            "rrno": null,
            "watermeterno": null,
            "woodtype": "ತೇಗದ"
          },
          {
            "buildingtype": "ವಾಸಯೋಗ್ಯ",
            "constructiondemolitiontype": "ಹೊಸ ಕಟ್ಟಡ",
            "constructiondemolitionyear": "2000",
            "feature": "ಪ್ರಮುಖ ನಿವಾಸಗಳ",
            "featurehead": "ವಸತಿ",
            "floorarea": "209.15",
            "floornumber": "ಮೊದಲ ಮಹಡಿ",
            "floortype": "ಮಾರ್ಬಲ",
            "floorusage": "ಸ್ವಂತ ಬಳಕೆ",
            "rooftype": "ಅರ್ ಸಿ ಸಿ",
            "rrno": null,
            "watermeterno": null,
            "woodtype": "ತೇಗದ"
          }
        ]
      },
      "khathadetails": {
        "address": "32,# T,Nandi hills Road, 40, 10 ದೇವನಹಳ್ಳಿ, ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರ",
        "assessmentnumber": "78",
        "blockname": "40",
        "blocknumber": "40",
        "checkbandi_east": "East Street",
        "checkbandi_north": "PID 10-1-116-14",
        "checkbandi_south": "PID 24-501-22",
        "checkbandi_west": "PID 24-501-123",
        "districtcode": "583",
        "districtname": "ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರ",
        "municipaloldnumber": null,
        "propertycategory": "ಕಟ್ಟಡ",
        "propertyclassification": "ಅನಧಿಕೃತ",
        "propertycode": "392496",
        "propertyid": "40-221-32",
        "propertytype": "ಖಾಸಗಿ",
        "sitearea": "683.8822088",
        "siteplintharea": "209.15",
        "streetname": "Nandi hills Road",
        "streetnumber": "221",
        "ulbcode": "2",
        "ulbname": "ದೇವನಹಳ್ಳಿ",
        "wardname": "10",
        "wardnumber": "10"
      },
      "liabilities": null,
      "ownerdetails": {
        "owner": {
          "identificationdocument": "ಪಾಸ್‌ಪೋರ್ಟ್",
          "identificationdocumentnumber": "XXXXXXXX1234",
          "identifiername": "Ram",
          "identifiertype": "1",
          "owneraddress": "Jnana Bharathi Residentia",
          "ownername": "Krish"
        }
      },
      "response": {
        "exceptionmessage": "PROPERTY IS UNDER MUTATION",
        "responsecode": "7",
        "responsestatus": "Y"
      },
      "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
      "xsi:noNamespaceSchemaLocation": "eAASTHIResponse.xsd"
    }
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