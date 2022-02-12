import { Component, OnInit, ViewChild } from '@angular/core';
import { DocumentapprovalService } from '../../services/documentapproval.service';
import { KaveriService } from '../../services/kaveri.service';
import { DatePipe } from '@angular/common'
import { HttpClient } from '@angular/common/http';
import { DepartmentService } from '../../services/department.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import notify from 'devextreme/ui/notify';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import  {  PdfViewerModule  }  from  'ng2-pdf-viewer';

@Component({
  selector: 'app-view-document-for-approval',
  templateUrl: './view-document-for-approval.component.html',
  styleUrls: ['./view-document-for-approval.component.scss']
})
export class ViewDocumentForApprovalComponent implements OnInit {
  vilLage;
  disTrict;
  talUka;
  town;
  survaynum ;
  hissano;
  sroCode;
  propertytype:any = "";

  loggedinUser: string = "";
  //Presenter
  firstNameP: string = "";
  middleNameP: string = "";
  lastNameP: string = "";
  ageP: string = "";
  sexP: string = "";
  addressP: string = "";
  panP: string = "";
  professionP: string = "";
  storedPresenter: any;
  presenterStored: any[];
  //Executant
  firstNameE: string = "";
  middleNameE: string = "";
  lastNameE: string = "";
  ageE: string = "";
  sexE: string = "";
  addressE: string = "";
  panE: string = "";
  professionE: string = "";
  storedExecutant: any;
  executantStored: any[];
  infodata: any[];

  bhoomidata: any[];
  courtorder: any[];
  BhoomiOwners:any ;
  propertyschedule :any =[];
  errorMessage: any;
  Claiment :any =[];
  Executant:any =[];
  WitnessInfo :any = [];
  claimentorganation :any;
  executantorganation:any;
  witnessorganation:any;
  date:any;
  TotalValuationAmount:any=0
  considerationAmount: any=0;
  GovernmentDuty:any=0
  SurchargeValue:any=0
  CessValue:any=0
  ScanningFees:any=0
  MutationFees:any=0
  DenonationofStampDuty:any=0
  TotalStampDuty:any=0
  TotalRegistrationFees:any=0
  TotalPayableAmount:any=0;
  propertyDescription:any;
  ApplicationNum: string;
  constructor(private http: HttpClient, private kaveriService: KaveriService,private documentapprovalservice : DocumentapprovalService,public datepipe: DatePipe,  private departmentService: DepartmentService, public router: Router, private sanitizer: DomSanitizer) {
    this.date=new Date();
    let latest_date =this.datepipe.transform(this.date, 'yyyy-MM-dd');
   }

   fileName = '';

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
    validationOfSro = '';
    validationOfDeedDoc = '';
    deedDocPath = '';


   getSRO: string = "";
   message: string = "";
   responceSRO: any = [];
   getsro: Array<any> = [];
   renSRO: any = [];
   sroname: string = "";

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
  propertyCount:any;
  dataSource: any[];
  PropertyDetails: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  PropertyScheduleData: any[];
  singlePropertyScheduleData: any = [];
  propertyScheduleCount:any;
  scheduledIndexValue: number = 1;

  feecalculationdata: any[];
  singlefeecalculationdata: any = [];
  feecalculationdataCount:any;
  feecalculationIndexValue: number = 1;

  marketfeecalculationdata: any[];
  singlemarketfeecalculationdata: any = [];
  marketfeecalculationdataCount:any;
  marketfeecalculationIndexValue: number = 1;


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

  deptIds: any =[];
  deptIdss: any =[];

  claimantCount: number = 1;
  claimantTotalCount: number = 1;

  ExecutantCount: number =0;
  ExecutantTotalCount: number =2;

  isChecked = false;

  fileToUpload: File | null = null;

  propertyData = [];
  TotalPropertyCount: any;
  PropertyIndexValue: number = 1;
  singlePropertyData: any = [];
  booknamenameselected: any;
  bookId: any;
  regFeeArticleSelected: any;

  liability_sro : any;
  liability_OrderNo: any;
  liability_Details: any;
  liability_Amount: any;
  liability_IssuedDate: any;
  liability_IssuedBy: any;

  propertyTypeId: any;
  movablepropertydesc: any;
  ismovableproperty: boolean;
  singlePropertyDetailsData: any = [];

  sellerName = ""; 
  nonagriDesc = "";
  nonagriTotalarea = "";

  pdfUrl: any;
  DeedPath: any;
  selectedSroName = "";
  selectedExcutionDateTime: Date;
  url: any;



  ngOnInit(): void {
    //this.loggedinUser = localStorage.getItem('loggedinuser');
    this.ApplicationNum = localStorage.getItem('ViewApplicationNum');
    //this.ApplicationNum = 'PRP-07022022-03300';

    this.getDocsSroExcutationDate();

    this.GetPropertyData();

    //this.GetPropertyMasterData();
    this.GetWitnessInfoDetails();
     this.GetPartyinfodetails();
     this.GetPropertySchedule();
     this.GetMarketValuationAndFeeCalculationAmounts();


     this.marketAndConsideration()
     
  }


  getDocsSroExcutationDate() {
    debugger;
    var applicationnumber = {
      "applicationnumber": this.ApplicationNum
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


  // Test(pdfurl1: any) {
  //   debugger;
  //   document.querySelector("iframe").src = pdfurl1;
  // }


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


aaa(){
  debugger;
  this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://csg100320019e05454d.file.core.windows.net/documents/files/c4de1130-4960-43f9-98c0-bdc4d6114ffa_witness.PNG?sv=2020-12-06&se=2022-02-09T04%3A13%3A19Z&sr=f&sp=r&sig=Vuna5rqEVWdBJPL5pNWWb9%2BO28dm4STf2B1TGzxbXFM%3D');
}


  GetPropertyData(){
    debugger;
    var master = {
      //"applicationnumber": "PRP-27012022-02753"
      //"applicationnumber": "PRP-28012022-02816"
      //"applicationnumber": localStorage.getItem('ApplicationData')
      "applicationnumber": this.ApplicationNum
    }
    this.documentapprovalservice.GetPropertyCourtAndLiabilityData(master).subscribe(
      (data: any) => {
        console.log("property",data);
        // let pData = data;
        this.propertyData = data.array_to_json;
        this.TotalPropertyCount = data.array_to_json.length;
        // console.log('count',this.TotalPropertyCount);
        // console.log("property1", data.array_to_json[0].partyinfopropnumberdetails[0].ownername);

        //this.deptIds = this.propertyData.map(a => a.liabilitydata[0].drocode);
        this.deptIds = this.propertyData.map(a => a.villagecode);
        
        this.deptIdss = this.deptIds.map(item=>{
          return {'deptid': item}
        })

        

        this.singlePropertyData = data.array_to_json[this.indexValue-1];
        this.PropertyDetails = new MatTableDataSource(this.singlePropertyData);
        this.singlePropertyData.paginator = this.paginator;
        // console.log("single prop",this.singlePropertyData);
        // console.log("single prop owner", this.singlePropertyData.partyinfopropnumberdetails[0].ownername);

        //Property Details
        this.propertyTypeId = this.singlePropertyData.propertytypeid;
        this.ismovableproperty = this.singlePropertyData.ismovableproperty;
        
        if(this.propertyTypeId == 1001 && this.ismovableproperty==true){
          this.movablepropertydesc = this.singlePropertyData.movablepropertydesc;
          this.disTrict = this.singlePropertyData.district;
          this.talUka = this.singlePropertyData.taluk;
          this.town = this.singlePropertyData.hobli;
          this.vilLage = this.singlePropertyData.village;
          this.sroCode =  this.singlePropertyData.srocode;
          this.sroname =  this.singlePropertyData.sroname;
          this.propertytype = this.singlePropertyData.propertytypenamee;
          this.stampartcileselected = this.singlePropertyData.stamparticle;
          this.regFeeArticleSelected = this.singlePropertyData.registrationfeearticle;
          this.stampsubartcleselected = this.singlePropertyData.stampsubarticle;
          this.booknamenameselected = this.singlePropertyData.bookname;
          this.bookId = this.singlePropertyData.bookid;
          this.liability_sro = this.singlePropertyData.liabilitydata[0].srocode;
          this.liability_OrderNo = this.singlePropertyData.liabilitydata[0].ordernumber;
          this.liability_Details = this.singlePropertyData.liabilitydata[0].liabilitynote;
          this.liability_Amount = this.singlePropertyData.liabilitydata[0].amount;
          this.liability_IssuedDate = this.singlePropertyData.liabilitydata[0].issuedate;
          this.liability_IssuedBy = this.singlePropertyData.liabilitydata[0].issuedby;
        }

        if(this.propertyTypeId == "17"){
          this.disTrict = this.singlePropertyData.district;
          this.talUka = this.singlePropertyData.taluk;
          this.town = this.singlePropertyData.hobli;
          this.vilLage = this.singlePropertyData.village;
          this.sroCode =  this.singlePropertyData.srocode;
          this.sroname =  this.singlePropertyData.sroname;
          this.propertytype = this.singlePropertyData.propertytypenamee;
          // this.SurveyNo =  this.singlePropertyData.propertynumberdetails[0].survey_no;
          // this.HissaNo =  this.singlePropertyData.propertynumberdetails[0].hissa_no;
          // this.owner =  this.singlePropertyData.partyinfopropnumberdetails[0].ownername;
          // this.relationship =  this.singlePropertyData.partyinfopropnumberdetails[0].relationship;
          // this.relativename =  this.singlePropertyData.partyinfopropnumberdetails[0].relativename;
          // this.avl_ext_acre =  this.singlePropertyData.partyinfopropnumberdetails[0].availableextacre;
          // this.avl_ext_gunta =  this.singlePropertyData.partyinfopropnumberdetails[0].availableextgunta;
          // this.avl_ext_fgunta =  this.singlePropertyData.partyinfopropnumberdetails[0].availableextfgunta;
          this.stampartcileselected = this.singlePropertyData.stamparticle;
          this.stampsubartcleselected = this.singlePropertyData.stampsubarticle;
          this.booknamenameselected = this.singlePropertyData.bookname;
          this.bookId = this.singlePropertyData.bookid;
          this.regFeeArticleSelected = this.singlePropertyData.registrationfeearticle;

          if(this.singlePropertyData.partyinfopropnumberdetails == null){
            this.SurveyNo =  "";
            this.HissaNo =  "";
            this.owner =  "";
            this.relationship =  "";
            this.relativename =  "";
            this.avl_ext_acre =  "";
            this.avl_ext_gunta =  "";
            this.avl_ext_fgunta =  "";
          }else{
            this.SurveyNo =  this.singlePropertyData.propertynumberdetails[0].survey_no;
            this.HissaNo =  this.singlePropertyData.propertynumberdetails[0].hissa_no;
            this.owner =  this.singlePropertyData.partyinfopropnumberdetails[0].ownername;
            this.relationship =  this.singlePropertyData.partyinfopropnumberdetails[0].relationship;
            this.relativename =  this.singlePropertyData.partyinfopropnumberdetails[0].relativename;
            this.avl_ext_acre =  this.singlePropertyData.partyinfopropnumberdetails[0].availableextacre;
            this.avl_ext_gunta =  this.singlePropertyData.partyinfopropnumberdetails[0].availableextgunta;
            this.avl_ext_fgunta =  this.singlePropertyData.partyinfopropnumberdetails[0].availableextfgunta;
          }

        
          if (this.singlePropertyData.courtdataagri == null) {
            this.courtOrderInfoCount = 0;

            this.c_sro =  '';
            this.courT_ORDER_NUMBER =  '';
            this.injuction_or_stay_flag =  '';
            this.OrderDetails =  '';
            this.c_survey_No =  '';
            this.currentNumber =  '';
            this.oldNumber =  '';
            this.eastBoundary =  '';
            this.northBoundary =  '';
            this.westBoundary =  '';
            this.southBoundary =  '';
            this.area =  '';
            this.description = '';
          }
          else {
            this.courtOrderInfoCount = this.singlePropertyData.courtdataagri.length;
            this.c_sro = this.singlePropertyData.courtdataagri[0].sro;
            this.courT_ORDER_NUMBER = this.singlePropertyData.courtdataagri[0].court_order_number;
            this.injuction_or_stay_flag = this.singlePropertyData.courtdataagri[0].injuction_or_stay_flag;
            this.OrderDetails = this.singlePropertyData.courtdataagri[0].court_order_details;
            this.c_survey_No = this.singlePropertyData.courtdataagri[0].survey_no;
            this.currentNumber = this.singlePropertyData.courtdataagri[0].currentnumber;
            this.oldNumber = this.singlePropertyData.courtdataagri[0].oldnumber;
            this.eastBoundary = this.singlePropertyData.courtdataagri[0].eastboundary;
            this.northBoundary = this.singlePropertyData.courtdataagri[0].northboundary;
            this.westBoundary = this.singlePropertyData.courtdataagri[0].westboundary;
            this.southBoundary = this.singlePropertyData.courtdataagri[0].southboundary;
            this.area = this.singlePropertyData.courtdataagri[0].area;
            this.description = this.singlePropertyData.courtdataagri[0].description;
          }



          //Liability Data
          if (this.singlePropertyData.liabilitydata == null) {
            this.liability_sro = '';
            this.liability_OrderNo = '';
            this.liability_Details = '';
            this.liability_Amount = '';
            this.liability_IssuedDate = '';
            this.liability_IssuedBy = '';
          }
          else{
            this.liability_sro = this.singlePropertyData.liabilitydata[0].srocode;
            this.liability_OrderNo = this.singlePropertyData.liabilitydata[0].ordernumber;
            this.liability_Details = this.singlePropertyData.liabilitydata[0].liabilitynote;
            this.liability_Amount = this.singlePropertyData.liabilitydata[0].amount;
            this.liability_IssuedDate = this.singlePropertyData.liabilitydata[0].issuedate;
            this.liability_IssuedBy = this.singlePropertyData.liabilitydata[0].issuedby;
          }

          //property numbered details

          if(this.singlePropertyData.propertynumberdetails.length>0){
            this.singlePropertyDetailsData = this.singlePropertyData.propertynumberdetails;
            console.log('ddd',this.singlePropertyDetailsData);
          }
        }




        if(this.propertyTypeId == "28"){
          this.disTrict = this.singlePropertyData.district;
          this.talUka = this.singlePropertyData.taluk;
          this.town = this.singlePropertyData.hobli;
          this.vilLage = this.singlePropertyData.village;
          this.sroCode =  this.singlePropertyData.srocode;
          this.sroname =  this.singlePropertyData.sroname;
          this.propertytype = this.singlePropertyData.propertytypenamee;
          // this.SurveyNo =  this.singlePropertyData.propertynumberdetails[0].survey_no;
          // this.HissaNo =  this.singlePropertyData.propertynumberdetails[0].hissa_no;
          // this.owner =  this.singlePropertyData.partyinfopropnumberdetails[0].ownername;
          // this.relationship =  this.singlePropertyData.partyinfopropnumberdetails[0].relationship;
          // this.relativename =  this.singlePropertyData.partyinfopropnumberdetails[0].relativename;
          // this.avl_ext_acre =  this.singlePropertyData.partyinfopropnumberdetails[0].availableextacre;
          // this.avl_ext_gunta =  this.singlePropertyData.partyinfopropnumberdetails[0].availableextgunta;
          // this.avl_ext_fgunta =  this.singlePropertyData.partyinfopropnumberdetails[0].availableextfgunta;
          this.stampartcileselected = this.singlePropertyData.stamparticle;
          this.stampsubartcleselected = this.singlePropertyData.stampsubarticle;
          this.booknamenameselected = this.singlePropertyData.bookname;
          this.bookId = this.singlePropertyData.bookid;
          this.regFeeArticleSelected = this.singlePropertyData.registrationfeearticle;


          if(this.singlePropertyData.partyinfopropnumberdetails == null){
            this.SurveyNo =  "";
            this.HissaNo =  "";
            this.owner =  "";
            this.relationship =  "";
            this.relativename =  "";
            this.avl_ext_acre =  "";
            this.avl_ext_gunta =  "";
            this.avl_ext_fgunta =  "";
          }else{
            this.SurveyNo =  this.singlePropertyData.propertynumberdetails[0].survey_no;
            this.HissaNo =  this.singlePropertyData.propertynumberdetails[0].hissa_no;
            this.owner =  this.singlePropertyData.partyinfopropnumberdetails[0].ownername;
            this.relationship =  this.singlePropertyData.partyinfopropnumberdetails[0].relationship;
            this.relativename =  this.singlePropertyData.partyinfopropnumberdetails[0].relativename;
            this.avl_ext_acre =  this.singlePropertyData.partyinfopropnumberdetails[0].availableextacre;
            this.avl_ext_gunta =  this.singlePropertyData.partyinfopropnumberdetails[0].availableextgunta;
            this.avl_ext_fgunta =  this.singlePropertyData.partyinfopropnumberdetails[0].availableextfgunta;
          }

          if (this.singlePropertyData.partyinfononagri == null) {
            this.sellerName = ""; 
            this.nonagriDesc = "";
            this.nonagriTotalarea = "";
          }
          else{
            this.sellerName = this.singlePropertyData.partyinfononagri[0].ownername;
            this.nonagriDesc = this.singlePropertyData.partyinfononagri[0].propertydescription;
            this.nonagriTotalarea = this.singlePropertyData.partyinfononagri[0].totalarea;
          }

        
          //court order data
          if (this.singlePropertyData.courtdatanonagri == null) {
            this.courtOrderInfoCount = 0;

            this.c_sro =  '';
            this.courT_ORDER_NUMBER =  '';
            this.injuction_or_stay_flag =  '';
            this.OrderDetails =  '';
            this.c_survey_No =  '';
            this.currentNumber =  '';
            this.oldNumber =  '';
            this.eastBoundary =  '';
            this.northBoundary =  '';
            this.westBoundary =  '';
            this.southBoundary =  '';
            this.area =  '';
            this.description = '';
          }
          else {
            this.courtOrderInfoCount = this.singlePropertyData.courtdatanonagri.length;

            this.c_sro = this.singlePropertyData.courtdatanonagri[0].sro;
            this.courT_ORDER_NUMBER = this.singlePropertyData.courtdatanonagri[0].court_order_number;
            this.injuction_or_stay_flag = this.singlePropertyData.courtdatanonagri[0].injuction_or_stay_flag;
            this.OrderDetails = this.singlePropertyData.courtdatanonagri[0].court_order_details;
            this.c_survey_No = this.singlePropertyData.courtdatanonagri[0].survey_no;
            this.currentNumber = this.singlePropertyData.courtdatanonagri[0].currentnumber;
            this.oldNumber = this.singlePropertyData.courtdatanonagri[0].oldnumber;
            this.eastBoundary = this.singlePropertyData.courtdatanonagri[0].eastboundary;
            this.northBoundary = this.singlePropertyData.courtdatanonagri[0].northboundary;
            this.westBoundary = this.singlePropertyData.courtdatanonagri[0].westboundary;
            this.southBoundary = this.singlePropertyData.courtdatanonagri[0].southboundary;
            this.area = this.singlePropertyData.courtdatanonagri[0].area;
            this.description = this.singlePropertyData.courtdatanonagri[0].description;
          }



          //Liability Data
          if (this.singlePropertyData.liabilitydata == null) {
            this.liability_sro = '';
            this.liability_OrderNo = '';
            this.liability_Details = '';
            this.liability_Amount = '';
            this.liability_IssuedDate = '';
            this.liability_IssuedBy = '';
          }
          else{
            this.liability_sro = this.singlePropertyData.liabilitydata[0].srocode;
            this.liability_OrderNo = this.singlePropertyData.liabilitydata[0].ordernumber;
            this.liability_Details = this.singlePropertyData.liabilitydata[0].liabilitynote;
            this.liability_Amount = this.singlePropertyData.liabilitydata[0].amount;
            this.liability_IssuedDate = this.singlePropertyData.liabilitydata[0].issuedate;
            this.liability_IssuedBy = this.singlePropertyData.liabilitydata[0].issuedby;
          }

          //property numbered details

          if(this.singlePropertyData.propertynumberdetails.length>0){
            this.singlePropertyDetailsData = this.singlePropertyData.propertynumberdetails;
            console.log('ddd',this.singlePropertyDetailsData);
          }
        }

        this.getSroByDro();

        





        
        // this.disTrict = this.singlePropertyData.district;
        // this.talUka = this.singlePropertyData.taluk;
        // this.town = this.singlePropertyData.hobli;
        // this.vilLage = this.singlePropertyData.village;
        // this.sroCode =  this.singlePropertyData.srocode;
        // this.sroname =  this.singlePropertyData.sroname;
        // this.propertytype = this.singlePropertyData.propertytypenamee;
        // this.SurveyNo =  this.singlePropertyData.propertynumberdetails[0].survey_no;
        // this.HissaNo =  this.singlePropertyData.propertynumberdetails[0].hissa_no;
        // this.owner =  this.singlePropertyData.partyinfopropnumberdetails[0].ownername;
        // this.relationship =  this.singlePropertyData.partyinfopropnumberdetails[0].relationship;
        // this.relativename =  this.singlePropertyData.partyinfopropnumberdetails[0].relativename;
        // this.avl_ext_acre =  this.singlePropertyData.partyinfopropnumberdetails[0].availableextacre;
        // this.avl_ext_gunta =  this.singlePropertyData.partyinfopropnumberdetails[0].availableextgunta;
        // this.avl_ext_fgunta =  this.singlePropertyData.partyinfopropnumberdetails[0].availableextfgunta;
        // this.stampartcileselected = this.singlePropertyData.stamparticle;
        // this.stampsubartcleselected = this.singlePropertyData.stampsubarticle;
        // this.booknamenameselected = this.singlePropertyData.bookname;
        // this.bookId = this.singlePropertyData.bookid;

       
        // //court order data
        // if (this.singlePropertyData.courtdata == null) {
        //   this.c_sro =  '';
        //   this.courT_ORDER_NUMBER =  '';
        //   this.injuction_or_stay_flag =  '';
        //   this.OrderDetails =  '';
        //   this.c_survey_No =  '';
        //   this.currentNumber =  '';
        //   this.oldNumber =  '';
        //   this.eastBoundary =  '';
        //   this.northBoundary =  '';
        //   this.westBoundary =  '';
        //   this.southBoundary =  '';
        //   this.area =  '';
        //   this.description = '';
        // }
        // else {
        //   this.c_sro = this.singlePropertyData.courtdata[0].sro;
        //   this.courT_ORDER_NUMBER = this.singlePropertyData.courtdata[0].court_order_number;
        //   this.injuction_or_stay_flag = this.singlePropertyData.courtdata[0].injuction_or_stay_flag;
        //   this.OrderDetails = this.singlePropertyData.courtdata[0].court_order_details;
        //   this.c_survey_No = this.singlePropertyData.courtdata[0].survey_no;
        //   this.currentNumber = this.singlePropertyData.courtdata[0].currentnumber;
        //   this.oldNumber = this.singlePropertyData.courtdata[0].oldnumber;
        //   this.eastBoundary = this.singlePropertyData.courtdata[0].eastboundary;
        //   this.northBoundary = this.singlePropertyData.courtdata[0].northboundary;
        //   this.westBoundary = this.singlePropertyData.courtdata[0].westboundary;
        //   this.southBoundary = this.singlePropertyData.courtdata[0].southboundary;
        //   this.area = this.singlePropertyData.courtdata[0].area;
        //   this.description = this.singlePropertyData.courtdata[0].description;
        // }



        // //Liability Data
        // if (this.singlePropertyData.liabilitydata == null) {
        //   this.liability_sro = '';
        //   this.liability_OrderNo = '';
        //   this.liability_Details = '';
        //   this.liability_Amount = '';
        //   this.liability_IssuedDate = '';
        //   this.liability_IssuedBy = '';
        // }
        // else{
        //   this.liability_sro = this.singlePropertyData.liabilitydata[0].srocode;
        //   this.liability_OrderNo = this.singlePropertyData.liabilitydata[0].ordernumber;
        //   this.liability_Details = this.singlePropertyData.liabilitydata[0].liabilitynote;
        //   this.liability_Amount = this.singlePropertyData.liabilitydata[0].amount;
        //   this.liability_IssuedDate = this.singlePropertyData.liabilitydata[0].issuedate;
        //   this.liability_IssuedBy = this.singlePropertyData.liabilitydata[0].issuedby;
        // }
      }
    )
  }



  getSroByDro(){
    console.log('distictIDS',this.deptIds);
    debugger;
    var deptId = {
      "droRequests": this.deptIdss
    //   "droRequests": [
    //     {
    //       "deptId": 31379
    //     },
    // {
    //       "deptId": 35856
    //     }
    //   ]

      // "droRequests": [
      //   {
      //     "deptId": 17472
      //   }
      // ]
    }
    this.documentapprovalservice.getsro(deptId).subscribe(
      (data: any) => {
        this.responceSRO = JSON.parse(data[0].jsonData).sro_identify_concerned_dro;
        console.log('aaa', this.responceSRO);
      }
    )
  }

getApplicationReview() {
  this.departmentService.fetchApplicationReview().subscribe(
    (data: any) => {

      if(data.length != 0) {
         console.log(data);
         this.dataSource = data;
      }
    }, e => {
      if (e.error) {
        this.errorMessage = e.error.error_description;
      }
    }
  )
}

GetWitnessInfoDetails(){
  debugger;
    var applicationNum = {
      //"applicationnumber": "PRP-28012022-02852"
      //"applicationnumber": localStorage.getItem('ApplicationData')
      "applicationnumber": this.ApplicationNum
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




  filterrowdataSLNO(data) {
    data.forEach((currentValue, index) => {

          currentValue["sno"]= index + 1;
    });
    // if(data.length >=1 || data.length != undefined){
    //   data = data[0]
    // }
     return data;
      }

GetPartyinfodetails(){
    //       //Presenter
    // this.storedPresenter = localStorage.getItem('presenterStored');
    // this.presenterStored = JSON.parse(this.storedPresenter);
    // console.log(this.presenterStored);
    // this.firstNameP = this.presenterStored[0]._firstname;
    // this.middleNameP = this.presenterStored[0]._middlename;
    // this.lastNameP = this.presenterStored[0]._lastname;
    // this.ageP = this.presenterStored[0]._age;
    // if(this.presenterStored[0]._sex === 0) {
    //   this.sexP = 'Female';
    // }
    // if(this.presenterStored[0]._sex === 1) {
    //   this.sexP = 'Male';
    // }
    // if(this.presenterStored[0]._sex === 2) {
    //   this.sexP = 'Other';
    // }
    // this.addressP = this.presenterStored[0]._address;
    // this.panP = this.presenterStored[0]._pan;
    // this.professionP = this.presenterStored[0]._profession;
    //  //Presenter

    //  //Executant
    //  this.storedExecutant = localStorage.getItem('executantStored');
    //  this.executantStored = JSON.parse(this.storedExecutant);
    //  console.log(this.executantStored);
    //  this.firstNameE = this.executantStored['_firstname'];
    //  this.middleNameE = this.executantStored['_middlename'];
    //  this.lastNameE = this.executantStored['_lastname'];
    //  this.ageE = this.executantStored['_age'];
    //  this.sexE = this.executantStored['_sex'];
    //  if(this.executantStored['_sex'] === '0') {
    //   this.sexE = 'Female';
    // }
    // if(this.executantStored['_sex'] === '1') {
    //   this.sexE = 'Male';
    // }
    // if(this.executantStored['_sex'] === '2') {
    //   this.sexE = 'Other';
    // }
    //  this.addressE = this.executantStored['_address'];
    //  this.panE = this.executantStored['_pan'];
    //  this.professionE = this.executantStored['_profession'];
    //  //Executant
    var application = {
      //"applicationnumber": "PRP-17122021-01734"
      //"applicationnumber": localStorage.getItem('applicationNum')
      "applicationnumber": this.ApplicationNum
    }
    this.documentapprovalservice.GetPartyinfodetails(application).subscribe(
      (data: any) => {

        this.propertyInfoMaster = data;
      this.partyInfomasterTotalCount = this.propertyInfoMaster.length;

          console.log("partyInfo",data);

          for (let i = 0; i < this.partyInfomasterTotalCount; i++) {

            this.singleInfoData =  this.propertyInfoMaster[i];

            // console.log("partyInfoinLoooooooooooop",this.singleInfoData);


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


      Onsubmit(){
        localStorage.removeItem("kaveriResult");
      }

      getSroCode(){
        this.selectedSroCode = (document.getElementById("sro") as HTMLInputElement).value;
        console.log(this.selectedSroCode);
      }


      backButton(){
        if(this.PropertyIndexValue==1){
          return
        }
        else{
          this.PropertyIndexValue = this.PropertyIndexValue-1;
          this.changeproperty();
        }
      }

      frontButton(){
        if(this.PropertyIndexValue==this.TotalPropertyCount){
          return
        }
        else{
          this.PropertyIndexValue = this.PropertyIndexValue+1;
          this.changeproperty();
        }
      }


      changeproperty(){

        this.singlePropertyData = this.propertyData[this.PropertyIndexValue-1];
        this.PropertyDetails = new MatTableDataSource(this.singlePropertyData);
        this.singlePropertyData.paginator = this.paginator;

        //Property Details
        this.propertyTypeId = this.singlePropertyData.propertytypeid;
        this.ismovableproperty = this.singlePropertyData.ismovableproperty;
        
        if(this.propertyTypeId == 1001 && this.ismovableproperty==true){
          this.movablepropertydesc = this.singlePropertyData.movablepropertydesc;
          this.disTrict = this.singlePropertyData.district;
          this.talUka = this.singlePropertyData.taluk;
          this.town = this.singlePropertyData.hobli;
          this.vilLage = this.singlePropertyData.village;
          this.sroCode =  this.singlePropertyData.srocode;
          this.sroname =  this.singlePropertyData.sroname;
          this.propertytype = this.singlePropertyData.propertytypenamee;
          this.stampartcileselected = this.singlePropertyData.stamparticle;
          this.regFeeArticleSelected = this.singlePropertyData.registrationfeearticle;
          this.stampsubartcleselected = this.singlePropertyData.stampsubarticle;
          this.booknamenameselected = this.singlePropertyData.bookname;
          this.bookId = this.singlePropertyData.bookid;
          this.liability_sro = this.singlePropertyData.liabilitydata[0].srocode;
          this.liability_OrderNo = this.singlePropertyData.liabilitydata[0].ordernumber;
          this.liability_Details = this.singlePropertyData.liabilitydata[0].liabilitynote;
          this.liability_Amount = this.singlePropertyData.liabilitydata[0].amount;
          this.liability_IssuedDate = this.singlePropertyData.liabilitydata[0].issuedate;
          this.liability_IssuedBy = this.singlePropertyData.liabilitydata[0].issuedby;
        }

        if(this.propertyTypeId == "17"){
          this.disTrict = this.singlePropertyData.district;
          this.talUka = this.singlePropertyData.taluk;
          this.town = this.singlePropertyData.hobli;
          this.vilLage = this.singlePropertyData.village;
          this.sroCode =  this.singlePropertyData.srocode;
          this.sroname =  this.singlePropertyData.sroname;
          this.propertytype = this.singlePropertyData.propertytypenamee;
          // this.SurveyNo =  this.singlePropertyData.propertynumberdetails[0].survey_no;
          // this.HissaNo =  this.singlePropertyData.propertynumberdetails[0].hissa_no;
          // this.owner =  this.singlePropertyData.partyinfopropnumberdetails[0].ownername;
          // this.relationship =  this.singlePropertyData.partyinfopropnumberdetails[0].relationship;
          // this.relativename =  this.singlePropertyData.partyinfopropnumberdetails[0].relativename;
          // this.avl_ext_acre =  this.singlePropertyData.partyinfopropnumberdetails[0].availableextacre;
          // this.avl_ext_gunta =  this.singlePropertyData.partyinfopropnumberdetails[0].availableextgunta;
          // this.avl_ext_fgunta =  this.singlePropertyData.partyinfopropnumberdetails[0].availableextfgunta;
          this.stampartcileselected = this.singlePropertyData.stamparticle;
          this.stampsubartcleselected = this.singlePropertyData.stampsubarticle;
          this.booknamenameselected = this.singlePropertyData.bookname;
          this.bookId = this.singlePropertyData.bookid;
          this.regFeeArticleSelected = this.singlePropertyData.registrationfeearticle;

          if(this.singlePropertyData.partyinfopropnumberdetails == null){
            this.SurveyNo =  "";
            this.HissaNo =  "";
            this.owner =  "";
            this.relationship =  "";
            this.relativename =  "";
            this.avl_ext_acre =  "";
            this.avl_ext_gunta =  "";
            this.avl_ext_fgunta =  "";
          }else{
            this.SurveyNo =  this.singlePropertyData.propertynumberdetails[0].survey_no;
            this.HissaNo =  this.singlePropertyData.propertynumberdetails[0].hissa_no;
            this.owner =  this.singlePropertyData.partyinfopropnumberdetails[0].ownername;
            this.relationship =  this.singlePropertyData.partyinfopropnumberdetails[0].relationship;
            this.relativename =  this.singlePropertyData.partyinfopropnumberdetails[0].relativename;
            this.avl_ext_acre =  this.singlePropertyData.partyinfopropnumberdetails[0].availableextacre;
            this.avl_ext_gunta =  this.singlePropertyData.partyinfopropnumberdetails[0].availableextgunta;
            this.avl_ext_fgunta =  this.singlePropertyData.partyinfopropnumberdetails[0].availableextfgunta;
          }

        
          //court order data
          if (this.singlePropertyData.courtdataagri == null) {
            this.courtOrderInfoCount = 0;

            this.c_sro =  '';
            this.courT_ORDER_NUMBER =  '';
            this.injuction_or_stay_flag =  '';
            this.OrderDetails =  '';
            this.c_survey_No =  '';
            this.currentNumber =  '';
            this.oldNumber =  '';
            this.eastBoundary =  '';
            this.northBoundary =  '';
            this.westBoundary =  '';
            this.southBoundary =  '';
            this.area =  '';
            this.description = '';
          }
          else {
            this.courtOrderInfoCount = this.singlePropertyData.courtdataagri.length;
            
            this.c_sro = this.singlePropertyData.courtdataagri[0].sro;
            this.courT_ORDER_NUMBER = this.singlePropertyData.courtdataagri[0].court_order_number;
            this.injuction_or_stay_flag = this.singlePropertyData.courtdataagri[0].injuction_or_stay_flag;
            this.OrderDetails = this.singlePropertyData.courtdataagri[0].court_order_details;
            this.c_survey_No = this.singlePropertyData.courtdataagri[0].survey_no;
            this.currentNumber = this.singlePropertyData.courtdataagri[0].currentnumber;
            this.oldNumber = this.singlePropertyData.courtdataagri[0].oldnumber;
            this.eastBoundary = this.singlePropertyData.courtdataagri[0].eastboundary;
            this.northBoundary = this.singlePropertyData.courtdataagri[0].northboundary;
            this.westBoundary = this.singlePropertyData.courtdataagri[0].westboundary;
            this.southBoundary = this.singlePropertyData.courtdataagri[0].southboundary;
            this.area = this.singlePropertyData.courtdataagri[0].area;
            this.description = this.singlePropertyData.courtdataagri[0].description;
          }



          //Liability Data
          if (this.singlePropertyData.liabilitydata == null) {
            this.liability_sro = '';
            this.liability_OrderNo = '';
            this.liability_Details = '';
            this.liability_Amount = '';
            this.liability_IssuedDate = '';
            this.liability_IssuedBy = '';
          }
          else{
            this.liability_sro = this.singlePropertyData.liabilitydata[0].srocode;
            this.liability_OrderNo = this.singlePropertyData.liabilitydata[0].ordernumber;
            this.liability_Details = this.singlePropertyData.liabilitydata[0].liabilitynote;
            this.liability_Amount = this.singlePropertyData.liabilitydata[0].amount;
            this.liability_IssuedDate = this.singlePropertyData.liabilitydata[0].issuedate;
            this.liability_IssuedBy = this.singlePropertyData.liabilitydata[0].issuedby;
          }

          //property numbered details

          if(this.singlePropertyData.propertynumberdetails.length>0){
            this.singlePropertyDetailsData = this.singlePropertyData.propertynumberdetails;
            console.log('ddd',this.singlePropertyDetailsData);
          }
        }




        if(this.propertyTypeId == "28"){
          this.disTrict = this.singlePropertyData.district;
          this.talUka = this.singlePropertyData.taluk;
          this.town = this.singlePropertyData.hobli;
          this.vilLage = this.singlePropertyData.village;
          this.sroCode =  this.singlePropertyData.srocode;
          this.sroname =  this.singlePropertyData.sroname;
          this.propertytype = this.singlePropertyData.propertytypenamee;
          // this.SurveyNo =  this.singlePropertyData.propertynumberdetails[0].survey_no;
          // this.HissaNo =  this.singlePropertyData.propertynumberdetails[0].hissa_no;
          // this.owner =  this.singlePropertyData.partyinfopropnumberdetails[0].ownername;
          // this.relationship =  this.singlePropertyData.partyinfopropnumberdetails[0].relationship;
          // this.relativename =  this.singlePropertyData.partyinfopropnumberdetails[0].relativename;
          // this.avl_ext_acre =  this.singlePropertyData.partyinfopropnumberdetails[0].availableextacre;
          // this.avl_ext_gunta =  this.singlePropertyData.partyinfopropnumberdetails[0].availableextgunta;
          // this.avl_ext_fgunta =  this.singlePropertyData.partyinfopropnumberdetails[0].availableextfgunta;
          this.stampartcileselected = this.singlePropertyData.stamparticle;
          this.stampsubartcleselected = this.singlePropertyData.stampsubarticle;
          this.booknamenameselected = this.singlePropertyData.bookname;
          this.bookId = this.singlePropertyData.bookid;
          this.regFeeArticleSelected = this.singlePropertyData.registrationfeearticle;

          if(this.singlePropertyData.partyinfopropnumberdetails == null){
            this.SurveyNo =  "";
            this.HissaNo =  "";
            this.owner =  "";
            this.relationship =  "";
            this.relativename =  "";
            this.avl_ext_acre =  "";
            this.avl_ext_gunta =  "";
            this.avl_ext_fgunta =  "";
          }else{
            this.SurveyNo =  this.singlePropertyData.propertynumberdetails[0].survey_no;
            this.HissaNo =  this.singlePropertyData.propertynumberdetails[0].hissa_no;
            this.owner =  this.singlePropertyData.partyinfopropnumberdetails[0].ownername;
            this.relationship =  this.singlePropertyData.partyinfopropnumberdetails[0].relationship;
            this.relativename =  this.singlePropertyData.partyinfopropnumberdetails[0].relativename;
            this.avl_ext_acre =  this.singlePropertyData.partyinfopropnumberdetails[0].availableextacre;
            this.avl_ext_gunta =  this.singlePropertyData.partyinfopropnumberdetails[0].availableextgunta;
            this.avl_ext_fgunta =  this.singlePropertyData.partyinfopropnumberdetails[0].availableextfgunta;
          }

          if (this.singlePropertyData.partyinfononagri == null) {
            this.sellerName = ""; 
            this.nonagriDesc = "";
            this.nonagriTotalarea = "";
          }
          else{
            this.sellerName = this.singlePropertyData.partyinfononagri[0].ownername;
            this.nonagriDesc = this.singlePropertyData.partyinfononagri[0].propertydescription;
            this.nonagriTotalarea = this.singlePropertyData.partyinfononagri[0].totalarea;
          }
        
          //court order data
          if (this.singlePropertyData.courtdatanonagri == null) {
            this.courtOrderInfoCount = 0;

            this.c_sro =  '';
            this.courT_ORDER_NUMBER =  '';
            this.injuction_or_stay_flag =  '';
            this.OrderDetails =  '';
            this.c_survey_No =  '';
            this.currentNumber =  '';
            this.oldNumber =  '';
            this.eastBoundary =  '';
            this.northBoundary =  '';
            this.westBoundary =  '';
            this.southBoundary =  '';
            this.area =  '';
            this.description = '';
          }
          else {
            this.courtOrderInfoCount = this.singlePropertyData.courtdatanonagri.length;

            this.c_sro = this.singlePropertyData.courtdatanonagri[0].sro;
            this.courT_ORDER_NUMBER = this.singlePropertyData.courtdatanonagri[0].court_order_number;
            this.injuction_or_stay_flag = this.singlePropertyData.courtdatanonagri[0].injuction_or_stay_flag;
            this.OrderDetails = this.singlePropertyData.courtdatanonagri[0].court_order_details;
            this.c_survey_No = this.singlePropertyData.courtdatanonagri[0].survey_no;
            this.currentNumber = this.singlePropertyData.courtdatanonagri[0].currentnumber;
            this.oldNumber = this.singlePropertyData.courtdatanonagri[0].oldnumber;
            this.eastBoundary = this.singlePropertyData.courtdatanonagri[0].eastboundary;
            this.northBoundary = this.singlePropertyData.courtdatanonagri[0].northboundary;
            this.westBoundary = this.singlePropertyData.courtdatanonagri[0].westboundary;
            this.southBoundary = this.singlePropertyData.courtdatanonagri[0].southboundary;
            this.area = this.singlePropertyData.courtdatanonagri[0].area;
            this.description = this.singlePropertyData.courtdatanonagri[0].description;
          }



          //Liability Data
          if (this.singlePropertyData.liabilitydata == null) {
            this.liability_sro = '';
            this.liability_OrderNo = '';
            this.liability_Details = '';
            this.liability_Amount = '';
            this.liability_IssuedDate = '';
            this.liability_IssuedBy = '';
          }
          else{
            this.liability_sro = this.singlePropertyData.liabilitydata[0].srocode;
            this.liability_OrderNo = this.singlePropertyData.liabilitydata[0].ordernumber;
            this.liability_Details = this.singlePropertyData.liabilitydata[0].liabilitynote;
            this.liability_Amount = this.singlePropertyData.liabilitydata[0].amount;
            this.liability_IssuedDate = this.singlePropertyData.liabilitydata[0].issuedate;
            this.liability_IssuedBy = this.singlePropertyData.liabilitydata[0].issuedby;
          }

          //property numbered details

          if(this.singlePropertyData.propertynumberdetails.length>0){
            this.singlePropertyDetailsData = this.singlePropertyData.propertynumberdetails;
            console.log('ddd',this.singlePropertyDetailsData);
          }
        }
        

      }



      GetPropertySchedule(){
        var application = {
          //"applicationnumber": "PRP-07122021-01465"
          //"applicationnumber": localStorage.getItem('ApplicationData')
          "applicationnumber": this.ApplicationNum
        }
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

      GetMarketValuationAndFeeCalculationAmounts(){
        var application = {
          //"applicationnumber": "PRP-04022022-03210"
          //"applicationnumber": localStorage.getItem('ApplicationData')
          "applicationnumber": this.ApplicationNum
        }
        this.documentapprovalservice.Fetchfeecalculationdata(application).subscribe(
          (data: any) => {
            console.log("PropertySchedule",data);
            this.feecalculationdata = data;
            this.feecalculationdataCount = this.feecalculationdata.length;
            this.singlefeecalculationdata = this.feecalculationdata[this.feecalculationIndexValue-1];
            console.log('singlefee',this.singlefeecalculationdata);
            this.propertyDescription = (this.singlefeecalculationdata.propertyDescription);
            this.GovernmentDuty = parseInt(this.singlefeecalculationdata.stampduty);
            this.SurchargeValue = parseInt(this.singlefeecalculationdata.surcharge);
            this.CessValue = parseInt(this.singlefeecalculationdata.cess);
            this.ScanningFees = parseInt(this.singlefeecalculationdata.servicecharge);
            this.MutationFees = parseInt(this.singlefeecalculationdata.mutationfee);
            this.DenonationofStampDuty = parseInt(this.singlefeecalculationdata.deficitstampduty);
            this.TotalStampDuty = parseInt((this.GovernmentDuty + this.SurchargeValue + this.CessValue + this.ScanningFees + this.MutationFees + this.DenonationofStampDuty));
            this.TotalRegistrationFees = parseInt(this.singlefeecalculationdata.registrationfee);
            this.TotalPayableAmount = parseInt(this.TotalStampDuty + this.TotalRegistrationFees);
          }, e => {
            if (e.error) {
              this.errorMessage = e.error.error_description;
            }
          }
        )
      }

      marketAndConsideration(){
        var application = {
          //"applicationnumber": "PRP-07022022-03300"
          //"applicationnumber": localStorage.getItem('ApplicationData')
          "applicationnumber": this.ApplicationNum
        }
        this.documentapprovalservice.FetchmarketAndConsideration(application).subscribe(
          (data: any) => {
            console.log("PropertySchedule",data);
            this.marketfeecalculationdata = data;
            this.marketfeecalculationdataCount = this.marketfeecalculationdata.length;
            this.singlemarketfeecalculationdata = this.marketfeecalculationdata[this.marketfeecalculationIndexValue-1];
            console.log('singlefee',this.singlemarketfeecalculationdata);

            //this.ismovableproperty = this.singlemarketfeecalculationdata.marketvalue;
            if(this.singlemarketfeecalculationdata.ismovableproperty==true){
              this.considerationAmount = (this.singlemarketfeecalculationdata.consideration);
              this.TotalValuationAmount = 0;
            }else{
              this.considerationAmount = (this.singlemarketfeecalculationdata.consideration);
              this.TotalValuationAmount = (this.singlemarketfeecalculationdata.marketvalue);
            }
            

            

          }, e => {
            if (e.error) {
              this.errorMessage = e.error.error_description;
            }
          }
        )
      }



      feecalculationBackButton(){
        if(this.marketfeecalculationIndexValue==1){
          return
        }
        else{
          this.marketfeecalculationIndexValue = this.marketfeecalculationIndexValue-1;
          this.changefeecalculation();
        }
      }

      feecalculationFrontButton(){
        if(this.marketfeecalculationIndexValue==this.marketfeecalculationdataCount){
          return
        }
        else{
          this.marketfeecalculationIndexValue = this.marketfeecalculationIndexValue+1;
          this.changefeecalculation();
        }
      }
      changefeecalculation(){
        this.singlemarketfeecalculationdata = this.marketfeecalculationdata[this.marketfeecalculationIndexValue-1];
        console.log('singlefee',this.singlemarketfeecalculationdata);

        this.ismovableproperty = this.singlemarketfeecalculationdata.marketvalue;
            if(this.singlemarketfeecalculationdata.ismovableproperty==true){
              this.considerationAmount = (this.singlemarketfeecalculationdata.consideration);
              this.TotalValuationAmount = 0;
            }else{
              this.considerationAmount = (this.singlemarketfeecalculationdata.consideration);
              this.TotalValuationAmount = (this.singlemarketfeecalculationdata.marketvalue);
            }
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



      close(){
        this.router.navigate(['/dashboard']);
      }

}
