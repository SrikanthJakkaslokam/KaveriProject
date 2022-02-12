import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import notify from 'devextreme/ui/notify';
import { CcserviceService } from '../../services/ccservice.service';
import { KaveriService } from '../../services/kaveri.service';

@Component({
  selector: 'app-cc-search',
  templateUrl: './cc-search.component.html',
  styleUrls: ['./cc-search.component.scss']
})
export class CcSearchComponent implements OnInit {

  loggedinUser: string = "";
  applicationData: string = "";
  ccForm:FormGroup;

  submitted = false;

  districtList: Array<any> = [];
  selecteddistvalue: string = "";
  districterrorMessage: string = "";
  disTrict: string = "";

  documenttypeList: Array<any> = [];
  selecteddocumenttypevalue: string = "";
  documenttypeerrorMessage: string = "";
  documentType: string = "";

  sroList: Array<any> = [];
  selectedsrovalue: string = "";
  sroerrorMessage: string = "";
  sro: string = "";

  booktypeList: Array<any> = [];
  selectedbooktypevalue: string = "";
  booktypeerrorMessage: string = "";
  booktype: string = "";

  registrationyearList: Array<any> = [];
  selectedregistrationyearvalue: string = "";
  registrationyearerrorMessage: string = "";
  registrationyear: string = "";

  ccotp : string = "";
  otpvalid : boolean = false;
  otpmsg : string = "";
  otpmsgSuccess: string = "";
  otpSentSuccess: string = "";

  digitallySignedisChecked = false;
  isChecked = false;

  searchStatus : boolean;

  errorMessage: string = "";
  pdf: string = "";

  message: string = "";

  documentnumber:any;

  constructor(public router: Router, private formBuilder: FormBuilder,private kaveriService: KaveriService,private ccservice: CcserviceService,) { }

  ngOnInit(): void {

    this.loggedinUser = localStorage.getItem('loggedinuser');
    this.applicationData = localStorage.getItem('ApplicationData');

    this.District();
    this.getDocumentType();
    this.getSRO();
    this.getBookType();
    this.getRegistraionYear();


    this.ccForm = this.formBuilder.group({
      district: ["", Validators.required],
      documenttype: ["", Validators.required],
      sro: ["", Validators.required],
      booktype: ["", Validators.required],
      registrationyear: ["", Validators.required],
    });

    // this.District();

  }


  District() {
    this.ccservice.district().subscribe(
    (data: any) => {
      console.log(data);
      if (data.length != 0) {
        this.districtList = data;
        console.log(this.districtList);
        if (this.ccForm.get("district").value != 0) {
          // this.Taluka();
        }
      }
    }, e => {
      if (e.error) {
        this.districterrorMessage = "District is Required";
      }
    }
  )
}

ondistrictValuechange(distValue) {
  this.selecteddistvalue = distValue;
  console.log(this.selecteddistvalue);
  if (this.ccForm.get("district").value != 0) {
    debugger
    // this.Taluka();
  }
}

ondistrictChange($event) {
  if ($event != "") {
    let text1 = $event.target.options[$event.target.options.selectedIndex].text;
    this.disTrict = text1;
  }
}


getDocumentType() {
  this.ccservice.documenttype().subscribe(
  (data: any) => {
    console.log(data);
    if (data.length != 0) {
      this.documenttypeList = data;
      console.log(this.documenttypeList);
      if (this.ccForm.get("documenttype").value != 0) {
        // this.Taluka();
      }
    }
  }, e => {
    if (e.error) {
      this.districterrorMessage = "Document type is Required";
    }
  }
)
}

ondocumenttypeValuechange(documenttypevalue) {
this.selecteddocumenttypevalue = documenttypevalue;
console.log(this.selecteddocumenttypevalue);
if (this.ccForm.get("documenttype").value != 0) {
  debugger
  // this.Taluka();
}
}

ondocumenttypeChange($event){
  if ($event != "") {
    let text1 = $event.target.options[$event.target.options.selectedIndex].text;
    this.documentType = text1;
  }
}



getSRO() {
  this.ccservice.sro().subscribe(
  (data: any) => {
    console.log(data);
    if (data.length != 0) {
      this.sroList = data;
      console.log(this.sroList);
      if (this.ccForm.get("sro").value != 0) {
        // this.Taluka();
      }
    }
  }, e => {
    if (e.error) {
      this.sroerrorMessage = "SRO is Required";
    }
  }
)
}

onsroValuechange(srovalue) {
this.selectedsrovalue = srovalue;
console.log(this.selectedsrovalue);
if (this.ccForm.get("sro").value != 0) {
  debugger
  // this.Taluka();
}
}

onsroChange($event){
  if ($event != "") {
    let text1 = $event.target.options[$event.target.options.selectedIndex].text;
    this.sro = text1;
  }
}



getBookType() {
  this.ccservice.booktype().subscribe(
  (data: any) => {
    console.log(data);
    if (data.length != 0) {
      this.booktypeList = data;
      console.log(this.booktypeList);
      if (this.ccForm.get("booktype").value != 0) {
        // this.Taluka();
      }
    }
  }, e => {
    if (e.error) {
      this.booktypeerrorMessage = "SRO is Required";
    }
  }
)
}

onbooktypeValuechange(booktypevalue) {
this.selectedbooktypevalue = booktypevalue;
console.log(this.selectedbooktypevalue);
if (this.ccForm.get("booktype").value != 0) {
  debugger
  // this.Taluka();
}
}

onbooktypeChange($event){
  if ($event != "") {
    let text1 = $event.target.options[$event.target.options.selectedIndex].text;
    this.booktype = text1;
  }
}


getRegistraionYear() {
  this.ccservice.registrationyear().subscribe(
  (data: any) => {
    console.log(data);
    if (data.length != 0) {
      this.registrationyearList = data;
      console.log("reg", this.registrationyearList);
      if (this.ccForm.get("registrationyear").value != 0) {
        // this.Taluka();
      }
    }
  }, e => {
    if (e.error) {
      this.registrationyearerrorMessage = "SRO is Required";
    }
  }
)
}

onregistrationyearValuechange(registrationyearvalue) {
this.selectedregistrationyearvalue = registrationyearvalue;
console.log(this.selectedregistrationyearvalue);
if (this.ccForm.get("registrationyear").value != 0) {
  debugger
  // this.Taluka();
}
}

onregistrationyearChange($event){
  if ($event != "") {
    let text1 = $event.target.options[$event.target.options.selectedIndex].text;
    this.registrationyear = text1;
  }
}






sendotp(){
  debugger;
  //var mobile = localStorage.getItem('usermobile');
  var mobile = "9845803218";
  console.log(mobile);
  this.ccservice.ccOTP(mobile).subscribe(
    (dataotp: any) => {
      if (dataotp != undefined) {
        debugger;
        this.ccotp = dataotp.otp;
        this.otpSentSuccess = "OTP Sent successfully";
      }
    }
  )
}
verifyotp(){
  this.otpmsgSuccess="";
  this.otpmsg = "";
  if(this.ccotp != ""){
    if( (document.getElementById("otp") as HTMLInputElement).value == this.ccotp){
      this.otpvalid = true;
      this.otpmsgSuccess = "OTP Validation successfully";
      }
      else{
        this.otpvalid = false;
        if((document.getElementById("otp") as HTMLInputElement).value != null){
        this.otpmsg = "Enter valid OTP";
      }
    }
  }
}

PropertyDocView() {
  console.log('1st',this.pdf);
  debugger;
  var searchdata = {
    "documenttype": parseInt(this.selecteddocumenttypevalue),
    "districtcode": parseInt(this.selecteddistvalue),
    "srocode": parseInt(this.selectedsrovalue),
    "documentnumber": this.documentnumber,
    // "booktype": parseInt(this.selectedbooktypevalue),
    "booktype": 2,
    "yearofregistration": this.selectedregistrationyearvalue
    // "documenttype": 2,
    // "districtcode": 34,
    // "srocode": 2,
    // "documentnumber": "33333",
    // "booktype": 2,
    // "yearofregistration": "2021"
  };
  this.ccservice.ccSearchdocView(searchdata).subscribe(
    (data: any) => {
      console.log(data.result)
      //console.log(this.pdf);
      // this.pdf = (data['pdfPath']);
      //this.pdf = "data:application/pdf;base64,"+ data.result;
      console.log(data.result)
      if(data.responseCode == "1234"){
        debugger;
        this.searchStatus = false;
      }
      else{
        this.searchStatus = true;
        this.Test(data.result);
      }

    }
    , e => {
      if (e.error) {
        this.errorMessage = e.error.error_description;
      }
    }
  )
}
Test(base64: any) {
  alert(this.searchStatus);
  debugger
  const byteArray = new Uint8Array(
    atob(base64)
      .split("")
      .map(char => char.charCodeAt(0))
  );
  const file = new Blob([byteArray], { type: "application/pdf" });
  const fileURL = URL.createObjectURL(file);
  this.pdf =fileURL;
  //console.log(this.pdf);
  document.querySelector("iframe").src = fileURL;
  //window.open(fileURL);
}

onsearchValidation(){

  this.documentnumber = (document.getElementById("documentnumber") as HTMLInputElement).value;

  if(this.documentType == ''){
    alert("Select the District");
  }
  else if(this.disTrict == ''){
    alert("Select the Document Type");
  }
  else if(this.sro == ''){
    alert("Select the SRO");
  }
  else if(this.documentnumber == ''){
    alert("Enter the Document Number");
  }
  else if(this.booktype == ''){
    alert("Select the Book Type");
  }
  else if(this.registrationyear == ''){
    alert("Select the Year Of Registration");
  }
  // else if(this.otpvalid != true){
  //   alert("Validate the OTP")
  // }
  else if(!this.digitallySignedisChecked) {
    // console.log('Checkbox cannot be unchecked...');
  }
  else{
    this.PropertyDocView();
    //this.Test(this.pdf);
  }
}

onsearch(){
  this.onsearchValidation();
}

// onsubmit(){
//   if(this.documentType == ''){
//     alert("Select the District");
//   }
//   else if(this.disTrict == ''){
//     alert("Select the Document Type");
//   }
//   else if(this.sro == ''){
//     alert("Select the SRO");
//   }
//   else if(this.documentnumber == ''){
//     alert("Enter the Document Number");
//   }
//   else if(this.booktype == ''){
//     alert("Select the Book Type");
//   }
//   else if(this.registrationyear == ''){
//     alert("Select the Year Of Registration");
//   }
//   // else if(this.otpvalid != true){
//   //   alert("Validate the OTP")
//   // }
//   else if(!this.digitallySignedisChecked) {
//     // console.log('Checkbox cannot be unchecked...');
//   }
//   else if(!this.isChecked) {

//   }else{
//     // this.router.navigate(['/cc-search-result']);
//   }
// }


onsubmit(){
  let saveCCapplicationlData = {
    // "ccid": null,
    // "ccnumber": null,
    // "ccdate": null,
    // "userid": 2,
    // "documenttype": this.selecteddocumenttypevalue,
    // "kaveridrocode": null,
    // "kaverisrocode": this.selectedsrovalue,
    // "documentnumber": this.documentnumber,
    // "booktype": this.selectedbooktypevalue,
    // "yearofregistration": this.selectedregistrationyearvalue,
    // "pagecount": null,
    // "totalamount": null,
    // "isappliedforsignedcopy": true,
    // "documentstatusid": null,
    // "submittedby": null,
    // "submitteddatetime": null,
    // "preparedby": null,
    // "prepareddatetime": null,
    // "signedby": 1,
    // "signeddatetime": null,
    // "appliedsignedcopy": null,
    // "comparedby": null,
    // "compareddatetime": null,
    // "certificatenumber": null,
    // "accepteddatetime": null,
    // "marriagetypeid": null,
    // "firmtypeid": null

    "ccid": null,
    "ccnumber": "9999999",
    "ccdate": "2023-12-19",
    "userid": 2,
    "documenttype": parseInt(this.selecteddocumenttypevalue),
    "kaveridrocode": 2,
    "kaverisrocode": parseInt(this.selectedsrovalue),
    "documentnumber": this.documentnumber,
    "booktype": parseInt("10"),
    "yearofregistration": this.selectedregistrationyearvalue,
    "pagecount": 8,
    "totalamount": 20000,
    "isappliedforsignedcopy": true,
    "documentstatusid": 1,
    "submittedby": 1,
    "submitteddatetime": "2021-12-20",
    "preparedby": 1,
    "prepareddatetime": "2021-12-18",
    "signedby": 1,
    "signeddatetime": "2021-12-20",
    "appliedsignedcopy": true,
    "comparedby": 2,
    "compareddatetime": "2021-12-20",
    "certificatenumber": "BMH-CC-A-017566-2018-19",
    "accepteddatetime": "2021-12-20",
    "marriagetypeid": 1,
    "firmtypeid": 2

  }


console.log(JSON.stringify(saveCCapplicationlData));
this.ccservice.saveCCApplicationData(saveCCapplicationlData).subscribe(
  (data: any) => {
    if (data.responseCode == 1000) {
      this.message = data.responseMessage;
      this.showToast(data.responseMesg);
      // this.router.navigate(['/dashboard']);
    }
  }, e => {
    if (e.error) {
      this.errorMessage = e.error.error_description;
    }
  }
)
}


showToast(message) {
  notify({
    message: message,
    isVisiblesms: true,
    displayTime: 3000,
    height: 50,
    type: "info"
  });

}

}
