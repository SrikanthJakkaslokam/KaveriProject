import { Component, OnInit, ChangeDetectorRef, ViewChild } from "@angular/core";
import { DocumentapprovalService } from "../../services/documentapproval.service";
import { KaveriService } from "../../services/kaveri.service";
import { DatePipe } from "@angular/common";
import { DepartmentService } from "../../services/department.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import "rxjs/Rx";
import "rxjs/add/operator/map";
import "rxjs/add/operator/delay";
import "rxjs/add/operator/toPromise";
import { switchMap } from "rxjs-compat/operator/switchMap";
import { Router } from "@angular/router";

@Component({
  selector: "app-document-for-approval-preview",
  templateUrl: "./document-for-approval-preview.component.html",
  styleUrls: ["./document-for-approval-preview.component.scss"],
})
export class DocumentForApprovalPreviewComponent implements OnInit {
  vilLage;
  disTrict;
  talUka;
  town;
  survaynum;
  hissano;
  sroCode;
  propertytype: any = "Agricultural";
  dataSource: any[];
  loggedinUser: string = "";
  editRowID: any = "";
  editId: string;
  stampArticaleSelected = '';
   stampSubArticaleSelected = '';
   presenterIndividual='';
   presenterFirstName = '';
   presenterMiddleName = '';
   presenterLastName = '';
   presenterAge = '';
   presenterSex = '';
   presenterAddr = '';
   presenterPAN = '';
   presenterProfession = '';
   claimentOrganation = '';
   claimentFirstname = '';
   claimentMiddlename = '';
   claimentLastname = '';
   claimentAge = '';
   claimentSex = '';
   claimentAddress = '';
   claimentPan = '';
   claimentProfession = '';
   executantOrganization = '';
   executantOrganizationId = '';
   executantRegAddress = '';
   executantPAN = '';
   presentedFirstname = '';
   presentedMiddlename = '';
   presentedLastname = '';
   presentedAge = '';
   presentedSex = '';
   presentedAddress = '';
   presentedPAN = '';
   presentedProfession = '';
   witnessOrganation = '';
   witnessName = '';
   witnessAge = '';
   witnessSex = '';
   witnessAddress = '';
   witnessProfession = '';
   witnessIdentified = '';
   BoundariesDescription = '';
   BoundariesSouthboundary = '';
   BoundariesWestboundary = '';
   BoundariesEastboundary = '';
   BoundariesNorthboundary = '';
   prpertyNorthtosouth = '';
   prpertyEasttowest = '';
   prpertyTotalarea = '';
   prpertyScheduletype = '';

    sno = '1';
    SurveyNo:any;
    HissaNo:any;
    owner = '';
    relationship = '';
    relativename = '';
    avl_ext_acre = '';
    avl_ext_gunta = '';
    avl_ext_fgunta = '';

    stampartcileselected = '';
    stampsubartcleselected = '';

    c_sro = '';
    courT_ORDER_NUMBER = '';
    injuction_or_stay_flag = '';
    OrderDetails = '';
    c_survey_No:any;
    c_hissa_no:any;
    currentNumber = '';
    oldNumber = '';
    eastBoundary = '';
    northBoundary = '';
    westBoundary = '';
    southBoundary = '';
    area = '';
    description = '';
    displaypropertytypeNum: number = 1;
    indexValue: number = 1;
    arrayLength : any;
    courtOrderindexValue: number = 1;
 
    bhoomiMultyobject: any = [];
    newArrayDataOfOproperty: any = [];
    mapmultiProp: any =[];
    finalData: any = [];
    singleFinalData: any = [];
 
 
   propertyMaster = [];
  bhoomidata: any[];
  courtorder: any[];
  BhoomiOwners: any;
  propertyschedule: any = [];
  errorMessage: any;
  Claiment: any = [];
  Executant: any = [];
  WitnessInfo: any = [];
  claimentorganation: any;
  executantorganation: any;
  witnessorganation: any;
  date: any;
 
  TotalValuationAmount:any=0
  GovernmentDuty:any=0
  SurchargeValue:any=0
  CessValue:any=0
  ScanningFees:any=0
  MutationFees:any=0
  DenonationofStampDuty:any=0
  TotalStampDuty:any=0
  TotalRegistrationFees:any=0
  TotalPayableAmount:any=0;
  propertyDescription: any;
  DepartmentUser: string;
  DepartmentUserDesignation: string;
  ApplicationDate: string;
  ApplicationType: string;
  ApplicationNumber: string;
  execCount: any;
  propertyCount: any;
  marketFeeCount: any;
  checkedApprove: false;
  checkedNotApprove: false;
  isEditing: boolean = false;
  enableEditIndex = null;
  requestDetails = [];
  marketFeeCalculated: any = [];
  marketFeeCalculation: any;
  DeptData = [];
  ApprovedSentData = [];
  notApprovepopupVisible = false;
  approvepopupVisible = false;
  NORTH: string;
  SOUTH: string;
  EAST: string;
  WEST: string;
  EASTTOWEST: string;
  NORTHTOSOUTH: string;
  marketDesc = '';
  
  PropertyScheduleData: any[];
  singlePropertyScheduleData: any = [];
  propertyScheduleCount:any;
  scheduledIndexValue: number = 1;

  feecalculationdata: any[];
  singlefeecalculationdata: any = [];
  feecalculationdataCount:any;
  feecalculationIndexValue: number = 1;


  witnessInfo = [];
  witnessInfoCount:any;
  WitnessInfoTotalCount:any;

  Executantarray = [];
  Presentorarray = [];

  propertyInfoMaster: any = [];
  partyInfomasterTotalCount: any;
  singleInfoData: any = [];
  singlePartyPresenterInfo: any = [];
  singlePartyClaimantInfo: any =[];
  singlePartyExecutantInfo: any =[];
  PartyExecutantInfo: any =[];
  finalInfoExcutant: any =[];
  PartyClaimantInfo: any =[];
  finalInfoClaimant: any =[];
  PartyPresenterInfo: any =[];
  finalInfoPresenter: any =[];
  finalInfoExcutantCount: any;
  finalInfoClaimantCount: any;
  finalInfoPresenterCount: any;
  selectedSroCode = '';

  courtOrderMaster : any =[];
  courtOrderMasterCount : any;
  singleCourtData: any =[];
  courtOrderInfo: any =[];
  courtOrderInfoCount: number =0;



  claimantCount: number = 1;
  claimantTotalCount: number = 1;

  ExecutantCount: number =0;
  ExecutantTotalCount: number =2;
  sroname: string = "";
  PropertyDetails: MatTableDataSource<any>;
  regFeeArticleSelected: any;
  bookNumber: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private kaveriService: KaveriService,
    private documentapprovalservice: DocumentapprovalService,
    public datepipe: DatePipe,
    private departmentService: DepartmentService,
    private fb: FormBuilder,
    private _http: HttpClient,
    private router: Router
  ) {
    this.date = new Date();
    let latest_date = this.datepipe.transform(this.date, "yyyy-MM-dd");
  }

  ngOnInit() {
    
    this.DeptData = JSON.parse(localStorage.getItem("deptData"));
    console.log(this.DeptData[0].userid);

    this.DepartmentUser = localStorage.getItem("deptUser");
    this.DepartmentUserDesignation = localStorage.getItem("deptUserDesignation");
    this.ApplicationDate = localStorage.getItem("applnDate");
    this.ApplicationType = localStorage.getItem("applnType");
    this.ApplicationNumber = localStorage.getItem("applnNum");
    this.loggedinUser = localStorage.getItem("loggedinuser");
    this.GetPropertyCourtAndLiabilityData();
    this.GetOwnersData();
    this.GetcourtOrders();
    this.GetPartyinfodetails();
    this.GetPropertySchedule();
    this.getApplicationReview();
    this.FetchMarketandFeeData();
    this.GetWitnessInfoDetails();
  }

  GetPropertyCourtAndLiabilityData() {
    var master = {
      
      "applicationnumber": localStorage.getItem('applnNum')
    }
    this.documentapprovalservice.GetPropertyCourtAndLiabilityData_(master).subscribe(
      (data: any) => {
        console.log("property",data);
        this.propertyMaster = data.array_to_json;
        this.propertyCount = this.propertyMaster.length;
        this.singleFinalData = this.propertyMaster[this.indexValue-1];
        this.PropertyDetails = new MatTableDataSource(this.singleFinalData);
        this.singleFinalData.paginator = this.paginator;
        this.disTrict = this.singleFinalData.district;    
        this.town = this.singleFinalData.hobli;
        this.talUka = this.singleFinalData.taluk;
        this.vilLage = this.singleFinalData.village;
        this.sroCode =  this.singleFinalData.srocode;
        this.sroname =  this.singleFinalData.sroname;


        // this.sno =  this.singleFinalData.sronamee;
        this.SurveyNo =  this.singleFinalData.propertynumberdetails[0].survey_no;
        this.HissaNo =  this.singleFinalData.propertynumberdetails[0].hissa_no;
        
        this.owner =  this.singleFinalData.ownername;
        this.relationship =  this.singleFinalData.relationship;
        this.relativename =  this.singleFinalData.relativename;
        this.avl_ext_acre =  this.singleFinalData.transactextacre;
        this.avl_ext_gunta =  this.singleFinalData.transactextgunta;
        this.avl_ext_fgunta =  this.singleFinalData.transactextfgunta;
        
        this.stampartcileselected = this.singleFinalData.stamparticle;
        this.stampsubartcleselected = this.singleFinalData.stampsubarticle;
        this.regFeeArticleSelected = this.singleFinalData.registrationfeearticle;
        this.bookNumber = this.singleFinalData.bookname;

        this.GetcourtOrders();

          }, e => {
            if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
  }

  FetchMarketandFeeData() {
    
    var calculation = {
      applicationnumber: localStorage.getItem("applnNum"),
    };
    this.documentapprovalservice.Fetchfeecalculationdata(calculation).subscribe(
      (data: any) => {
        console.log("PropertySchedule",data);
        this.feecalculationdata = data;
        this.feecalculationdataCount = this.feecalculationdata.length;
        this.singlefeecalculationdata = this.feecalculationdata[this.feecalculationIndexValue-1];
        console.log('singlefee',this.singlefeecalculationdata);
        this.propertyDescription = (this.singlefeecalculationdata.propertyDescription);
        this.TotalValuationAmount = parseInt(this.singlefeecalculationdata.marketvalue);
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
  feecalculationBackButton(){
    if(this.feecalculationIndexValue==1){
      return
    }
    else{
      this.feecalculationIndexValue = this.feecalculationIndexValue-1;
      this.changefeecalculation();
    }
  }

  feecalculationFrontButton(){
    if(this.feecalculationIndexValue==this.feecalculationdataCount){
      return
    }
    else{
      this.feecalculationIndexValue = this.feecalculationIndexValue+1;
      this.changefeecalculation();
    }
  }
  changefeecalculation(){
    this.singlefeecalculationdata = this.feecalculationdata[this.feecalculationIndexValue-1];
    console.log('singlefee',this.singlefeecalculationdata);
    this.propertyDescription = (this.singlefeecalculationdata.propertyDescription);
    this.TotalValuationAmount = parseInt(this.singlefeecalculationdata.marketvalue);
    this.GovernmentDuty = parseInt(this.singlefeecalculationdata.stampduty);
    this.SurchargeValue = parseInt(this.singlefeecalculationdata.surcharge);
    this.CessValue = parseInt(this.singlefeecalculationdata.cess);
    this.ScanningFees = parseInt(this.singlefeecalculationdata.servicecharge);
    this.MutationFees = parseInt(this.singlefeecalculationdata.mutationfee);
    this.DenonationofStampDuty = parseInt(this.singlefeecalculationdata.deficitstampduty);
    this.TotalStampDuty = parseInt((this.GovernmentDuty + this.SurchargeValue + this.SurchargeValue + this.CessValue + this.ScanningFees + this.MutationFees + this.DenonationofStampDuty));
    this.TotalRegistrationFees = parseInt(this.singlefeecalculationdata.registrationfee);
    this.TotalPayableAmount = parseInt(this.TotalStampDuty + this.TotalRegistrationFees);
  }
  GetOwnersData() {
    var bhoomi = {
      applicationnumber: localStorage.getItem("applnNum"),
    };
    console.log(JSON.stringify(bhoomi));
    this.departmentService.GetOwners(bhoomi).subscribe(
      (data: any) => {
        console.log(data);
        this.BhoomiOwners = data;
        const filterdata = this.filterrowdataSLNO(data);
        this.BhoomiOwners = [...filterdata];
        this.BhoomiOwners.forEach((element) => {
          element.hissa = this.hissano;
          element.survey = this.survaynum;
        });
       
      },
      (e) => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    );
  }

  GetcourtOrders() {
    var court = {
      applicationnumber: localStorage.getItem("applnNum"),
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

  GetPartyinfodetails() {
        
    var application = {
      applicationnumber: localStorage.getItem("applnNum"),
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
              this.finalInfoPresenter = this.singlePartyPresenterInfo.at(-1);
              this.finalInfoPresenterCount = this.finalInfoPresenter.length;
              console.log("presenterInLoop", this.singlePartyPresenterInfo);
              console.log('presenter',this.PartyPresenterInfo );
            }


            if(this.singleInfoData.partytypeid == "1"){
              this.PartyClaimantInfo.push(this.singleInfoData);
              this.singlePartyClaimantInfo.push(this.PartyClaimantInfo.slice(0));
              this.finalInfoClaimant = this.singlePartyClaimantInfo.at(-1);
              this.finalInfoClaimantCount = this.finalInfoClaimant.length;
              console.log("ClaimantInLoop", this.singlePartyClaimantInfo);
            }

            if(this.singleInfoData.partytypeid == "2" && this.singleInfoData.isexecutor == true){
              this.PartyExecutantInfo.push(this.singleInfoData);
              this.singlePartyExecutantInfo.push(this.PartyExecutantInfo.slice(0));
              this.finalInfoExcutant = this.singlePartyExecutantInfo.at(-1);
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

  GetWitnessInfoDetails(){
    
      var applicationNum = {
        "applicationnumber": localStorage.getItem('ApplicationData')
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
  backButton(){
    if(this.indexValue==1){
      return
    }
    else{
      this.indexValue = this.indexValue-1;
      this.changeproperty();
    }
  }

  frontButton(){
    if(this.indexValue==this.propertyCount){
      return
    }
    else{
      this.indexValue = this.indexValue+1;
      this.changeproperty();
    }
  }
  changeproperty(){
      this.singleFinalData = this.propertyMaster[this.indexValue-1];
      this.PropertyDetails = new MatTableDataSource(this.singleFinalData);
      this.singleFinalData.paginator = this.paginator;
      console.log("single",this.singleFinalData);
      console.log(this.singleFinalData.districtnamee);
      this.disTrict = this.singleFinalData.districtnamee;
      this.talUka = this.singleFinalData.taluknamee;
      this.town = this.singleFinalData.hoblinamee;
      this.vilLage = this.singleFinalData.villagenamee;
      this.sroCode =  this.singleFinalData.srocode;
      this.sroname =  this.singleFinalData.sroname;

      this.SurveyNo =  this.singleFinalData.survery_no;
      this.HissaNo =  this.singleFinalData.hissa_no;
      this.owner =  this.singleFinalData.ownername;
      this.relationship =  this.singleFinalData.relationship;
      this.relativename =  this.singleFinalData.relativename;
      this.avl_ext_acre =  this.singleFinalData.transactextacre;
      this.avl_ext_gunta =  this.singleFinalData.transactextgunta;
      this.avl_ext_fgunta =  this.singleFinalData.transactextfgunta;
      this.stampartcileselected = this.singleFinalData.stamparticle;
      this.stampsubartcleselected = this.singleFinalData.stampsubarticle;
      this.regFeeArticleSelected = this.singleFinalData.registrationfeearticle;
      this.bookNumber = this.singleFinalData.bookname;
      this.GetcourtOrders();
  }

  GetPropertySchedule() {
    var application = {
      applicationnumber: localStorage.getItem("applnNum"),
    };
    this.documentapprovalservice.GetPropertyScheduledetails(application).subscribe(
      (data: any) => {
        console.log("PropertySchedule",data);
        this.PropertyScheduleData = data;
        this.propertyScheduleCount = this.PropertyScheduleData.length;
        this.singlePropertyScheduleData = this.PropertyScheduleData[this.scheduledIndexValue-1];
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
 scheduleBackButton(){
        if(this.scheduledIndexValue==1){
          return
        }
        else{
          this.scheduledIndexValue = this.scheduledIndexValue-1;
          this.changeScheduleproperty();
        }
      }

      scheduleFrontButton(){
        if(this.scheduledIndexValue==this.propertyScheduleCount){
          return
        }
        else{
          this.scheduledIndexValue = this.scheduledIndexValue+1;
          this.changeScheduleproperty();
        }
      }
      changeScheduleproperty(){
        this.singlePropertyScheduleData = this.PropertyScheduleData[this.scheduledIndexValue-1];
        console.log('singlescheduled',this.singlePropertyScheduleData)
        this.prpertyScheduletype = this.singlePropertyScheduleData.scheduletype;
        this.BoundariesNorthboundary = this.singlePropertyScheduleData.northboundary;
        this.prpertyTotalarea = this.singlePropertyScheduleData.totalarea;
        this.prpertyEasttowest = this.singlePropertyScheduleData.easttowest;
        this.prpertyNorthtosouth = this.singlePropertyScheduleData.northtosouth;
        this.BoundariesEastboundary = this.singlePropertyScheduleData.eastboundary;
        this.BoundariesWestboundary = this.singlePropertyScheduleData.westboundary;
        this.BoundariesSouthboundary = this.singlePropertyScheduleData.southboundary;
        this.BoundariesDescription = this.singlePropertyScheduleData.description;
        
      }

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

  status = ["Approved", "Not Approved"];

  Approve() {
    this.ApproveAndSend();
    this.showApproveInfo();
  }

  ApproveAndSend() {
    console.log(
      JSON.stringify(
        this.dataSource.map((x) => {
          return {
            reviewid: x.reviewid,
            issroapprove: x.status,
            sroremark: x.remarks,
            applicationnumber: localStorage.getItem("applnNum"),
            deptuserid: this.DeptData[0].userid,
          };
        })
      )
    );
    this.requestDetails = JSON.parse(
      JSON.stringify(
        this.dataSource.map((x) => {
          if (x.status === "Approved") {
            x.status = true;
          }
          if (x.status === "Not Approved") {
            x.status = false;
          }
          if (x.remarks === undefined) {
            x.remarks = "";
          }

          return {
            reviewid: x.reviewid,
            issroapprove: x.status,
            sroremark: x.remarks,
            applicationnumber: localStorage.getItem("applnNum"),
            deptuserid: this.DeptData[0].userid,
          };
        })
      )
    );
    console.log(this.requestDetails);

    var send = {
      applicationnumber: localStorage.getItem("applnNum"),
      currentstatus: "CD106",
      // "currentstatus": localStorage.getItem('applnStatusCode'),
      lastupdatedby: localStorage.getItem('deptUserid'),
      requestdetails: this.requestDetails
    };
    console.log(JSON.stringify(send));
    let isSuccess = false;

    this.departmentService.notApproveSend(send).subscribe(
      (data: any) => {
        if (data.length != 0) {
          console.log(data);
          this.ApprovedSentData = data;
        }
      },
      (e) => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
          
  }

  NotApproveAndSend() {
    console.log(
      JSON.stringify(
        this.dataSource.map((x) => {
          return {
            reviewid: x.reviewid,
            issroapprove: x.status,
            sroremark: x.remarks,
            applicationnumber: localStorage.getItem("applnNum"),
            deptuserid: this.DeptData[0].userid,
          };
        })
      )
    );
    this.requestDetails = JSON.parse(
      JSON.stringify(
        this.dataSource.map((x) => {
          if (x.status === "Approved") {
            x.status = true;
          }
          if (x.status === "Not Approved") {
            x.status = false;
          }
          if (x.remarks === undefined) {
            x.remarks = "";
          }

          return {
            reviewid: x.reviewid,
            issroapprove: x.status,
            sroremark: x.remarks,
            applicationnumber: localStorage.getItem("applnNum"),
            deptuserid: this.DeptData[0].userid,
          };
        })
      )
    );
    console.log(this.requestDetails);
    
    var send = {
      applicationnumber: localStorage.getItem("applnNum"),
      currentstatus: "CD110",
      // "currentstatus": localStorage.getItem('applnStatusCode'),
      lastupdatedby: localStorage.getItem('deptUserid'),
      requestdetails: this.requestDetails
    };
    console.log(JSON.stringify(send));
    this.departmentService.notApproveSend(send).subscribe(
      (data: any) => {
        if (data.length != 0) {
          console.log(data);
        }
      },
      (e) => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    );
  }

  shownotApproveInfo() {
    this.notApprovepopupVisible = true;
  }
  showApproveInfo() {
    this.approvepopupVisible = true;
  }
  closeApprove() {
    this.approvepopupVisible = false;
    this.router.navigateByUrl('/pending-application');
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
}
