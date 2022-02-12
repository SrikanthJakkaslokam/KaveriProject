import { Component, OnInit, ChangeDetectorRef, ViewChild, ComponentFactoryResolver, Injector, ApplicationRef, ViewContainerRef, Renderer2, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { KaveriService } from "../../services/kaveri.service";
import { EcserviceService } from "../../services/ecservice.service";
import { EncumbranceCertificate } from "../../Models/encumbrance-certificate.model";
import notify from "devextreme/ui/notify";
import jspdf from 'jspdf';  
import html2canvas from 'html2canvas';

@Component({
  selector: "app-ec-search",
  templateUrl: "./ec-search.component.html",
  styleUrls: ["./ec-search.component.scss"],
})
export class EcSearchComponent implements OnInit {
  @ViewChild('printDocument') printDocumentRef;
  @ViewChild("iframe") iframe;
  
  bhumiForm: FormGroup;
  bhoomicode: FormGroup;

  loggedinUser: string = "";
  applicationData: string = "";

  districtList: Array<any> = [];
  talukaList: Array<any> = [];
  hobliList: Array<any> = [];
  villageList: Array<any> = [];
  roadList: Array<any> = [];
  BhoomiOwners: any[];
  propertyNumberTypeList: Array<any> = [];

  errorMessage: string = "";
  selecteddistvalue: string = "";
  selectedtalukvalue: string = "";
  selectedhoblivalue: string = "";
  submitted = false;

  disTrict: string = "";
  talUka: string = "";
  town: string = "";
  vilLage: string = "";
  east: string = "";
  west: string = "";
  north: string = "";
  south: string = "";
  northToEast: string = "";
  eastToWest: string = "";
  unit: string = "";
  descriptionOfProperty: string = "";
  fromDate: any;
  toDate: any;

  propertyDetails = [];
  singlepropertyDetails = [];
  multiproeprtyDetails = [];
  propertyNumberData: any;

  isSketchNo: boolean = false;

  multiOwnersdata: Array<any> = [];
  test: any;
  testone: any;
  courttest: any;
  courttestone: any;
  courtorder: any[] = [];
  multiCourtOrderdata: Array<any> = [];

  propertyNumberTypeArray: any;
  propertyTypeValueArray: any;
  propertyTypeValueArray1: any[] = [];
  propertyTypeArrayFinal: number;

  dynamicArray: Array<any> = [];
  newDynamic: any = {};

  selectedvillagevalue: string = "";

  selected: Date | null;

  doc: any;
  pdf: string = "";

  loginotp: string = "";
  otpvalid: boolean = false;
  otpmsg: string = "";
  otpmsgSuccess: string = "";
  otpSentSuccess: string = "";

  digitallySignedisChecked = false;
  isChecked = false;

  EncumbranceCertificate = new EncumbranceCertificate();
  propertyNumberDetailsArray = [];

  message = "";

  propertyType = "";
  agricultutalUnit = ""
  nonAgricultutalUnit = "";

  arraywithTypeIdAndNameInEnglish: any = [];
  arrayWithCodeAndValue: any = [];
  propDetails: any = [];

  hectare = "-";
  gunta  = "-";
  acre  = "-";
  cent = "-";
  meter = "-";
  propertyMeasure = "";
  eastToWestMeasureInEct = "";
  northToSouthMeasureInEct = "";
  eastToWestMeasureInFeet = "";
  northToSouthMeasureFeet = "";
  eastToWestMeasureInMetre = "";
  northToSouthMeasureInMetre = "";
  selectedPropertytType = "";
  unitOfMeasurment = "";

  ecDetailsArray: any[] = [];
  ecpdfData: boolean;
  ecpdfApplicationNumber = "";
  ecpdfCertificateNumber = "";
  totalArea = "";

  propertyMeasurement = '';
  eastToWestMeasurment = '';
  northToSouthMeasurment = '';

  constructor(
    public router: Router,
    private kaveriService: KaveriService,
    private formBuilder: FormBuilder,
    private ecservice: EcserviceService
  ) {}

  ngOnInit(): void {
    this.District();

    this.loggedinUser = localStorage.getItem("loggedinuser");
    this.applicationData = localStorage.getItem("ApplicationData");
    this.disTrict = localStorage.getItem("districtname");
    this.talUka = localStorage.getItem("talukname");
    this.town = localStorage.getItem("hobliname");
    this.vilLage = localStorage.getItem("village");
    this.selectedvillagevalue = localStorage.getItem("bhoomivillagecode");

    this.propertyNumberType();

    this.bhumiForm = this.formBuilder.group({
      district: ["", Validators.required],
      taluka: ["", Validators.required],
      hobli: ["", Validators.required],
      village: ["", Validators.required],
    });

    this.bhoomicode = this.formBuilder.group({
      bhoomitalukcode: ["", Validators.required],
    });

    if (this.propertyNumberDetailsArray.length === 0) {
      this.EncumbranceCertificate.propertyDetails = "";
      this.EncumbranceCertificate.propertyNumberType = 0;
      this.propertyNumberDetailsArray.push(this.EncumbranceCertificate);
    }

  }

  District() {
    this.kaveriService.district().subscribe(
      (data: any) => {
        console.log(data);
        if (data.length != 0) {
          this.districtList = data;
          if (this.bhumiForm.get("district").value != 0) {
            this.Taluka();
          }
        }
      },
      (e) => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    );
  }

  ondistrictValuechange(distValue) {
    this.selecteddistvalue = distValue;
    console.log(this.selecteddistvalue);
    if (this.bhumiForm.get("district").value != 0) {
      debugger;
      this.Taluka();
    }
  }

  Taluka() {
    debugger;
    var taluk = {
      districtCode: this.selecteddistvalue,
    };
    console.log(JSON.stringify(taluk));
    if (taluk != undefined) {
      this.kaveriService.taluka(taluk).subscribe(
        (data: any) => {
          console.log(data);
          if (data.length != 0) {
            this.selectedtalukvalue = this.bhumiForm.get("taluka").value;
            this.talukaList = data;
            if (this.bhumiForm.get("taluka").value != 0) {
              this.Hobli();
            }
          }
        },
        (e) => {
          if (e.error) {
            this.errorMessage = e.error.error_description;
          }
        }
      );
    }
  }

  ontalukValuechange(talukValue) {
    debugger;
    this.selectedtalukvalue = talukValue;
    if (this.bhumiForm.get("taluka").value != 0) {
      this.Hobli();
    }
  }

  Hobli() {
    var hoblireq = {
      talukaCode: this.selectedtalukvalue,
    };
    if (hoblireq != undefined) {
      this.kaveriService.hobli(hoblireq).subscribe(
        (data: any) => {
          console.log(data);
          if (data.length != 0) {
            this.hobliList = data;
            this.selectedhoblivalue = this.bhumiForm.get("hobli").value;
            // if(this.bhumiForm.get("hobli").value != 0) {
            // this.Village();
            // }
          }
        },
        (e) => {
          if (e.error) {
            this.errorMessage = e.error.error_description;
          }
        }
      );
    }
  }

  onhobliValuechange(hobliValue) {
    debugger;
    this.selectedhoblivalue = hobliValue;
    if (this.bhumiForm.get("hobli").value != 0) {
      this.Village();
    }
  }

  Village() {
    var index = {
      hobliCode: this.selectedhoblivalue,
    };
    if (index != undefined) {
      this.kaveriService.village(index).subscribe(
        (data: any) => {
          console.log(data);
          if (data.length != 0) {
            this.villageList = data;
          }
        },
        (e) => {
          if (e.error) {
            this.errorMessage = e.error.error_description;
          }
        }
      );
    }
  }

  ondistrictChange($event) {
    if ($event != "") {
      let text1 =
        $event.target.options[$event.target.options.selectedIndex].text;
      this.disTrict = text1;
    }
  }

  ontalukaChange($event) {
    if ($event != "") {
      let text2 =
        $event.target.options[$event.target.options.selectedIndex].text;
      this.talUka = text2;
    }
  }

  onhobliChange($event) {
    if ($event != "") {
      let text3 =
        $event.target.options[$event.target.options.selectedIndex].text;
      console.log("========hobli code ", this.hobliList);
      this.town = text3;
      this.hobliList.forEach((element) => {
        if (element.hoblinamee == this.town) {
          localStorage.setItem("bhoomihoblicode", element.bhoomihoblicode);
          localStorage.setItem("hobliname", element.hoblinamee);
        }
      });
    }
  }

  getRoadDetails($event) {
    debugger;
    if ($event != "") {
      let text4 =
        $event.target.options[$event.target.options.selectedIndex].text;
      console.log("========hobli code ", this.villageList);

      this.vilLage = text4;
      this.villageList.forEach((element) => {
        if (element.villagenamee == this.vilLage) {
          localStorage.setItem(
            "bhoomiDistrictCode",
            element.bhoomiDistrictCode
          );
          localStorage.setItem("bhoomitalukcode", element.bhoomitalukcode);
          localStorage.setItem("bhoomivillagecode", element.bhoomivillagecode);
          localStorage.setItem("villagecode", element.villagecode);
          localStorage.setItem("villagename", element.villagenamee);
          localStorage.setItem("SROCode", element.sroCode);
          localStorage.setItem("isurban", element.isurban);
        }
      });
    }
    var villageCode = {
      villageCode: this.bhumiForm.get("village").value,
    };
    if (villageCode != undefined) {
      this.kaveriService.road(villageCode).subscribe(
        (data: any) => {
          console.log(data);
          if (data.length != 0) {
            this.roadList = data;
          }
        },
        (e) => {
          if (e.error) {
            this.errorMessage = e.error.error_description;
          }
        }
      );
    }
  }

  SelectChange(obj: any) {
    console.log(obj);
  }

  addMoreDetails() {
    let EncumbranceCertificate: any = {
      propertyDetails: "",
      propertyNumberType: 0,
    };
    this.propertyNumberDetailsArray.push(EncumbranceCertificate);
  }

  removeDetails(index) {
    if (this.propertyNumberDetailsArray.length == 1) {
      return;
    } else {
      this.propertyNumberDetailsArray.splice(index, 1);
    }
  }

  sendotp() {
    debugger;
    var mobile = localStorage.getItem('usermobile');
    //var mobile = "9845803218";
    console.log(mobile);
    this.ecservice.loginOtp(mobile).subscribe((dataotp: any) => {
      if (dataotp != undefined) {
        debugger;
        this.loginotp = dataotp.otp;
        // this.startTimer();
        this.otpSentSuccess = "OTP Sent successfully";
      }
    });
  }
  verifyotp() {
    this.otpmsgSuccess = "";
    this.otpmsg = "";
    if (this.loginotp != "") {
      if (
        (document.getElementById("otp") as HTMLInputElement).value ==
        this.loginotp
      ) {
        this.otpvalid = true;
        this.otpmsgSuccess = "OTP Validation successfully";
      } else {
        this.otpvalid = false;
        if (
          (document.getElementById("otp") as HTMLInputElement).value != null
        ) {
          this.otpmsg = "Enter valid OTP";
        }
      }
    }
  }

  propertyNumberType() {
    this.ecservice.propertyNumberType().subscribe(
      (data: any) => {
        console.log(data);
        if (data.length != 0) {
          this.propertyNumberTypeList = data;
        }
      },
      (e) => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    );
  }

  onsearchValidation() {
    this.fetchECdetails();
    // if(this.disTrict == null || this.talUka == null || this.town == null || this.vilLage == null){
    //   alert("Select the District, Taluk, Hobli And Village");
    // }
    // else if(this.east == '' || this.west == '' || this.north == '' || this.south == '' || this.northToEast == '' || this.eastToWest == '' || this.descriptionOfProperty == ''){
    //   alert("Select All the fields from Boundaries");
    // }
    // else if(this.fromDate == '' || this.toDate == ''){
    //   alert("Select the From date and To date");
    // }
    // else if(this.otpvalid != true){
    //   alert("Validate the OTP")
    // }
    // else if(this.selectedPropertytType == ''){
    //   alert("Select the Property Type");
    // }
    // else {
    //   this.validateUnits();
    // }
  }

  validateUnits(){
    this.unitOfMeasurment = (document.getElementById("unitOfMeasurment") as HTMLInputElement).value;
    if(this.unitOfMeasurment == '' && this.propertyType == 'agricultural'){
      alert("Select Unit of measurement");
    }else{
      this.validateUnitValue();
    }
  }
  validateUnitValue(){
    if(this.unitOfMeasurment == 'hectare'){
      this.hectare = (document.getElementById("hectare") as HTMLInputElement).value;
      this.acre = (document.getElementById("acre") as HTMLInputElement).value;
      this.gunta = (document.getElementById("gunta") as HTMLInputElement).value;
      this.cent = (document.getElementById("cents") as HTMLInputElement).value;

      this.totalArea = this.hectare +'Hectare ' + this.acre +'acre ' + this.gunta +'gunta ' + this.cent +'cent';

      if(this.hectare == '' || this.acre == '' || this.gunta == '' || this.cent == ''){
        alert("Enter the Hetare, acre, Gunta and Cent");
      }
      else if(!this.digitallySignedisChecked) {
        console.log('Checkbox cannot be unchecked...');
      }
      else {
        this.fetchECdetails();
      }
    }

    else if(this.unitOfMeasurment == 'acre'){
      this.acre = (document.getElementById("acre") as HTMLInputElement).value;
      this.gunta = (document.getElementById("gunta") as HTMLInputElement).value;
      this.cent = (document.getElementById("cents") as HTMLInputElement).value;

      this.totalArea = this.acre +'acre ' + this.gunta +'gunta ' + this.cent +'cent';

      if(this.acre == '' || this.gunta == '' || this.cent == ''){
        alert("Enter the acre, Gunta and Cent");
      }
      else if(!this.digitallySignedisChecked) {
        console.log('Checkbox cannot be unchecked...');
      }
      else {
        this.fetchECdetails();
      }
    }

    else if(this.unitOfMeasurment == 'gunta'){
      this.gunta = (document.getElementById("gunta") as HTMLInputElement).value;

      this.totalArea = this.gunta +'gunta';

      if(this.gunta == ''){
        alert("Enter the Gunta");
      }
      else if(!this.digitallySignedisChecked) {
        console.log('Checkbox cannot be unchecked...');
      }
      else {
        this.fetchECdetails();
      }
    }

    else if(this.unitOfMeasurment == 'cent'){
      this.cent = (document.getElementById("cents") as HTMLInputElement).value;

      this.totalArea = this.cent +'Cent';

      if(this.cent == ''){
        alert("Enter the Cents");
      }
      else if(!this.digitallySignedisChecked) {
        console.log('Checkbox cannot be unchecked...');
      }
      else {
        this.fetchECdetails();
      }
    }

    else if(this.propertyType == 'nonagricultural' && this.unitOfMeasurment == ''){
      this.propertyMeasurement = (document.getElementById("propertyMeasuring") as HTMLInputElement).value;
      this.eastToWestMeasurment = (document.getElementById("eastToWestMeasurment") as HTMLInputElement).value;
      this.northToSouthMeasurment = (document.getElementById("northToSouthMeasurment") as HTMLInputElement).value;

      this.totalArea = 'Property Measure :' +this.propertyMeasurement + ', ' + 'East To West Measurement: ' +this.eastToWestMeasurment+'ect,' + ' ' + 'North To South Measurement: ' +this.northToSouthMeasurment+'ect';

      if(this.propertyMeasurement == '' || this.eastToWestMeasurment == '' || this.northToSouthMeasurment == ''){
        alert("Enter Property Measurment, East to west Measurement and North to South Measurement");
      }
      else if(!this.digitallySignedisChecked) {
        console.log('Checkbox cannot be unchecked...');
      }
      else {
        this.fetchECdetails();
      }
    }


    else if(this.unitOfMeasurment == 'sqfeet'){
      this.propertyMeasurement = (document.getElementById("propertyMeasuring") as HTMLInputElement).value;
      this.eastToWestMeasurment = (document.getElementById("eastToWestMeasurment") as HTMLInputElement).value;
      this.northToSouthMeasurment = (document.getElementById("northToSouthMeasurment") as HTMLInputElement).value;

      this.totalArea = 'Property Measure :' +this.propertyMeasurement + ', ' + 'East To West Measurement: ' +this.eastToWestMeasurment+'sqfeet,' + ' ' + 'North To South Measurement: ' +this.northToSouthMeasurment+'sqfeet';

      if(this.propertyMeasurement == '' || this.eastToWestMeasurment == '' || this.northToSouthMeasurment == ''){
        alert("Enter Property Measurment, East to west Measurement and North to South Measurement");
      }
      else if(!this.digitallySignedisChecked) {
        console.log('Checkbox cannot be unchecked...');
      }
      else {
        alert(this.totalArea);
        this.fetchECdetails();
      }
    }

    else if(this.unitOfMeasurment == 'sqmetre'){
      this.propertyMeasurement = (document.getElementById("propertyMeasuring") as HTMLInputElement).value;
      this.eastToWestMeasurment = (document.getElementById("eastToWestMeasurment") as HTMLInputElement).value;
      this.northToSouthMeasurment = (document.getElementById("northToSouthMeasurment") as HTMLInputElement).value;

      this.totalArea = 'Property Measure :' +this.propertyMeasurement + ', ' + 'East To West Measurement: ' +this.eastToWestMeasurment+'sqmetre,' + ' ' + 'North To South Measurement: ' +this.eastToWestMeasurment+'sqmetre';

      if(this.propertyMeasurement == '' || this.eastToWestMeasurment == '' || this.northToSouthMeasurment == ''){
        alert("Enter Property Measurment, East to west Measurement and North to South Measurement");
      }
      else if(!this.digitallySignedisChecked) {
        console.log('Checkbox cannot be unchecked...');
      }
      else {
        alert(this.totalArea);
        this.fetchECdetails();
      }
    }


  }

  onsearch() {
    //let arrayWithCodeAndValue: any = [];
    this.propDetails = [];
    this.arraywithTypeIdAndNameInEnglish = [];
    this.arrayWithCodeAndValue = [];


    console.log("property number array", this.propertyNumberDetailsArray);
    // this.AassignPropertydataToArray();
    this.propertyNumberDetailsArray.forEach((arr) => {
      this.propertyNumberTypeList.forEach((v) => {
        if (arr.propertyNumberType == v.propertytypeid) {
          let singleArray = {
            propertyNumberType: arr.propertyNumberType,
            propertyName: v.typeNameEnglish,
            propertyValue: arr.propertyDetails,
          };

          let propertyDetailArray = {
            propertyTypeId: arr.propertyNumberType,
            typenameinenglish: v.typeNameEnglish,
          };

          let propdetailsArray = {
            ecpropertynoid: 0,
            ecid: 0,
            propertynotypeid: arr.propertyNumberType,
            oldpropertynumber: "string",
            newpropertynumber: "string",
            // presentpropertydetails: arr.propertyDetails,
          };



          this.arrayWithCodeAndValue.push(singleArray);
          this.arraywithTypeIdAndNameInEnglish.push(propertyDetailArray);
          this.propDetails.push(propdetailsArray);
          this.propertyNumberTypeArray = this.arrayWithCodeAndValue.map(a => a.propertyNumberType);
          this.propertyTypeValueArray = this.arrayWithCodeAndValue.map(a => a.propertyValue);


          console.log('gggggggg', this.propertyNumberTypeArray);
          console.log('hhhhhh', this.propertyTypeValueArray);

          localStorage.setItem("propertyNumberTypeAndDetails", JSON.stringify(this.arrayWithCodeAndValue));
        }
      });
    });

    console.log("", this.arraywithTypeIdAndNameInEnglish);
    console.log("Array With All Details", this.arrayWithCodeAndValue);
    console.log("save", this.propDetails);
    this.east = (document.getElementById("ecEast") as HTMLInputElement).value;
    this.west = (document.getElementById("ecWest") as HTMLInputElement).value;
    this.north = (document.getElementById("ecNorth") as HTMLInputElement).value;
    this.south = (document.getElementById("ecSouth") as HTMLInputElement).value;
    this.northToEast = (
      document.getElementById("NorthtoSouth") as HTMLInputElement
    ).value;
    this.eastToWest = (
      document.getElementById("EasttoWest") as HTMLInputElement
    ).value;
    this.descriptionOfProperty = (
      document.getElementById("descECproperty") as HTMLInputElement
    ).value;
    this.fromDate = (
      document.getElementById("fromDate") as HTMLInputElement
    ).value;
    this.toDate = (document.getElementById("toDate") as HTMLInputElement).value;

    this.selectedPropertytType = (document.getElementById("selectedPropertytType") as HTMLInputElement).value;

    //this.acre = (document.getElementById("acre") as HTMLInputElement).value;

    //this.unitOfMeasurment = (document.getElementById("unitOfMeasurment") as HTMLInputElement).value;



    this.onsearchValidation();
  }

  fetchECdetails(){
    let ecInputParameter = 
    // {
    //   "villageName": this.vilLage,
    //   "fromDate": this.fromDate,
    //   "toDate": this.toDate,
    //   "propertyType": this.arraywithTypeIdAndNameInEnglish,
    //   "propertyTypeValue": this.propertyTypeValueArray
    // }
    {
      "villageCode": 28541,
      "fromDate": "2004-01-21",
      "toDate": "2004-01-22",
      "propertyType": [
        {
          "propertyTypeId": 2,
          "typenameinenglish": "Khata No"
        },
      {
          "propertyTypeId": 3,
          "typenameinenglish": "Site No"
        }
      ],
      "propertyTypeValue": [
        "601","139/1"
      ]
    }
    this.ecservice.fetchECRecord(ecInputParameter).subscribe(
      (data: any) => {
        if(data.responseCode==1000){
          this.ecpdfData = true;
          this.ecDetailsArray = data.eCSearchResponses;
          this.ecpdfApplicationNumber = data.eCSearchResponses[0].applicationnumber;
          this.ecpdfCertificateNumber = data.eCSearchResponses[0].certificatenumber;
          console.log(this.ecDetailsArray);
        }
        else{
          this.ecpdfData = false;
        }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
  }

  onsubmit() {
    if (this.isChecked) {
      return;
    }
    let saveECdata =
    // {
    //   "district":'',
    //   "taluk": '',
    //   "villageName": this.vilLage,
    //   "hobliName": this.town,
    //   "east": this.east,
    //   "west": this.west,
    //   "south": this.south,
    //   "north": this.north,
    //   "apartmentOrVilamentNo": "201",
    //   "eastToWest": this.eastToWest,
    //   "northToSouth": this.northToEast,
    //   "propertyDesc": this.descriptionOfProperty,
    //   "area": "1acer",
    //   "villageCode": this.selectedvillagevalue,
    //   "fromDate": this.fromDate,
    //   "toDate": this.toDate,
    //   "propertyNumberDetails": [
    //     {
    //       "propertyTypeId": 2,
    //       "propertyNumberType": "Khata No",
    //       "propDetails": "601"
    //     },
    //    {
    //       "propertyTypeId": 3,
    //       "propertyNumberType": "Site No",
    //       "propDetails": "139/1"
    //     }
    // ]
    // }

    // {
    //   "ecNumber": 0,
    //   "certificatenumber": "",
    //   "ecdate": "",
    //   "userid": 0,
    //   "searchfromdate": this.fromDate,
    //   "searchtodate": this.toDate,
    //   "kaveridrocode": 0,
    //   "kaverisrocode": 0,
    //   "kaverivillagecode": this.selectedvillagevalue,
    //   "kaverihoblicode": this.selectedhoblivalue,
    //   "pagecount": 0,
    //   "totalamount": 0,
    //   "submittedby": 0,
    //   "submitteddatetime": "2022-01-20T12:16:46.016Z",
    //   "acceptedby": 0,
    //   "acceptedon": "2022-01-20T12:16:46.016Z",
    //   "documentstatusid": 0,
    //   "preparedby": 0,
    //   "prepareddatetime": "2022-01-20T12:16:46.016Z",
    //   "signedby": 0,
    //   "signeddatetime": "2022-01-20T12:16:46.016Z",
    //   "appliedsignedcopy": true,
    //   "comparedby": 0,
    //   "compareddatetime": "2022-01-20T12:16:46.016Z",
    //   "eastboundary": this.east,
    //   "westboundary": this.west,
    //   "northboundary": this.north,
    //   "southboundary": this.south,
    //   "easttowest": this.eastToWest,
    //   "northtosouth": this.northToEast,
    //   "remarktoreprepareec": "string",
    //   "area": 0,
    //   "propertydescription": "string",
    //   "measurementunitid": 0,
    //   "hectare": 0,
    //   "acre": 0,
    //   "gunta": 0,
    //   "cents": 0,
    //   "partyname": "string",
    //   "isnamesearch": true,
    //   "ispropertysearch": true,
    //   "isdocviewable": true,
    //   "cscapplicantid": 0,
    //   "firstname": "string",
    //   "middlename": "string",
    //   "lastname": "string",
    //   "address": "string",
    //   "pincode": "string",
    //   "mobilenumber": "string",
    //   "email": "string",
    //   "uid": "string",
    //   "ecid": 0,
    //   "operatorid": "string",
    //   "propertyNumberDetails": this.propDetails,
    //   "requiredfees": [
    //     {
    //       "ecpropertynoid": 0,
    //       "ecid": 0,
    //       "feeruleid": "string",
    //       "payableamount": 0,
    //       "ispaid": true,
    //       "serviceid": 0,
    //       "feedescription": "string"
    //     }
    //   ]
    // }

    {
      "applicationnumber": this.applicationData,
      "ecNumber": 0,
      "certificatenumber": "string",
      "ecdate": "2022-01-20T12:16:46.016Z",
      "userid": 0,
      "searchfromdate": this.fromDate,
      "searchtodate": this.toDate,
      "kaveridrocode": 0,
      "kaverisrocode": 0,
      "kaverivillagecode": this.selectedvillagevalue,
      "kaverihoblicode": this.selectedhoblivalue,
      "pagecount": 0,
      "totalamount": 0,
      "submittedby": 0,
      "submitteddatetime": "2022-01-20T12:16:46.016Z",
      "acceptedby": 0,
      "acceptedon": "2022-01-20T12:16:46.016Z",
      "documentstatusid": 0,
      "preparedby": 0,
      "prepareddatetime": "2022-01-20T12:16:46.016Z",
      "signedby": 0,
      "signeddatetime": "2022-01-20T12:16:46.016Z",
      "appliedsignedcopy": true,
      "comparedby": 0,
      "compareddatetime": "2022-01-20T12:16:46.016Z",
      "eastboundary": this.east,
      "westboundary": this.west,
      "northboundary": this.north,
      "southboundary": this.south,
      "easttowest": this.eastToWest,
      "northtosouth": this.northToEast,
      "remarktoreprepareec": "string",
      "area": 0,
      "propertydescription": this.descriptionOfProperty,
      "measurementunitid": 0,
      "hectare": 0,
      "acre": 0,
      "gunta": 0,
      "cents": 0,
      "partyname": "string",
      "isnamesearch": true,
      "ispropertysearch": true,
      "isdocviewable": true,
      "cscapplicantid": 0,
      "firstname": "string",
      "middlename": "string",
      "lastname": "string",
      "address": "string",
      "pincode": "string",
      "mobilenumber": "string",
      "email": "string",
      "uid": "string",
      "ecid": 0,
      "operatorid": "string",
      "propertyNumberDetails": this.propDetails,
      "requiredfees": [
        {
          "ecpropertynoid": 0,
          "ecid": 0,
          "feeruleid": "string",
          "payableamount": 0,
          "ispaid": true,
          "serviceid": 0,
          "feedescription": "string"
        }
      ]
    }

    console.log(JSON.stringify(saveECdata));
    this.ecservice.saveEcData(saveECdata).subscribe(
      (data: any) => {
         if(data.responseCode == 200) {
          this.message = data.responseMessage;
          this.showToast(this.message);
          this.router.navigate(['/ec-search-result']);
         }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
    // localStorage.setItem("districtname", this.disTrict);
    // localStorage.setItem("talukname", this.talUka);
    // localStorage.setItem("hobliname", this.town);
    // localStorage.setItem("village", this.vilLage);
    // localStorage.setItem("east", this.east);
    // localStorage.setItem("west", this.west);
    // localStorage.setItem("north", this.north);
    // localStorage.setItem("south", this.south);
    // localStorage.setItem("northToSouth", this.northToEast);
    // localStorage.setItem("easttowest", this.eastToWest);
    // localStorage.setItem("unit", this.unit);
    // localStorage.setItem("description", this.descriptionOfProperty);
    // localStorage.setItem("fromDate", this.fromDate);
    // localStorage.setItem("toDate", this.toDate);
  }

  PropertyDocView() {
    console.log("1st", this.pdf);
    debugger;
    let ecdoc =
      // {
      //   "villageCode": this.selectedvillagevalue,
      //   "fromDate": this.fromDate,
      //   "toDate": this.toDate,
      //   // "propertyTypeId": [2,3],
      //   "propertyTypeId": this.propertyNumberTypeArray,
      //   // "propertyTypeValue": ["601","139/1"]
      //   "propertyTypeValue": this.propertyTypeValueArray
      // }
      // {
      //   "villageCode": 28541,
      //   "fromDate": "2003-06-01",
      //   "toDate": "2005-06-01",
      //   "propertyTypeId": [
      //     2,3
      //   ],
      //   "propertyTypeValue": [
      //     "601","139/1"
      //   ]
      // }

      // {
      //   "villageName": "mahadevpura",
      //   "hobliName": "hobli",
      //   "east": "road",
      //   "west": "temple",
      //   "south": "lake",
      //   "north": "pond",
      //   "apartmentOrVilamentNo": "201",
      //   "eastToWest": "22ft",
      //   "northToSouth": "sri",
      //   "propertyDesc": "abc",
      //   "area": "1acer",
      //   "villageCode": 28541,
      //   "fromDate": "2003-06-01",
      //   "toDate": "2005-06-01",
      //   "propertyType": [
      //     {
      //       "propertyTypeId": 2,
      //       "typenameinenglish": "Khata No"
      //     },
      //   {
      //       "propertyTypeId": 3,
      //       "typenameinenglish": "Site No"
      //     }
      //   ],
      //   "propertyTypeValue": [
      //     "601","139/1"
      //   ]
      // }

      {
        "villageName": this.vilLage,
        "hobliName": this.town,
        "east": this.east,
        "west": this.west,
        "south": this.south,
        "north": this.north,
        "apartmentOrVilamentNo": "",
        "eastToWest": this.eastToWest,
        "northToSouth": this.northToEast,
        "propertyDesc": this.descriptionOfProperty,
        "area": this.totalArea,
        "villageCode": this.selectedvillagevalue,
        "fromDate": this.fromDate,
        "toDate": this.toDate,
        "propertyType": this.arraywithTypeIdAndNameInEnglish,
        "propertyTypeValue": this.propertyTypeValueArray
      }


    console.log(ecdoc);

    this.ecservice.ecdocView(ecdoc).subscribe(
      (data: any) => {
        console.log('pdfffffff',data.result);
        if (data.result) this.Test(data.result);
      },
      (e) => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
          this.pdf="";
          this.message = "No Result Found";
          this.showToast(this.message);
        }
      }
    );
  }

  Test(base64: any) {
    debugger;
    const byteArray = new Uint8Array(
      atob(base64)
        .split("")
        .map((char) => char.charCodeAt(0))
    );
    const file = new Blob([byteArray], { type: "application/pdf" });
    const fileURL = URL.createObjectURL(file);
    this.pdf = fileURL;
    //console.log(this.pdf);
    document.querySelector("iframe").src = fileURL;
    localStorage.setItem("fileURL", this.pdf);
    //window.open(fileURL);
  }


  typeOfProperty(){
    this.propertyType = (document.getElementById("selectedPropertytType") as HTMLInputElement).value;
    this.agricultutalUnit = ""
    this.nonAgricultutalUnit = "";
  }
  agriculturalUnits(){
    this.agricultutalUnit = (document.getElementById("unitOfMeasurment") as HTMLInputElement).value;
  }
  nonAgriculturalUnits(){
    this.nonAgricultutalUnit = (document.getElementById("unitOfMeasurment") as HTMLInputElement).value;
  }

  printForm16(){
    const printBtn: HTMLElement = document.getElementById('print');
    this.printFoem16('form16Pdf');
  } 
  printFoem16(divId: string) {
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

  printForm15(){
    const printBtn: HTMLElement = document.getElementById('print');
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

  SavePDF() {
    var data = document.getElementById('form15Pdf');  //Id of the table
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
      pdf.save('ecfile.pdf'); // Generated PDF   
    });  
  }

  showToast(message) {
    notify({
      message: message,
      isVisiblesms: true,
      displayTime: 3000,
      height: 50,
      type: "success"
    });
  }

}
function form16Pdf(form16Pdf: any) {
  throw new Error('Function not implemented.');
}

