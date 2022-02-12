import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KaveriService } from '../../services/kaveri.service';
import { DepartmentService } from '../../services/department.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import notify from "devextreme/ui/notify";
import { createViewChild } from '@angular/compiler/src/core';
import {forkJoin} from 'rxjs'

@Component({
  selector: 'app-kaveri-result',
  templateUrl: './kaveri-result.component.html',
  styleUrls: ['./kaveri-result.component.scss']
})
export class KaveriResultComponent implements OnInit {
propertyDetails=[];
 singlepropertyDetails=[];
multiproeprtyDetails=[];
  propertymaster = [];
  // public singlepropertyDetails = {
  //   PropertyId:''
   
  // } as any;
  public bhoomiObject = {
    PropertyId:'',
    district: '',
    taluka: '',
    hobli: '',
    bhoomivillage: '',
    village: '',
    surveyno: '',
    hissno: '',
    extent: '',
    hissa: '',
    esketch: '',
    Roadcode: '',
    road: '',
    hissavalue: '',
    articleid: '',
    subArticleid: '',
    courtOrderid: '',
    stamparticlecode: '',
    userarticleno: '',
    articlenamee: '',
    stampruleid: '',
    descriptione: '',
    isslabs: false,
    unitisamount: '',
    unit: 0,
    value: 0,
    minlimit: 0,
    maxlimit: 0,
    sdcalcon: '',
    isinpercentage: false,
    isfixduty: false,
    isexempted: false,
    isruleactive: false,
    regvalue: 0,
    regispercent: false,
    regmaxlimit: 0,
    regminlimit: 0,
    regcalconconsideration: '',
    issurcharge: false,
    urbanvalue: 0,
    ruralvalue: 0,
    issurchargepercentage: '',
    iscess: false,
    cessvalue: 0,
    iscesspercentage: '',
    TotalArea: '',
    restriction: '',
    restrictiontype: '',
    description: '',
    districtname: '',
    talukaname: '',
    hobliname: '',
    villagename: ''
  } as any;
  public bhoomiMultyobject: Array<any> = []

  subselectedarticle;
  alert: boolean = false;
  submitted = false;
  kaverisearch: FormGroup;
  bhumipopupVisible = false;
  disTrict: string = "";
  talUka: string = "";
  town: string = "";
  vilLage: string = "";
  surVey: string = "";
  article: string = ""
  dataSource: any[];
  surveynum: any[] = [];
  errorMessage: string = "";
  loggedinUser: string = "";
  bhoomidata: any[] = [];
  bhoomisource: any[] = [];
  courtorder: any[] = [];
  articleList: any[] = [];
  subarticleList: any[] = [];
  manualpopupVisible = false;
  BhoomiOwners: any[];
  selectedarticle: string = "";
  newselectedarticle: any[] = [];
  testselectedarticle: string = "";
  multiOwnersdata: Array<any> = [];
  multiCourtOrderdata: Array<any> = [];
  PropertyId: any;
  kaveriData:any;
  bookNumber:any="select";
  DummyData=[];
  registrationList: any[] = [];
  storedAgricultureList: any[] = [];
  updateData:any=[];
  isCheck:any=false;
  isImmovable:any=false;
  numberofproperties: number;
  constructor(private kaveriService: KaveriService, public router: Router, private formBuilder: FormBuilder,private departmentService: DepartmentService) { }
  message;
  ngOnInit() {
    this.GetBhoomiOwners();
    
    // this.DummyData=[
    //   {
    //     PropertyId:1662967,
    //     PropertyType:17,
    //    HissaNo: 1,
    //    SurveyNo: "1",
    //    alienated: null,
    //    availableextents: {avl_ext_acre: "0", avl_ext_fgunta: "0.00", avl_ext_gunta: "4"},
    //    bincom: "1",
    //    category: "PRV",
    //    courtorderexists: "N",
    //    dist: "Bangalore Rural",
    //    districtcode: "21" ,
    //    hoblicode: "1",
    //    hoblitown: "Kasaba Hobli",
    //    indexvillage: "Thaggikuppe",
    //    landcode: "1",
    //    mainownerno: "1",
    //    owner: "½²µåêÔåêÑðé˜µò´µå",
    //    ownerno: "1",
    //    relationship: "-",
    //    relativename: "Ôåêê¼å¾²µæ²ìåêÇÈåÉ",
    //    restriction: "N",
    //    restrictiondescription: null,
    //    restrictiontype: null,
    //    sex: "M",
    //    surveynumber: "1",
    //    taluk: "Magadi",
    //    talukacode: "1",
    //    totalextents: {ext_acre: "0", ext_fgunta: "0.00", ext_gunta: "4"},
    //    villagecode: "1",
    //    TotalArea:"400"
    //   },
    //   {
    //    PropertyId:1662968,
    //    PropertyType:17,
    //    HissaNo: 1,
    //    SurveyNo: "1",
    //    alienated: null,
    //    availableextents: {avl_ext_acre: "0", avl_ext_fgunta: "0.00", avl_ext_gunta: "4"},
    //    bincom: "1",
    //    category: "PRV",
    //    courtorderexists: "N",
    //    dist: "Bangalore Rural",
    //    districtcode: "21",
    //    hoblicode: "1",
    //    hoblitown: "Kasaba Hobli",
    //    indexvillage: "Thaggikuppe",
    //    landcode: "1",
    //    mainownerno: "1",
    //    owner: "½²µåêÔåêÑðé˜µò´µå",
    //    ownerno: "1",
    //    relationship: "-",
    //    relativename: "Ôåêê¼å¾²µæ²ìåêÇÈåÉ",
    //    restriction: "N",
    //    restrictiondescription: null,
    //    restrictiontype: null,
    //    sex: "M",
    //    surveynumber: "1",
    //    taluk: "Magadi",
    //    talukacode: "1",
    //    totalextents: {ext_acre: "0", ext_fgunta: "0.00", ext_gunta: "4"},
    //    villagecode: "1",
    //    TotalArea:"400"
    //   }
      
    //  ]
    //   localStorage.setItem('bhoomiMultyobject',JSON.stringify(this.DummyData));  

    // ;
   this.GetPropertyDetails();
   let applicationNumber=localStorage.getItem("ApplicationData")//PRP-03012022-01919
  //  let applicationNumber="PRP-03012022-01919"
   this.kaveriService.GetPropertyCourtAndLiabilityData(applicationNumber).subscribe(
    async(data: any) => {
      // console.log(JSON.stringify(data.array_to_json));
      
      this.storedAgricultureList=data.array_to_json;
      this.numberofproperties = this.storedAgricultureList.length;
      console.log(JSON.stringify(this.storedAgricultureList));
      let stampArticlaArray=[];
     if(this.storedAgricultureList && this.storedAgricultureList.length){
      for(let i=0;i<this.storedAgricultureList.length;i++){
        // console.log((this.subarticleList.filter(item => item.stampruleid==this.storedAgricultureList[i].stampruleid)));
        if(!this.storedAgricultureList[i].ismovableproperty){
          this.isImmovable=true;
        }
        // this.storedAgricultureList[i].courtData= await this.courtOrderDetail(this.storedAgricultureList[i].srocode,this.storedAgricultureList[i].survey_no,this.storedAgricultureList[i].hissa_no),
        // this.storedAgricultureList[i].ownerData= await this.ownerDetail(this.storedAgricultureList[i].districtcode,this.storedAgricultureList[i].talukcode,this.storedAgricultureList[i].hoblicode,this.storedAgricultureList[i].villagecode,this.storedAgricultureList[i].survey_no,2),
        this.storedAgricultureList[i].propertyid= this.storedAgricultureList[i].propertyid,
        this.storedAgricultureList[i].hobliname= this.storedAgricultureList[i].hobli,
        this.storedAgricultureList[i].districtname= this.storedAgricultureList[i].district,
        this.storedAgricultureList[i].villagename= this.storedAgricultureList[i].village,
        this.storedAgricultureList[i].talukaname= this.storedAgricultureList[i].taluk,
        this.storedAgricultureList[i].selectedArticle= this.storedAgricultureList[i].articlename,
        this.storedAgricultureList[i].selectedSubArticle= this.storedAgricultureList[i].stamprulename
        this.storedAgricultureList[i].VillageCodeK= this.storedAgricultureList[i].villagecode,
        this.storedAgricultureList[i].restriction= this.storedAgricultureList[i].restriction,
        this.storedAgricultureList[i].restrictiondescription= this.storedAgricultureList[i].restrictiontype,
        this.storedAgricultureList[i].courtData= this.storedAgricultureList[i].courtdataagri && this.storedAgricultureList[i].courtdataagri.length?this.storedAgricultureList[i].courtdataagri[0]:{},
        this.storedAgricultureList[i].applicationnumber= localStorage.getItem('ApplicationData'),
        this.storedAgricultureList[i].survey_no= this.storedAgricultureList[i].propertynumberdetails && this.storedAgricultureList[i].propertynumberdetails?this.storedAgricultureList[i].propertynumberdetails[0].survey_no:"-",
        this.storedAgricultureList[i].hissa_no= this.storedAgricultureList[i].propertynumberdetails && this.storedAgricultureList[i].propertynumberdetails[0].hissa_no?this.storedAgricultureList[i].propertynumberdetails[0].hissa_no:"-",
        this.storedAgricultureList[i].owner= this.storedAgricultureList[i].partyinfopropnumberdetails && this.storedAgricultureList[i].partyinfopropnumberdetails[0].ownername?this.storedAgricultureList[i].partyinfopropnumberdetails[0].ownername:"-",
        this.storedAgricultureList[i].relationship= this.storedAgricultureList[i].partyinfopropnumberdetails && this.storedAgricultureList[i].partyinfopropnumberdetails[0].relationship?this.storedAgricultureList[i].partyinfopropnumberdetails[0].relationship:"-",
        this.storedAgricultureList[i].relativename= this.storedAgricultureList[i].partyinfopropnumberdetails && this.storedAgricultureList[i].partyinfopropnumberdetails[0].relativename?this.storedAgricultureList[i].partyinfopropnumberdetails[0].relativename:"-",
        this.storedAgricultureList[i].avl_ext_acre= this.storedAgricultureList[i].partyinfopropnumberdetails && this.storedAgricultureList[i].partyinfopropnumberdetails[0].availableextacre?this.storedAgricultureList[i].partyinfopropnumberdetails[0].availableextacre:"-",
        this.storedAgricultureList[i].avl_ext_gunta= this.storedAgricultureList[i].partyinfopropnumberdetails && this.storedAgricultureList[i].partyinfopropnumberdetails[0].availableextgunta?this.storedAgricultureList[i].partyinfopropnumberdetails[0].availableextgunta:"-",
        this.storedAgricultureList[i].avl_ext_fgunta= this.storedAgricultureList[i].partyinfopropnumberdetails && this.storedAgricultureList[i].partyinfopropnumberdetails[0].availableextfgunta?this.storedAgricultureList[i].partyinfopropnumberdetails[0].availableextfgunta:"-",
        this.storedAgricultureList[i].srocode= this.storedAgricultureList[i].liabilitydata && this.storedAgricultureList[i].liabilitydata[0].srocode?this.storedAgricultureList[i].liabilitydata[0].srocode:"-",
        this.storedAgricultureList[i].ordernumber= this.storedAgricultureList[i].liabilitydata && this.storedAgricultureList[i].liabilitydata[0].ordernumber?this.storedAgricultureList[i].liabilitydata[0].ordernumber:"-",
        this.storedAgricultureList[i].liabilitynote= this.storedAgricultureList[i].liabilitydata && this.storedAgricultureList[i].liabilitydata[0].liabilitynote?this.storedAgricultureList[i].liabilitydata[0].liabilitynote:"-",
        this.storedAgricultureList[i].amount= this.storedAgricultureList[i].liabilitydata && this.storedAgricultureList[i].liabilitydata[0].amount?this.storedAgricultureList[i].liabilitydata[0].amount:"-",
        this.storedAgricultureList[i].issuedate= this.storedAgricultureList[i].liabilitydata && this.storedAgricultureList[i].liabilitydata[0].issuedate?this.storedAgricultureList[i].liabilitydata[0].issuedate:"-",
        this.storedAgricultureList[i].issuedby= this.storedAgricultureList[i].liabilitydata && this.storedAgricultureList[i].liabilitydata[0].issuedby?this.storedAgricultureList[i].liabilitydata[0].issuedby:"-",
        this.storedAgricultureList[i].srocode= this.storedAgricultureList[i].liabilitydata && this.storedAgricultureList[i].liabilitydata[0].srocode?this.storedAgricultureList[i].liabilitydata[0].srocode:"-",
        this.storedAgricultureList[i].srocode= this.storedAgricultureList[i].liabilitydata && this.storedAgricultureList[i].liabilitydata[0].srocode?this.storedAgricultureList[i].liabilitydata[0].srocode:"-"
        if(this.storedAgricultureList[i].stamparticle){
          stampArticlaArray.push(this.storedAgricultureList[i].stamparticle)
        }
        // this.storedAgricultureList[i].srocode= this.storedAgricultureList[i].liabilitydata && this.storedAgricultureList[i].liabilitydata[0].srocode?this.storedAgricultureList[i].liabilitydata[0].srocode:"-"
        // this.storedAgricultureList[i].PropertyTypeid= data[i].propertytypeid
      }
      this.kaveriData=this.storedAgricultureList;
      if(this.kaveriData && this.kaveriData.length==stampArticlaArray.length){
        this.isCheck=true;
      }
     }else{
      // this.isCheck=true;
       console.log("inside else");
       
     }
    }, e => {
      this.isCheck=true;
      if (e.error) {
        this.errorMessage = e.error.error_description;
      }
    }
  )
  
  this.kaveriService.GetPropertyMasterOnly(applicationNumber).subscribe(
    (data: any) => {
      this.updateData=data;
      
// console.log("propertyMasterData-->",data);

    }, e => {
      if (e.error) {
        this.errorMessage = e.error.error_description;
      }
    }
  )
    //  this.kaveriData=JSON.parse(localStorage.getItem("kaveriResult"));
    //  this.kaveriData=this.storedAgricultureList;
    // console.log("kaveriData-->",this.kaveriData);
    // if(this.kaveriData && this.kaveriData.length){
    //   for(let i=0;i<this.kaveriData.length;i++){
    //     this.kaveriData[i].stamparticlecode= Number(this.kaveriData[i].stamparticlecode)
    //   }
    // }
    this.kaverisearch = this.formBuilder.group({
      article: [""],
      subarticle: [""],
    });
    this.disTrict = localStorage.getItem('districtname');
    this.talUka = localStorage.getItem('talukaname');
    this.town = localStorage.getItem('hobliname');
    this.vilLage = localStorage.getItem('villagename');
    this.surVey = localStorage.getItem('surveynumber');
    this.article = localStorage.getItem('articleList');

    // this.kaveriResult();
    // this.BhoomiResult();
    
    // this.courtOrderD();
    this.Article();
    // this.loggedinUser = localStorage.getItem('loggedinuser');
    // this.multiOwnersdata = [...JSON.parse(localStorage.getItem('multiOwnersdata'))];
    // if (localStorage.getItem('multiCourtdata') && localStorage.getItem('multiCourtdata').length == 0) {
    //   this.multiCourtOrderdata = [...JSON.parse(localStorage.getItem('multiCourtdata'))];
    // }

    // if (localStorage.getItem('bhoomiMultyobject') && localStorage.getItem('bhoomiMultyobject').length == 0) {
    //   localStorage.setItem('bhoomiMultyobject', JSON.stringify(this.bhoomiMultyobject));
    // }
    // this.bhoomiMultyobject = JSON.parse(localStorage.getItem('bhoomiMultyobject'))

    // console.log(this.multiCourtOrderdata);
   
  }
  deleteProperty (index,pidno){
    console.log("pidno-->",pidno);
    
    if(this.kaveriData && this.kaveriData.length){
      this.kaveriService.deletePropertyData(pidno).subscribe(
        async(deletedResponse: any) => {
     console.log("deleted");
     this.kaveriData.splice(index,1);
     window.location.reload();
        }, e => {
          if (e.error) {
            this.errorMessage = e.error.error_description;
          }
          window.location.reload();
        }
      )
      
    }


  }
  get f() {
    return this.kaverisearch.controls;
  }
agreeCheck($event):any{
  if($event.currentTarget.checked){
    this.isCheck=true;
  }else{
    this.isCheck=false;
  }
 
  
}
  kaveriResult() {
    var kaveri = {
      "villageCode": parseInt(localStorage.getItem("villagecode")),
      "surveyNo": parseInt(localStorage.getItem("surveynumber")),
      "HissaNo": localStorage.getItem('hissano'),
    };
    console.log(JSON.stringify(kaveri));

    this.kaveriService.kaveriresult(kaveri).subscribe(
      (data: any) => {
        console.log(data);
        data[0]['HobliName'] = localStorage.getItem('hobliname');
        data[0]['VillageName'] = localStorage.getItem('villagename');

        this.dataSource = data;
        this.surveynum = data;
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
  }
  onsubarticleChange($event,index,propertyId) {
console.log("index-->",index);
console.log("subArticlechange-->",$event.target.value);
console.log("subArticlechange-->",JSON.stringify($event.target.value));
if(this.updateData && this.updateData.length){
  for(let i=0;i<this.updateData.length;i++){
    if(this.updateData[i].propertyid==propertyId){
      this.updateData[i].stampruleid=$event.target.value;
    }
  }
}
// let kaveriData=JSON.parse(localStorage.getItem("kaveriResult"));
// kaveriData[index].stampruleid=$event.target.value;
// let subarticle= this.subarticleList.filter(item => item.stampruleid==$event.target.value);
// kaveriData[index].SubArticle=subarticle;
// if ($event != "") {
//  let text1 = $event.target.options[$event.target.options.selectedIndex].text;
//  kaveriData[index].selectedSubArticle=text1;
// }
// localStorage.setItem("kaveriResult",JSON.stringify(kaveriData));

  }
  
  // >>>>>>>>>>>>>>>>>>>>>>>
  BhoomiResult() {
    debugger
    var bhoomi = {

      "districtCode": parseInt(localStorage.getItem('bhoomiDistrictCode')),
      "talukCode": parseInt(localStorage.getItem('bhoomitalukcode')),
      "hobliCode": parseInt(localStorage.getItem('bhoomihoblicode')),
      "villageCode": parseInt(localStorage.getItem('bhoomivillagecode')),
      "surveyNo": parseInt(localStorage.getItem("surveynumber")),
      "landCode": parseInt(localStorage.getItem('landCode')),
      "articleList": parseInt(localStorage.getItem('article')),
    };
    console.log(JSON.stringify(bhoomi));
    ;
    this.kaveriService.getOwners(bhoomi).subscribe(

      (data: any) => {
        console.log(data);
        data = data['bhoomi_survey_owners'];
        data = data['surveynodetails'];
        data = data['surveyno'];
        console.log(data);
        //const filterdata = this.filterrowdata(data);
        data['HissaNo'] = localStorage.getItem('hissano');
        data['SurveyNo'] = localStorage.getItem('surveynumber');
        let singledata = data
        this.bhoomisource = [];
        this.bhoomidata.push(singledata);

        console.log(this.bhoomidata);
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
  }

  GetBhoomiOwners() {

    // this.submitted = true;
    //   if (this.bhumiForm.invalid) {
    //     return;
    // }
    // if (this.bhumiForm.valid) {
    //   this.router.navigateByUrl('/bhoomi-search-result');
    // }

    var bhoomi = {
      "districtCode": parseInt(localStorage.getItem('bhoomiDistrictCode')),
      "talukCode": parseInt(localStorage.getItem('bhoomitalukcode')),
      "hobliCode": parseInt(localStorage.getItem('bhoomihoblicode')),
      "villageCode": parseInt(localStorage.getItem('bhoomivillagecode')),
      "surveyNo": parseInt(localStorage.getItem('surveyno')),
      "landCode": localStorage.getItem('landCode'),
    };
    // var villagecodejson = JSON.parse(localStorage.getItem('indexvillage')) ;
    // localStorage.setItem("villagecode",villagecodejson['villagecode']);

    console.log(JSON.stringify(bhoomi));
    this.kaveriService.getOwners(bhoomi).subscribe(
      (data: any) => {
        console.log(data);
        data = data['bhoomi_survey_owners'];
        data = data['surveynodetails'];
        data = data['surveyno'];
        // console.log(data);
        // const filterdata = this.filterrowdata(data);
        data['HissaNo'] = localStorage.getItem('hissano');
        data['SurveyNo'] = localStorage.getItem('surveynumber');
        let singledata = data
        this.BhoomiOwners = [];
        this.BhoomiOwners.push(singledata);

        // localStorage.setitem('gethissano',this.dataSource);

        // this.dataSource= JSON.parse(localStorage.getItem('gethissano'));
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
  }
  filterrowdata(data) {
    data.forEach((currentValue, index) => {
      if (currentValue.restriction == "Y" && currentValue.restrictiontype == "PY") {
        currentValue.restrictiondescription = "Y";
        // console.log(currentValue.restrictiondescription);
      }
      else currentValue.restrictiondescription = "N";
    });
    return data;
  }
  onSubmit() {
    ;
    this.submitted = true;
    this.alert = true;
    if (this.kaverisearch.invalid) {
      return;
    }
    else {
      
      //Property schedule Master
      //this.AddPropertytoObject();
      // let previousData = JSON.parse(localStorage.getItem('bhoomiMultyobject'));
      
     
//       localStorage.setItem('bhoomiMultyobject', JSON.stringify(localStorage.getItem('kaveriResult')));
//       let previousData = JSON.parse(localStorage.getItem('kaveriResult'));
//       console.log("previousData-->",previousData);
      
//       for (let i = 0; i < previousData.length; i++) {
//         var propschedule = {
//           "propertyid": previousData[i].propertyid?previousData[i].propertyid:null,
//           "documentid": previousData[i].documentid?previousData[i].documentid:1,
//           "villagecode": previousData[i].VillageCodeK,
//           "regsrocode": previousData[i].regsrocode?previousData[i].regsrocode:0,
//           // "srocode": previousData[i].SROCode,
//           "srocode": previousData[i].courtData && previousData[i].courtData.sro?previousData[i].courtData.sro:114,
//           "totalarea": previousData[i].totalarea?previousData[i].totalarea:100,
//           "unitid": previousData[i].unitid?previousData[i].unitid:1,
//           "northboundary": previousData[i].northboundary?previousData[i].northboundary:"",
//           "southboundary": previousData[i].southboundary?previousData[i].southboundary:"south",
//           "eastboundary": previousData[i].eastboundary?previousData[i].eastboundary:"east",
//           "westboundary": previousData[i].westboundary?previousData[i].westboundary:"west",
//           "landmark": previousData[i].landmark?previousData[i].landmark:"landmark1",
//           "marketvalue": previousData[i].marketvalue?previousData[i].marketvalue:100,
//           "assessment": previousData[i].assessment?previousData[i].assessment:"assess",
//           "sdcalculationstring": previousData[i].sdcalculationstring?previousData[i].sdcalculationstring:"sdc",
//           "stampduty": previousData[i].stampduty?previousData[i].stampduty:10,
//           "transferliabilities": previousData[i].transferliabilities?previousData[i].transferliabilities:10,
//           "consideration": previousData[i].consideration?previousData[i].consideration:10,
//           "additionalduty": previousData[i].additionalduty?previousData[i].additionalduty:10,
//           "cessduty": previousData[i].cessduty?previousData[i].cessduty:10,
//           "govtduty": previousData[i].govtduty?previousData[i].govtduty:10,
//           "isexempted": previousData[i].isexempted?previousData[i].isexempted:true,
//           "exemptiondescription": previousData[i].exemptiondescription?previousData[i].exemptiondescription:"exem",
//           "ismovableproperty": previousData[i].ismovableproperty?previousData[i].ismovableproperty:true,
//           "sdrefund": previousData[i].sdrefund?previousData[i].sdrefund:10,
//           "docmarketvalue": previousData[i].docmarketvalue?previousData[i].docmarketvalue:10,
//           "valid1": previousData[i].valid1?previousData[i].valid1:10,
//           "isimdemnified": previousData[i].isimdemnified?previousData[i].isimdemnified:true,
//           "restriction": previousData[i].restriction,
//           "restrictiontype": previousData[i].restrictiontype?previousData[i].restrictiontype:"NA",
//           "restrictiondescription": previousData[i].restrictiontype,
//           "enumber": previousData[i].enumber?previousData[i].enumber:"enumber",
//           "claimingblocknumber": previousData[i].claimingblocknumber?previousData[i].claimingblocknumber:"C",
//           "retainingblocknumber": previousData[i].retainingblocknumber?previousData[i].retainingblocknumber:"R",
//           "valuationreport": previousData[i].valuationreport?previousData[i].valuationreport:"valution",
//           "loanpurposeid": previousData[i].loanpurposeid?previousData[i].loanpurposeid:10,
//           "applicationnumber": localStorage.getItem('ApplicationData'),
//           "verified": previousData[i].verified?previousData[i].verified:true,
//           "issroapproved": previousData[i].issroapproved?previousData[i].issroapproved:"E",
//            "stamparticlecode": previousData[i].stamparticlecode,
//           //"stamparticlecode": 4,
//            "stampruleid": previousData[i].stampruleid,
//           //"stampruleid":1
//           "regarticlecode":previousData[i].regarticlecode?previousData[i].regarticlecode:0,
//           "propertytypeid": previousData[i].PropertyTypeid,
//           "noofscanpages": previousData[i].noofscanpages?previousData[i].noofscanpages:0,
//           "propertynumberdetails":[{
//             "propertyid": previousData[i].propertyid?previousData[i].propertyid:null,
//             "srocode": previousData[i].courtData && previousData[i].courtData.sro?previousData[i].courtData.sro:114,
//             "currentpropertytypeid": 3,
//             "currentnumber": "string",
//             "survey_no": 2,
//             "hissa_no": "2"
//           }
//           ] 
//         };
        
//         this.propertymaster.push(propschedule);
//         // console.log(JSON.stringify(this.propertymaster));
//       }
// console.log(JSON.stringify(this.propertymaster));

      this.kaveriService.SavePropertyScheduleMaster(this.updateData).subscribe(
        (data: any) => {
          console.log("data==>",data);
          // localStorage.setItem('SavedPropertyIDs',JSON.stringify(data));
          // let SavedPropertyIDs = JSON.parse(localStorage.getItem('SavedPropertyIDs'));
          // let multiobject = JSON.parse(localStorage.getItem('kaveriResult'));
          // console.log(JSON.stringify(localStorage.getItem('kaveriResult')));
          // console.log(JSON.stringify(multiobject));
          // console.log(JSON.stringify(SavedPropertyIDs));
         
            // for(let i=0;i<multiobject.length;i++)
            // {
            //   for(let j=SavedPropertyIDs.length-1;j>=0;j--)
            //   {
            //     multiobject[j].PropertyId=SavedPropertyIDs[j].propertyId;
            //     console.log(multiobject[j])
            //   }
            // // }
           
            // localStorage.setItem('kaveriResult', JSON.stringify(multiobject));
          // let previousData = JSON.parse(localStorage.getItem('bhoomiMultyobject'));
          // this.assignPropertyidstoobject(previousData);
          // localStorage.setItem('bhoomiMultyobject', this.assignPropertyidstoobject(previousData));
          // this.kaveriData="";      
          // localStorage.setItem("kaveriResult", "");
          // if (data[0].responseCode == "1000") {
          //   ;
          //   this.message = data[0].responseMessage;
          //   this.showToast();
          if(this.isImmovable){
            this.router.navigateByUrl('/property-schedule-component');
         
          }else{
            this.router.navigateByUrl('/fee-calculation');
          }
           
          // }
          // this.router.navigate(['/market-valuation']);
          // if (data.responseCode == "1000") {
          //   ;
          //   this.message = data.responseMesg;
          //   this.showToast();

          //   this.router.navigateByUrl('/party-details');
          // }
          // this.NavigatetotheRelatedproperty();
        }, e => {
          if (e.error) {
            ;
            this.errorMessage = e.error.error_description;
          }
        }
      )
      //Property schedule master

    }
    ;

  
    // if (this.surveynum.length>0) {

    //this.router.navigateByUrl('/party-details');
    // }
    // else{
    //   this.manualpopupVisible = true;
    // }
  }
 
  courtOrderDetail(SROCode,surveyNo,hissano) {
    var court = {
      "SROCode": SROCode,
      "surveyNo": surveyNo,
      "hissano": hissano
    };
    console.log("court-->",court);
    

    this.kaveriService.courtorder(court).subscribe(
      (data: any) => {
        console.log("courtData-->",data);
        return data
      }, e => {
        if (e.error) {
          ;
          this.errorMessage = e.error.error_description;
        }
      }
    )
  }
  ownerDetail(districtCode,talukCode,hobliCode,villageCode,surveyNo,landCode) {
    debugger
    var bhoomi = {
      "districtCode": districtCode,
      "talukCode": talukCode,
      "hobliCode": hobliCode,
      "villageCode": villageCode,
      "surveyNo": surveyNo,
      "landCode": landCode,

    };
    
    this.kaveriService.getOwners(bhoomi).subscribe(
      
      (data: any) => {
        console.log("owner-->",data);
        return data
      }, e => {
        if (e.error) {
          ;
          this.errorMessage = e.error.error_description;
        }
      }
    )
  }
  assignPropertyidstoobject(data) {
    let SavedPropertyIDs = JSON.parse(localStorage.getItem('SavedPropertyIDs'));
    let multiobject = JSON.parse(localStorage.getItem('kaveriResult'));
      for(let i=0;i<(JSON.stringify(this.kaveriResult)).length;i++)
      {
        for(let j=(JSON.stringify(this.kaveriResult)).length;j>=0;j--)
        {
          multiobject[i].PropertyId=SavedPropertyIDs[j].propertyId;
        }
      
      }
    return data;

    localStorage.setItem('kaveriResult', JSON.stringify(multiobject));
   }
  showToast() {
    notify({
      message: this.message,
      isVisible: true,
      displayTime: 3000,
      height: 50,
      type: "success"

    });
  }

  courtOrderD() {

    var court = {

      "SROCode": parseInt(localStorage.getItem('SROCode')),
      "surveyNo": parseInt(localStorage.getItem('surveyno')),
      "hissano": localStorage.getItem('hissano')
    };
    console.log(JSON.stringify(court));

    this.kaveriService.courtorder(court).subscribe(
      (data: any) => {
        ;
        console.log("data-->",data);
        this.courtorder = data;
        const filterdata = this.filterrowdataSLNO(data);
        this.courtorder = [...filterdata];
        //localStorage.setItem("SROCode",data[0].sroCode);
        ;
      }, e => {
        if (e.error) {
          ;
          this.errorMessage = e.error.error_description;
        }
      }
    )
  }
  Article() {
    ;
    this.kaveriService.article().subscribe(
      (data: any) => {
        console.log(data);
        if (data.length != 0) {
          this.articleList = data;
          console.log("this.articleList-->",this.articleList);
          
        }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
  }
  onarticleValuechange(distValue) {
    var article = this.kaverisearch.get("article").value;
    console.log(article);
    console.log(article.stamparticlecode);
    //this.testselectedarticle = article.stamparticlecode;
    // if (this.testselectedarticle != "") {
    //   this.SubArticle();
    // }
  }
  onarticleChange($event,index,propertyId) {
  //  let kaveriData=JSON.parse(localStorage.getItem("kaveriResult"));
  //  let kaveriData=this.kaveriData;
  if(this.updateData && this.updateData.length){
    for(let i=0;i<this.updateData.length;i++){
      if(this.updateData[i].propertyid==propertyId){
        this.updateData[i].stamparticlecode=$event.target.value;
      }
    }
  }
  //  this.kaveriData[index].stamparticlecode=$event.target.value;
  //  if ($event != "") {
  //   let text1 = $event.target.options[$event.target.options.selectedIndex].text;
  //   this.article = text1;
  //   this.kaveriData[index].selectedArticle=text1;
  // }
  //  localStorage.setItem("kaveriResult",JSON.stringify(this.kaveriData));
    let articlecode=$event.target.value;
    var article = {
      "stamparticlecode": articlecode,
    };
    var stamparticle = {
      "stamparticle": 21,
    };
    if (article != undefined) {
      this.kaveriService.subarticle(article).subscribe(
        (data: any) => {
          if (data && data.length != 0) {
            this.subarticleList = data;
            console.log(JSON.stringify( this.subarticleList));
          }
        }, e => {

          if (e.error) {
            this.errorMessage = e.error.error_description;
          }
        }
      )
    }
    if (stamparticle != undefined) {
      this.kaveriService.getRegistrationArticle(stamparticle).subscribe(
        (data: any) => {
          if (data && data.length != 0) {
            this.registrationList = data;

            console.log(JSON.stringify( this.registrationList));
          }
        }, e => {

          if (e.error) {
            this.errorMessage = e.error.error_description;
          }
        }
      )
    }

  }
  onRegChange($event,index,propertyId) {
    // let kaveriData=this.kaveriData;
    this.kaveriData[index].regArticlecode=$event.target.value;
    if ($event != "") {
      if(this.updateData && this.updateData.length){
        for(let i=0;i<this.updateData.length;i++){
          if(this.updateData[i].propertyid==propertyId){
            this.updateData[i].regarticlecode=$event.target.value;
          }
        }
      }
     let bookObj=this.registrationList.filter((item)=>{return $event.target.value==item.regarticlecode });
     this.bookNumber=bookObj[0].bookid;
     this.kaveriData[index].selectedBookNumber=bookObj[0].bookid;
   }
  //  console.log(JSON.stringify(this.updateData));
   
    // localStorage.setItem("finalNonAgriculture",JSON.stringify(kaveriData));
  }
  SubArticle() {
    var articlecode = this.kaverisearch.get("article").value;
    
    var article = {
      "stamparticlecode": articlecode.stamparticlecode,
    };
    // console.log(JSON.stringify(article))
    if (article != undefined) {
      this.kaveriService.subarticle(article).subscribe(
        (data: any) => {
          console.log(data);
          if (data.length != 0) {

            this.subarticleList = data;
            
          }
        }, e => {
          if (e.error) {
            this.errorMessage = e.error.error_description;
          }
        }
      )
    }
  }
  filterrowdataSLNO(data) {
    data.forEach((currentValue, index) => {

      currentValue.sno = index + 1;
    });
    return data;
  }
  Propertyno(data) {
    data.forEach((currentValue, index) => {

      currentValue.PropertyNo = index + 1;
    });
    return data;
  }
  AddNewProperty() {
    this.submitted = true;
    this.alert = true;
    if (this.kaverisearch.invalid) {
      return;
    }
    this.kaveriService.SavePropertyScheduleMaster(this.updateData).subscribe(
      (data: any) => {
        console.log("data==>",data);
        this.router.navigate(['/agricultural/non-agricultural']);
      }, e => {
        if (e.error) {
          ;
          this.errorMessage = e.error.error_description;
        }
      }
    )
    // this.AddPropertytoObject();
   
  }
  AddPropertytoObject() {
    
    this.submitted = true;
    this.alert = true;
    if (this.kaverisearch.invalid) {
      return;
    }
    this.bhoomiObject['district'] = parseInt(localStorage.getItem('bhoomiDistrictCode'));
    this.bhoomiObject['taluka'] = parseInt(localStorage.getItem('bhoomitalukcode'));
    this.bhoomiObject['hobli'] = parseInt(localStorage.getItem('bhoomihoblicode'));
    this.bhoomiObject['bhoomivillage'] = parseInt(localStorage.getItem('bhoomivillagecode'));
    this.bhoomiObject['village'] = parseInt(localStorage.getItem('villagecode'));
    this.bhoomiObject['districtname'] = localStorage.getItem('districtname');
    this.bhoomiObject['talukaname'] = localStorage.getItem('talukaname');
    this.bhoomiObject['hobliname'] = localStorage.getItem('hobliname');
    this.bhoomiObject['villagename'] = localStorage.getItem('villagename');
    this.bhoomiObject['surveyno'] = parseInt(localStorage.getItem('surveyno'));
    this.bhoomiObject['hissno'] = parseInt(localStorage.getItem('hissano'));
    this.bhoomiObject['Roadcode'] = parseInt(localStorage.getItem('Roadcode'));
    this.bhoomiObject['SROCode'] = parseInt(localStorage.getItem('SROCode'))
    var artice = this.kaverisearch.get("article").value;
    this.bhoomiObject['stamparticlecode'] = artice.stamparticlecode;
    this.bhoomiObject['userarticleno'] = artice.userarticleno;
    this.bhoomiObject['articlenamee'] = artice.articlenamee;

    var subartice = this.kaverisearch.get("subarticle").value;
    this.bhoomiObject['stampruleid'] = subartice.stampruleid;
    this.bhoomiObject['stamparticlecode'] = subartice.stamparticlecode;
    this.bhoomiObject['descriptione'] = subartice.descriptione;;
    this.bhoomiObject['isslabs'] = subartice.isslabs;
    this.bhoomiObject['unitisamount'] = subartice.unitisamount;
    this.bhoomiObject['unit'] = subartice.unit;
    this.bhoomiObject['value'] = subartice.value;
    this.bhoomiObject['minlimit'] = subartice.minlimit;
    this.bhoomiObject['maxlimit'] = subartice.maxlimit;
    this.bhoomiObject['sdcalcon'] = subartice.sdcalcon;
    this.bhoomiObject['isinpercentage'] = subartice.isinpercentage;
    this.bhoomiObject['isfixduty'] = subartice.isfixduty;
    this.bhoomiObject['isexempted'] = subartice.isexempted;
    this.bhoomiObject['isruleactive'] = subartice.isruleactive;
    this.bhoomiObject['regvalue'] = subartice.regvalue;
    this.bhoomiObject['regispercent'] = subartice.regispercent;
    this.bhoomiObject['regmaxlimit'] = subartice.regmaxlimit;
    this.bhoomiObject['regminlimit'] = subartice.regminlimit;
    this.bhoomiObject['regcalconconsideration'] = subartice.regcalconconsideration;
    this.bhoomiObject['issurcharge'] = subartice.issurcharge;
    this.bhoomiObject['urbanvalue'] = subartice.urbanvalue;
    this.bhoomiObject['ruralvalue'] = subartice.ruralvalue;
    this.bhoomiObject['issurchargepercentage'] = subartice.issurchargepercentage;
    this.bhoomiObject['iscess'] = subartice.iscess;
    this.bhoomiObject['cessvalue'] = subartice.cessvalue;
    this.bhoomiObject['iscesspercentage'] = subartice.iscesspercentage;

    this.bhoomiObject['TotalArea'] = parseInt(localStorage.getItem('TotalArea'));
    this.bhoomiObject['restriction'] = localStorage.getItem('restriction');
    this.bhoomiObject['restrictiontype'] = localStorage.getItem('restrictiontype');
    this.bhoomiObject['description'] = localStorage.getItem('description');

    this.bhoomiMultyobject.push({ ...this.bhoomiObject });
    this.bhoomiMultyobject = this.bhoomiMultyobject;
    this.bhoomiMultyobject = this.Propertyno(this.bhoomiMultyobject);

    localStorage.setItem('bhoomiMultyobject', JSON.stringify(this.bhoomiMultyobject));
    // let Finalmultiobject=JSON.stringify(this.bhoomiMultyobject);
    console.log(this.bhoomiMultyobject);
    //  localStorage.setItem('bhoomiMultyobject', JSON.stringify(this.bhoomiMultyobject));



    console.log(this.bhoomiMultyobject);

  }
  
  GetPropertyDetails() {

   
    var propertydetails = {

      "applicationnumber": localStorage.getItem("ApplicationNo")
     //"applicationnumber": "PRP-23112021-01216"
     
    };
    console.log(JSON.stringify(propertydetails));
   
    this.departmentService.propertyMaster(propertydetails).subscribe(
      (data: any) => {
        console.log(data);
        this.propertyDetails = data;

        if(data.length != 0)
        {
          this.AassignPropertydatatoKaveri()
        }
      
        //localStorage.setItem("SROCode",data[0].sroCode);
        ;
      }, e => {
        if (e.error) {
          ;
          this.errorMessage = e.error.error_description;
        }
      }
    )
  }

  AassignPropertydatatoKaveri()
  {
    for (let i = 0; i < this.propertyDetails.length; i++) {
    
this.singlepropertyDetails[	'districtcode']= this.propertyDetails[i].	districtcode	;
this.singlepropertyDetails[ 'propertyid']= this.propertyDetails[i].propertyid	;
this.singlepropertyDetails[ 'villagecode']= this.propertyDetails[i].villagecode	;
 this.singlepropertyDetails[ 'districtname']= this.propertyDetails[i].districtnamee	;
 this.singlepropertyDetails[ 'hobliname']= this.propertyDetails[i].hoblinamee	;
 this.singlepropertyDetails[ 'talukaname']= this.propertyDetails[i].taluknamee	;
 this.singlepropertyDetails[ 'villagename']= this.propertyDetails[i].villagenamee	;
 this.singlepropertyDetails[ 'regsrocode']= this.propertyDetails[i].regsrocode	;
 this.singlepropertyDetails[ 'srocode']= this.propertyDetails[i].srocode	;
 this.singlepropertyDetails[ 'sronamee']= this.propertyDetails[i].sronamee	;
 this.singlepropertyDetails[ 'survey_no']= this.propertyDetails[i].survey_no	;
 this.singlepropertyDetails[ 'hissa_no']= this.propertyDetails[i].hissa_no	;
 this.singlepropertyDetails[ 'hoblicode']= this.propertyDetails[i].hoblicode	;
 this.singlepropertyDetails[ 'talukcode']= this.propertyDetails[i].talukcode	;
 this.singlepropertyDetails[ 'landcode']= this.propertyDetails[i].landcode	;
 this.singlepropertyDetails[ 'totalarea']= this.propertyDetails[i].totalarea	;
 this.singlepropertyDetails[ 'unitid']= this.propertyDetails[i].unitid	;
 this.singlepropertyDetails[ 'descriptionenglish']= this.propertyDetails[i].descriptionenglish	;
 this.singlepropertyDetails[ 'northboundary']= this.propertyDetails[i].northboundary	;
 this.singlepropertyDetails[ 'southboundary']= this.propertyDetails[i].southboundary	;
 this.singlepropertyDetails[ 'eastboundary']= this.propertyDetails[i].eastboundary	;
 this.singlepropertyDetails[ 'westboundary']= this.propertyDetails[i].westboundary	;
 this.singlepropertyDetails[ 'landmark']= this.propertyDetails[i].landmark	;
 this.singlepropertyDetails[ 'marketvalue']= this.propertyDetails[i].marketvalue	;
 this.singlepropertyDetails[ 'assessment']= this.propertyDetails[i].assessment	;
 this.singlepropertyDetails[ 'sdcalculationstring']= this.propertyDetails[i].sdcalculationstring	;
 this.singlepropertyDetails[ 'stampduty']= this.propertyDetails[i].stampduty	;
 this.singlepropertyDetails[ 'transferliabilities']= this.propertyDetails[i].transferliabilities	;
 this.singlepropertyDetails[ 'consideration']= this.propertyDetails[i].consideration	;
 this.singlepropertyDetails[ 'additionalduty']= this.propertyDetails[i].additionalduty	;
 this.singlepropertyDetails[ 'cessduty']= this.propertyDetails[i].cessduty	;
 this.singlepropertyDetails[ 'govtduty']= this.propertyDetails[i].govtduty	;
 this.singlepropertyDetails[ 'isexempted']= this.propertyDetails[i].isexempted	;
 this.singlepropertyDetails[ 'exemptiondescription']= this.propertyDetails[i].exemptiondescription	;
 this.singlepropertyDetails[ 'ismovableproperty']= this.propertyDetails[i].ismovableproperty	;
 this.singlepropertyDetails[ 'sdrefund']= this.propertyDetails[i].sdrefund	;
 this.singlepropertyDetails[ 'docmarketvalue']= this.propertyDetails[i].docmarketvalue	;
 this.singlepropertyDetails[ 'valid1']= this.propertyDetails[i].valid1	;
 this.singlepropertyDetails[ 'isimdemnified']= this.propertyDetails[i].isimdemnified	;
 this.singlepropertyDetails[ 'restriction']= this.propertyDetails[i].restriction	;
 this.singlepropertyDetails[ 'restrictiontype']= this.propertyDetails[i].restrictiontype	;
 this.singlepropertyDetails[ 'restrictiondescription']= this.propertyDetails[i].restrictiondescription	;
 this.singlepropertyDetails[ 'enumber']= this.propertyDetails[i].enumber	;
 this.singlepropertyDetails[ 'claimingblocknumber']= this.propertyDetails[i].claimingblocknumber	;
 this.singlepropertyDetails[ 'retainingblocknumber']= this.propertyDetails[i].retainingblocknumber	;
 this.singlepropertyDetails[ 'valuationreport']= this.propertyDetails[i].valuationreport	;
 this.singlepropertyDetails[ 'loanpurposeid']= this.propertyDetails[i].loanpurposeid	;
 this.singlepropertyDetails[ 'applicationnumber']= this.propertyDetails[i].applicationnumber	;
 this.singlepropertyDetails[ 'verified']= this.propertyDetails[i].verified	;
 this.singlepropertyDetails[ 'issroapproved']= this.propertyDetails[i].issroapproved	;
 this.singlepropertyDetails[ 'stamparticlecode']= this.propertyDetails[i].stamparticlecode	;
 this.singlepropertyDetails[ 'descriptione']= this.propertyDetails[i].descriptione	;
 this.singlepropertyDetails[ 'stampruleid']= this.propertyDetails[i].stampruleid	;

        this.multiproeprtyDetails.push({ ...this.singlepropertyDetails });
  }
  
  localStorage.setItem("kaveriResult", JSON.stringify(this.multiproeprtyDetails));
  this.kaveriData=JSON.parse(localStorage.getItem("kaveriResult"));
  }
}
