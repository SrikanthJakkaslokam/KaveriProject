import { Component, OnInit } from '@angular/core';
import { KaveriService } from '../../services/kaveri.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-view-property',
  templateUrl: './view-property.component.html',
  styleUrls: ['./view-property.component.scss']
})
export class ViewPropertyComponent implements OnInit {
  doc: any;
  pdf: any;
  errorMessage: string = "";
  propertyIdNumber: string= "";
  bhumipopupVisible = false;
  loggedinUser: string = "";
  dataSource: any[];
  eswathudata: any;
  positionOf: string;
  filepath: any;
  fileURL: any;
  Ownersdetails:any = [{
    "sno":"1",
    "ownername" :"",
    "propertyid" :"",
    "propertydescription" : "",
    "buyername" :"",
    "dateoftransaction":""
    }];

  constructor(private kaveriService: KaveriService) { }

  ngOnInit() {
    this.propertyIdNumber = localStorage.getItem('propid');
     this.viewProperty(); 
    // // this.PropertyRegStatus();
    this.PropertyDocView();
    this.loggedinUser = localStorage.getItem('loggedinuser');  
  }
  viewProperty() {
     
    var swathu = {
      "loginid": "SGD",
      "pwd": "CSGD2021",
      "propertyId": this.propertyIdNumber,
      "sroCode": "109"
    };
    console.log(JSON.stringify(swathu));
    this.kaveriService.eswathu(swathu).subscribe(
      (data: any) => {
        console.log(data);
        
        data = data["propertydetails"]
        data = data["eswathuresponse"]
        var propertydetails = data["propertymain"]
        var ownersdetails = data["owners"]
        ownersdetails = ownersdetails["owner"]
        this.Ownersdetails[0].propertyid= propertydetails.propertyid
        this.Ownersdetails[0].ownername= ownersdetails.ownername
        this.Ownersdetails[0].propertydescription = propertydetails.propertyclassification
       this.eswathudata = this.Ownersdetails;
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
  }
  PropertyRegStatus() {
       
    var status = {
        "loginid": "SGD",
        "pwd": "CSGD2021",
        "propertyId": "150200102901021579",
        "sroCode": "109"
    };
    console.log(JSON.stringify(status));
    this.kaveriService.eswathuRegStatus(status).subscribe(
      (data: any) => {
        console.log(data);
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
  }
 PropertyDocView() {
     debugger;
    var pid = {
      "loginid": "SGD",
      "pwd": "CSGD2021",
      "propertyId": this.propertyIdNumber,
      "sroCode": "109"
    };
    console.log(JSON.stringify(pid));
    this.kaveriService.eswathudocView(pid).subscribe(
      (data) => {
        this.pdf = (data['pdfPath']);
      }
      ,e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
      )
  }
  showbhumiInfo() {
    this.bhumipopupVisible = true;
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
ownes = {
  "propertydetails": {
      "eswathuresponse": {
          "apartment": {
              "addlarea": null,
              "apartmentunit": "No",
              "blocknumber": null,
              "carpetarea": null,
              "flatno": null,
              "landpropertyid": null,
              "parkingarea": null,
              "parkingavailable": null,
              "parkingunits": null,
              "plotareaownershare_area": null,
              "plotareaownershare_fraction": null,
              "plotareaownershare_noofshares": null,
              "superbuiltuparea": null
          },
          "FloorDetails": null,
          "liabilities": null,
          "owners": {
              "owner": {
                  "address": "HULIMANGALA",
                  "identifiername": "KUMAR",
                  "identifiertype": "S/o",
                  "occupant": null,
                  "ownername": "AMAR"
              }
          },
          "propertymain": {
              "acquisitiontype": "ಸೇಲ್ ಡೀಡ್",
              "assetnature": "ತಡಿಕೆ/ಗುಡಿಸಲು ಮೇಲ್ಚಾವಣೆ",
              "assetnumber": "121/121",
              "block": "ಆನೇಕಲ್‌",
              "blockcode": "1502001",
              "builtuparea": "0.000000",
              "checkbandi_east": "14",
              "checkbandi_north": "12",
              "checkbandi_south": "13",
              "checkbandi_west": "15",
              "dimension": {
                  "easttowest": "0",
                  "northtosouth": "0"
              },
              "district": "ಬೆಂಗಳೂರು",
              "districtcode": "1502",
              "grampanchayat": "ಹುಲಿಮಂಗಲ",
              "grampanchayatcode": "1502001029",
              "mutationregisternumber": null,
              "propertycategory": "ಬಹು ಮಾಲೀಕತ್ವದ ಕಟ್ಟಡ",
              "propertyclassification": "ನಗರಾಭಿವೃದ್ದಿ ಇಲಾಖೆಯ ಸಕ್ಷಮ ಪ್ರಾಧಿಕಾರ / ನಗರ ಮತ್ತು ಗ್ರಾಮಾಂತರ ಯೋಜನಾ ಇಲಾಖೆಯ ಅನುಮೋಧಿತ ಬಡಾವಣೆ ನಿವೇಶನ",
              "propertyform": "9",
              "propertyid": "150200102901021579",
              "propertytype": "Building with Multiple Ownership",
              "sitearea": "60767.878000",
              "village": "ಹುಲಿಮಂಗಲ",
              "villagecode": "1502001029010"
          },
          "response": {
              "exceptionmessage": "This is the property on which apartment/building is built and cannot be transacted / ಗೃಹಸ್ತೋಮ ಕಟ್ಟಿರುವ ಸ್ವತ್ತು ನೋಂದಣಿ ಸಾಧ್ಯವಿಲ್ಲ",
              "responsecode": "0",
              "responsestatus": "Success"
          },
          "rights": null,
          "RoofDetails": null
      },
      "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance"
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