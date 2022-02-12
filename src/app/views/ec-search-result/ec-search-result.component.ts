import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { KaveriService } from "../../services/kaveri.service";
import { EcserviceService } from "../../services/ecservice.service";
import { EncumbranceCertificate } from "../../Models/encumbrance-certificate.model";
import notify from "devextreme/ui/notify";

@Component({
  selector: 'app-ec-search-result',
  templateUrl: './ec-search-result.component.html',
  styleUrls: ['./ec-search-result.component.scss']
})
export class EcSearchResultComponent implements OnInit {

  loggedinUser: string = "";

  applicantFirstName = "";
  applicantMiddleName = ""
  applicantLastName = "";


  disTrict: string = "";
  talUka: string = "";
  town: string = "";
  vilLage: string = "";
  west: string = "";
  north: string = "";
  east: string = "";
  south: string = "";
  eastToWest: string = "";
  northToSouth: string = "";
  units: string = "";
  description: string = "";

  applicationData: string = "";

  propertyTypeData: Array<any> = [];

  ecMasterData: any[];

  aadharNumber = "708279641444"

  doc: any;
  pdf: string = "";
  errorMessage = "";
  message = "";


  feePaidStatus = "";
  esignedErrorMessage = "";
  esignedPdf = "";
  Form22pdf: string = "";
  applicantAddress = "";

  sroname = "";

  fromDate: any;
  toDate: any;


  propertyDetails: any[];
  feeDetails: any[];
  sumofTotalAmount = ""
  propertyTypeArray: any[]=[];
  propertyTypeValueArray: any[]=[];
  propertyNumberDetailsArray: any[]=[];

  constructor(
    public router: Router,
    private kaveriService: KaveriService,
    private formBuilder: FormBuilder,
    private ecservice: EcserviceService
  ) {}

  ngOnInit(): void {

    this.getECMasterData();

    //this.PropertyDocView();

    // this.loggedinUser = localStorage.getItem('loggedinuser');
    // this.applicationData = localStorage.getItem('ApplicationData');
    // this.disTrict = localStorage.getItem('districtname');
    // this.talUka = localStorage.getItem('talukname');
    // this.town = localStorage.getItem('hobliname');
    // this.vilLage = localStorage.getItem('villagename');
    // this.west = localStorage.getItem('west');
    // this.north = localStorage.getItem('north');
    // this.east = localStorage.getItem('east');
    // this.south = localStorage.getItem('south');
    // this.eastToWest = localStorage.getItem('easttowest');
    // this.northToSouth = localStorage.getItem('northtoeast');
    // this.units = localStorage.getItem('unit');
    // this.description = localStorage.getItem('description');



    // this.propertyTypeData = [...JSON.parse(localStorage.getItem('propertyNumberTypeAndDetails'))];





    // console.log("prpdata", this.propertyTypeData);
    // console.log("prpdata", this.propertyTypeData.length);
  }

  getECMasterData(){
    debugger;
    //var applicationNum = localStorage.getItem('ApplicationData');
    var applicationNum = 'BSG-ECC-B-00054-2021-22';
    this.ecservice.getMasterEcData(applicationNum).subscribe(
      (data: any) => {
        console.log("ecdata", data);

        //this.ecMasterData = JSON.parse(data);

        let ecdata = JSON.parse(data[0].jsonData)


        console.log("rrr", ecdata);
        this.loggedinUser = ecdata.applicantName;
        this.applicantFirstName = ecdata.firstname;
        this.applicantMiddleName = ecdata.middlename;
        this.applicantLastName = ecdata.middlename;
        this.applicationData = ecdata.applicationnumber;
        this.disTrict = ecdata.districtnamee;
        this.talUka = ecdata.taluknamee;
        this.town = ecdata.hoblinamee;
        this.vilLage = ecdata.villagenamee;
        this.west = ecdata.west;
        this.north = ecdata.north;
        this.east = ecdata.east;
        this.south = ecdata.south;
        this.eastToWest = ecdata.easttowest;
        this.northToSouth = ecdata.northtosouth;
        this.description = ecdata.descriptionofproperty;
        this.fromDate = ecdata.fromdate;
        this.fromDate = ecdata.todate;
        this.sroname = ecdata.sronamee;
        this.propertyDetails = ecdata.propnumberdetails;
        console.log("propertry Details", this.propertyDetails);
        this.feeDetails = ecdata.feesdetails;

        console.log("prpde", this.feeDetails);
        this.sumofTotalAmount = this.feeDetails.reduce(function(sum, current) {
          return sum + current.payableamount;
        }, 0);
        console.log(this.sumofTotalAmount);

        this.PropertyDocView();

      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
  }



  PropertyDocView() {
    debugger;
    // this.propertyDetails = [
    //   {propertynotypeid: 13, propertynumbertype: 14, propertyDesc: "desc 1"},
    //   {propertynotypeid: 22, propertynumbertype: 24, propertyDesc: "desc 2"}
    // ]

    this.propertyTypeValueArray = this.propertyDetails.map(a => a.propdetails);


    // this.propertyTypeValueArray.push(result);

    this.propertyDetails.forEach((arr) => {
      debugger;
      let singleArray = {
        propertyTypeId: arr.propertynotypeid,
        typenameinenglish: arr.propertynumbertype,
      };


      this.propertyTypeArray.push(singleArray);
      console.log(this.propertyTypeArray);
    });



    let ecdoc =
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
        "apartmentOrVilamentNo": "201",
        "eastToWest": this.eastToWest,
        "northToSouth": this.northToSouth,
        "propertyDesc": this.description,
        "area": "1acer",
        "villageCode": 28541,
        "fromDate": this.fromDate,
        "toDate": this.toDate,
        "propertyType": this.propertyTypeArray,
        "propertyTypeValue": this.propertyTypeValueArray
      }
     console.log(ecdoc);

    this.ecservice.ecdocView(ecdoc).subscribe(
      (data: any) => {
        console.log('pdfffffff',data.result);
        if (data.result) this.Test(data.result);
      },
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
    console.log(this.pdf);
    document.querySelector("iframe").src = fileURL;
    //localStorage.setItem("fileURL", this.pdf);
    //window.open(fileURL);
  }

  sendForEsign(){
    if(this.feePaidStatus == ""){

      this.propertyDetails.forEach((arr) => {
        debugger;
        let SinglePropertyNumberDetails = {
          propertyNumberType: arr.propertynumbertype,
          propDetails: arr.propdetails,
        };


        this.propertyNumberDetailsArray.push(SinglePropertyNumberDetails);
        console.log("Propertynumberdetails",this.propertyNumberDetailsArray);
      });

      let dataForForm22 =
      {
        "applicationNumber": this.applicationData,
        "applicantName": this.applicantFirstName + " " + this.applicantMiddleName + " " + this.applicantLastName,
        "applicantAddress": this.applicantAddress,
        "fromDate": this.fromDate,
        "toDate": this.toDate,
        "propertyDesc": this.description,
        "districtname": this.disTrict,
        "sroName": this.sroname,
        "hobliName": this.town,
        "villageName": this.vilLage,
        "eastToWest": this.eastToWest,
        "northToSouth": this.northToSouth,
        "east": this.east,
        "west": this.west,
        "south": this.south,
        "north": this.north,
        "propertyNumberDetails": this.propertyNumberDetailsArray
      }

      // {
      //   "applicationNumber": "KEN-EC-A-1362956-2021-22",
      //   "applicantName": "Saurabh Bhattacharya",
      //   "applicantAddress": "A07, Uniworth Tranquil, 110/1, Doddabele Road,Kengeri Hobli, Bengaluru Urban",
      //   "fromDate": "2022-01-20T14:24:35.778Z",
      //   "toDate": "2022-01-20T14:24:35.778Z",
      //   "propertyDesc": "Propp Desc",
      //   "districtname": "Bengaluru Urban",
      //   "sroName": "Kengeri",
      //   "hobliName": "Kengeri Hobli 1",
      //   "villageName": "Kengeri",
      //   "eastToWest": "100",
      //   "northToSouth": "100",
      //   "east": "Land",
      //   "west": "Private Property",
      //   "south": "Land",
      //   "north": "LAnd",
      //   "propertyNumberDetails": [
      //     {
      //       "propertyNumberType": "Khata No",
      //       "propDetails": "601"
      //     },
      //    {
      //       "propertyNumberType": "Site No",
      //       "propDetails": "139/1"
      //     }
      //   ]
      // }
      this.ecservice.applyForEsign(dataForForm22).subscribe(
        (data: any) => {
          if (data.responseCode == 200) {
            // if (data.result) this.Test1(data.result);
            console.log(data.result);
            if (data.result)
            localStorage.setItem("base64Form22", data.result);
            {
              let esignedArray = {
                Base64PDF: data.result,
                AadharNumber: this.aadharNumber,
              };
              this.ecservice.esignPDF(esignedArray).subscribe(
                (data: any) => {
                  console.log(data);
                  if (data.htmlStr) {
                    const myWindow = window.open();
                    myWindow.document.open();
                    myWindow.document.write(data.htmlStr);
                    myWindow.document.close();
                    
                  }
                }
                , e => {
                  if (e.error) {
                    this.errorMessage = e.error.error_description;
                  }
                })
            }
          }
        }, e => {
          if (e.error) {
            this.errorMessage = e.error.error_description;
          }
        }
      )
    }
    else{
      this.esignedErrorMessage = "Required Fees is not been paid yet";
    }
  }

  MakePayment() {
    // let khajaneUrl = "";
    // let encData = "";
    // let deptRefNum = 787981;
    // let subDeptRefnum = "AJ";
    // khajaneUrl = "https://49.206.243.85:8443/PaymentGateway/api/PaymentGateway/PaymentGateway?refCode=" + deptRefNum + "&subRefCode=" + subDeptRefnum;
    // this.kaveriService.PaymentGateWay(khajaneUrl).subscribe(
    //   (data: any) => {
    //     console.log(data);
    //     if (data) {
    //       encData = data.encryptedStr;
    //     }
    //   }
    // )
    // if (encData) {
    let encData = "EwWP7w513mJ5kEOen+5V7O5RDnM0WyyRdMmpADsF7KEM8hfy8s/FC0mgvrbPJDboXd8zLj6AA9KT8nXwzqvxJCT99scXdCm2bExDU0sliJmXrpMlD8pMu1+ugUBAjPawQXeXi0A9ds7rt9c51JmWsTHIimTY22t95y7uE6kyY98=";
    let redirectUrl = "https://preprodk2.karnataka.gov.in/wps/portal/Home/DepartmentPayment/?uri=receiptsample:com.tcs.departmentpage:departmentportlet&encdata=" + encData + "&dept_code=33E";
    window.location.href = redirectUrl;

    //}
  }


  Test1(base64: any) {
    debugger;
    const byteArray = new Uint8Array(
      atob(base64)
        .split("")
        .map((char) => char.charCodeAt(0))
    );
    const file = new Blob([byteArray], { type: "application/pdf" });
    const Form22fileURL = URL.createObjectURL(file);
    this.Form22pdf = Form22fileURL;
    console.log(this.Form22pdf);
    //document.querySelector("iframe").src = this.Form22pdf;
    //localStorage.setItem("fileURL", this.pdf);
    window.open(Form22fileURL);
  }


  showToast(message) {
    notify({
      message: message,
      isVisiblesms: true,
      displayTime: 3000,
      height: 50,
      type: "warning"
    });
  }

}
