import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { KaveriService } from '../../../services/kaveri.service';
import { DepartmentService } from '../../../services/department.service';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import notify from "devextreme/ui/notify";
import { Router } from '@angular/router';
import { MarketvaluationService } from '../../../services/marketvaluation.service';
import { DocumentapprovalService } from '../../../services/documentapproval.service';

@Component({
  selector: 'app-dfa',
  templateUrl: './dfa.component.html',
  styleUrls: ['./dfa.component.scss']
})
export class DFAComponent implements OnInit {
  show: boolean = false;
  courtOrderPopupVisible: boolean = false;
  marketValuationPopupVisible: boolean = false;
  courtOrderVisible: boolean = false;
  feeCalculationPopupVisible: boolean = false;
  displaypropertytypeNum: number = 1;
  numofprop: number = 1;
  errorMessage: string = "";
  selecteddistvalue: string = "";
  selectedtalukvalue: string = "";
  selectedhoblivalue: string = "";
  selectedvillagevalue: string = "";
  districtList: Array<any> = [];
  talukaList: Array<any> = [];
  hobliList: Array<any> = [];
  villageList: Array<any> = [];
  disTrict: string = "";
  talUka: string = "";
  town: string = "";
  vilLage: string = "";
  submitted = false;
  showtbl: boolean;
  showValuate = false;
  message: any;
  type;
  pType = 'agri';
  propertytypeid;
  feeForm = new FormGroup({
    district: new FormControl("", Validators.required),
    taluka: new FormControl("", Validators.required),
    hobli: new FormControl("", Validators.required),
    village: new FormControl("", Validators.required)
  });
  feecalculation = new FormGroup({

  });
  marketForm = new FormGroup({
    district: new FormControl("", Validators.required),
    taluka: new FormControl("", Validators.required),
    hobli: new FormControl("", Validators.required),
    village: new FormControl("", Validators.required),
    type: new FormControl('agri'),
    propertyType: new FormControl('1')
  });
  feecalculat
  feecalculationexempted = new FormGroup({
    checkbox: new FormControl("", Validators.required),
    percentage: new FormControl("", Validators.required),
    inpercentageorrupee: new FormControl("", Validators.required)
  });
  applicationNo: any;
  deptData: any;
  DepartmentUser: string;
  DepartmentUserDesignation: string;
  districtname;
  hoblinamee;
  taluknamee;
  villagenamee;
  totalarea;
  villagecode;
  units;
  refpropertytyperequest: any = {
    "refrenceparentpropertyid": 28
  }
  propertytype = []; 
  propertyTypeName;
  roadcode;
  products = [];
  Annexurerules = [];
  propertyid;
  finalamountofproperty = 0;
  TotalPercentageValuation = 0;
  ApplicationDate: string;
  ApplicationType: string;
  ApplicationNumber: string;
  constructor(
    private kaveriService: KaveriService,
    private route: ActivatedRoute,
    private router: Router,
    private marketvaluationService: MarketvaluationService,
    private departmentService: DepartmentService,
    private documentapprovalservice: DocumentapprovalService) { }

  ngOnInit() {
    this.District();
    const deptData = JSON.parse(localStorage.getItem("deptData"));
    this.DepartmentUser = localStorage.getItem('deptUser');
    this.DepartmentUserDesignation = localStorage.getItem('deptUserDesignation');
    if (deptData && deptData[0]) {
      this.deptData = deptData[0];
    }
    this.route.queryParams
      .filter(params => params.applicationNo)
      .subscribe(params => {
        this.applicationNo = params.applicationNo;
        this.ApplicationDate = params?.applicationDate;
        this.ApplicationType = params?.applicationType;
        this.getpropertydata();   
        this.GetPropertyCourtAndLiabilityData(); 
        }
      );
  }
  numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }
  changePT() {
    if(this.pType === 'agri') {
     this.GetAgriculturaldatafromApi();
      // this.FetchAgriculturalvaluationdetails();
    }else {
      this.GetPropertytypes();
    }
  }
  GetAgriculturaldatafromApi() {

    this.marketvaluationService.GetagriculturalRateDetails({roadcode:37999}).subscribe(
      (data: any) => {

        if (data.length != 0) {

          data.forEach(element => {
            element.rate = element.rate;
            // element.rate = parseInt(element.rate)
            // console.log("display the valuation ----",element.rate)
          });
          this.products = data;

          console.log(data);
          localStorage.setItem('Agricultural ratr details', data);
        }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
 

      try {
        var property = {
          "propertytypeid": this.propertytypeid
        }
        this.marketvaluationService.GetNonagriculturalAnnexurerules(property).subscribe(
          (data: any) => {
  
            if (data.length != 0) {
              this.Annexurerules = data;
              console.log(data);
            }
          }, e => {
            if (e.error) {
              this.errorMessage = e.error.error_description;
            }
          }
        )
      } catch (exe) {
        console.log("throw exception for annexure ", exe)
      }
    
  
    // this.marketvaluationService.GetAnnexurerules().subscribe(
    //   (data: any) => {

    //     if (data.length != 0) {
    //       data.forEach(element => {
    //         element['Amount'] = 0
    //         console.log("ghjkl", element.description)
    //       });
    //       data.forEach(element => {
    //         element.Yeschecked = false
    //         element.Nochecked = false
    //       });

    //       this.Annexurerules = data;

    //       console.log(data);
    //       this.FetchAgriculturalvaluationdetails()
    //     }
    //   }, e => {
    //     if (e.error) {
    //       this.errorMessage = e.error.error_description;
    //     }
    //   }
    // )
    
  }
  sronamee;
  survey_no;
  hissa_no;
  getpropertydata() {
    this.displaypropertytypeNum = 1
    this.kaveriService.GetPropertyMasterData(this.applicationNo).subscribe(
      (data: any) => {
        console.log((data))
        if (data && data.length) {
          this.numofprop = data && data.length || [];
          data.forEach(d => {
            this.districtname = d.districtname;
            this.taluknamee = d.taluknamee;
            this.hoblinamee = d.hoblinamee;
            this.villagenamee = d.villagenamee;
            this.sronamee = d.sronamee;
            this.survey_no = d.survey_no;
            this.hissa_no = d.hissa_no;
            this.units = d.units;
            this.totalarea = d.totalarea;
            this.propertytypeid = d?.propertytypeid;
            this.propertyid = d?.propertyid;
            this.villagecode = d?.villagecode;
          });
         
        }
        this.changePT();
      }
    )
  }
  propertyMaster;
  propertyCount;
  singleFinalData;
  PropertyDetails;
  sroCode;
  sroname;
  SurveyNo;
  HissaNo;
  owner;
  relationship;
  relativename;
  avl_ext_acre;
  avl_ext_gunta;
  avl_ext_fgunta;
  stampartcileselected;
  stampsubartcleselected;
  regFeeArticleSelected;
  bookNumber;
  
  GetPropertyCourtAndLiabilityData() {
    var master = {
      
      "applicationnumber": this.applicationNo
    }
    this.documentapprovalservice.GetPropertyCourtAndLiabilityData_(master).subscribe(
      (data: any) => {
        console.log("property",data);
        this.propertyMaster = data.array_to_json;
        this.propertyCount = this.propertyMaster.length;
        this.singleFinalData = this.propertyMaster[0];
        this.PropertyDetails = this.singleFinalData;
        this.disTrict = this.singleFinalData.district;    
        this.town = this.singleFinalData.hobli;
        this.talUka = this.singleFinalData.taluk;
        this.vilLage = this.singleFinalData.village;
        this.sroCode =  this.singleFinalData.srocode;
        this.sroname =  this.singleFinalData.sroname;


        // this.sno =  this.singleFinalData.sronamee;
        this.SurveyNo =  this.singleFinalData.propertynumberdetails[0].survey_no;
        this.HissaNo =  this.singleFinalData.propertynumberdetails[0].hissa_no;
        
        this.owner =  this.singleFinalData.partyinfopropnumberdetails?.[0]?.ownername;
        this.relationship =  this.singleFinalData.partyinfopropnumberdetails?.[0]?.relationship;
        this.relativename =  this.singleFinalData.partyinfopropnumberdetails?.[0]?.relativename;
        this.avl_ext_acre =  this.singleFinalData.partyinfopropnumberdetails?.[0]?.availableextacre;
        this.avl_ext_gunta =  this.singleFinalData.partyinfopropnumberdetails?.[0]?.availableextfgunta;
        this.avl_ext_fgunta =  this.singleFinalData.partyinfopropnumberdetails?.[0]?.availableextgunta;
        
        this.stampartcileselected = this.singleFinalData.stamparticle;
        this.stampsubartcleselected = this.singleFinalData.stampsubarticle;
        this.regFeeArticleSelected = this.singleFinalData.registrationfeearticle;
        this.bookNumber = this.singleFinalData.bookname;

        this.GetcourtOrders();
        this.GetPartyinfodetails();
        this.GetWitnessInfoDetails();
        this.GetPropertySchedule();
        this.FetchMarketandFeeData();
        this.getApplicationReview();
        this.getDocsSroExcutationDate();

          }, e => {
            if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
  }
  witnessorganation;
  WitnessInfo = [];
  WitnessInfoTotalCount = 0;
  courtorder = [];
  PropertyScheduleData = [];
  propertyScheduleCount = 0;
  singlePropertyScheduleData;
  prpertyScheduletype;
  BoundariesNorthboundary;
  prpertyTotalarea;
  prpertyEasttowest;
  prpertyNorthtosouth;
  BoundariesEastboundary;
  BoundariesWestboundary;
  BoundariesSouthboundary;
  BoundariesDescription;

  GetPropertySchedule() {
    var application = {
      applicationnumber: this.applicationNo,
    };
    this.documentapprovalservice.GetPropertyScheduledetails(application).subscribe(
      (data: any) => {
        console.log("PropertySchedule",data);
        this.PropertyScheduleData = data;
        this.propertyScheduleCount = this.PropertyScheduleData.length;
        this.singlePropertyScheduleData = this.PropertyScheduleData[0];
        this.prpertyScheduletype = this.singlePropertyScheduleData.scheduletype;
        this.BoundariesNorthboundary = this.singlePropertyScheduleData.northboundary;
        this.prpertyTotalarea = this.singlePropertyScheduleData.totalarea;
        this.prpertyEasttowest = this.singlePropertyScheduleData.easttowest;
        this.prpertyNorthtosouth = this.singlePropertyScheduleData.northtosouth;
        this.BoundariesEastboundary = this.singlePropertyScheduleData.eastboundary;
        this.BoundariesWestboundary = this.singlePropertyScheduleData.westboundary;
        this.BoundariesSouthboundary = this.singlePropertyScheduleData.southboundary;
        this.BoundariesDescription = this.singlePropertyScheduleData.description;
        // this.propertyDescription = this.BoundariesDescription;
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
  }
  feecalculationdata =[];
  feecalculationdataCount = 0;
  singlefeecalculationdata;
  propertyDescription;
  TotalValuationAmount;
  GovernmentDuty;
  SurchargeValue;
  CessValue;
  ScanningFees;
  MutationFees;
  DenonationofStampDuty;
  TotalStampDuty;
  TotalRegistrationFees;
  TotalPayableAmount;
  dataSource = [];
  status = ["Approved", "Not Approved"];

  getApplicationReview() {
    this.departmentService.fetchApplicationReview().subscribe(
      (data: any) => {
        if (data.length != 0) {
          console.log(data);
          this.dataSource = data;
        }
      },
      (e) => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    );
  }
  requestDetails;
  ApprovedSentData;
  DeptData=[];

  FetchMarketandFeeData() {
    
    var calculation = {
      applicationnumber: this.applicationNo,
    };
    this.documentapprovalservice.Fetchfeecalculationdata(calculation).subscribe(
      (data: any) => {
        console.log("PropertySchedule",data);
        this.feecalculationdata = data;
        this.feecalculationdataCount = this.feecalculationdata.length;
        this.singlefeecalculationdata = this.feecalculationdata[0];
        console.log('singlefee',this.singlefeecalculationdata);
        this.propertyDescription = (this.singlefeecalculationdata.propertyDescription);
        this.TotalValuationAmount = this.singlefeecalculationdata.marketvalue ?? 0;
        this.GovernmentDuty = parseInt(this.singlefeecalculationdata.stampduty);
        this.SurchargeValue = parseInt(this.singlefeecalculationdata.surcharge);
        this.CessValue = parseInt(this.singlefeecalculationdata.cess);
        this.ScanningFees = parseInt(this.singlefeecalculationdata.servicecharge);
        this.MutationFees = parseInt(this.singlefeecalculationdata.mutationfee);
        this.DenonationofStampDuty = parseInt(this.singlefeecalculationdata.deficitstampduty);
        this.TotalStampDuty = parseInt((this.GovernmentDuty + this.SurchargeValue + this.SurchargeValue + this.CessValue + this.ScanningFees + this.MutationFees + this.DenonationofStampDuty));
        this.TotalRegistrationFees = parseInt(this.singlefeecalculationdata.registrationfee);
        this.TotalPayableAmount = parseInt(this.TotalStampDuty + this.TotalRegistrationFees);
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
  }
  selectedSroName;
  selectedExcutionDateTime;
  getDocsSroExcutationDate() {
    debugger;
    var applicationnumber = {
      "applicationnumber": this.applicationNo
    }
    this.documentapprovalservice.fetchSroDeedDocExcutionDate(applicationnumber).subscribe(
      (data: any) => {
        //console.log("ssssss",data);
        this.selectedSroName = data[0].sronamee;
        this.selectedExcutionDateTime = data[0].executiondatetime;
        //this.Test(data[0].deedattachpath);
        this.getfileName(data[0].deedattachpath);
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
  }
  getfileName(fileNameUrl: any){
    let url = fileNameUrl;
    let fileName = url.substring(url.lastIndexOf('/') + 1);
    console.log('after trim', fileName)
    debugger;
    var filename = {
      "fileName": fileName
      //"fileName": "2af59126-8ac0-471a-94c3-b060b863de1b_E Swathu.pdf"
    }
    this.documentapprovalservice.getDeedDocument(filename).subscribe(
      (data: any) => {
        debugger;
        console.log("ssssss",data);
        this.Test(data.base64);
        //this.Test('http://www.africau.edu/images/default/sample.pdf');
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
  }

  Test(base64: any) {
    debugger;
    const byteArray = new Uint8Array(
      atob(base64)
        .split("")
        .map((char) => char.charCodeAt(0))
    );
    //const file = new Blob([byteArray], { type: "application/pdf" });
    //const fileURL = URL.createObjectURL(file);
    const fileURL = URL.createObjectURL(new Blob([byteArray] , {type:'application/pdf'}));
    document.querySelector("iframe").src = fileURL;
  }

  GetWitnessInfoDetails(){
    
    var applicationNum = {
      "applicationnumber":this.applicationNo
    }
    this.documentapprovalservice.GetWintnessInfo(applicationNum).subscribe(
      (data: any) => {

        if(data.length != 0) {
          data.forEach(element => {
            if(element.isorganization == "null" || element.isorganization == false){
              this.witnessorganation = "INDIVIDUAL"
            }else {
              this.witnessorganation = "ORGANIZATION"
            }
          });

           this.WitnessInfo = data;
           console.log('',this.WitnessInfo)
           this.WitnessInfoTotalCount = this.WitnessInfo.length;

        }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
}

  GetcourtOrders() {
    var court = {
      applicationnumber: this.applicationNo
    };
    console.log(JSON.stringify(court));

    this.kaveriService.courtorder(court).subscribe(
      (data: any) => {
        console.log(data);
        this.courtorder = data;
        const filterdata = this.filterrowdataSLNO(data);
        this.courtorder = [...filterdata];
      },
      (e) => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    );
  }

  propertyInfoMaster = [];
  partyInfomasterTotalCount = 0;
  singleInfoData;
  PartyPresenterInfo = [];
  singlePartyPresenterInfo = [];
  finalInfoPresenter = [];
  finalInfoPresenterCount = 0;
  PartyClaimantInfo = [];
  singlePartyClaimantInfo = [];
  finalInfoClaimant = [];
  finalInfoClaimantCount =0;
  PartyExecutantInfo = [];
  singlePartyExecutantInfo ;
  finalInfoExcutant;
  finalInfoExcutantCount = 0;

  GetPartyinfodetails() {
        
    var application = {
      applicationnumber: this.applicationNo,
    };
   
    this.documentapprovalservice.GetPartyinfodetails(application).subscribe(
      (data: any) => {

        this.propertyInfoMaster = data;
      this.partyInfomasterTotalCount = this.propertyInfoMaster.length;

          console.log("partyInfo",data);

          for (let i = 0; i < this.partyInfomasterTotalCount; i++) {

            this.singleInfoData =  this.propertyInfoMaster[i];

            if(this.singleInfoData.ispresenter==true){
              this.PartyPresenterInfo.push(this.singleInfoData);
              this.singlePartyPresenterInfo.push(this.PartyPresenterInfo.slice(0));
              this.finalInfoPresenter = this.singlePartyPresenterInfo[this.singlePartyPresenterInfo.length - 1];
              this.finalInfoPresenterCount = this.finalInfoPresenter.length;
              console.log("presenterInLoop", this.singlePartyPresenterInfo);
              console.log('presenter',this.PartyPresenterInfo );
            }


            if(this.singleInfoData.partytypeid == "1"){
              this.PartyClaimantInfo.push(this.singleInfoData);
              this.singlePartyClaimantInfo.push(this.PartyClaimantInfo.slice(0));
              this.finalInfoClaimant = this.singlePartyClaimantInfo[this.singlePartyClaimantInfo.length - 1];
              this.finalInfoClaimantCount = this.finalInfoClaimant.length;
              console.log("ClaimantInLoop", this.singlePartyClaimantInfo);
            }

            if(this.singleInfoData.partytypeid == "2" && this.singleInfoData.isexecutor == true){
              this.PartyExecutantInfo.push(this.singleInfoData);
              this.singlePartyExecutantInfo.push(this.PartyExecutantInfo.slice(0));
              this.finalInfoExcutant = this.singlePartyExecutantInfo[this.singlePartyExecutantInfo.length - 1];
              this.finalInfoExcutantCount = this.finalInfoExcutant.length;
              //this.singlePartyExecutantInfo = this.singleInfoData;
              console.log("ExecutantInLoop", this.finalInfoExcutant);
            }
          }



      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
  }
  filterrowdataSLNO(data) {
    data.forEach((currentValue, index) => {
      currentValue["sno"] = index + 1;
    });
    // if(data.length >=1 || data.length != undefined){
    //   data = data[0]
    // }
    return data;
  }

  changePTN() {
    console.log(this.propertyTypeName);
    if(this.propertyTypeName == 29) {
    }
    if(this.propertyTypeName == 1) {
      // this.GetBuildingRates()
    }
  }

  GetPropertytypes() {

    this.marketvaluationService.GetPropertyTypes(this.refpropertytyperequest).subscribe(
      (data: any) => {
        if (data.length != 0) {
          console.log(data);
          this.propertytype = data;
          this.propertyTypeName = data[0]?.propertytypeid;
          // this.GetNonAgriculturaldatafromApi();
          // this.propertytype.forEach(element => {
          //   var name = "Vacant Site"
          //   if (element.propertytypename === name) {
          //     this.PropertytypeId = element.propertytypeid
          //   }
          // });
        //  this.GetNonAgriculturaldatafromApi();
          // localStorage.setItem('PropertyTypesDetails', this.propertytype);
        }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
  }

  oncalculate() {
    this.showtbl = true;
  }

  get f() {
    return this.feeForm.controls;
  }
  showCourtOrders() {
    // this.courtOrderVisible = !this.courtOrderVisible;
    this.courtOrderPopupVisible = true;
  }
  showFeeCalculation() {
    this.feeCalculationPopupVisible = true;
  }
  showMarketValuation() {
    this.marketValuationPopupVisible = true;
  }
  District() {
    this.kaveriService.district().subscribe(
      (data: any) => {
        // console.log(data);
        if (data.length != 0) {
          this.districtList = data;
          if (this.feeForm.get("district").value != 0) {
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
    if (this.feeForm.get("district").value != 0) {

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
            this.selectedtalukvalue = this.feeForm.get("taluka").value;
            this.talukaList = data;
            if (this.feeForm.get("taluka").value != 0) {
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

    this.selectedtalukvalue = talukValue;
    if (this.feeForm.get("taluka").value != 0) {
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
            this.selectedhoblivalue = this.feeForm.get("hobli").value;
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

    this.selectedhoblivalue = hobliValue;
    if (this.feeForm.get("hobli").value != 0) {
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
  verifiedAndSend() {
    const deptData = JSON.parse(localStorage.getItem("deptData"));
    if (deptData && this.applicationNo) {
      const reqpayload = {
        "applicationnumber": this.applicationNo,
        "currentstatus": 'CD104',
        "lastupdatedby": deptData[0].userid.toString(),
      }
      this.departmentService.allocateSdaFda(reqpayload).subscribe(
        (res: any) => {
          if (res && res[0] && res[0].responseCode === 1000) {
            this.message = `Updated status successfully`;
            this.type = 'success';
            this.showToast();
            this.router.navigateByUrl('/sda-fda-landing-page');
          } else {
            this.message = `Failed to update status`;
            this.type = 'error';
            this.showToast();
          }
        }, e => {
          if (e.error) {
            this.errorMessage = e.error.error_description;
          }
        }
      );
    }
  }
  sroApproval() {
    const reqpayload = {
      "applicationnumber": this.applicationNo,
      "currentstatus": 'CD105',
      "lastupdatedby": this.deptData.userid.toString(),
    }
    this.departmentService.allocateSdaFda(reqpayload).subscribe(
      (res: any) => {
        if (res && res[0] && res[0].responseCode === 1000) {
          this.message = `Approved successfully`;
          this.type = 'success';
          this.showToast();
          this.router.navigateByUrl('/returned-applications');
        } else {
          this.message = `Failed to approve`;
          this.type = 'error';
          this.showToast();
        }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    );
  }
  showToast() {
    notify({
      message: this.message,
      isVisible: true,
      displayTime: 6000,
      height: 50,
      type: this.type
    });
  }
}
