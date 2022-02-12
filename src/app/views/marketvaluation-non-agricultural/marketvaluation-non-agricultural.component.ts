import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import notify from 'devextreme/ui/notify';
import { KaveriService } from '../../services/kaveri.service';

import { MarketvaluationService } from '../../services/marketvaluation.service';

@Component({
  selector: 'app-marketvaluation-non-agricultural',
  templateUrl: './marketvaluation-non-agricultural.component.html',
  styleUrls: ['./marketvaluation-non-agricultural.component.scss']
})
export class MarketvaluationNonAgriculturalComponent implements OnInit {

  disTrict: any;
  talUka: any;
  town: any;
  vilLage: any;
  selectedAll: boolean;
  checkedvalue: any;
  selecteditem: any;
  loggedinUser: string = "";
  Units: any;
  selectedpropertytype: any;
  finalamountofproperty: any = 0;
  finalAgriamountofproperty: any = 0;
  finalamountofbuildingproperty: any = 0;
  finalamountofflatproperty: any = 0;
  PropertyRate: any;
  AllrateDetails: any;
  TotalPercentageValuation: any = 0;
  TotalAgriPercentageValuation: any = 0;
  finalpercentvalue: any = 0;
  apartmentfloorrateid: any = 0;

  //propertyType
  VacantType: boolean = true;
  BuildingType: boolean = false;
  FlatType: boolean = false;
  FlatApartmentType: boolean = false;
  BuildingConstructionType: boolean = false;
  BuildandFlatTypes: Boolean = false;

  TotalValuationAmountForBuilding = false;
  VacantTotalValuationAmount = false;
  TotalValuationAmountForFlat = false;
  TotalValuationAmountForBuildingButton = false;
  TotalValuationAmountForFlatButton = false;
  TotalValuationAmount = false;
  InputAreaVisible = false
  errorMessage: any;
  Unitcode: any = 0;
  villagecode: any = {
    "villageCode": ""
  };
  /////
  ConstructionTypes: any;
  ConstructionTypeRate: any;

  VacantPlotDetails: any = [];
  Annexurerules: any = [];
  Amenetiesratedetails: any = [];
  BuildingRateDetails: any;
  FlateRateDetails: any;
  BuildingAnnexurerules: any;
  FlatAnnexurerules: any;
  constructionRateRequest: any = {
    "constructiontypeid": "",
    "Groundfloor": "",
    "Abovefloor": "",
    "villagecode": ""
  };
  ConstructiontypeRates: any;
  TotalConstructionAmount: any = 0;
  TotalFlatParkingAmount: any = 0;
  TotalBuildingParkingAmount: any = 0
  TotalAmenitiesAmount: any = 0;

  TotalFloorAmount = 0;
  roadcode: any = {
    "roadcode": ""
  };
  ParkingType: any;
  constructionrate: any;
  FlatParkingType: any;
  BuildingParkingType: any;
  ApartmentSpecialAmenities: any = [];
  AmenetiesList = 0;
  TotalBuildingPercentageValuation = 0;
  TotalFlatPercentageValuation = 0;
  refpropertytyperequest: any = {
    "refrenceparentpropertyid": 28
  }
  codedetails: any;
  propertytype: any;
  properties: any = [
    {
      "propertyid": 1,
      "isactive": true
    },
    {
      "propertyid": 2,
      "isactive": false
    },
    {
      "propertyid": 3,
      "isactive": false
    },
  ]
  // displaypropertytypeNum: any;
  Valuationmodel: any = {};
  SROCode: string;
  NonAgriculturevaluationAmount: any = 0;
  PropertytypeId: any;
  currentdate = new Date();
  Groundfloor: any = 0
  Abovefloor: any = 0
  message: any;
  bhoomiMultyobject: any = [];
  item: number = 0;
  numofprop: number = 0;
  displaypropertytypeNum: number = 1;
  bhoomiObject: any;
  RegSROCode: any;
  northboundary: any = "";
  southboundary: any = "";
  assessment = "";
  regarticlecode: any = 1;
  applicationnumber: any = "";
  eastboundary = "";
  westboundary = "";
  propertyId: any;
  Floorratedetails: any = []
  ValuationId: any = 0;
  AgriValuationId:any = 0
  agriculturedetailsidForAgri :any = null
  agriculturedetailsid: any = null
  buildingratedetails: any = null
  Flatratedetailsid: any = null
  Flatfloordetailsid: any = null
  Amenetiesdetailsid: any = null
  unitid: any = 1
  Constructionratedetails: any = [];
  isDisabled: boolean;
  FlatPropertyRate: any = 0
  BuildingPropertyRate: any = 0
  propertydata: any;
  Nonagriroadcode:any ;
  AgriMarketvaluation:boolean = false ;
  NonAgriMarketvaluation:boolean = false ;
  MovableMarketvaluation:boolean = false
  products: any;
  AgriAnnexurerules:any
  constructor(private ref: ChangeDetectorRef, public marketvaluationService: MarketvaluationService, public router: Router, private kaveriService: KaveriService) { }

  // VacantPlotDetails:any =  [
  //   {
  //       'SNo' :'01',
  //       'PropertyType':'Residential',
  //       'Rate':'400000'
  //   },
  //   {
  //     'SNo' :'02',
  //     'PropertyType':'Commercial',
  //     'Rate':'500000'
  //   },
  //   {
  //     'SNo' :'03',
  //     'PropertyType':'Industrial',
  //     'Rate':'600000'
  //   }];

  // Annexurerules:any = [
  //     {
  //         'SNo' :'01',
  //         'AnnexureRule':'Corner Property',
  //         'Percentage':'10.00',
  //         'Amount' : 0
  //     },
  //     {
  //       'SNo' :'02',
  //       'AnnexureRule':'Any Two side Roads',
  //       'Percentage':'10.00',
  //       'Amount' : 0
  //     },
  //     {
  //       'SNo' :'03',
  //         'AnnexureRule':'Industrial Purpose',
  //         'Percentage':'50.00',
  //         'Amount' : 0
  //     },
  //     {
  //       'SNo' :'04',
  //       'AnnexureRule':'Property Abutting to NH',
  //       'Percentage':'50.00',
  //       'Amount' : 0
  //     },
  //     {
  //       'SNo' :'05',
  //       'AnnexureRule':'Property Abutting to SH',
  //       'Percentage':'25.00',
  //       'Amount' : 0
  //     }
  //   ];
  // propertytype :any = [
  //   {
  //     'type' :'VacantPlot'
  //   },
  //   {
  //     'type' :'Building'
  //   },
  //   {
  //     'type' :'Flat/Apartment'
  //   }
  // ]

  FloorNumbers: any = []

  // "0-5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15-200"
  // ]
  //   UnitsList :any = [{
  //     'Unitcode' : 1200
  //   },
  //   {
  //     'Unitcode' : 2000
  //   }
  // ]
  // BuildingRateDetails :any = [
  //   {
  //     'SNo' :'01',
  //     'PropertyType':'Residential',
  //     'Rate':'400000'
  // },
  // {
  //   'SNo' :'02',
  //   'PropertyType':'Commercial',
  //   'Rate':'500000'
  // },
  // {
  //   'SNo' :'03',
  //   'PropertyType':'Industrial',
  //   'Rate':'600000'
  // }
  // ]
  // ApartmentSpecialAmenities:any = [
  //   {
  //     'SNo' :'01',
  //     'description':'Club house, Community hall, Conference hall, party hall, Card room, Reading room, library, Banquet hall, party area, party lawn and similar types of amenities.',
  //     'Amount' : 0
  // },
  // {
  //   'SNo' :'02',
  //   'description':'Jogging track, Cycling track, Walking track, Pebble pathway, Reflexology path and similar types of amenities.',
  //   'Amount' : 0
  // },
  // {
  //     'SNo' :'03',
  //     'description':'Children play area, tot cot, children game area, Garden, Water body, Decorative pool Plantation Garden, Barbeque pits, crèche, landscape area, fountain and similar types of amenities.',
  //     'Amount' : 0
  // },
  // {
  //   'SNo' :'04',
  //   'description':'Canteen, Mall, Commercial space, ATM, Bank, Hopcom, Janatha Bazar, Nandini Milk outlet, Provision store, Parlor, Cafeteria, Super market, Plaza and similar types of amenities.',
  //   'Amount' : 0
  // },
  // {
  //   'SNo' :'05',
  //   'description':'All type of outdoor play area, Badminton, Tennis, Basket ball, Base ball, Cricket, Foot ball, Hockey and similar types of amenities.',
  //   'Amount' : 0
  // },
  // {
  //   'SNo' :'05',
  //   "description": "All type of indoor game area, squash, snooker, Table tennis, carom room, Indoor games area and similar types of amenities.",
  //   'Amount' : 0
  // }
  // ]

  // ParkingType : any = [
  //   { 'SNo' :'01',
  //   "description" :"Covered Car Parking"
  //   },
  //   { 'SNo' :'02',
  //   "description" :"Open Car Parking"
  //   }
  // ]

  Totalvacantlist: any = [
    {
      'Id': '01',
      'name': 'Annexure Rule Valuation',
      'amount': 0

    },
    {
      'Id': '02',
      'name': 'Total Valuation Amount',
      'amount': 0
    }
  ]
  TotalBuildinglist: any = [
    {
      'Id': '01',
      'name': 'Building Rate Valuation (A)',
      'amount': 0

    },
    {
      'Id': '02',
      'name': 'Construction Type Valuation',
      'amount': 0
    },
    {
      'Id': '03',
      'name': 'Annexure Rules Valuation',
      'amount': 0
    },
    {
      'Id': '04',
      'name': 'Parking Valuation',
      'amount': 0
    },
    {
      'Id': '05',
      'name': 'Total Valuation Amount',
      'amount': 0
    }
  ]
  TotalFlatlist: any = [
    {
      'Id': '01',
      'name': 'Estimated Guidance Rate  (A)',
      'amount': 0

    },
    {
      'Id': '02',
      'name': 'Apartment special amenities ',
      'amount': 0
    },
    {
      'Id': '03',
      'name': 'Annexure Rule value',
      'amount': 0
    },
    {
      'Id': '04',
      'name': 'Parking Type',
      'amount': 0
    },
    {
      'Id': '05',
      'name': 'Floor',
      'amount': 0
    },
    {
      'Id': '06',
      'name': 'Total Valuation Amount',
      'amount': 0
    }
  ]
  Totallist: any = [
    {
      'Id': '01',
      'name': 'Annexure Rule Valuation',
      'amount': 0

    },
    {
      'Id': '02',
      'name': 'Total Valuation Amount',
      'amount': 0
    }
  ]

  ngOnInit(): void {
    //   this.disTrict = localStorage.getItem('dist');
    //   this.talUka = localStorage.getItem('taluk');
    //   this.town = localStorage.getItem('hoblitown');
    //   this.vilLage = localStorage.getItem('indexvillage');
    //   this.loggedinUser = localStorage.getItem('loggedinuser');
    //   this.Unitcode = localStorage.getItem('TotalArea');
    //   this.codedetails = localStorage.getItem('BhoomiCodeDetails'); 
    //   this.roadcode.roadcode = localStorage.getItem('Roadcode'); 
    //  // this.villagecode = localStorage.getItem('villagecode');
    //   this.SROCode = localStorage.getItem('SROCode');
    //   this.PropertytypeId = localStorage.getItem('PropertyId');

    //   console.log("diplay the village code",this.codedetails.villageCode)
    //   this.villagecode.villageCode = localStorage.getItem('villagecode');
    //   this.properties.forEach(element => {
    //     if(element.isactive == true){
    //      this.displaypropertytypeNum = element.propertyid;
    //     }
    //   });
    console.log(this.AgriMarketvaluation);
    console.log(this.NonAgriMarketvaluation);
  //  this.Nonagriroadcode = localStorage.getItem('NonagriRoadcode'); 
    this.Nonagriroadcode = localStorage.getItem("Roadcode")
    this.applicationnumber = localStorage.getItem("ApplicationData")
    this.getpropertydata();
   
    console.log(this.AgriMarketvaluation);
    // this.bhoomiMultyobject = JSON.parse(localStorage.getItem('finalNonAgriculture'));
    // this.numofprop = this.bhoomiMultyobject.length;

    this.isDisabled = true
  




    //var json = "{\"applicationnumber\":\"PRP-20122021-01741\",\"propertyid\":0,\"valid\":855765,\"srocode\":114,\"sronamee\":\"Magadi\",\"regsrocode\":0,\"villagecode\":17472,\"roadcode\":37999,\"valuationdate\":\"2021-12-20\",\"propertytypeid\":12,\"totalarea\":160,\"unitid\":1,\"marketvalue\":0,\"leasetype\":0,\"leaseamount\":100,\"northboundary\":\"\",\"southboundary\":\"\",\"eastboundary\":\"\",\"westboundary\":\"\",\"assessment\":\"\",\"regarticlecode\":1,\"verified\":true,\"issroapproved\":\"y\",\"flatratedetails\":[{\"valid\":855765,\"applicationnumber\":\"PRP-20122021-01741\",\"propertyid\":0,\"flatrateid\":195656,\"rate\":119200.00,\"floorid\":1}],\"openbuiltvaluationdetails\":null,\"apartmentamenitydetails\":[{\"valid\":855765,\"applicationnumber\":\"PRP-20122021-01741\",\"propertyid\":0,\"amenetiesdetailsid\":171,\"apartmentamenetyruleid\":1,\"rate1\":0.75}],\"userapartmentamenitydetails\":[{\"valid\":855765,\"applicationnumber\":\"PRP-20122021-01741\",\"propertyid\":0,\"useramenetiesdetailsid\":146,\"apartmentamenityid\":1,\"isselected\":true,\"verified\":true},{\"valid\":855765,\"applicationnumber\":\"PRP-20122021-01741\",\"propertyid\":0,\"useramenetiesdetailsid\":147,\"apartmentamenityid\":2,\"isselected\":true,\"verified\":true},{\"valid\":855765,\"applicationnumber\":\"PRP-20122021-01741\",\"propertyid\":0,\"useramenetiesdetailsid\":148,\"apartmentamenityid\":3,\"isselected\":true,\"verified\":true},{\"valid\":855765,\"applicationnumber\":\"PRP-20122021-01741\",\"propertyid\":0,\"useramenetiesdetailsid\":149,\"apartmentamenityid\":4,\"isselected\":true,\"verified\":true},{\"valid\":855765,\"applicationnumber\":\"PRP-20122021-01741\",\"propertyid\":0,\"useramenetiesdetailsid\":150,\"apartmentamenityid\":5,\"isselected\":true,\"verified\":true},{\"valid\":855765,\"applicationnumber\":\"PRP-20122021-01741\",\"propertyid\":0,\"useramenetiesdetailsid\":151,\"apartmentamenityid\":6,\"isselected\":true,\"verified\":true},{\"valid\":855765,\"applicationnumber\":\"PRP-20122021-01741\",\"propertyid\":0,\"useramenetiesdetailsid\":152,\"apartmentamenityid\":7,\"isselected\":false,\"verified\":true},{\"valid\":855765,\"applicationnumber\":\"PRP-20122021-01741\",\"propertyid\":0,\"useramenetiesdetailsid\":153,\"apartmentamenityid\":8,\"isselected\":false,\"verified\":true},{\"valid\":855765,\"applicationnumber\":\"PRP-20122021-01741\",\"propertyid\":0,\"useramenetiesdetailsid\":154,\"apartmentamenityid\":9,\"isselected\":false,\"verified\":true},{\"valid\":855765,\"applicationnumber\":\"PRP-20122021-01741\",\"propertyid\":0,\"useramenetiesdetailsid\":155,\"apartmentamenityid\":10,\"isselected\":false,\"verified\":true},{\"valid\":855765,\"applicationnumber\":\"PRP-20122021-01741\",\"propertyid\":0,\"useramenetiesdetailsid\":156,\"apartmentamenityid\":11,\"isselected\":false,\"verified\":true},{\"valid\":855765,\"applicationnumber\":\"PRP-20122021-01741\",\"propertyid\":0,\"useramenetiesdetailsid\":157,\"apartmentamenityid\":12,\"isselected\":false,\"verified\":true},{\"valid\":855765,\"applicationnumber\":\"PRP-20122021-01741\",\"propertyid\":0,\"useramenetiesdetailsid\":158,\"apartmentamenityid\":13,\"isselected\":false,\"verified\":true},{\"valid\":855765,\"applicationnumber\":\"PRP-20122021-01741\",\"propertyid\":0,\"useramenetiesdetailsid\":159,\"apartmentamenityid\":14,\"isselected\":false,\"verified\":true},{\"valid\":855765,\"applicationnumber\":\"PRP-20122021-01741\",\"propertyid\":0,\"useramenetiesdetailsid\":160,\"apartmentamenityid\":15,\"isselected\":false,\"verified\":true}],\"annexuredetails\":[{\"valid\":855765,\"applicationnumber\":\"PRP-20122021-01741\",\"propertyid\":0,\"annexuredetailsid\":3658,\"annexureid\":1,\"rate2\":1907200.00,\"isselected\":true},{\"valid\":855765,\"applicationnumber\":\"PRP-20122021-01741\",\"propertyid\":0,\"annexuredetailsid\":3659,\"annexureid\":2,\"rate2\":0.00,\"isselected\":false},{\"valid\":855765,\"applicationnumber\":\"PRP-20122021-01741\",\"propertyid\":0,\"annexuredetailsid\":3660,\"annexureid\":3,\"rate2\":0.00,\"isselected\":false},{\"valid\":855765,\"applicationnumber\":\"PRP-20122021-01741\",\"propertyid\":0,\"annexuredetailsid\":3661,\"annexureid\":4,\"rate2\":0.00,\"isselected\":false},{\"valid\":855765,\"applicationnumber\":\"PRP-20122021-01741\",\"propertyid\":0,\"annexuredetailsid\":3662,\"annexureid\":5,\"rate2\":0.00,\"isselected\":false},{\"valid\":855765,\"applicationnumber\":\"PRP-20122021-01741\",\"propertyid\":0,\"annexuredetailsid\":3663,\"annexureid\":16,\"rate2\":0.00,\"isselected\":false},{\"valid\":855765,\"applicationnumber\":\"PRP-20122021-01741\",\"propertyid\":0,\"annexuredetailsid\":3664,\"annexureid\":17,\"rate2\":0.00,\"isselected\":false},{\"valid\":855765,\"applicationnumber\":\"PRP-20122021-01741\",\"propertyid\":0,\"annexuredetailsid\":3665,\"annexureid\":18,\"rate2\":0.00,\"isselected\":false}],\"parkingratedetails\":[{\"valid\":855765,\"applicationnumber\":\"PRP-20122021-01741\",\"propertyid\":0,\"parkingdetailsid\":198,\"parkingtypeid\":1,\"totalparkings\":2,\"rate3\":0.00},{\"valid\":855765,\"applicationnumber\":\"PRP-20122021-01741\",\"propertyid\":0,\"parkingdetailsid\":199,\"parkingtypeid\":2,\"totalparkings\":3,\"rate3\":0.00}],\"flatfloordetails\":[{\"valid\":855765,\"applicationnumber\":\"PRP-20122021-01741\",\"propertyid\":0,\"flatfloordetailsid\":117,\"apartmentfloorrateid\":7,\"rate4\":3}]}"
    //console.log( JSON.parse(json));

  }

  GetPropertytypes() {

    this.marketvaluationService.GetPropertyTypes(this.refpropertytyperequest).subscribe(
      (data: any) => {
        if (data.length != 0) {
          console.log(data);
          this.propertytype = data;
          this.propertytype.forEach(element => {
            var name = "Vacant Site"
            if (element.propertytypename === name) {
              this.PropertytypeId = element.propertytypeid
            }
          });
        //  this.GetNonAgriculturaldatafromApi();
          localStorage.setItem('PropertyTypesDetails', this.propertytype);
        }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
  }
  GetNonAgriculturaldatafromApi() {
    console.log("GetNonAgriculturaldatafromApi",this.roadcode)
    this.marketvaluationService.GetVacantRateDetails(this.roadcode).subscribe(
      (data: any) => {
        if (data.length != 0) {
          data.forEach(element => {
            element.rate = this.numberWithCommas(element.rate);
            element.checked = false
          });
          this.VacantPlotDetails = data;
          console.log(data);
          localStorage.setItem('Agriculturalratedetails', data);
        }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
    var property = {
      "propertytypeid": this.PropertytypeId
    }
  
    this.marketvaluationService.GetNonagriculturalAnnexurerules(property).subscribe(
      (data: any) => {

        if (data.length != 0) {
          data.forEach(element => {
            element['Amount'] = 0
            console.log("ghjkl", element.description)
            element.Yeschecked = false
            element.Nochecked = true
          });
          this.Annexurerules = data;


          console.log(data);
          setTimeout(() => {
            this.FetchVacantvaluationdetails();
          }, 1000);
        }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
  }

  getpropertydata() {
    this.displaypropertytypeNum = 1
    this.numofprop = 0
    this.bhoomiMultyobject = [];
    this.kaveriService.GetPropertyMasterData(this.applicationnumber).subscribe(
      (data: any) => {
        console.log((data))
        if (data) {
          this.propertydata = data;
          var propertyid: any
          data.forEach(element => {
            propertyid = element.propertyid
            this.bhoomiMultyobject.push(element)
            console.log("display array ", this.bhoomiMultyobject)
            
            
            // if (element.propertytypeid === 28) {
            //   this.NonAgriMarketvaluation = true ;
            //   propertyid = element.propertyid
            //   this.bhoomiMultyobject.push(element)
            //   console.log("display array ", this.bhoomiMultyobject)
            //   this.numofprop = this.bhoomiMultyobject.length;
            //   this.item = this.displaypropertytypeNum - 1;
            //   this.changeprop()
            // }else if(element.propertytypeid === 17 ||element.propertytypeid === 1 ||element.propertytypeid === 12 ||element.propertytypeid === 29){
            //   this.AgriMarketvaluation = true ;
            //   propertyid = element.propertyid
            //   this.bhoomiMultyobject.push(element)
            //   console.log("display array ", this.bhoomiMultyobject)
            //   this.numofprop = this.bhoomiMultyobject.length;
            //   this.item = this.displaypropertytypeNum - 1;
            //   this.changeprop()
            // }
          });
          this.numofprop = this.bhoomiMultyobject.length;
            this.item = this.displaypropertytypeNum - 1;
            this.changeprop()
            var propertydetails = this.bhoomiMultyobject[this.item] 
            if (propertydetails.propertytypeid === 28 ||propertydetails.propertytypeid === 1 ||propertydetails.propertytypeid === 12 ||propertydetails.propertytypeid === 29){
              this.PropertytypeId = propertydetails.propertytypeid 
              this.NonAgriMarketvaluation = true ;
              this.AgriMarketvaluation = false ;
              this.MovableMarketvaluation = false
              this.GetPropertytypes();
              if (this.PropertytypeId === 12) {
                this.GetAllFlatDetails()
              } else if (this.PropertytypeId === 29) {
                this.GetAllBuildingDetails();
              } else {
                this.GetAllVacatDetails();
               // this.GetNonAgriculturaldatafromApi();
              }
            }else if(propertydetails.propertytypeid === 17 ){
              this.PropertytypeId = propertydetails.propertytypeid 
              this.AgriMarketvaluation = true ;
              this.MovableMarketvaluation = false
              this.NonAgriMarketvaluation = false ;
              this.GetAgriculturaldatafromApi()
            }else{
              this.NonAgriMarketvaluation = false ;
              this.AgriMarketvaluation = false ;
              this.MovableMarketvaluation = true
            }
          //this.bhoomiMultyobject = data
         
          //   if(this.propertydata[this.item] && this.propertydata[this.item] != null ){
          //   var changebhoomiObject = this.propertydata[this.item];

          //   this.disTrict = changebhoomiObject.districtname;
          //   this.talUka = changebhoomiObject.taluknamee;
          //   this.town = changebhoomiObject.hoblinamee;
          //   this.vilLage = changebhoomiObject.villagenamee;


          //  }
        }

      }
    )
  }

  totalvacantdetails: any;
  FetchVacantvaluationdetails() {
    this.TotalPercentageValuation = 0
    this.finalamountofproperty = 0
    this.agriculturedetailsid = null;
    this.ValuationId = null
    var applicationdetails = {
      "propertytypeid": this.PropertytypeId,
      "applicationnumber": localStorage.getItem("ApplicationData")
    }
    var propertydetails = this.bhoomiMultyobject[this.item]
    this.marketvaluationService.FetchNonagriculturaldetails(applicationdetails).subscribe(
      (data: any) => {
        console.log(data)
        this.totalvacantdetails = JSON.parse(data[0].jsonData)
        console.log(this.totalvacantdetails)
          this.totalvacantdetails = this.totalvacantdetails["array_to_json"];
          if (this.totalvacantdetails != null) {
          this.totalvacantdetails.forEach(vacantdetails => {
         
          if (this.PropertytypeId === vacantdetails.propertytypeid && propertydetails.propertyid === vacantdetails.propertyid) {
            var openbuiltvaluationdetails = vacantdetails["openbuiltvaluationdetails"]
            var annexuredetails = vacantdetails["annexuredetails"]
            this.ValuationId = vacantdetails.valid;
            openbuiltvaluationdetails.forEach(rate => {
              this.VacantPlotDetails.forEach(p => {
                if (p.openbuildratecode == rate.openbuiltrateid) {
                  if (p.checked === false) {
                    this.agriculturedetailsid = rate.openbuiltvalid;
                    //  p["agriculturedetailsid"] = element.agriculturedetailsid;
                    p.checked = true
                    var PropertyRate = this.transform(p.rate);
                    this.finalamountofproperty = this.marketvaluationService.CalculationforAgriculturalLand(this.Unitcode, PropertyRate)
                  }
                }
              });
            })
            annexuredetails.forEach(element => {
              this.Annexurerules.forEach(annex => {
                if (annex.annexureid === element.annexureid) {
                  if (element.isselected == true) {
                    if (annex.Yeschecked != true) {
                      annex.Nochecked = false
                      annex.Yeschecked = element.isselected
                      annex.Amount = this.numberWithCommas(element.rate2)
                      //  totalamount = totalamount + annex.Amount;
                      // console.log("display the total amout of annexure rules" ,totalamount)
                      annex["annexuredetailsid"] = element.annexuredetailsid
                      console.log("total percentage :::", this.TotalPercentageValuation)
                      this.TotalPercentageValuation = this.TotalPercentageValuation + element.rate2
                    }
                  } else {
                    //  annex.Nochecked = element.isselected
                    annex.Nochecked = true
                    annex.Amount = this.numberWithCommas(element.rate2)
                    annex["annexuredetailsid"] = element.annexuredetailsid
                  }
                }
              });
            })
          }
        })

        }
        // if (data.length != 0) {
        //   console.log("display the vali data ", data)
        //   localStorage.setItem("ValidId", data[0].valid)

        //   var totalamount = 0
        //   data.forEach(element => {
        //     if (this.propertyId === element.propertyid && this.PropertytypeId === element.propertytypeid) {
        //       this.ValuationId = element.valid;
        //       this.Annexurerules.forEach(annex => {
        //         if (annex.annexureid === element.annexureid) {
        //           if (element.isselected == true) {
        //             if (annex.Yeschecked != true) {
        //               annex.Nochecked = false
        //               annex.Yeschecked = element.isselected
        //               annex.Amount = this.numberWithCommas(element.rate1)
        //               //  totalamount = totalamount + annex.Amount;
        //               // console.log("display the total amout of annexure rules" ,totalamount)
        //               annex["annexuredetailsid"] = element.annexuredetailsid
        //               console.log("total percentage :::", this.TotalPercentageValuation)
        //               this.TotalPercentageValuation = this.TotalPercentageValuation + element.rate1
        //             }
        //           } else {
        //             //  annex.Nochecked = element.isselected
        //             annex.Nochecked = true
        //             annex.Amount = this.numberWithCommas(element.rate1)
        //             annex["annexuredetailsid"] = element.annexuredetailsid
        //           }
        //         }
        //       });
        //       this.VacantPlotDetails.forEach(p => {
        //         if (p.openbuildratecode == element.openbuiltrateid) {
        //           this.agriculturedetailsid = element.openbuiltvalid;
        //           //  p["agriculturedetailsid"] = element.agriculturedetailsid;
        //           p.checked = true
        //           var PropertyRate = this.transform(p.rate);
        //           this.finalamountofproperty = this.marketvaluationService.CalculationforAgriculturalLand(this.Unitcode, PropertyRate)
        //         }
        //       });
        //       // this.Totalvacantlist.forEach(p => {
        //       //   if (p.Id === "02") {
        //       //     p.amount = data[0].marketvalue;

        //       //   } else if (p.Id === "01") {
        //       //     p.amount = totalamount;

        //       //   }
        //       // });




        //     }
        //   });



        //   console.log("display the Totallist rules", this.Totalvacantlist)
        //   console.log("display the products rules", this.VacantPlotDetails)
        //   console.log("display the Annexurerules rules", this.Annexurerules)
        // }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
  }


  onPropertyTypeValuechange($event) {
    try {

      console.log("display the property type ", $event);
      if ($event != "") {
        let text1 = $event.target.options[$event.target.options.selectedIndex].text;
        this.selectedpropertytype = text1;
        this.propertytype.forEach(element => {
          if (element.propertytypename === text1) {
            this.PropertytypeId = element.propertytypeid
          }
        });
        if (text1 == "Vacant Site") {
          this.GetAllVacatDetails();
        } else if (text1 == "Building") {
          
         // this.getpropertydata();
          // this.changeprop()
          this.GetAllBuildingDetails();

        } else {
          
         // this.getpropertydata();
          // this.changeprop()
          this.GetAllFlatDetails()
        }

        // this.ref.detectChanges();
        console.log("display the on selected type chage event ", text1);
      }
    } catch (error) {
      console.log("throwing error ", error);
    }
  }
  GetAllVacatDetails(){
    this.VacantType = true;
    this.BuildingType = false;
    this.FlatType = false;
    this.BuildandFlatTypes = false;
    this.agriculturedetailsid = null;
    this.ValuationId = null;
    this.GetNonAgriculturaldatafromApi();
    // setTimeout(() => {
    //   this.FetchVacantvaluationdetails();
    // }, 1000);

  }
  GetAllBuildingDetails() {
          this.VacantType = false;
          this.BuildingType = true;
          this.FlatType = false;
          this.BuildandFlatTypes = true;
          this.BuildingConstructionType = true;
          this.FlatApartmentType = false;
          this.TotalValuationAmountForBuilding = false;
          this.TotalValuationAmountForFlat = false;
          this.TotalValuationAmountForBuildingButton = true;
          this.TotalValuationAmountForFlatButton = false
          this.buildingratedetails = null;
          this.ValuationId = null;
    this.GetBuildingRates();
    // this.GetConstructionTypes();
    // this.GetBuildingAnnexureRulesDetails();
    // this.GetBuildingParkingTypesDetails();
    // setTimeout(() => {
    //   this.FetchBuildingvaluationdetails();
    // }, 1000);
  }
  GetAllFlatDetails() {
    this.VacantType = false;
    this.BuildingType = false;
    this.FlatType = true;
    this.BuildandFlatTypes = true;
    this.FlatApartmentType = true;
    this.BuildingConstructionType = false;
    this.TotalValuationAmountForBuilding = false;
    this.TotalValuationAmountForFlat = false;
    this.TotalValuationAmountForBuildingButton = false;
    this.TotalValuationAmountForFlatButton = true;
    this.Flatratedetailsid = null;
    this.ValuationId = null;
    this.GetFlatRateDetails();
    // this.GetFloorNumbers();
    // this.GetApartmentSpecialAmeneties();
    // this.GetFlatAnnexureRulesDetails();
    // this.GetFlatParkingTypesDetails();
    // setTimeout(() => {
    //   this.FetchFlatvaluationdetails();
    // }, 2000);
  }
  Onunitschange($event) {

    if ($event != "") {
      let text1 = $event.target.options[$event.target.options.selectedIndex].text;
      this.Units = text1;
      console.log("display the on unit chage event ", text1);
    }
  }
  totalbuildingdetails: any;
  FetchBuildingvaluationdetails() {
    this.TotalBuildingPercentageValuation = 0
    this.finalamountofbuildingproperty = 0
    this.TotalConstructionAmount = 0
    this.TotalBuildingParkingAmount = 0
    this.buildingratedetails = null;
    this.ValuationId = null
    var applicationdetails = {
      "propertytypeid": this.PropertytypeId,
      "applicationnumber": localStorage.getItem("ApplicationData")
    }
    this.marketvaluationService.FetchNonagriculturaldetails(applicationdetails).subscribe(
      (data: any) => {

        this.totalbuildingdetails = JSON.parse(data[0].jsonData)

        console.log(this.totalbuildingdetails)
        var propertydetails = this.bhoomiMultyobject[this.item]
          this.totalbuildingdetails = this.totalbuildingdetails["array_to_json"];
          if (this.totalbuildingdetails != null) {
          this.totalbuildingdetails.forEach(buildingdetails => {
          if (this.PropertytypeId === buildingdetails.propertytypeid && propertydetails.propertyid === buildingdetails.propertyid) {
            var openbuiltvaluationdetails = buildingdetails["openbuiltvaluationdetails"]
            var constructionratedetails = buildingdetails["constructionratedetails"]
            var annexuredetails = buildingdetails["annexuredetails"]
            var parkingratedetails = buildingdetails["parkingratedetails"]
            this.ValuationId = buildingdetails.valid;
            openbuiltvaluationdetails.forEach(rate => {
              this.BuildingRateDetails.forEach(p => {
                if (p.openbuildratecode === rate.openbuiltrateid) {
                  if (p.checked === false) {
                    this.buildingratedetails = rate.openbuiltvalid;
                    //  p["agriculturedetailsid"] = element.agriculturedetailsid;
                    p.checked = true
                    var PropertyRate = this.transform(p.rate);
                    this.BuildingPropertyRate = PropertyRate
                    this.finalamountofbuildingproperty = this.marketvaluationService.CalculationforAgriculturalLand(this.Unitcode, PropertyRate)
                  }
                }
              });
            })
            constructionratedetails.forEach(consttype => {
              this.ConstructionTypes.forEach(type => {
                if (type.constructiontypeid == consttype.constructiontypeid) {
                  if (type.checked === false) {
                    type["Groundfloor"] = consttype.gfarea
                    type["Abovefloor"] = consttype.agfarea
                    type["constructiondetailsid"] = consttype.constructiondetailsid
                    type.checked = true
                    type.constructionTypeRate = this.numberWithCommas(consttype.rate)
                    this.TotalConstructionAmount = this.TotalConstructionAmount + consttype.rate
                  }
                } else {
                  // type["constructiondetailsid"] = element.constructiondetailsid
                }
              });
            })
            annexuredetails.forEach(element => {
              this.BuildingAnnexurerules.forEach(annex => {
                if (annex.annexureid === element.annexureid) {
                  if (element.isselected == true) {
                    if (annex.Yeschecked != true) {
                      annex.Yeschecked = element.isselected
                      annex.Nochecked = false
                      annex.Amount = this.numberWithCommas(element.rate2)
                      //  totalamount = totalamount + annex.Amount;
                      // console.log("display the total amout of annexure rules" ,totalamount)
                      annex["annexuredetailsid"] = element.annexuredetailsid
                      console.log("total percentage :::", this.TotalPercentageValuation)
                      //  this.TotalPercentageValuation = this.TotalPercentageValuation + annex.Amount
                      this.TotalBuildingPercentageValuation = this.TotalBuildingPercentageValuation + element.rate2;
                    }
                  } else {
                    //annex.Nochecked = element.isselected
                    annex.Nochecked = true
                    annex.Amount = this.numberWithCommas(element.rate2)
                    annex["annexuredetailsid"] = element.annexuredetailsid
                  }
                }
              });
            })
            parkingratedetails.forEach(park => {
              this.BuildingParkingType.forEach(parking => {
                if (parking.parkingtypeid == park.parkingtypeid) {
                  parking.Number = park.totalparkings
                  this.TotalBuildingParkingAmount = this.TotalBuildingParkingAmount + park.rate3;
                  console.log("parking details rate ", this.TotalBuildingParkingAmount)
                  parking["parkingdetailsid"] = park.parkingdetailsid
                } else {
                  parking["parkingdetailsid"] = park.parkingdetailsid
                }
              });
            })
          }
        });
          // if (data.length != 0) {
          //   console.log("display the vali data ", data)
          //   localStorage.setItem("ValidId", data[0].valid)

          //   var totalamount = 0
          //   data.forEach(element => {
          //   if (this.propertyId === element.propertyid && this.PropertytypeId === element.propertytypeid) {
          //       this.ValuationId = element.valid;
          //       this.BuildingAnnexurerules.forEach(annex => {
          //         if (annex.annexureid === element.annexureid) {
          //           if (element.isselected == true) {
          //             if (annex.Yeschecked != true) {
          //               annex.Yeschecked = element.isselected
          //               annex.Nochecked = false
          //               annex.Amount = this.numberWithCommas(element.rate2)
          //               //  totalamount = totalamount + annex.Amount;
          //               // console.log("display the total amout of annexure rules" ,totalamount)
          //               annex["annexuredetailsid"] = element.annexuredetailsid
          //               console.log("total percentage :::", this.TotalPercentageValuation)
          //               //  this.TotalPercentageValuation = this.TotalPercentageValuation + annex.Amount
          //               this.TotalBuildingPercentageValuation = this.TotalBuildingPercentageValuation + element.rate2;
          //             }
          //           } else {
          //             //annex.Nochecked = element.isselected
          //             annex.Nochecked = true
          //             annex.Amount = this.numberWithCommas(element.rate2)
          //             annex["annexuredetailsid"] = element.annexuredetailsid
          //           }
          //         }
          //       });
          //       this.BuildingRateDetails.forEach(p => {
          //         if (p.openbuildratecode === element.openbuiltrateid) {
          //           if (p.checked === false) {
          //             this.agriculturedetailsid = element.openbuiltvalid;
          //             //  p["agriculturedetailsid"] = element.agriculturedetailsid;
          //             p.checked = true
          //             var PropertyRate = this.transform(p.rate);
          //             this.finalamountofbuildingproperty = this.marketvaluationService.CalculationforAgriculturalLand(this.Unitcode, PropertyRate)
          //           }
          //         }
          //       });
          //       this.ConstructionTypes.forEach(type => {
          //         if (type.constructiontypeid == element.constructiontypeid) {
          //           if (type.checked === false) {
          //             type["Groundfloor"] = element.gfarea
          //             type["Abovefloor"] = element.agfarea
          //             type["constructiondetailsid"] = element.constructiondetailsid
          //             type.checked = true
          //             type.constructionTypeRate = this.numberWithCommas(element.rate1)
          //             this.TotalConstructionAmount = this.TotalConstructionAmount + element.rate1
          //           }
          //         } else {
          //           // type["constructiondetailsid"] = element.constructiondetailsid
          //         }
          //       });
          //       this.BuildingParkingType.forEach(parking => {
          //         if (parking.parkingtypeid == element.parkingtypeid) {
          //           parking.Number = element.totalparkings
          //           this.TotalBuildingParkingAmount = this.TotalBuildingParkingAmount + element.rate3;
          //           console.log("parking details rate ", this.TotalBuildingParkingAmount)
          //           parking["parkingdetailsid"] = element.parkingdetailsid
          //         } else {
          //           parking["parkingdetailsid"] = element.parkingdetailsid
          //         }
          //       });


          //       // this.TotalBuildinglist.forEach(list => {
          //       //   if (list.Id == '01') {
          //       //     list.amount = this.numberWithCommas(data[0].marketvalue);
          //       //   } else if (list.Id == '02') {
          //       //     list.amount = this.numberWithCommas(this.TotalConstructionAmount);
          //       //   } else if (list.Id == '03') {
          //       //     list.amount = this.numberWithCommas(this.TotalBuildingPercentageValuation)
          //       //   } else if (list.Id == '04') {
          //       //     list.amount = this.numberWithCommas(this.TotalBuildingParkingAmount)
          //       //   } else if (list.Id == '05') {
          //       //     var finalamount = data[0].marketvalue + this.TotalConstructionAmount + this.TotalBuildingPercentageValuation + this.TotalBuildingParkingAmount
          //       //     list.amount = this.numberWithCommas(finalamount);
          //       //   }

          //       // });


          //     }
          //   });



          //   console.log("display the Totallist rules", this.Totalvacantlist)
          //   console.log("display the products rules", this.VacantPlotDetails)
          //   console.log("display the Annexurerules rules", this.Annexurerules)
          // }

        }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
  }
  //totalflatdetails: any = "{\"applicationnumber\":\"PRP-20122021-01741\",\"propertyid\":0,\"valid\":855765,\"srocode\":114,\"sronamee\":\"Magadi\",\"regsrocode\":0,\"villagecode\":17472,\"roadcode\":37999,\"valuationdate\":\"2021-12-20\",\"propertytypeid\":12,\"totalarea\":160,\"unitid\":1,\"marketvalue\":0,\"leasetype\":0,\"leaseamount\":100,\"northboundary\":\"\",\"southboundary\":\"\",\"eastboundary\":\"\",\"westboundary\":\"\",\"assessment\":\"\",\"regarticlecode\":1,\"verified\":true,\"issroapproved\":\"y\",\"flatratedetails\":[{\"valid\":855765,\"applicationnumber\":\"PRP-20122021-01741\",\"propertyid\":0,\"flatrateid\":195656,\"rate\":119200.00,\"floorid\":1}],\"openbuiltvaluationdetails\":null,\"apartmentamenitydetails\":[{\"valid\":855765,\"applicationnumber\":\"PRP-20122021-01741\",\"propertyid\":0,\"amenetiesdetailsid\":171,\"apartmentamenetyruleid\":1,\"rate1\":0.75}],\"userapartmentamenitydetails\":[{\"valid\":855765,\"applicationnumber\":\"PRP-20122021-01741\",\"propertyid\":0,\"useramenetiesdetailsid\":146,\"apartmentamenityid\":1,\"isselected\":true,\"verified\":true},{\"valid\":855765,\"applicationnumber\":\"PRP-20122021-01741\",\"propertyid\":0,\"useramenetiesdetailsid\":147,\"apartmentamenityid\":2,\"isselected\":true,\"verified\":true},{\"valid\":855765,\"applicationnumber\":\"PRP-20122021-01741\",\"propertyid\":0,\"useramenetiesdetailsid\":148,\"apartmentamenityid\":3,\"isselected\":true,\"verified\":true},{\"valid\":855765,\"applicationnumber\":\"PRP-20122021-01741\",\"propertyid\":0,\"useramenetiesdetailsid\":149,\"apartmentamenityid\":4,\"isselected\":true,\"verified\":true},{\"valid\":855765,\"applicationnumber\":\"PRP-20122021-01741\",\"propertyid\":0,\"useramenetiesdetailsid\":150,\"apartmentamenityid\":5,\"isselected\":true,\"verified\":true},{\"valid\":855765,\"applicationnumber\":\"PRP-20122021-01741\",\"propertyid\":0,\"useramenetiesdetailsid\":151,\"apartmentamenityid\":6,\"isselected\":true,\"verified\":true},{\"valid\":855765,\"applicationnumber\":\"PRP-20122021-01741\",\"propertyid\":0,\"useramenetiesdetailsid\":152,\"apartmentamenityid\":7,\"isselected\":false,\"verified\":true},{\"valid\":855765,\"applicationnumber\":\"PRP-20122021-01741\",\"propertyid\":0,\"useramenetiesdetailsid\":153,\"apartmentamenityid\":8,\"isselected\":false,\"verified\":true},{\"valid\":855765,\"applicationnumber\":\"PRP-20122021-01741\",\"propertyid\":0,\"useramenetiesdetailsid\":154,\"apartmentamenityid\":9,\"isselected\":false,\"verified\":true},{\"valid\":855765,\"applicationnumber\":\"PRP-20122021-01741\",\"propertyid\":0,\"useramenetiesdetailsid\":155,\"apartmentamenityid\":10,\"isselected\":false,\"verified\":true},{\"valid\":855765,\"applicationnumber\":\"PRP-20122021-01741\",\"propertyid\":0,\"useramenetiesdetailsid\":156,\"apartmentamenityid\":11,\"isselected\":false,\"verified\":true},{\"valid\":855765,\"applicationnumber\":\"PRP-20122021-01741\",\"propertyid\":0,\"useramenetiesdetailsid\":157,\"apartmentamenityid\":12,\"isselected\":false,\"verified\":true},{\"valid\":855765,\"applicationnumber\":\"PRP-20122021-01741\",\"propertyid\":0,\"useramenetiesdetailsid\":158,\"apartmentamenityid\":13,\"isselected\":false,\"verified\":true},{\"valid\":855765,\"applicationnumber\":\"PRP-20122021-01741\",\"propertyid\":0,\"useramenetiesdetailsid\":159,\"apartmentamenityid\":14,\"isselected\":false,\"verified\":true},{\"valid\":855765,\"applicationnumber\":\"PRP-20122021-01741\",\"propertyid\":0,\"useramenetiesdetailsid\":160,\"apartmentamenityid\":15,\"isselected\":false,\"verified\":true}],\"annexuredetails\":[{\"valid\":855765,\"applicationnumber\":\"PRP-20122021-01741\",\"propertyid\":0,\"annexuredetailsid\":3658,\"annexureid\":1,\"rate2\":1907200.00,\"isselected\":true},{\"valid\":855765,\"applicationnumber\":\"PRP-20122021-01741\",\"propertyid\":0,\"annexuredetailsid\":3659,\"annexureid\":2,\"rate2\":0.00,\"isselected\":false},{\"valid\":855765,\"applicationnumber\":\"PRP-20122021-01741\",\"propertyid\":0,\"annexuredetailsid\":3660,\"annexureid\":3,\"rate2\":0.00,\"isselected\":false},{\"valid\":855765,\"applicationnumber\":\"PRP-20122021-01741\",\"propertyid\":0,\"annexuredetailsid\":3661,\"annexureid\":4,\"rate2\":0.00,\"isselected\":false},{\"valid\":855765,\"applicationnumber\":\"PRP-20122021-01741\",\"propertyid\":0,\"annexuredetailsid\":3662,\"annexureid\":5,\"rate2\":0.00,\"isselected\":false},{\"valid\":855765,\"applicationnumber\":\"PRP-20122021-01741\",\"propertyid\":0,\"annexuredetailsid\":3663,\"annexureid\":16,\"rate2\":0.00,\"isselected\":false},{\"valid\":855765,\"applicationnumber\":\"PRP-20122021-01741\",\"propertyid\":0,\"annexuredetailsid\":3664,\"annexureid\":17,\"rate2\":0.00,\"isselected\":false},{\"valid\":855765,\"applicationnumber\":\"PRP-20122021-01741\",\"propertyid\":0,\"annexuredetailsid\":3665,\"annexureid\":18,\"rate2\":0.00,\"isselected\":false}],\"parkingratedetails\":[{\"valid\":855765,\"applicationnumber\":\"PRP-20122021-01741\",\"propertyid\":0,\"parkingdetailsid\":198,\"parkingtypeid\":1,\"totalparkings\":2,\"rate3\":0.00},{\"valid\":855765,\"applicationnumber\":\"PRP-20122021-01741\",\"propertyid\":0,\"parkingdetailsid\":199,\"parkingtypeid\":2,\"totalparkings\":3,\"rate3\":0.00}],\"flatfloordetails\":[{\"valid\":855765,\"applicationnumber\":\"PRP-20122021-01741\",\"propertyid\":0,\"flatfloordetailsid\":117,\"apartmentfloorrateid\":7,\"rate4\":3}]}";
  totalflatdetails:any;
  FetchFlatvaluationdetails() {
    this.TotalFlatPercentageValuation = 0
    this.finalamountofflatproperty = 0
    this.TotalAmenitiesAmount = 0
    this.TotalFlatParkingAmount = 0
    this.TotalFloorAmount = 0
    this.AmenetiesList = 0
    this.Flatratedetailsid = null
    this.ValuationId = null
    this.Amenetiesdetailsid = null
    this.Flatfloordetailsid = null
    //this.FloorNumbers = []
    var applicationdetails = {
      "propertytypeid": this.PropertytypeId,
      "applicationnumber": localStorage.getItem("ApplicationData")
    }
    this.marketvaluationService.FetchNonagriculturaldetails(applicationdetails).subscribe(
      (data: any) => {
         this.totalflatdetails = JSON.parse(data[0].jsonData)
       // this.totalflatdetails = JSON.parse(this.totalflatdetails)
        console.log(this.totalflatdetails)
        var propertydetails = this.bhoomiMultyobject[this.item]
          this.totalflatdetails = this.totalflatdetails["array_to_json"];
          if (this.totalflatdetails != null) {
          this.totalflatdetails.forEach(flatdetails => {
        if (this.PropertytypeId === flatdetails.propertytypeid && propertydetails.propertyid === flatdetails.propertyid) {
         console.log(flatdetails)
          var flatratedetails = flatdetails["flatratedetails"]
          var apartmentamenitydetails = flatdetails["apartmentamenitydetails"]
          var userapartmentamenitydetails = flatdetails["userapartmentamenitydetails"]
          var annexuredetails = flatdetails["annexuredetails"]
          var parkingratedetails = flatdetails["parkingratedetails"]
          var flatfloordetails = flatdetails["flatfloordetails"]
          this.ValuationId = flatdetails.valid;
          flatratedetails.forEach(rate => {
            this.FlateRateDetails.forEach(p => {
              if (p.flaterateid === rate.flatrateid) {
                if (p.checked === false) {
                  this.Flatratedetailsid = rate.flatrateid;
                  //  p["agriculturedetailsid"] = element.agriculturedetailsid;
                  p.checked = true
                  var PropertyRate = this.transform(p.rate);
                  this.FlatPropertyRate = PropertyRate
                  this.finalamountofflatproperty = this.marketvaluationService.CalculationforAgriculturalLand(this.Unitcode, PropertyRate)
                }
              }
            });
          })
          if(apartmentamenitydetails != null){
            apartmentamenitydetails.forEach(amenity => {
              this.TotalAmenitiesAmount = amenity.rate1
              this.Amenetiesdetailsid = amenity.amenetiesdetailsid;
            })
          }else{
            this.TotalAmenitiesAmount =0
          }
         
          userapartmentamenitydetails.forEach(useramenity => {
            this.ApartmentSpecialAmenities.forEach(spel => {
              if (spel.apartmentamenityid === useramenity.apartmentamenityid) {
                if (useramenity.isselected) {
                  this.AmenetiesList = this.AmenetiesList + 1
                }
                spel.checked = useramenity.isselected
                spel["useramenetiesdetailsid"] = useramenity.useramenetiesdetailsid
              }
            })
          })
          annexuredetails.forEach(element => {
            this.FlatAnnexurerules.forEach(annex => {
              if (annex.annexureid === element.annexureid) {
                if (element.isselected == true) {
                  if (annex.Yeschecked != true) {
                    annex.Yeschecked = element.isselected
                    annex.Nochecked = false
                    annex.Amount = this.numberWithCommas(element.rate2)
                    //  totalamount = totalamount + annex.Amount;
                    // console.log("display the total amout of annexure rules" ,totalamount)
                    annex["annexuredetailsid"] = element.annexuredetailsid
                    console.log("total percentage :::", this.TotalPercentageValuation)
                    //  this.TotalPercentageValuation = this.TotalPercentageValuation + annex.Amount
                    this.TotalFlatPercentageValuation = this.TotalFlatPercentageValuation + element.rate2;
                    if (element.annexureid === 16 || element.annexureid === 17 || element.annexureid === 18) {
                      annex.IsInputAreaVisible = true
                      annex.Number = element.area;
                   // annex.Number = 123
                    }
                  }
                } else {
                  //   annex.Nochecked = element.isselected
                  annex.Nochecked = true
                  annex.Amount = this.numberWithCommas(element.rate2)
                  annex["annexuredetailsid"] = element.annexuredetailsid
                }
              }
            });
          })
          parkingratedetails.forEach(park => {
            this.FlatParkingType.forEach(parking => {
              if (parking.parkingtypeid == park.parkingtypeid) {
                parking.Number = park.totalparkings
                this.TotalFlatParkingAmount = this.TotalFlatParkingAmount + park.rate3;
                parking["parkingdetailsid"] = park.parkingdetailsid
              } else {
                parking["parkingdetailsid"] = park.parkingdetailsid
              }
            });
          })
          flatfloordetails.forEach(floordetails => {
            // this.apartmentfloorrateid = floordetails.apartmentfloorrateid;
            // console.log(this.apartmentfloorrateid)
            // this.TotalFloorAmount = this.TotalFloorAmount + floordetails.rate4;
            //    this.Flatfloordetailsid = floordetails.flatfloordetailsid;
            this.FloorNumbers.forEach(floor => {
              if (floor.apartmentfloorrateid === floordetails.apartmentfloorrateid) {
                floor.checked = true
                this.apartmentfloorrateid = floordetails.apartmentfloorrateid;
                this.TotalFloorAmount = this.TotalFloorAmount + floordetails.rate4;
                this.Flatfloordetailsid = floordetails.flatfloordetailsid;
              }
            });
          })
          }
        })







          // if (data.length != 0) {
          //   console.log("display the vali data ", data)
          //   localStorage.setItem("ValidId", data[0].valid)

          //   var totalamount = 0
          //   data.forEach(element => {
          //     if (this.propertyId === element.propertyid && this.PropertytypeId === element.propertytypeid) {
          //       this.ValuationId = element.valid;
          //       this.FlatAnnexurerules.forEach(annex => {
          //         if (annex.annexureid === element.annexureid) {
          //           if (element.isselected == true) {
          //             if (annex.Yeschecked != true) {
          //               annex.Yeschecked = element.isselected
          //               annex.Amount = element.rate2
          //               //  totalamount = totalamount + annex.Amount;
          //               // console.log("display the total amout of annexure rules" ,totalamount)
          //               annex["annexuredetailsid"] = element.annexuredetailsid
          //               console.log("total percentage :::", this.TotalPercentageValuation)
          //               //  this.TotalPercentageValuation = this.TotalPercentageValuation + annex.Amount
          //               this.TotalFlatPercentageValuation = this.TotalFlatPercentageValuation + annex.Amount;
          //             }
          //           } else {
          //             //   annex.Nochecked = element.isselected
          //             annex.Nochecked = true
          //             annex.Amount = element.rate2
          //             annex["annexuredetailsid"] = element.annexuredetailsid
          //           }
          //         }
          //       });
          //       this.FlateRateDetails.forEach(p => {
          //         if (p.openbuildratecode === element.openbuiltrateid) {
          //           if (p.checked === false) {
          //             this.agriculturedetailsid = element.openbuiltvalid;
          //             //  p["agriculturedetailsid"] = element.agriculturedetailsid;
          //             p.checked = true
          //             var PropertyRate = this.transform(p.rate);
          //             this.finalamountofflatproperty = this.marketvaluationService.CalculationforAgriculturalLand(this.Unitcode, PropertyRate)
          //           }
          //         }
          //       });
          //       this.ApartmentSpecialAmenities.forEach(amenity => {
          //         if (amenity.apartmentamenityid === element.apartmentamenityid) {
          //           amenity["checked"] = true
          //           this.AmenetiesList = this.AmenetiesList + 1
          //           this.TotalAmenitiesAmount = element.rate1

          //         }

          //       });
          //       this.FlatParkingType.forEach(parking => {
          //         if (parking.parkingtypeid == element.parkingtypeid) {
          //           parking.Number = element.totalparkings
          //           this.TotalBuildingParkingAmount = this.TotalBuildingParkingAmount + element.rate3;
          //         }
          //       });
          //       this.Floorratedetails.forEach(floor => {
          //         if (floor.apartmentfloorrateid === element.apartmentfloorrateid) {

          //           this.TotalFloorAmount = this.TotalFloorAmount + element.rate4;
          //         }
          //       });
          //       // this.TotalFlatlist.forEach(list => {
          //       //   if (list.Id == '01') {
          //       //     list.amount = this.numberWithCommas(data[0].marketvalue);
          //       //   } else if (list.Id == '02') {
          //       //     list.amount = this.numberWithCommas(this.TotalAmenitiesAmount);
          //       //   } else if (list.Id == '03') {
          //       //     list.amount = this.numberWithCommas(this.TotalFlatPercentageValuation)
          //       //   } else if (list.Id == '04') {
          //       //     list.amount = this.numberWithCommas(this.TotalFlatParkingAmount)
          //       //   } else if (list.Id == '05') {
          //       //     list.amount = this.numberWithCommas(this.TotalFloorAmount)
          //       //   } else if (list.Id == '06') {
          //       //     var finalamount = data[0].marketvalue + this.TotalAmenitiesAmount + this.TotalFlatPercentageValuation + this.TotalFlatParkingAmount + this.TotalFloorAmount;
          //       //     list.amount = this.numberWithCommas(finalamount)
          //       //     //list.amount = finalamount
          //       //     this.NonAgriculturevaluationAmount = finalamount;
          //       //     localStorage.setItem('NonAgricultureFlatTotalAmount', this.NonAgriculturevaluationAmount);
          //       //     localStorage.setItem('FinalMarketValuationAmount', this.NonAgriculturevaluationAmount);
          //       //   }
          //       // });
          //     }
          //   });



          //   console.log("display the Totallist rules", this.Totalvacantlist)
          //   console.log("display the products rules", this.VacantPlotDetails)
          //   console.log("display the Annexurerules rules", this.Annexurerules)
        }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
  }
  //////calculte All property type rate details

  SelectedPropertytypeRate(item) {

    this.VacantPlotDetails.forEach(val => {
      if (val.propertytypename == item.propertytypename) {

        val.checked = val.checked;
        this.PropertyRate = this.transform(val.rate);
        this.finalamountofproperty = this.marketvaluationService.CalculationforAgriculturalLand(this.Unitcode, this.PropertyRate)

        console.log("selected row data ", this.finalamountofproperty)
      }
      else {
        val.checked = false;
      }
    });

    this.Annexurerules.forEach(val => {
      if (val.Yeschecked) {
        val.Yeschecked = false
        val.Nochecked = true
        var amount: any = this.transform(val.Amount);
        this.TotalPercentageValuation = this.TotalPercentageValuation - amount;
        val.Amount = 0
      }
    })
  }
  SelectedAnnexarule(item) {
    console.log("selected row data ", item)
    this.Annexurerules.forEach(val => {
      if (val.description == item.description) {
        if (!item.Yeschecked) {
          if (item.Nochecked) {
            item.Nochecked = false
          }
          item.Nochecked = false;
          var finalamount = this.marketvaluationService.calculatePercentageforAnnexure(val.percentage, this.finalamountofproperty)
          console.log("display the on SelectedAnnexarule change event ", finalamount);
          val.Amount = this.numberWithCommas(finalamount);
          this.TotalPercentageValuation = this.TotalPercentageValuation + finalamount;
          console.log("addedpercentagerulevalue ", this.TotalPercentageValuation);
          this.finalpercentvalue = finalamount;
        } else if (item.Yeschecked) {
          var amt:any = this.transform(item.Amount)
          this.TotalPercentageValuation = this.TotalPercentageValuation - amt
          item.Nochecked = true;
          val.Amount = 0
        }

      }
      if (val.description === "Corner Property" && item.description === "Any Two side Roads") {
        val.Amount = this.transform(val.Amount)
        this.TotalPercentageValuation = this.TotalPercentageValuation - val.Amount;
        console.log("removedpercentagerulevalue ", this.TotalPercentageValuation);
        val.Amount = 0;
        val.Yeschecked = false;
        val.Nochecked = true;

      }
      if (val.description === "Any Two side Roads" && item.description === "Corner Property") {
        val.Amount = this.transform(val.Amount)
        this.TotalPercentageValuation = this.TotalPercentageValuation - val.Amount;
        console.log("removedpercentagerulevalue ", this.TotalPercentageValuation);
        val.Amount = 0;
        val.Yeschecked = false;
        val.Nochecked = true;
      }
    });
  }

  Removepercentagerule(item) {
    this.Annexurerules.forEach(val => {
      if (val.description == item.description) {
        if (val.Yeschecked) {
          val.Yeschecked = false;
          val.Amount = this.transform(val.Amount)
        this.TotalPercentageValuation = this.TotalPercentageValuation - val.Amount;
        console.log("removedpercentagerulevalue ", this.TotalPercentageValuation);
        val.Amount = 0;
        }else if(!val.Yeschecked){
          val.Yeschecked = true;
          var finalamount = this.marketvaluationService.calculatePercentageforAnnexure(val.percentage, this.finalamountofproperty)
          console.log("display the on SelectedAnnexarule change event ", finalamount);
          val.Amount = this.numberWithCommas(finalamount);
          this.TotalPercentageValuation = this.TotalPercentageValuation + finalamount;
          console.log("addedpercentagerulevalue ", this.TotalPercentageValuation);
          this.finalpercentvalue = finalamount;
        }
        
      }

      if (val.description === "Corner Property" && item.description === "Any Two side Roads") {
        val.Nochecked = true;
        val.Yeschecked = false;
      }
      if (val.description === "Any Two side Roads" && item.description === "Corner Property") {
        val.Nochecked = true;
        val.Yeschecked = false;
      }
    });
  }

  ///////Non agricultural Common








  ///////Non agricultural Building details

  GetBuildingRates() {
    this.marketvaluationService.GetVacantRateDetails(this.roadcode).subscribe(
      (data: any) => {

        if (data.length != 0) {
          data.forEach(element => {
            element.rate = this.numberWithCommas(element.rate);
            element.checked = false
          });
          this.BuildingRateDetails = data;
          this.GetConstructionTypes();
          console.log(data);
          localStorage.setItem('Agricultural ratr details', data);
        }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )

  }

  GetConstructionTypes() {
    this.marketvaluationService.GetConstructionTypeDetails().subscribe(
      (data: any) => {
        console.log(data);
        if (data.length != 0) {
          data.forEach(element => {
            element['constructionTypeRate'] = 0
            element.checked = false
          });
          this.ConstructionTypes = data;
          localStorage.setItem('ConstructionTypes', data);
          this.GetBuildingAnnexureRulesDetails();
          console.log("display the construction type details ", this.ConstructionTypes)
        }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
    var village = {
      "villagecode": this.villagecode
    }
    this.marketvaluationService.GetConstructionRateDetails(village).subscribe(
      (data: any) => {
        console.log(data);
        this.Constructionratedetails = data;
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )

  }
  changestatus() {
    this.isDisabled = false
    // this.ConstructionTypes.forEach(val => {
    //   if (val.constructiontypeid == item.constructiontypeid) {
    //     //  item.checked = true;
    //     if (item.checked == true) {
    //       var totalaboveamount:any = 0
    //       var totalgroundamount:any = 0
    //       this.Constructionratedetails.forEach(element => {
    //         if (parseInt(item.constructiontypeid) === element.constructiontypeid) {
    //           if (element.floorid === 1 && item.Groundfloor != undefined) {
    //             totalaboveamount = parseInt(item.Groundfloor) * element.rate
            
    //           } else if (element.floorid === 2 && item.Abovefloor != undefined) {
    //             totalgroundamount = parseInt(item.Abovefloor) * element.rate
    //           }
    //         }

    //       });
    //       var totalamount:any =0 
    //       if(totalamount != NaN){
    //         totalamount =totalaboveamount+totalgroundamount
    //         val.constructionTypeRate = this.numberWithCommas(totalamount);
    //         this.TotalConstructionAmount = this.TotalConstructionAmount + totalamount
    //         console.log(this.TotalConstructionAmount)
    //       }
         
    //     } else if (item.checked == false) {
    //       if(val.constructionTypeRate != NaN){
    //         var typerates: any = this.transform(val.constructionTypeRate)
    //         this.TotalConstructionAmount = this.TotalConstructionAmount - parseInt(typerates)
    //       }
    //       val.constructionTypeRate = 0;
    //       val.Groundfloor = "";
    //       val.Abovefloor = "";
    //     }
    //     console.log("selected construction type data ", item)
    //   }

    // });
  
  }
  SelectedBuilldingPropertytypeRate(item) {
    console.log("selected row SelectedBuilldingPropertytypeRate  data ", this.finalamountofbuildingproperty)
    console.log("selected row SelectedBuilldingPropertytypeRate  data ", item)

    this.BuildingRateDetails.forEach(val => {
      console.log("selected row SelectedBuilldingPropertytypeRate  data ", val)
      if (val.propertytypename == item.propertytypename) {

        val.checked = val.checked;
        var Rate = this.transform(val.rate);
        this.BuildingPropertyRate = Rate
        this.finalamountofbuildingproperty = this.marketvaluationService.CalculationforAgriculturalLand(this.Unitcode, Rate)

        console.log("selected row building data ", this.finalamountofbuildingproperty)
      }
      else {
        val.checked = false;
      }
    });

    this.BuildingAnnexurerules.forEach(val => {
      if (val.Yeschecked) {
        val.Yeschecked = false
        val.Nochecked = true
        var amount: any = this.transform(val.Amount);
        this.TotalBuildingPercentageValuation = this.TotalBuildingPercentageValuation - amount;
        val.Amount = 0
      }
    })
    // this.ConstructionTypes.forEach(val => {
    //   if (val.checked == true) {
    //     var typerates: any = this.transform(val.constructionTypeRate)
    //     this.TotalConstructionAmount = this.TotalConstructionAmount - parseInt(typerates)
    //     val.constructionTypeRate = 0;
    //     val.Groundfloor = "";
    //     val.Abovefloor = "";
    //     val.checked = false
    //   }
    // })
    this.BuildingParkingType.forEach(val => {
      val.Number = 0
      this.TotalBuildingParkingAmount = 0;
    })
  }


  SelectedConstructiontypes(item) {
    console.log("display the construction details ", item)
    this.ConstructionTypes.forEach(val => {
      if (val.constructiontypeid == item.constructiontypeid) {
        //  item.checked = true;
        if (item.checked == true) {
          var totalamount = 0
          this.Constructionratedetails.forEach(element => {
            if (parseInt(item.constructiontypeid) === element.constructiontypeid) {
              if (element.floorid === 1) {
                totalamount = totalamount + parseInt(item.Groundfloor) * element.rate
              } else if (element.floorid === 2) {
                totalamount = totalamount + parseInt(item.Abovefloor) * element.rate
              }
            }
          });
          val.constructionTypeRate = this.numberWithCommas(totalamount);
          this.TotalConstructionAmount = this.TotalConstructionAmount + totalamount
        } else if (item.checked == false) {
          var typerates: any = this.transform(val.constructionTypeRate)
          this.TotalConstructionAmount = this.TotalConstructionAmount - parseInt(typerates)
          val.constructionTypeRate = 0;
          val.Groundfloor = "";
          val.Abovefloor = "";
        }
        console.log("selected construction type data ", item)
      }

    });
  }

  GetBuildingAnnexureRulesDetails() {
    var property = {
      "propertytypeid": this.PropertytypeId
    }
    this.marketvaluationService.GetNonagriculturalAnnexurerules(property).subscribe(
      (data: any) => {

        if (data.length != 0) {
          data.forEach(element => {
            element['Amount'] = 0
            console.log("ghjkl", element.description)
            element.Yeschecked = false
            element.Nochecked = true

          });
          this.BuildingAnnexurerules = data;
          this.GetBuildingParkingTypesDetails();
          console.log(data);
        }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
  }

  RemoveBuildingpercentagerule(item) {
    this.BuildingAnnexurerules.forEach(val => {
      if (val.description == item.description) {
        if (val.Yeschecked) {
          val.Yeschecked = false;
          val.Amount = this.transform(val.Amount)
          this.TotalBuildingPercentageValuation = this.TotalBuildingPercentageValuation - val.Amount;
          console.log("removedpercentagerulevalue ", this.TotalBuildingPercentageValuation);
          val.Amount = 0;
        }else if(!val.Yeschecked){
          val.Yeschecked = true;
          console.log("display the on SelectedAnnexarule change event =========", this.finalamountofbuildingproperty, val.percentage);
          var finalamount = this.marketvaluationService.calculatePercentageforAnnexure(val.percentage, this.finalamountofbuildingproperty)
          console.log("display the on SelectedAnnexarule change event ", finalamount);
          val.Amount = this.numberWithCommas(finalamount);
          // val.Amount  = finalamount ;
          this.TotalBuildingPercentageValuation = this.TotalBuildingPercentageValuation + finalamount;
          console.log("addedpercentagerulevalue ", this.TotalBuildingPercentageValuation);
        }
       
      }
      if (val.description === "Corner Property" && item.description === "Any Two side Roads") {
        val.Yeschecked = false;
        val.Nochecked = true;
      }
      if (val.description === "Any Two side Roads" && item.description === "Corner Property") {
        val.Yeschecked = false;
        val.Nochecked = true;
      }
    });
  }

  SelectedBuildingAnnexarule(item) {
    console.log("selected building row data ", item)
    this.BuildingAnnexurerules.forEach(val => {
      if (val.description == item.description) {
        if (!item.Yeschecked) {
          if (item.Nochecked) {
            item.Nochecked = false
          }
          item.Nochecked = false
          console.log("display the on SelectedAnnexarule change event =========", this.finalamountofbuildingproperty, val.percentage);
          var finalamount = this.marketvaluationService.calculatePercentageforAnnexure(val.percentage, this.finalamountofbuildingproperty)
          console.log("display the on SelectedAnnexarule change event ", finalamount);
          val.Amount = this.numberWithCommas(finalamount);
          // val.Amount  = finalamount ;
          this.TotalBuildingPercentageValuation = this.TotalBuildingPercentageValuation + finalamount;
          console.log("addedpercentagerulevalue ", this.TotalBuildingPercentageValuation);

        } else if (item.Yeschecked) {
          
          var amt:any = this.transform(item.Amount)
          this.TotalBuildingPercentageValuation = this.TotalBuildingPercentageValuation - amt
          item.Nochecked = true
          val.Amount = 0
        }

      }
      if (val.description === "Corner Property" && item.description === "Any Two side Roads") {
        val.Amount = this.transform(val.Amount)
        this.TotalBuildingPercentageValuation = this.TotalBuildingPercentageValuation - val.Amount;
        console.log("removedpercentagerulevalue ", this.TotalPercentageValuation);
        val.Amount = 0;
        val.Yeschecked = false;
        val.Nochecked = true;

      }
      if (val.description === "Any Two side Roads" && item.description === "Corner Property") {
        val.Amount = this.transform(val.Amount)
        this.TotalBuildingPercentageValuation = this.TotalBuildingPercentageValuation - val.Amount;
        console.log("removedpercentagerulevalue ", this.TotalBuildingPercentageValuation);
        val.Amount = 0;
        val.Yeschecked = false;
        val.Nochecked = true;
      }
    });
  }

  GetBuildingParkingTypesDetails() {
    this.marketvaluationService.GetParkingTypeDetails().subscribe(
      (data: any) => {

        if (data.length != 0) {
          data.forEach(element => {

            //  console.log("ghjkl",element.description)
          });
          this.BuildingParkingType = data;
          this.FetchBuildingvaluationdetails();
          console.log(data);
        }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
  }


  SelectedBuildingParkingtype($event) {
    console.log($event)
    if ($event != "") {
      this.BuildingParkingType.forEach(val => {
        if (val.Number == $event) {
          // val.ParkingTypeId 
          if (this.finalamountofflatproperty > 10000000) {
            var finalamount = this.finalamountofflatproperty
            finalamount = 10000000
          }
          var TypeRequest = {
            "PropValue": finalamount,
            "ParkingTypeId": parseInt(val.parkingtypeid)
          }
          this.marketvaluationService.GetParkingRateDetails(TypeRequest).subscribe(
            (data: any) => {
              console.log(data);
              if (data != 0 || data.length != 0) {
                var finalamount1 = data[0].value
                val["Amount"] = finalamount1
                data[0].value = this.numberWithCommas(data[0].value)
                this.TotalBuildingParkingAmount = this.TotalBuildingParkingAmount + finalamount1;
              } else {
                val["Amount"] = 0
              }
            }, e => {
              if (e.error) {
                this.errorMessage = e.error.error_description;
              }
            }
          )

        }
      })
    }
  }

  ////////Non agricultural Flat details
  GetFlatRateDetails() {
    this.FlateRateDetails  =[]
    var FlateRateRequest = {
      "roadcode": this.roadcode.roadcode,
      "floorcode": 1
    }
    this.marketvaluationService.GetFlateRateDetails(FlateRateRequest).subscribe(
      (data: any) => {
        console.log(data);
        if (data != 0 || data != []) {
          data.forEach(element => {
            element.rate = this.numberWithCommas(element.rate);
            element.checked = false
          });
          this.FlateRateDetails = data;
          this.GetApartmentSpecialAmeneties();
        }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
  }

  GetApartmentSpecialAmeneties() {
    this.ApartmentSpecialAmenities =[]
    this.marketvaluationService.GetApartmentSpecialAmenities().subscribe(
      (data: any) => {
        console.log(data);
        if (data != 0 || data.length != 0) {
          this.ApartmentSpecialAmenities = data
          this.ApartmentSpecialAmenities.forEach(element => {
            element.checked = false
          });
        }
        this.GetFlatAnnexureRulesDetails();
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
  }

  GetFlatAnnexureRulesDetails() {
    this.FlatAnnexurerules =[]
    try {
      var property = {
        "propertytypeid": this.PropertytypeId
      }
      this.marketvaluationService.GetNonagriculturalAnnexurerules(property).subscribe(
        (data: any) => {

          if (data.length != 0) {
            data.forEach(element => {
              element['Amount'] = 0
              console.log("ghjkl", element.description)
              element.Yeschecked = false
              element.Nochecked = true,
                element.IsInputAreaVisible = false
            });
            this.FlatAnnexurerules = data;
            this.GetFlatParkingTypesDetails()
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
  }

  SelectedFlatPropertytypeRate(item) {

    this.FlateRateDetails.forEach(val => {
      if (val.amenities == item.amenities) {

        val.checked = val.checked;
        var Rate = this.transform(val.rate);
        this.FlatPropertyRate = Rate
        this.finalamountofflatproperty = this.marketvaluationService.CalculationforAgriculturalLand(this.Unitcode, Rate)

        console.log("selected row building data ", this.finalamountofflatproperty)
      }
      else {
        val.checked = false;
      }
    });

    this.FlatAnnexurerules.forEach(val => {
      if (val.Yeschecked) {
        val.Yeschecked = false
        val.Nochecked = true
        var amount: any = this.transform(val.Amount);
        this.TotalFlatPercentageValuation = this.TotalFlatPercentageValuation - amount;
        val.Amount = 0
        val.IsInputAreaVisible = false
      }
    })
    this.FlatParkingType.forEach(val => {
      val.Number = 0
      this.TotalFlatParkingAmount = 0;
    })
  }
  SelectedApartmentSpecialAmenities(item) {
    console.log("display the item ", item);
    if (item.checked) {
      this.AmenetiesList = this.AmenetiesList + 1
    } else if (!item.checked) {
      this.AmenetiesList = this.AmenetiesList - 1
    }

  }

  SelectedFlatAnnexarule(item) {
    console.log("selected building row data ", item)
    this.FlatAnnexurerules.forEach(val => {
      if (val.description == item.description) {

        if (!item.Yeschecked) {
          if (item.Nochecked) {
            item.Nochecked = false
          }
          item.Nochecked = false
          if (item.annexureid === 16 || item.annexureid === 17 || item.annexureid === 18) {
            val.IsInputAreaVisible = true
            // if(!item.Number){
            // val.IsInputAreaVisible = true
            // }else{
            //   var valuvaterate = item.Number*this.PropertyRate 
            //   console.log("display totalrate ",valuvaterate)
            //   var finalamounts = this.marketvaluationService.calculatePercentageforAnnexure(val.percentage,valuvaterate)
            //   val.Amount = this.numberWithCommas(finalamounts);
            //   this.TotalFlatPercentageValuation = this.TotalFlatPercentageValuation + finalamounts;
            // }  

          } else {
            var finalamount = this.marketvaluationService.calculatePercentageforAnnexure(val.percentage, this.finalamountofflatproperty)
            console.log("display the on SelectedAnnexarule change event ", finalamount);
            //val.Amount  = finalamount ;
            val.Amount = this.numberWithCommas(finalamount);
            this.TotalFlatPercentageValuation = this.TotalFlatPercentageValuation + finalamount;
            console.log("addedpercentagerulevalue ", this.TotalFlatPercentageValuation);
          }
        } else if (item.Yeschecked) {
          //   if (item.annexureid === 16 || item.annexureid === 17 || item.annexureid === 18) {
          //   if(item.IsInputAreaVisible ){
          //     var valuvaterate = item.Number*this.PropertyRate 
          //     console.log("display totalrate ",valuvaterate)
          //     var finalamounts = this.marketvaluationService.calculatePercentageforAnnexure(val.percentage,valuvaterate)
          //     val.Amount = this.numberWithCommas(finalamounts);
          //     this.TotalFlatPercentageValuation = this.TotalFlatPercentageValuation + finalamounts;
          //   }
          // }else{
            item.Nochecked = true
          var removeamt: any = this.transform(item.Amount)
          this.TotalFlatPercentageValuation = this.TotalFlatPercentageValuation - removeamt
          val.Amount = 0
          val.Number = 0
          //  }
        }
      }
      if (val.description === "Corner Property" && item.description === "Any Two side Roads") {
        val.Amount = this.transform(val.Amount)
        this.TotalFlatPercentageValuation = this.TotalFlatPercentageValuation - val.Amount;
        console.log("removedpercentagerulevalue ", this.TotalFlatPercentageValuation);
        val.Amount = 0;
        val.Yeschecked = false;
        val.Nochecked = true;

      }
      if (val.description === "Any Two side Roads" && item.description === "Corner Property") {
        val.Amount = this.transform(val.Amount)
        this.TotalFlatPercentageValuation = this.TotalFlatPercentageValuation - val.Amount;
        console.log("removedpercentagerulevalue ", this.TotalFlatPercentageValuation);
        val.Amount = 0;
        val.Yeschecked = false;
        val.Nochecked = true;
      }

    });
  }
  EnterTotalArea(item) {
    console.log(item)
    console.log("selected building row data ", item)
    this.FlatAnnexurerules.forEach(val => {
      if (val.description == item.description) {
        if (item.Yeschecked) {
          if (item.annexureid === 16 || item.annexureid === 17 || item.annexureid === 18) {
            // val.IsInputAreaVisible = true

            var valuvaterate = item.Number * this.FlatPropertyRate
            val["totalarea"] = item.Number
            console.log("display totalrate ", valuvaterate)
            var finalamounts = this.marketvaluationService.calculatePercentageforAnnexure(val.percentage, valuvaterate)
            val.Amount = this.numberWithCommas(finalamounts);
            this.TotalFlatPercentageValuation = this.TotalFlatPercentageValuation + finalamounts;
            console.log(this.TotalFlatPercentageValuation)
          }
        } else if (!item.Yeschecked) {
          
          var removeamt: any = this.transform(item.Amount)
          this.TotalFlatPercentageValuation = this.TotalFlatPercentageValuation - removeamt
          val.Amount = 0
        }
      }


    });
    //let text1 = $event.target.options[$event.target.options.selectedIndex].text;
    //console.log(text1)
  }
  Removeflatpercentagerule(item) {
    this.FlatAnnexurerules.forEach(val => {
      if (val.description == item.description) {
        if (val.Yeschecked) {
          val.Yeschecked = false;
          val.Amount = this.transform(val.Amount)
          this.TotalFlatPercentageValuation = this.TotalFlatPercentageValuation - val.Amount;
          console.log("removedpercentagerulevalue ", this.TotalFlatPercentageValuation);
          val.Amount = 0;
          val.Number = 0
        }else if(!val.Yeschecked){
          val.Yeschecked = true;
          var finalamount = this.marketvaluationService.calculatePercentageforAnnexure(val.percentage, this.finalamountofflatproperty)
          console.log("display the on SelectedAnnexarule change event ", finalamount);
          //val.Amount  = finalamount ;
          val.Amount = this.numberWithCommas(finalamount);
          this.TotalFlatPercentageValuation = this.TotalFlatPercentageValuation + finalamount;
          console.log("addedpercentagerulevalue ", this.TotalFlatPercentageValuation);
        }
       
      }
      if (val.description === "Corner Property" && item.description === "Any Two side Roads") {
        val.Yeschecked = false;
        val.Nochecked = true;
      }
      if (val.description === "Any Two side Roads" && item.description === "Corner Property") {
        val.Yeschecked = false;
        val.Nochecked = true;
      }
    });
  }
  GetFlatParkingTypesDetails() {
    this.FlatParkingType =[]
    this.marketvaluationService.GetParkingTypeDetails().subscribe(
      (data: any) => {

        if (data.length != 0) {
          data.forEach(element => {

            //  console.log("ghjkl",element.description)
          });
          this.FlatParkingType = data;
          this.GetFloorNumbers();
          console.log(data);
        }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
  }
  SelectedFlatParkingtype($event) {
    console.log($event)
    if ($event != "") {
      this.FlatParkingType.forEach(val => {
        if (val.Number == $event) {
          if (this.finalamountofflatproperty > 10000000) {
            var finalamount = this.finalamountofflatproperty
            finalamount = 10000000
          }
          // val.ParkingTypeId 
          var TypeRequest = {
            "PropValue": finalamount,
            "ParkingTypeId": parseInt(val.parkingtypeid)
          }
          this.marketvaluationService.GetParkingRateDetails(TypeRequest).subscribe(
            (data: any) => {
              console.log(data);
              if (data.length != 0 && data.length != 0) {
                var finalamount1 = data[0].value
                val["Amount"] = finalamount1
                data[0].value = this.numberWithCommas(data[0].value)
                this.TotalFlatParkingAmount = this.TotalFlatParkingAmount + finalamount1;
              } else {
                val["Amount"] = 0
              }
            }, e => {
              if (e.error) {
                this.errorMessage = e.error.error_description;
              }
            }
          )

        }
      })
    }
  }

  OnFloorNumberchange($event) {
    this.TotalFloorAmount = 0
    let text1 = $event.target.options[$event.target.options.selectedIndex].text;
    this.FloorNumbers.forEach(element => {
      if (element.num == text1) {
     //   this.apartmentfloorrateid = element.apartmentfloorrateid;
        element.checked = true;
        this.TotalFloorAmount = element.value;

      }
    });
    console.log("display the event in floor", text1)
    // this.marketvaluationService.GetFloorNumberDetails().subscribe(
    //   (data: any) => {
    //     console.log(data);
    //     if (data != 0 || data != []) {
    //       this.Floorratedetails = data;
    //       if (text1 == "0-5") {
    //         text1 = 5
    //       } else if (text1 == "15-200") {
    //         text1 = 200
    //       }


    //     }
    //   }, e => {
    //     if (e.error) {
    //       this.errorMessage = e.error.error_description;
    //     }
    //   }
    // )
  }

  GetFloorNumbers() {
    this.FloorNumbers =[]
    this.marketvaluationService.GetFloorNumberDetails().subscribe(
      (data: any) => {
        console.log(data);
        if (data != 0 || data != []) {
          data.forEach(f => {
            let floor: any = {
              apartmentfloorrateid: f.apartmentfloorrateid,
              value: f.value
            };
            if (f.floorfrom == f.floorto) {
              floor.num = f.floorfrom;
            }
            else {
              if(f.floorfrom == 0){
                this.apartmentfloorrateid = f.apartmentfloorrateid;
              }
              floor.num = f.floorfrom + '-' + f.floorto;
            }
            this.FloorNumbers.push(floor);
          });
          this.FetchFlatvaluationdetails();
          console.log("Modified Floor Details");
          console.log(this.FloorNumbers);
        }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
  }
  ////final valuation

  ValuateVacantTypeTotalAmount() {
    this.Totalvacantlist.forEach(list => {
      if (list.Id == '01') {
        list.amount = this.numberWithCommas(this.TotalPercentageValuation);
      } else if (list.Id == '02') {
        var finalamount = this.finalamountofproperty + this.TotalPercentageValuation
        list.amount = this.numberWithCommas(finalamount);
        //  list.amount = finalamount
        this.NonAgriculturevaluationAmount = finalamount;
        localStorage.setItem('NonAgricultureVacantTotalAmount', this.NonAgriculturevaluationAmount);
        localStorage.setItem('FinalMarketValuationAmount', this.NonAgriculturevaluationAmount);
      }

    });
    this.VacantTotalValuationAmount = true;
    // this.Totalvacantlist =[]
  }

  ValuateTotalAmountForBuilding() {
    this.TotalBuildinglist.forEach(list => {
      if (list.Id == '01') {
        list.amount = this.numberWithCommas(this.finalamountofbuildingproperty);
      } else if (list.Id == '02') {
        list.amount = this.numberWithCommas(this.TotalConstructionAmount);
      } else if (list.Id == '03') {
        list.amount = this.numberWithCommas(this.TotalBuildingPercentageValuation)
      } else if (list.Id == '04') {
        list.amount = this.numberWithCommas(this.TotalBuildingParkingAmount)
      } else if (list.Id == '05') {
        var finalamount = this.finalamountofbuildingproperty + this.TotalConstructionAmount + this.TotalBuildingPercentageValuation + this.TotalBuildingParkingAmount
        list.amount = this.numberWithCommas(finalamount);
        //  list.amount = finalamount
        this.NonAgriculturevaluationAmount = finalamount;
        localStorage.setItem('NonAgricultureBuildingTotalAmount', this.NonAgriculturevaluationAmount);
        localStorage.setItem('FinalMarketValuationAmount', this.NonAgriculturevaluationAmount);
      }

    });
    this.TotalValuationAmountForBuilding = true;

  }

  ValuationTotalAmountforFlat() {
    var request = {
      "totalamenities": this.AmenetiesList

    }
    this.marketvaluationService.GetRateApartmentSpecialAmenities(request).subscribe(
      (data: any) => {
        console.log(data);
        if (data != 0 || data.length != 0) {
          console.log(data)
          this.TotalAmenitiesAmount = data[0].value;
          this.Amenetiesratedetails = data;
        }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
    setTimeout(() => {
      this.TotalFlatlist.forEach(list => {
        if (list.Id == '01') {
          list.amount = this.numberWithCommas(this.finalamountofflatproperty);
        } else if (list.Id == '02') {
          list.amount = this.numberWithCommas(this.TotalAmenitiesAmount);
        } else if (list.Id == '03') {
          list.amount = this.numberWithCommas(this.TotalFlatPercentageValuation)
        } else if (list.Id == '04') {
          list.amount = this.numberWithCommas(this.TotalFlatParkingAmount)
        } else if (list.Id == '05') {
          list.amount = this.numberWithCommas(this.TotalFloorAmount)
        } else if (list.Id == '06') {
          var finalamount = this.finalamountofflatproperty + this.TotalAmenitiesAmount + this.TotalFlatPercentageValuation + this.TotalFlatParkingAmount + this.TotalFloorAmount;
          list.amount = this.numberWithCommas(finalamount)
          //list.amount = finalamount
          this.NonAgriculturevaluationAmount = finalamount;
          localStorage.setItem('NonAgricultureFlatTotalAmount', this.NonAgriculturevaluationAmount);
          localStorage.setItem('FinalMarketValuationAmount', this.NonAgriculturevaluationAmount);
        }
      });
    }, 1000);


    this.TotalValuationAmountForFlat = true
  }

  //multiproperty:-
  Backbuttonclicks() {
    if (this.displaypropertytypeNum == 1) {
      return
    }
    else {
      this.displaypropertytypeNum = this.displaypropertytypeNum - 1;
      this.item = this.displaypropertytypeNum - 1;
    }
    this.changeprop();
    var propertydetails = this.bhoomiMultyobject[this.item] 
    if (propertydetails.propertytypeid === 28 ||propertydetails.propertytypeid === 1 ||propertydetails.propertytypeid === 12 ||propertydetails.propertytypeid === 29){
      this.PropertytypeId = propertydetails.propertytypeid 
      this.NonAgriMarketvaluation = true ;
      this.AgriMarketvaluation = false ;
      this.MovableMarketvaluation = false
      this.GetPropertytypes();
      if (this.PropertytypeId === 12) {
        this.GetAllFlatDetails()
      } else if (this.PropertytypeId === 29) {
        this.GetAllBuildingDetails();
      }else{
        this.GetAllVacatDetails();
        //this.GetNonAgriculturaldatafromApi();
      }
    }else if(propertydetails.propertytypeid === 17 ){
      this.PropertytypeId = propertydetails.propertytypeid 
      this.AgriMarketvaluation = true ;
      this.NonAgriMarketvaluation = false ;
       this.MovableMarketvaluation = false
      this.GetAgriculturaldatafromApi()
     
    }else{
      this.NonAgriMarketvaluation = false ;
      this.AgriMarketvaluation = false ;
      this.MovableMarketvaluation = true
    }
    
 

    this.VacantTotalValuationAmount = false;
    this.TotalValuationAmountForBuilding = false;
    this.TotalValuationAmountForFlat = false
    this.TotalValuationAmount = false
    //  this.FetchAgriculturalvaluationdetails()
    //   this.GetPropertydetails()
  }
  frontbuttonclicks() {
    if (this.displaypropertytypeNum == this.numofprop) {
      return
    }
    else {
      this.displaypropertytypeNum = this.displaypropertytypeNum + 1;
      this.item = this.displaypropertytypeNum - 1;
    }
    this.changeprop();
    var propertydetails = this.bhoomiMultyobject[this.item] 
    if (propertydetails.propertytypeid === 28||propertydetails.propertytypeid === 1 ||propertydetails.propertytypeid === 12 ||propertydetails.propertytypeid === 29){
      this.PropertytypeId = propertydetails.propertytypeid 
      this.NonAgriMarketvaluation = true ;
      this.AgriMarketvaluation = false ;
      this.MovableMarketvaluation = false
      this.GetPropertytypes();
      if (this.PropertytypeId === 12) {
        this.GetAllFlatDetails()
        
      } else if (this.PropertytypeId === 29) {
        this.GetAllBuildingDetails();
      } else{
        this.GetAllVacatDetails();
        //this.GetNonAgriculturaldatafromApi();
      }
    }else if(propertydetails.propertytypeid === 17 ){
      this.PropertytypeId = propertydetails.propertytypeid 
      this.AgriMarketvaluation = true ;
      this.NonAgriMarketvaluation = false ;
      this.MovableMarketvaluation = false
      this.GetAgriculturaldatafromApi()
    }else{
      this.NonAgriMarketvaluation = false ;
      this.AgriMarketvaluation = false ;
      this.MovableMarketvaluation = true
    }
    // this.GetPropertydetails()
    // this.Addpropertydetailsinlocal();

  


    this.VacantTotalValuationAmount = false;
    this.TotalValuationAmountForBuilding = false;
    this.TotalValuationAmountForFlat = false
    this.TotalValuationAmount = false
    //this.FetchAgriculturalvaluationdetails()
  }

  changeprop() {

    this.bhoomiObject = this.bhoomiMultyobject[this.item]
    this.disTrict = this.bhoomiObject.districtname;
    this.talUka = this.bhoomiObject.taluknamee;
    this.town = this.bhoomiObject.hoblinamee;
    this.vilLage = this.bhoomiObject.villagenamee;
      this.Unitcode = this.bhoomiObject.totalarea;
    //this.Unitcode = 160
     this.roadcode.roadcode = this.bhoomiObject.roadcode
    
   // this.roadcode.roadcode = this.Nonagriroadcode
    this.villagecode = this.bhoomiObject.villagecode
    //this.villagecode = 17472
     this.SROCode = this.bhoomiObject.srocode
    //this.SROCode = "114"
    this.propertyId = this.bhoomiObject.propertyid
    this.RegSROCode = this.bhoomiObject.regsrocode
    //this.RegSROCode = 0
  }


  /////////// Save vacant site details ///////////

  ArrayValuation: any = [];
  SendVacantValuationdetailstoApi() {
    let Valuationmodel = new Valuationdetails()
    var srocode = parseInt(this.SROCode)
    console.log("display the srococde ", srocode)
    if (this.ValuationId) {
      Valuationmodel.valuationid = this.ValuationId
    } else {
      Valuationmodel.valuationid = null
    }
    //  Valuationmodel.valuationid = null
    Valuationmodel.srocode = srocode;
    //nedd to change once we have regsrocode
    Valuationmodel.regsrocode = this.RegSROCode;
    Valuationmodel.villagecode = parseInt(this.villagecode);
    Valuationmodel.roadcode = parseInt(this.roadcode.roadcode);
    Valuationmodel.valuationdate = this.currentdate;
    Valuationmodel.propertytypeid = this.PropertytypeId;
    Valuationmodel.totalarea = parseInt(this.Unitcode);
    Valuationmodel.unitid = this.unitid;
    Valuationmodel.marketvalue = this.finalamountofproperty + this.TotalPercentageValuation;
    Valuationmodel.leasetype = 0
    Valuationmodel.leaseamount = 100
    Valuationmodel.northboundary = this.northboundary
    Valuationmodel.southboundary = this.southboundary
    Valuationmodel.eastboundary = this.eastboundary
    Valuationmodel.westboundary = this.westboundary
    Valuationmodel.assessment = this.assessment
    Valuationmodel.regarticlecode = this.regarticlecode
    Valuationmodel.applicationnumber = localStorage.getItem("ApplicationData")
    Valuationmodel.verified = true,
      Valuationmodel.issroapproved = "y",
      Valuationmodel.propertyid = this.propertyId
    this.ArrayValuation.push(Valuationmodel);
    console.log("Save ::display the array of valuationdetails //////////////:::", this.ArrayValuation)
    this.marketvaluationService.SaveFinalagriValuationdetails(this.ArrayValuation).subscribe(
      (data: any) => {
        if (data[0].responseCode == 1000) {
          this.message = data[0].responseMessage;
          console.log("display the valuation success message ::: ", data[0])
          if (data[0].valid) {
            this.SaveVacantRatedetials(data[0].valid);
            this.Updatepropertyschedule();
            this.showToast(data[0].responseMessage);


          }

        }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
    var val = {
      "amount": this.finalamountofproperty + this.TotalPercentageValuation,
      "propertyid": this.propertyId
    }

    this.ArrayValuation = []
      this.ValuationId = null

    //  var i:any  = this.numofprop - 1;
    //  this.marketvalue[i] = this.finalamountofproperty + this.TotalPercentageValuation;
    //  var mkvl = JSON.stringify(this.marketvalue);
    //  localStorage.setItem("FinalmarketValuation",mkvl)
  }

  ArrayvacantRatedetails: any = []
  SaveVacantRatedetials(valid) {

    this.VacantPlotDetails.forEach(element => {
      let openBuiltValuationdetails = new OpenBuiltValuationdetails()
      if (element.checked === true) {
        let amount = this.transform(element.rate)
        openBuiltValuationdetails.openbuiltvalid = this.agriculturedetailsid
        openBuiltValuationdetails.propertytypeid = this.PropertytypeId
        openBuiltValuationdetails.unitid = this.unitid
        openBuiltValuationdetails.valuationid = valid;
        openBuiltValuationdetails.verified = true
        openBuiltValuationdetails.openbuiltrateid = element.openbuildratecode
        openBuiltValuationdetails.rate = parseInt(amount)
        openBuiltValuationdetails.srocode = parseInt(this.SROCode)
        openBuiltValuationdetails.regsrocode = this.RegSROCode
        // AgriculturalRatemodel.srocode = 9
        // AgriculturalRatemodel.regsrocode = 9
        this.ArrayvacantRatedetails.push(openBuiltValuationdetails)
      }
    });
    console.log("Save ::display the array of ArrayRatedetails //////////////:::", this.ArrayvacantRatedetails)
    this.marketvaluationService.Saveopenbuildratedetails(this.ArrayvacantRatedetails).subscribe(
      (data: any) => {
        if (data[0].responseCode == 1000) {
          this.message = data[0].responseMessage;
          console.log("display the agricultural success message :::", data[0])
          //  this.SaveAnnexuredetails(valid)
          this.SaveAnnexuredetails(valid)
          this.showToast(data[0].responseMessage);
          this.agriculturedetailsid = null;
          this.ValuationId = null
        }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
    this.VacantPlotDetails = []
    this.ArrayvacantRatedetails = []

  }

  TotalvacantAnnexure: any = [];
  SaveAnnexuredetails(valid) {

    this.Annexurerules.forEach(element => {
      let annexure = new Annexure();
      if (element.annexuredetailsid) {
        annexure.annexuredetailsid = element.annexuredetailsid
      } else {
        annexure.annexuredetailsid = null
      }
      var amount = this.transform(element.Amount)
      //  annexure.annexuredetailsid = null
      annexure.annexureid = element.annexureid
      annexure.area = parseInt(this.Unitcode)
      annexure.rate = parseInt(amount)
      annexure.valuationid = valid
      annexure.verified = true
      annexure.srocode = parseInt(this.SROCode)
      annexure.regsrocode = this.RegSROCode
      var checked = false
      if (element.Yeschecked == true) {
        checked = true
      } else {
        checked = false
      }
      annexure.isselected = checked
      this.TotalvacantAnnexure.push(annexure)
    });
    console.log("Save ::display the array of TotalAnnexure //////////////:::", this.TotalvacantAnnexure)
    this.marketvaluationService.SaveAnnuxureValuationdetails(this.TotalvacantAnnexure).subscribe(
      (data: any) => {
        if (data.responseCode == 1000) {
          console.log("display the annexure success message ::: ", data)
          this.message = data.responseMessage;
          //this.SaveRatedetials()
          this.showToast(data.responseMessage);
          this.item = this.displaypropertytypeNum - 1;
          if (this.displaypropertytypeNum === this.numofprop) {
            this.NavigatetotheRelatedproperty();
          } else {
            this.frontbuttonclicks();
          }
        }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
    this.Annexurerules = []
    this.TotalvacantAnnexure = [];
    this.RemoveAllVacantValues()
  }

  RemoveAllVacantValues() {
    this.TotalPercentageValuation = 0
    this.finalamountofproperty = 0
  }
  //////////Save Building Details ////////////

  ArraybuildingValuation: any = [];
  SendBuildingValuationdetailstoApi() {
    let Valuationmodel = new Valuationdetails()
    var srocode = parseInt(this.SROCode)
    console.log("display the srococde ", srocode)
    if (this.ValuationId) {
      Valuationmodel.valuationid = this.ValuationId
    } else {
      Valuationmodel.valuationid = null
    }
    //  Valuationmodel.valuationid = null
    Valuationmodel.srocode = srocode;
    //nedd to change once we have regsrocode
    Valuationmodel.regsrocode = this.RegSROCode;
    Valuationmodel.villagecode = parseInt(this.villagecode);
    Valuationmodel.roadcode = parseInt(this.roadcode.roadcode);
    Valuationmodel.valuationdate = this.currentdate;
    Valuationmodel.propertytypeid = this.PropertytypeId;
    Valuationmodel.totalarea = parseInt(this.Unitcode);
    Valuationmodel.unitid = this.unitid;
    Valuationmodel.marketvalue = this.finalamountofbuildingproperty + this.TotalConstructionAmount + this.TotalBuildingPercentageValuation + this.TotalBuildingParkingAmount;
    Valuationmodel.leasetype = 0
    Valuationmodel.leaseamount = 100
    Valuationmodel.northboundary = this.northboundary
    Valuationmodel.southboundary = this.southboundary
    Valuationmodel.eastboundary = this.eastboundary
    Valuationmodel.westboundary = this.westboundary
    Valuationmodel.assessment = this.assessment
    Valuationmodel.regarticlecode = this.regarticlecode
    Valuationmodel.applicationnumber = localStorage.getItem("ApplicationData")
    Valuationmodel.verified = true,
      Valuationmodel.issroapproved = "y",
      Valuationmodel.propertyid = this.propertyId
    this.ArraybuildingValuation.push(Valuationmodel);
    console.log("Save ::display the array of valuationdetails //////////////:::", this.ArraybuildingValuation)
    this.marketvaluationService.SaveFinalagriValuationdetails(this.ArraybuildingValuation).subscribe(
      (data: any) => {
        if (data[0].responseCode == 1000) {
          this.message = data[0].responseMessage;
          console.log("display the valuation success message ::: ", data[0])
          if (data[0].valid) {
            this.SaveBuildingRatedetials(data[0].valid);
            this.Updatepropertyschedule();
            this.showToast(data[0].responseMessage);


          }

        }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
    var val = {
      "amount": this.finalamountofproperty + this.TotalPercentageValuation,
      "propertyid": this.propertyId
    }

    this.ArraybuildingValuation = []
    //  this.ValuationId = null

    //  var i:any  = this.numofprop - 1;
    //  this.marketvalue[i] = this.finalamountofproperty + this.TotalPercentageValuation;
    //  var mkvl = JSON.stringify(this.marketvalue);
    //  localStorage.setItem("FinalmarketValuation",mkvl)
  }

  ArraybuildingRatedetails: any = []
  SaveBuildingRatedetials(valid) {

    this.BuildingRateDetails.forEach(element => {
      let openBuiltValuationdetails = new OpenBuiltValuationdetails()
      if (element.checked === true) {
        let amount = this.transform(element.rate)
        openBuiltValuationdetails.openbuiltvalid = this.buildingratedetails
        openBuiltValuationdetails.propertytypeid = this.PropertytypeId
        openBuiltValuationdetails.unitid = this.unitid
        openBuiltValuationdetails.valuationid = valid;
        openBuiltValuationdetails.verified = true
        openBuiltValuationdetails.openbuiltrateid = element.openbuildratecode
        openBuiltValuationdetails.rate = parseInt(amount)
        openBuiltValuationdetails.srocode = parseInt(this.SROCode)
        openBuiltValuationdetails.regsrocode = this.RegSROCode
        // AgriculturalRatemodel.srocode = 9
        // AgriculturalRatemodel.regsrocode = 9
        this.ArraybuildingRatedetails.push(openBuiltValuationdetails)
      }
    });
    console.log("Save ::display the array of ArrayRatedetails //////////////:::", this.ArraybuildingRatedetails)
    this.marketvaluationService.Saveopenbuildratedetails(this.ArraybuildingRatedetails).subscribe(
      (data: any) => {
        if (data[0].responseCode == 1000) {
          this.message = data[0].responseMessage;
          console.log("display the agricultural success message :::", data[0])
          //  this.SaveAnnexuredetails(valid)
          this.SaveConstructiondetials(valid)
          this.showToast(data[0].responseMessage);
        }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
    this.BuildingRateDetails = []
    this.ArraybuildingRatedetails = []
    //this.agriculturedetailsid = null;
  }

  ArrayConstructiondetails: any = []
  SaveConstructiondetials(valid) {

    this.ConstructionTypes.forEach(element => {
      let constructiondetails = new Constructiondetails()
      if (element.checked === true) {
        if (element.constructiondetailsid) {
          constructiondetails.constructiondetailsid = element.constructiondetailsid
        } else {
          constructiondetails.constructiondetailsid = null
        }
        let amount = this.transform(element.constructionTypeRate)
        //   constructiondetails.constructiondetailsid = null
        constructiondetails.constructiontypeid = element.constructiontypeid
        constructiondetails.gfarea = element.Groundfloor
        constructiondetails.agfarea = element.Abovefloor
        constructiondetails.valuationid = valid;
        constructiondetails.verified = true
        constructiondetails.rate = parseInt(amount)
        constructiondetails.srocode = parseInt(this.SROCode)
        constructiondetails.regsrocode = this.RegSROCode
        this.ArrayConstructiondetails.push(constructiondetails)
      }
    });
    console.log("Save ::display the array of ArrayConstructiondetails //////////////:::", this.ArrayConstructiondetails)
    this.marketvaluationService.SaveConstructiontypedetails(this.ArrayConstructiondetails).subscribe(
      (data: any) => {
        if (data[0].responseCode == 1000) {
          this.message = data[0].responseMessage;
          console.log("display the ArrayConstructiondetails success message :::", data[0].responseMessage)
          this.SaveParkingdetials(valid)
          this.showToast(data[0].responseMessage);
        }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
    this.ConstructionTypes = []
    this.ArrayConstructiondetails = []
    //this.agriculturedetailsid = null;
  }

  ArrayParkingdetails: any = []
  SaveParkingdetials(valid) {

    this.BuildingParkingType.forEach(element => {
      let parkingdetails = new Parkingdetails()
      // let amount = this.transform(element.Amount)
      if (element.parkingdetailsid) {
        parkingdetails.parkingdetailsid = element.parkingdetailsid
      } else {
        parkingdetails.parkingdetailsid = null
      }
      // parkingdetails.parkingdetailsid = null
      parkingdetails.parkingtypeid = element.parkingtypeid
      parkingdetails.totalparkings = element.Number
      parkingdetails.valuationid = valid;
      parkingdetails.verified = true
      parkingdetails.rate = element.Amount
      parkingdetails.srocode = parseInt(this.SROCode)
      parkingdetails.regsrocode = this.RegSROCode
      this.ArrayParkingdetails.push(parkingdetails)

    });
    console.log("Save ::display the array of ArrayParkingdetails //////////////:::", this.ArrayParkingdetails)
    this.marketvaluationService.SaveParkingdetails(this.ArrayParkingdetails).subscribe(
      (data: any) => {
        if (data[0].responseCode == 1000) {
          this.message = data[0].responseMessage;
          console.log("display the ArrayParkingdetails success message :::", data[0])
          //  this.SaveAnnexuredetails(valid)
          this.SaveBuildingAnnexuredetails(valid)
          this.showToast(data[0].responseMessage);
        }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
    this.BuildingParkingType = []
    this.ArrayParkingdetails = []
    //this.agriculturedetailsid = null;
  }

  TotalBuildingAnnexure: any = [];
  SaveBuildingAnnexuredetails(valid) {

    this.BuildingAnnexurerules.forEach(element => {
      let annexure = new Annexure();
      if (element.annexuredetailsid) {
        annexure.annexuredetailsid = element.annexuredetailsid
      } else {
        annexure.annexuredetailsid = null
      }
      var amount = this.transform(element.Amount)
      //  annexure.annexuredetailsid = null
      annexure.annexureid = element.annexureid
      annexure.area = parseInt(this.Unitcode)
      annexure.rate = parseInt(amount)
      annexure.valuationid = valid
      annexure.verified = true
      annexure.srocode = parseInt(this.SROCode)
      annexure.regsrocode = this.RegSROCode
      var checked = false
      if (element.Yeschecked == true) {
        checked = true
      } else {
        checked = false
      }
      annexure.isselected = checked
      this.TotalBuildingAnnexure.push(annexure)
    });
    console.log("Save ::display the array of TotalAnnexure //////////////:::", this.TotalBuildingAnnexure)
    this.marketvaluationService.SaveAnnuxureValuationdetails(this.TotalBuildingAnnexure).subscribe(
      (data: any) => {
        if (data.responseCode == 1000) {
          console.log("display the annexure success message ::: ", data)
          this.message = data.responseMessage;
          //this.SaveRatedetials()
          this.showToast(data.responseMessage);
          this.item = this.displaypropertytypeNum - 1;
          this.ValuationId = null
          this.agriculturedetailsid = null
          if (this.displaypropertytypeNum === this.numofprop) {
            this.NavigatetotheRelatedproperty();
          } else {
            this.frontbuttonclicks();
          }

        }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
    this.BuildingAnnexurerules = []
    this.TotalBuildingAnnexure = [];
    this.Removeallbuildingvalues()
  }
  Removeallbuildingvalues() {
    this.finalamountofproperty = 0
    this.TotalConstructionAmount = 0
    this.TotalBuildingPercentageValuation = 0
    this.TotalBuildingParkingAmount = 0
  }

  ////////// Save Flat Details /////////

  ArrayFlatValuation: any = [];
  SendFlatValuationdetailstoApi() {
    let Valuationmodel = new Valuationdetails()
    var srocode = parseInt(this.SROCode)
    console.log("display the srococde ", srocode)
    if (this.ValuationId) {
      Valuationmodel.valuationid = this.ValuationId
    } else {
      Valuationmodel.valuationid = null
    }
    // Valuationmodel.valuationid = null
    Valuationmodel.srocode = srocode;
    //nedd to change once we have regsrocode
    Valuationmodel.regsrocode = this.RegSROCode;
    Valuationmodel.villagecode = parseInt(this.villagecode);
    Valuationmodel.roadcode = parseInt(this.roadcode.roadcode);
    Valuationmodel.valuationdate = this.currentdate;
    Valuationmodel.propertytypeid = this.PropertytypeId;
    Valuationmodel.totalarea = parseInt(this.Unitcode);
    Valuationmodel.unitid = this.unitid;
    Valuationmodel.marketvalue = this.finalamountofflatproperty + this.TotalAmenitiesAmount + this.TotalFlatPercentageValuation + this.TotalFlatParkingAmount + this.TotalFloorAmount;
    Valuationmodel.leasetype = 0
    Valuationmodel.leaseamount = 100
    Valuationmodel.northboundary = this.northboundary
    Valuationmodel.southboundary = this.southboundary
    Valuationmodel.eastboundary = this.eastboundary
    Valuationmodel.westboundary = this.westboundary
    Valuationmodel.assessment = this.assessment
    Valuationmodel.regarticlecode = this.regarticlecode
    Valuationmodel.applicationnumber = localStorage.getItem("ApplicationData")
    Valuationmodel.verified = true,
      Valuationmodel.issroapproved = "y",
      Valuationmodel.propertyid = this.propertyId
    this.ArrayFlatValuation.push(Valuationmodel);
    console.log("Save ::display the array of valuationdetails //////////////:::", this.ArrayFlatValuation)
    this.marketvaluationService.SaveFinalagriValuationdetails(this.ArrayFlatValuation).subscribe(
      (data: any) => {
        if (data[0].responseCode == 1000) {
          this.message = data[0].responseMessage;
          console.log("display the valuation success message ::: ", data[0].responseMessage)
          if (data[0].valid) {
            this.SaveFlatRatedetials(data[0].valid);
            this.Updatepropertyschedule();
            this.showToast(data[0].responseMessage);


          }

        }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
    var val = {
      "amount": this.finalamountofproperty + this.TotalPercentageValuation,
      "propertyid": this.propertyId
    }

    this.ArrayFlatValuation = []
      this.ValuationId = null

    //  var i:any  = this.numofprop - 1;
    //  this.marketvalue[i] = this.finalamountofproperty + this.TotalPercentageValuation;
    //  var mkvl = JSON.stringify(this.marketvalue);
    //  localStorage.setItem("FinalmarketValuation",mkvl)
  }
  ArrayFlatRatedetails: any = []
  SaveFlatRatedetials(valid) {

    this.FlateRateDetails.forEach(element => {
      let flatratedetails = new Flatratedetails()
      if (element.checked === true) {
        let amount = this.transform(element.rate)


        flatratedetails.flatratedetailsid = this.Flatratedetailsid
        flatratedetails.propertytypeid = this.PropertytypeId
        flatratedetails.amenitiesid = element.amenitiesid
        flatratedetails.unitid = this.unitid
        flatratedetails.rate = parseInt(amount)
        flatratedetails.flatrateid = element.flaterateid
        flatratedetails.valuationid = valid;
        flatratedetails.verified = true
        flatratedetails.floorid = element.floorid
        flatratedetails.srocode = parseInt(this.SROCode)
        flatratedetails.regsrocode = this.RegSROCode
        // AgriculturalRatemodel.srocode = 9
        // AgriculturalRatemodel.regsrocode = 9
        this.ArrayFlatRatedetails.push(flatratedetails)
      }
    });
    console.log("Save ::display the array of ArrayRatedetails //////////////:::", this.ArrayFlatRatedetails)
    this.marketvaluationService.SaveFlatDetails(this.ArrayFlatRatedetails).subscribe(
      (data: any) => {
        if (data[0].responseCode == 1000) {
          this.message = data[0].responseMessage;
          console.log("display the agricultural success message :::", data[0])
          //  this.SaveAnnexuredetails(valid)
          this.SaveuserAmenitiesdetials(valid)
          this.showToast(data[0].responseMessage);
          this.Flatratedetailsid = null
        }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
    this.FlateRateDetails = []
    this.ArrayFlatRatedetails = []
    this.Flatratedetailsid = null
  }
  ArrayuserAmenitiesdetails: any = []
  SaveuserAmenitiesdetials(valid) {

    this.ApartmentSpecialAmenities.forEach(element => {
      let useramenetiesdetails = new Useramenetiesdetails()
      if (element.useramenetiesdetailsid) {
        useramenetiesdetails.useramenetiesdetailsid = element.useramenetiesdetailsid
      } else {
        useramenetiesdetails.useramenetiesdetailsid = null
      }
      // useramenetiesdetails.useramenetiesdetailsid = null
      useramenetiesdetails.apartmentamenityid = element.apartmentamenityid
      useramenetiesdetails.valuationid = valid;
      useramenetiesdetails.verified = true
      useramenetiesdetails.isselected = element.checked
      useramenetiesdetails.srocode = parseInt(this.SROCode)
      useramenetiesdetails.regsrocode = this.RegSROCode
      this.ArrayuserAmenitiesdetails.push(useramenetiesdetails)
    });
    console.log("Save ::display the array of ArrayAmenitiesdetails //////////////:::", this.ArrayuserAmenitiesdetails)
    this.marketvaluationService.SaveUserApartmentAmenityDetails(this.ArrayuserAmenitiesdetails).subscribe(
      (data: any) => {
        if (data[0].responseCode == 1000) {
          this.message = data[0].responseMessage;
          console.log("display the ArrayAmenitiesdetails success message :::", data[0])
          //  this.SaveAnnexuredetails(valid)
          this.SaveAmenitiesratedetials(valid)
          this.showToast(data[0].responseMessage);
        }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
    this.ApartmentSpecialAmenities = []
    this.ArrayuserAmenitiesdetails = []
    this.TotalAmenitiesAmount = 0
    //this.agriculturedetailsid = null;
  }
  ArrayAmenitiesdetails: any = []
  SaveAmenitiesratedetials(valid) {

    this.Amenetiesratedetails.forEach(element => {
      let amenitiesdetails = new Amenitiesdetails()
      amenitiesdetails.amenetiesdetailsid = this.Amenetiesdetailsid
      amenitiesdetails.apartmentamenetyruleid = element.apartmentamenetyruleid
      amenitiesdetails.valuationid = valid;
      amenitiesdetails.verified = true
      amenitiesdetails.rate = element.value
      amenitiesdetails.srocode = parseInt(this.SROCode)
      amenitiesdetails.regsrocode = this.RegSROCode
      this.ArrayAmenitiesdetails.push(amenitiesdetails)

    });
    console.log("Save ::display the array of ArrayAmenitiesdetails //////////////:::", this.ArrayAmenitiesdetails)
    this.marketvaluationService.SaveAmenitiesdetails(this.ArrayAmenitiesdetails).subscribe(
      (data: any) => {
        if (data.length != 0) {
          if (data[0].responseCode == 1000) {
            this.message = data[0].responseMessage;
            console.log("display the ArrayAmenitiesdetails success message :::", data[0])
            //  this.SaveAnnexuredetails(valid)
            this.SaveFlatParkingdetials(valid)
            this.showToast(data[0].responseMessage);
            this.Amenetiesdetailsid = null
          }
        }else{
          this.SaveFlatParkingdetials(valid)
        }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
    this.Amenetiesratedetails = []
    this.ArrayAmenitiesdetails = []
    this.TotalAmenitiesAmount = 0
    this.Amenetiesdetailsid = null
  }
  ArrayFlatParkingdetails: any = []
  SaveFlatParkingdetials(valid) {

    this.FlatParkingType.forEach(element => {
      let parkingdetails = new Parkingdetails()
      if (element.parkingdetailsid) {
        parkingdetails.parkingdetailsid = element.parkingdetailsid
      } else {
        parkingdetails.parkingdetailsid = null
      }
      //  let amount = this.transform(element.Amount)
      //  parkingdetails.parkingdetailsid = null
      parkingdetails.parkingtypeid = element.parkingtypeid
      parkingdetails.totalparkings = element.Number
      parkingdetails.valuationid = valid;
      parkingdetails.verified = true
      parkingdetails.rate = element.Amount
      parkingdetails.srocode = parseInt(this.SROCode)
      parkingdetails.regsrocode = this.RegSROCode
      this.ArrayFlatParkingdetails.push(parkingdetails)

    });
    console.log("Save ::display the array of ArrayFlatParkingdetails //////////////:::", this.ArrayFlatParkingdetails)
    this.marketvaluationService.SaveParkingdetails(this.ArrayFlatParkingdetails).subscribe(
      (data: any) => {
        if (data[0].responseCode == 1000) {
          this.message = data[0].responseMessage;
          console.log("display the ArrayFlatParkingdetails success message :::", data[0])
          //  this.SaveAnnexuredetails(valid)
          this.SaveFloordetials(valid)
          this.showToast(data[0].responseMessage);
        }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
    this.FlatParkingType = []
    this.ArrayFlatParkingdetails = []
    //this.agriculturedetailsid = null;
  }
  ArrayFloordetails: any = []
  SaveFloordetials(valid) {
   console.log(this.FloorNumbers)
    this.FloorNumbers.forEach(element => {
      let floordetails = new Floordetails()
      if (element.checked === true) {
        floordetails.flatfloordetailsid = this.Flatfloordetailsid
        floordetails.apartmentfloorrateid = element.apartmentfloorrateid
        floordetails.valuationid = valid;
        floordetails.verified = true
        floordetails.rate = this.TotalFloorAmount
        floordetails.srocode = parseInt(this.SROCode)
        floordetails.regsrocode = this.RegSROCode
        this.ArrayFloordetails.push(floordetails)
      }
    });
    console.log("Save ::display the array of ArrayAmenitiesdetails //////////////:::", this.ArrayFloordetails)
    this.marketvaluationService.SaveFloordetails(this.ArrayFloordetails).subscribe(
      (data: any) => {
        if (data[0].responseCode == 1000) {
          this.message = data[0].responseMessage;
          console.log("display the ArrayFloordetails success message :::", data[0])
          //  this.SaveAnnexuredetails(valid)
          this.SaveFlatAnnexuredetails(valid)
          this.showToast(data[0].responseMessage);
          this.Flatfloordetailsid = null
        }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
    this.ArrayParkingdetails = []
    this.TotalAmenitiesAmount = 0
    this.FloorNumbers = []
    //this.agriculturedetailsid = null;
  }
  TotalFlatAnnexure: any = [];
  SaveFlatAnnexuredetails(valid) {

    this.FlatAnnexurerules.forEach(element => {
      let annexure = new Annexure();
      if (element.annexuredetailsid) {
        annexure.annexuredetailsid = element.annexuredetailsid
      } else {
        annexure.annexuredetailsid = null
      }
      if (element.totalarea) {
        annexure.area = element.Number
      } else {
        annexure.area = parseInt(this.Unitcode)
      }
      var amount = this.transform(element.Amount)
      //  annexure.annexuredetailsid = null
      annexure.annexureid = element.annexureid

      annexure.rate = parseInt(amount)
      annexure.valuationid = valid
      annexure.verified = true
      annexure.srocode = parseInt(this.SROCode)
      annexure.regsrocode = this.RegSROCode
      var checked = false
      if (element.Yeschecked == true) {
        checked = true
      } else {
        checked = false
      }
      annexure.isselected = checked
      this.TotalFlatAnnexure.push(annexure)
    });
    console.log("Save ::display the array of TotalFlatAnnexure //////////////:::", this.TotalFlatAnnexure)
    this.marketvaluationService.SaveAnnuxureValuationdetails(this.TotalFlatAnnexure).subscribe(
      (data: any) => {
        if (data.responseCode == 1000) {
          console.log("display the annexure success message ::: ", data)
          this.message = data.responseMessage;
          //this.SaveRatedetials()
          this.showToast(data.responseMessage);
          this.item = this.displaypropertytypeNum - 1;
          if (this.displaypropertytypeNum === this.numofprop) {
            this.NavigatetotheRelatedproperty();
          } else {
            this.frontbuttonclicks();
          }
        }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
    this.FlatAnnexurerules = []
    this.TotalFlatAnnexure = [];
    this.RemoveAllFlatValues()
  }
  RemoveAllFlatValues() {
    this.finalamountofproperty = 0
    this.TotalAmenitiesAmount = 0
    this.TotalFlatPercentageValuation = 0
    this.TotalFlatParkingAmount = 0
    this.TotalFloorAmount = 0
  }
  NavigatetotheRelatedproperty() {

    this.router.navigate(['/fee-calculation']);
  }

  numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }
  transform(value: number): string {
    if (value !== undefined && value !== null) {
      return value.toString().replace(/,/g, '');
    } else {
      return '';
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

  ///////agricultural flow ////////////

  GetAgriculturaldatafromApi() {

    this.marketvaluationService.GetagriculturalRateDetails(this.roadcode).subscribe(
      (data: any) => {

        if (data.length != 0) {

          data.forEach(element => {
            element.rate = this.numberWithCommas(element.rate);
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
          "propertytypeid": this.PropertytypeId
        }
        this.marketvaluationService.GetNonagriculturalAnnexurerules(property).subscribe(
          (data: any) => {
  
            if (data.length != 0) {
              data.forEach(element => {
                element['Amount'] = 0
                console.log("ghjkl", element.description)
                element.Yeschecked = false
                element.Nochecked = true
              });
              this.AgriAnnexurerules = data;
              setTimeout(() => {
                this.FetchAgriculturalvaluationdetails();
              }, 1000);
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
    
  }
  totalagridetails:any;
  FetchAgriculturalvaluationdetails() {
    this.TotalAgriPercentageValuation = 0
    this.finalAgriamountofproperty = 0
    this.agriculturedetailsidForAgri = null;
    this.AgriValuationId = null
    var applicationdetails = {
      "propertytypeid": parseInt(this.PropertytypeId),
      "applicationnumber": localStorage.getItem("ApplicationData")
    }
    this.marketvaluationService.FetchNonagriculturaldetails(applicationdetails).subscribe(
      (data: any) => {
          this.totalagridetails = JSON.parse(data[0].jsonData)
          console.log("display the vali data ", this.totalagridetails)
         // localStorage.setItem("ValidId", data[0].valid)
          var propertydetails = this.bhoomiMultyobject[this.item]
          var totalamount = 0
          this.totalagridetails = this.totalagridetails["array_to_json"];
          if (this.totalagridetails != null) {
            this.totalagridetails.forEach(agridetails => {
          if (this.PropertytypeId === agridetails.propertytypeid && propertydetails.propertyid === agridetails.propertyid) {
           console.log(agridetails)
           var agriculture = agridetails["agriculture"]
           var annexuredetails = agridetails["annexuredetails"]
           this.AgriValuationId = agridetails.valid;
           agriculture.forEach(rate => {
            this.products.forEach(p => {
              if (p.agrilandtypeid == rate.agrilandtypeid) {
                this.agriculturedetailsidForAgri = rate.agriculturedetailsid;
              //  p["agriculturedetailsid"] = element.agriculturedetailsid;
                p.checked = true
                var PropertyRate = this.transform(p.rate);
                this.finalAgriamountofproperty = this.marketvaluationService.CalculationforAgriculturalLand(this.Unitcode,PropertyRate)
              }
            });
          })
          annexuredetails.forEach(element => {
           this.AgriAnnexurerules.forEach(annex => {
            if (annex.annexureid === element.annexureid) {
              if (element.isselected == true) {
                if(annex.Yeschecked != true){
                  annex.Nochecked  = false
                annex.Yeschecked = element.isselected
                annex.Amount = this.numberWithCommas(element.rate2)
              //  totalamount = totalamount + annex.Amount;
               // console.log("display the total amout of annexure rules" ,totalamount)
                annex["annexuredetailsid"] = element.annexuredetailsid
                console.log("total percentage :::",this.TotalAgriPercentageValuation)
                this.TotalAgriPercentageValuation = this.TotalAgriPercentageValuation + element.rate2
                }
              } else {
                annex.Nochecked = true
                annex.Amount = this.numberWithCommas(element.rate2)
                annex["annexuredetailsid"] = element.annexuredetailsid
              }
            }
          });
        })
       

          }
        })
        }




          // data.forEach(element => {
          //   if (this.PropertytypeId === element.propertytypeid  && propertydetails.propertyid === element.propertyid) {
          //     this.AgriValuationId = element.valid;
          //     this.AgriAnnexurerules.forEach(annex => {
          //       if (annex.annexureid === element.annexureid) {
          //         if (element.isselected == true) {
          //           if(annex.Yeschecked != true){
          //             annex.Nochecked  = false
          //           annex.Yeschecked = element.isselected
          //           annex.Amount = this.numberWithCommas(element.rate)
          //         //  totalamount = totalamount + annex.Amount;
          //          // console.log("display the total amout of annexure rules" ,totalamount)
          //           annex["annexuredetailsid"] = element.annexuredetailsid
          //           console.log("total percentage :::",this.TotalAgriPercentageValuation)
          //           this.TotalAgriPercentageValuation = this.TotalAgriPercentageValuation + element.rate
          //           }
          //         } else {
          //           annex.Nochecked = true
          //           annex.Amount = this.numberWithCommas(element.rate)
          //           annex["annexuredetailsid"] = element.annexuredetailsid
          //         }
          //       }
          //     });
          //     this.products.forEach(p => {
          //       if (p.agrilandtypeid == element.agrilandtypeid) {
          //         this.agriculturedetailsidForAgri = element.agriculturedetailsid;
          //       //  p["agriculturedetailsid"] = element.agriculturedetailsid;
          //         p.checked = true
          //         var PropertyRate = this.transform(p.rate);
          //         this.finalAgriamountofproperty = this.marketvaluationService.CalculationforAgriculturalLand(this.Unitcode,PropertyRate)
          //       }
          //     });
          //     // this.Totallist.forEach(p => {
          //     //   if (p.Id === "02") {
          //     //     p.amount = data[0].marketvalue;

          //     //   } else if (p.Id === "01") {
          //     //     p.amount = totalamount;

          //     //   }
          //     // });
              

            
           
          //   }
          // });
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
  }


  checkAllCheckBox() {
    console.log(this.products);
    this.products.forEach(element => {
      if (element.checked == true) {
        this.selecteditem = element;
        console.log("selected row data ", element)

      }
    });

  }

  SelectedAgriPropertytypeRate(item) {
    this.products.forEach(val => {
      if (val.propertytype == item.propertytype) {
        val.checked = val.checked;
        var PropertyRate = this.transform(val.rate);
        this.finalAgriamountofproperty = this.marketvaluationService.CalculationforAgriculturalLand(this.Unitcode,PropertyRate)

        console.log("selected row data ", this.finalAgriamountofproperty)
      }
      else {
        val.checked = false;
      }
    });
    this.AgriAnnexurerules.forEach(val => {
      if (val.Yeschecked) {
        val.Yeschecked = false
        val.Nochecked = true
        var amount:any = this.transform(val.Amount);
        this.TotalAgriPercentageValuation = this.TotalAgriPercentageValuation - amount;
        val.Amount = 0
      }
    })
    localStorage.setItem('AgriRateDetails', this.products);
  }
 
  SelectedAgriAnnexarule(item) {
    console.log("selected row data ", item)
   // let finalamount = 0
    let isitemprocessed = false
  //  this.TotalPercentageValuation = 0
    this.AgriAnnexurerules.forEach(val => {
      if (val.description === item.description) {
        if (!item.Yeschecked) {
          if (item.Nochecked) {
            item.Nochecked = false
          }
          item.Nochecked = false;

          var finalamount = this.marketvaluationService.calculatePercentageforAnnexure(val.percentage, this.finalAgriamountofproperty)
          console.log("display the on SelectedAnnexarule change event ", finalamount);
          //val.Amount  = finalamount ;
          val.Amount = this.numberWithCommas(finalamount);
          this.TotalAgriPercentageValuation = this.TotalAgriPercentageValuation + finalamount;
          console.log("addedpercentagerulevalue ", this.TotalAgriPercentageValuation);
          this.finalpercentvalue = finalamount;
          isitemprocessed = true
        } else if (item.Yeschecked) {
          var amt:any = this.transform(item.Amount)
         //  finalamount = this.marketvaluationService.calculatePercentageforAnnexure(item.percentage, this.finalamountofproperty)
          this.TotalAgriPercentageValuation = this.TotalAgriPercentageValuation - amt
           val.Amount = 0
           item.Nochecked = true
         
        }
      }
      if (val.description === "Corner Property" && item.description === "Any Two side Roads") {
        val.Amount = this.transform(val.Amount)
        this.TotalAgriPercentageValuation = this.TotalAgriPercentageValuation - val.Amount;
        console.log("removedpercentagerulevalue ", this.TotalAgriPercentageValuation);
        val.Amount = 0;
        val.Yeschecked = false;
        val.Nochecked = true;

      }
      if (val.description === "Any Two side Roads" && item.description === "Corner Property") {
        val.Amount = this.transform(val.Amount)
        this.TotalAgriPercentageValuation = this.TotalAgriPercentageValuation - val.Amount;
        console.log("removedpercentagerulevalue ", this.TotalAgriPercentageValuation);
        val.Amount = 0;
        val.Yeschecked = false;
        val.Nochecked = true;
      }

    });
  }
  RemoveAgripercentagerule(item) {
    this.AgriAnnexurerules.forEach(val => {
      if (val.description == item.description) {
        if (val.Yeschecked) {
          val.Yeschecked = false;
          var finalamount = this.marketvaluationService.calculatePercentageforAnnexure(item.percentage, this.finalAgriamountofproperty)
          val.Amount = this.transform(val.Amount)
          if(this.TotalAgriPercentageValuation != 0){
            this.TotalAgriPercentageValuation = this.TotalAgriPercentageValuation - finalamount;
            console.log("removedpercentagerulevalue ", this.TotalAgriPercentageValuation);
          }
          val.Amount = 0;
        }else if(!val.Yeschecked){
          val.Yeschecked = true;
          var finalamount = this.marketvaluationService.calculatePercentageforAnnexure(val.percentage, this.finalAgriamountofproperty)
          console.log("display the on SelectedAnnexarule change event ", finalamount);
          //val.Amount  = finalamount ;
          val.Amount = this.numberWithCommas(finalamount);
          this.TotalAgriPercentageValuation = this.TotalAgriPercentageValuation + finalamount;
          console.log("addedpercentagerulevalue ", this.TotalAgriPercentageValuation);
          this.finalpercentvalue = finalamount;
        }
     
      }
      if (val.description === "Corner Property" && item.description === "Any Two side Roads") {
        val.Yeschecked = false;
        val.Nochecked = true;
      }
      if (val.description === "Any Two side Roads" && item.description === "Corner Property") {
        val.Yeschecked = false;
        val.Nochecked = true;
      }
    });
  }
  ValuateTotalAmount() {
    this.Totallist.forEach(list => {
      if (list.Id == '01') {
        list.amount = this.numberWithCommas(this.TotalAgriPercentageValuation);
        localStorage.setItem('AgriculturalTotalAnnexureValuation', this.TotalAgriPercentageValuation);
      } else if (list.Id == '02') {
        var finalamount = this.finalAgriamountofproperty + this.TotalAgriPercentageValuation;
        list.amount = this.numberWithCommas(finalamount)
      }
    });
    this.TotalValuationAmount = true;
    
  }

  AgriculturalArrayValuation: any = [];
  SendValuationdetailstoApi() {
    let Valuationmodel = new AgriValuationdetails()
    var srocode = parseInt(this.SROCode)
    console.log("display the srococde ", srocode)
  if(this.AgriValuationId){
    Valuationmodel.valuationid = this.AgriValuationId
   }else{
    Valuationmodel.valuationid = null
   }
    Valuationmodel.srocode = srocode;
    //nedd to change once we have regsrocode
    Valuationmodel.regsrocode = this.RegSROCode;
    Valuationmodel.villagecode = parseInt(this.villagecode);
    Valuationmodel.roadcode = parseInt(this.roadcode.roadcode);
    Valuationmodel.valuationdate = this.currentdate;
    Valuationmodel.propertytypeid = parseInt(this.PropertytypeId);
    Valuationmodel.totalarea = parseInt(this.Unitcode);
    Valuationmodel.unitid = 1;
    Valuationmodel.marketvalue = this.finalAgriamountofproperty + this.TotalAgriPercentageValuation;
    Valuationmodel.leasetype = 0
    Valuationmodel.leaseamount = 100
    Valuationmodel.northboundary = this.northboundary
    Valuationmodel.southboundary = this.southboundary
    Valuationmodel.eastboundary = this.eastboundary
    Valuationmodel.westboundary = this.westboundary
    Valuationmodel.assessment = this.assessment
    Valuationmodel.regarticlecode = this.regarticlecode
    Valuationmodel.applicationnumber = localStorage.getItem("ApplicationData")
    Valuationmodel.verified = true,
      Valuationmodel.issroapproved = "y",
      Valuationmodel.propertyid = this.propertyId
    this.AgriculturalArrayValuation.push(Valuationmodel);
      console.log("Save ::display the array of valuationdetails //////////////:::",this.AgriculturalArrayValuation)
    this.marketvaluationService.SaveFinalagriValuationdetails(this.AgriculturalArrayValuation).subscribe(
      (data: any) => {
        if (data[0].responseCode == 1000) {
          this.message = data[0].responseMessage;
          console.log("display the valuation success message ::: ", data[0].responseMessage)
          if (data[0].valid) {
            this.SaveRatedetials(data[0].valid);
            this.Updatepropertyschedule();
            this.showToast(data[0].responseMessage);

           
          }

        }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
     var val = {
       "amount": this.finalAgriamountofproperty + this.TotalAgriPercentageValuation,
       "propertyid" :this.propertyId 
     }
  
     this.AgriculturalArrayValuation = []
     this.AgriValuationId = null

    //  var i:any  = this.numofprop - 1;
    //  this.marketvalue[i] = this.finalamountofproperty + this.TotalPercentageValuation;
    //  var mkvl = JSON.stringify(this.marketvalue);
    //  localStorage.setItem("FinalmarketValuation",mkvl)
  }
  Updatepropertyschedule(){
    this.bhoomiObject = this.bhoomiMultyobject[this.item]
    console.log(this.bhoomiObject)
    var totalvaluation :any =0
    console.log(this.PropertytypeId);
    if(this.PropertytypeId === 17){
      totalvaluation = this.finalAgriamountofproperty + this.TotalAgriPercentageValuation
    }else if (this.PropertytypeId === 29){
      totalvaluation = this.finalamountofbuildingproperty + this.TotalConstructionAmount + this.TotalBuildingPercentageValuation + this.TotalBuildingParkingAmount
    }
    else if(this.PropertytypeId === 1){
      totalvaluation = this.finalamountofproperty + this.TotalPercentageValuation
    }
    else if(this.PropertytypeId === 12){
      totalvaluation = this.finalamountofflatproperty + this.TotalAmenitiesAmount + this.TotalFlatPercentageValuation + this.TotalFlatParkingAmount + this.TotalFloorAmount
    }
    var propertydetails = [
      {
        "propertyid":this.bhoomiObject.propertyid,
        "documentid":this.bhoomiObject.documentid,
        "villagecode":this.bhoomiObject.villagecode,
        "regsrocode":this.bhoomiObject.regsrocode,
        "srocode":this.bhoomiObject.srocode,
        "totalarea":this.bhoomiObject.totalarea,
        "unitid":this.bhoomiObject.unitid,
       "northboundary":this.bhoomiObject.northboundary,
       "southboundary":this.bhoomiObject.southboundary,
       "eastboundary":this.bhoomiObject.eastboundary,
      "westboundary":this.bhoomiObject.westboundary,
      "landmark":this.bhoomiObject.landmark,
      "marketvalue":totalvaluation,
      "assessment":this.bhoomiObject.assessment,
      "sdcalculationstring":this.bhoomiObject.sdcalculationstring,
      "stampduty":this.bhoomiObject.stampduty,
      "transferliabilities":this.bhoomiObject.transferliabilities,
      "consideration":this.bhoomiObject.consideration,
      "additionalduty":this.bhoomiObject.additionalduty,
      "cessduty":this.bhoomiObject.cessduty,
      "govtduty":this.bhoomiObject.govtduty,
      "isexempted":this.bhoomiObject.isexempted,
      "exemptiondescription":this.bhoomiObject.exemptiondescription,
      "ismovableproperty":this.bhoomiObject.ismovableproperty,
      "sdrefund":this.bhoomiObject.sdrefund,
      "docmarketvalue":this.bhoomiObject.docmarketvalue,
      "valid1":this.bhoomiObject.valid1,
      "isimdemnified":this.bhoomiObject.isimdemnified,
      "restriction":this.bhoomiObject.restriction,
      "restrictiontype":this.bhoomiObject.restrictiontype,
      "restrictiondescription":this.bhoomiObject.restrictiondescription,
      "enumber":this.bhoomiObject.enumber,
      "claimingblocknumber":this.bhoomiObject.claimingblocknumber,
      "retainingblocknumber":this.bhoomiObject.retainingblocknumber,
      "valuationreport":this.bhoomiObject.valuationreport,
     "loanpurposeid":this.bhoomiObject.loanpurposeid,
     "applicationnumber":this.bhoomiObject.applicationnumber,
     "verified":this.bhoomiObject.verified,
     "issroapproved":this.bhoomiObject.issroapproved,
     "stamparticlecode":this.bhoomiObject.stamparticlecode,
     "stampruleid":this.bhoomiObject.stampruleid,
     "regarticlecode":this.bhoomiObject.regarticlecode,
     "propertytypeid":this.bhoomiObject.propertytypeid,
     "noofscanpages":this.bhoomiObject.noofscanpages
}
]
    console.log(propertydetails)
    this.kaveriService.SavePropertyMaster(propertydetails).subscribe(
      (data: any) => {
        debugger;
        console.log("data==>",data);
        if (data[0].responseCode == "1000") {
          debugger;
          this.message = data.responseMesg;
          this.showToasts();
        }
        // this.router.navigate(['/market-valuation']);
        // if (data.responseCode == "1000") {
        //   debugger;
        //   this.message = data.responseMesg;
        //   this.showToast();

        //   this.router.navigateByUrl('/party-details');
        // }
        // this.NavigatetotheRelatedproperty();
      }, e => {
        if (e.error) {
          debugger;
          this.errorMessage = e.error.error_description;
        }
      }
    )
  }
  showToasts() {
    notify({
      message: this.message,
      isVisible: true,
      displayTime: 3000,
      height: 50,
      type: "success"

    });
  }
  ArrayRatedetails: any = []
  SaveRatedetials(valid) {
     
    this.products.forEach(element => {
      let AgriculturalRatemodel = new Agriculturalratedetails()
      if (element.checked === true) {
        let amount = this.transform(element.rate)
        AgriculturalRatemodel.agriculturedetailsid = this.agriculturedetailsidForAgri
        AgriculturalRatemodel.agrilandtypeid = element.agrilandtypeid
        AgriculturalRatemodel.unitid = 9
        AgriculturalRatemodel.valuationid = valid;
        AgriculturalRatemodel.verified = true
        AgriculturalRatemodel.agrirateid = element.rateagricode
        AgriculturalRatemodel.rate = parseInt(amount)
        AgriculturalRatemodel.srocode = parseInt(this.SROCode)
         AgriculturalRatemodel.regsrocode = this.RegSROCode
        // AgriculturalRatemodel.srocode = 9
        // AgriculturalRatemodel.regsrocode = 9
        this.ArrayRatedetails.push(AgriculturalRatemodel)
      }
    });
    console.log("Save ::display the array of ArrayRatedetails //////////////:::",this.ArrayRatedetails)
    this.marketvaluationService.SaveAgriculturalRateValuationdetails(this.ArrayRatedetails).subscribe(
      (data: any) => {
        if (data.responseCode == 1000) {
          this.message = data.responseMessage;
          console.log("display the agricultural success message :::", data.responseMessage)
          //  this.SaveAnnexuredetails(valid)
          this.SaveAgriAnnexuredetails(valid)
          this.showToast(data.responseMessage);
          this.agriculturedetailsidForAgri = null;
          this.AgriValuationId = null
        }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
    this.products = []
    this.ArrayRatedetails = []
  }
  TotalAnnexure: any = [];
  SaveAgriAnnexuredetails(valid) {

    this.AgriAnnexurerules.forEach(element => {
      let annexure = new AgriAnnexure();
      if(element.annexuredetailsid){
        annexure.annexuredetailsid = element.annexuredetailsid
       }else{
        annexure.annexuredetailsid = null
       }
      var amount = this.transform(element.Amount)
    //  annexure.annexuredetailsid = null
      annexure.annexureid = element.annexureid
      annexure.area = parseInt(this.Unitcode)
      annexure.rate = parseInt(amount)
      annexure.valuationid = valid
      annexure.verified = true
      annexure.srocode =  parseInt(this.SROCode)
      annexure.regsrocode = this.RegSROCode
      var checked = false
      if (element.Yeschecked == true) {
        checked = true
      } else {
        checked = false
      }
      annexure.isselected = checked
      this.TotalAnnexure.push(annexure)
    });
    console.log("Save ::display the array of TotalAnnexure //////////////:::",this.TotalAnnexure)
    this.marketvaluationService.SaveAnnuxureValuationdetails(this.TotalAnnexure).subscribe(
      (data: any) => {
        if (data.responseCode == 1000) {
          console.log("display the annexure success message ::: ", data.responseMessage)
          this.message = data.responseMessage;
          //this.SaveRatedetials()
          this.showToast(data.responseMessage);
          this.item = this.displaypropertytypeNum - 1;
          if (this.displaypropertytypeNum === this.numofprop) {
            this.NavigatetotheRelatedproperty();
          } else {
            this.frontbuttonclicks();
          }
        }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
    this.Annexurerules = []
    this.TotalAnnexure = [];
    this.RemoveAllAgriVacantValues()
  }

  RemoveAllAgriVacantValues(){
    this.TotalAgriPercentageValuation = 0
    this.finalAgriamountofproperty = 0
  }
}
export class Valuationdetails {
  valuationid: number
  srocode: number
  regsrocode: number
  villagecode: number
  roadcode: number
  valuationdate: Date
  propertytypeid: number
  totalarea: number
  unitid: number
  marketvalue: number
  leasetype: number
  leaseamount: number
  northboundary: string
  southboundary: string
  eastboundary: string
  westboundary: string
  assessment: string
  regarticlecode: number
  applicationnumber: string
  verified: boolean
  issroapproved: string
  propertyid: number
}
export class OpenBuiltValuationdetails {
  openbuiltvalid: number
  propertytypeid: number
  roadid: number
  unitid: number
  rate: number
  valuationid: number
  verified: boolean
  openbuiltrateid: number
  srocode: number
  regsrocode: number
}
export class Annexure {
  annexuredetailsid: number
  annexureid: number
  area: number
  rate: number
  valuationid: number
  verified: boolean
  srocode: number
  regsrocode: number
  isselected: boolean
}
export class Constructiondetails {
  constructiondetailsid: number
  constructiontypeid: number
  gfarea: number
  agfarea: number
  rate: number
  verified: boolean
  valuationid: number
  srocode: number
  regsrocode: number
}
export class Parkingdetails {
  parkingdetailsid: number
  parkingtypeid: number
  totalparkings: number
  rate: number
  verified: boolean
  valuationid: number
  srocode: number
  regsrocode: number
}
export class Amenitiesdetails {
  amenetiesdetailsid: number
  apartmentamenetyruleid: number
  rate: number
  verified: boolean
  valuationid: number
  srocode: number
  regsrocode: number
}
export class Useramenetiesdetails {
  useramenetiesdetailsid: number
  apartmentamenityid: number
  isselected: boolean
  verified: boolean
  valuationid: number
  srocode: number
  regsrocode: number
}
export class Floordetails {
  flatfloordetailsid: number
  apartmentfloorrateid: number
  rate: number
  verified: boolean
  valuationid: number
  srocode: number
  regsrocode: number
}
export class Flatratedetails {
  flatratedetailsid: number
  propertytypeid: number
  amenitiesid: number
  unitid: number
  rate: number
  flatrateid: number
  verified: boolean
  floorid: number
  valuationid: number
  srocode: number
  regsrocode: number
}
export class AgriValuationdetails {
  valuationid: number
  srocode: number
  regsrocode: number
  villagecode: number
  roadcode: number
  valuationdate: Date
  propertytypeid: number
  totalarea: number
  unitid: number
  marketvalue: number
  leasetype: number
  leaseamount: number
  northboundary: string
  southboundary: string
  eastboundary: string
  westboundary: string
  assessment: string
  regarticlecode: number
  applicationnumber: string
  verified: boolean
  issroapproved: string
  propertyid: number
}
export class Agriculturalratedetails {
  agriculturedetailsid: number
  agrilandtypeid: number
  unitid: number
  valuationid: number
  verified: boolean
  agrirateid: number
  rate: number
  srocode: number
  regsrocode: number
}
export class AgriAnnexure {
  annexuredetailsid: number
  annexureid: number
  area: number
  rate: number
  valuationid: number
  verified: boolean
  srocode: number
  regsrocode: number
  isselected: boolean
}




