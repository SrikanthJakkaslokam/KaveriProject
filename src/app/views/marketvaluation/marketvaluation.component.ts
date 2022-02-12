import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import notify from 'devextreme/ui/notify';
import { Agriculturalmarketvaluation } from '../../Models/AgriculturalMarketvaluation/agriculturalmarketvaluation';
import { KaveriService } from '../../services/kaveri.service';
import { MarketvaluationService } from '../../services/marketvaluation.service';

@Component({
  selector: 'app-marketvaluation',
  templateUrl: './marketvaluation.component.html',
  styleUrls: ['./marketvaluation.component.scss']
})
export class MarketvaluationComponent implements OnInit {
  loggedinUser: string = "";
  disTrict: any;
  talUka: any;
  town: any;
  Valuationmodel: any = {};
  AgriculturalRatemodel: any = {};
  Annexuremodel: any = {};
  roadcode: any = {
    "roadcode": ""
  };

  vilLage: any;
  selectedAll: boolean;
  checkedvalue: any;
  selecteditem: any;
  Units: any;
  PropertyRate: any;
  finalamountofproperty: any = 0;
  errorMessage: string = "";
  TotalPercentageValuation: any = 0;
  finalpercentvalue: any = 0;
  TotalValuationAmount = false;
  villagecode: any;
  Unitcode: any = 0;
  codedetails: any;
  SROCode: any;
  PropertytypeId: any;
  northboundary: any = "";
  southboundary: any = "";
  assessment = "";
  regarticlecode: any = 1;
  applicationnumber: any = "";
  eastboundary = "";
  westboundary = "";
  currentdate = new Date();
  todayISOString: string = new Date().toISOString();
  private dataList: Agriculturalmarketvaluation;
  message: any;
  bhoomiMultyobject: any = [];
  item: number = 0;
  numofprop: number = 0;
  displaypropertytypeNum: number = 1;
  bhoomiObject: any;
  totalpropertydetails: any = [];
  TotalAnnexure: any = [];
  ValuationId: any;
  agriculturedetailsid:any = null ;
  propertyId: any;
  RegSROCode:any;
  marketvalue : Array<any> = [];
  unitid:any = 4
  propertydata:any =[];
  Agriroadcode:any;
  constructor(private marketvaluationService: MarketvaluationService, public router: Router,private kaveriService: KaveriService) {

  }
  products: any;
  Annexurerules: any;
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

    // this.bhoomiMultyobject = JSON.parse(localStorage.getItem('kaveriResult'));
    // this.numofprop = this.bhoomiMultyobject.length;
    // this.item = this.displaypropertytypeNum - 1;
     this.Agriroadcode = localStorage.getItem("Roadcode")
    
    this.applicationnumber = localStorage.getItem("ApplicationData")
    this.getpropertydata();
   // this.changeprop();
    

    // this.marketvaluationMultyobject[this.item]= this.totalvaluation ;

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
            if (propertyid != element.propertyid && element.propertytypeid == 17) {
              propertyid = element.propertyid
              this.bhoomiMultyobject.push(element)
              console.log("display array ", this.bhoomiMultyobject)
            }

          });
          //this.bhoomiMultyobject = data
          this.numofprop = this.bhoomiMultyobject.length;
          this.item = this.displaypropertytypeNum - 1;
          this.changeprop()
          // setTimeout(() => {
          //   this.GetAgriculturaldatafromApi();
          // }, 2000);
          
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
              this.Annexurerules = data;
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
  FetchAgriculturalvaluationdetails() {
    this.TotalPercentageValuation = 0
    this.finalamountofproperty = 0
    this.agriculturedetailsid = null;
    this.ValuationId = null
    var applicationdetails = {
      "propertytypeid": parseInt(this.PropertytypeId),
      "applicationnumber": localStorage.getItem("ApplicationData")
    }
    this.marketvaluationService.FetchAgriculturaldetails(applicationdetails).subscribe(
      (data: any) => {
        if (data.length != 0) {
          console.log("display the vali data ",data)
          localStorage.setItem("ValidId", data[0].valid)

          var totalamount = 0
          data.forEach(element => {
            if (this.propertyId === element.propertyid) {
              this.ValuationId = element.valid;
              this.Annexurerules.forEach(annex => {
                if (annex.annexureid === element.annexureid) {
                  if (element.isselected == true) {
                    if(annex.Yeschecked != true){
                      annex.Nochecked  = false
                    annex.Yeschecked = element.isselected
                    annex.Amount = this.numberWithCommas(element.rate)
                  //  totalamount = totalamount + annex.Amount;
                   // console.log("display the total amout of annexure rules" ,totalamount)
                    annex["annexuredetailsid"] = element.annexuredetailsid
                    console.log("total percentage :::",this.TotalPercentageValuation)
                    this.TotalPercentageValuation = this.TotalPercentageValuation + element.rate
                    }
                  } else {
                    annex.Nochecked = true
                    annex.Amount = this.numberWithCommas(element.rate)
                    annex["annexuredetailsid"] = element.annexuredetailsid
                  }
                }
              });
              this.products.forEach(p => {
                if (p.agrilandtypeid == element.agrilandtypeid) {
                  this.agriculturedetailsid = element.agriculturedetailsid;
                //  p["agriculturedetailsid"] = element.agriculturedetailsid;
                  p.checked = true
                  var PropertyRate = this.transform(p.rate);
                  this.finalamountofproperty = this.marketvaluationService.CalculationforAgriculturalLand(this.Unitcode,PropertyRate)
                }
              });
              // this.Totallist.forEach(p => {
              //   if (p.Id === "02") {
              //     p.amount = data[0].marketvalue;

              //   } else if (p.Id === "01") {
              //     p.amount = totalamount;

              //   }
              // });
              

            
           
            }
          });
          


          console.log("display the Totallist rules", this.Totallist)
          console.log("display the products rules", this.products)
          console.log("display the Annexurerules rules", this.Annexurerules)
        }
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

  SelectedPropertytypeRate(item) {
    this.products.forEach(val => {
      if (val.propertytype == item.propertytype) {
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
        var amount:any = this.transform(val.Amount);
        this.TotalPercentageValuation = this.TotalPercentageValuation - amount;
        val.Amount = 0
      }
    })
    localStorage.setItem('AgriRateDetails', this.products);
  }
  Onunitschange($event) {

    if ($event != "") {
      let text1 = $event.target.options[$event.target.options.selectedIndex].text;
      this.Units = text1;
      console.log("display the on unit chage event ", text1);
    }
  }
  SelectedAnnexarule(item) {
    console.log("selected row data ", item)
    let finalamount = 0
    let isitemprocessed = false
  //  this.TotalPercentageValuation = 0
    this.Annexurerules.forEach(val => {
      if (val.description === item.description) {
        if (!item.Yeschecked) {
          if (item.Nochecked) {
            item.Nochecked = false
          }
          item.Nochecked = false;

          finalamount = this.marketvaluationService.calculatePercentageforAnnexure(val.percentage, this.finalamountofproperty)
          console.log("display the on SelectedAnnexarule change event ", finalamount);
          //val.Amount  = finalamount ;
          val.Amount = this.numberWithCommas(finalamount);
          this.TotalPercentageValuation = this.TotalPercentageValuation + finalamount;
          console.log("addedpercentagerulevalue ", this.TotalPercentageValuation);
          this.finalpercentvalue = finalamount;
          isitemprocessed = true
        } else if (item.Yeschecked) {
          val.Amount = 0
           finalamount = this.marketvaluationService.calculatePercentageforAnnexure(item.percentage, this.finalamountofproperty)
          this.TotalPercentageValuation = this.TotalPercentageValuation - finalamount
        }
      }
      if (val.description === "Corner Property" && item.description === "Any Two side Roads") {
        val.Amount = this.transform(val.Amount)
        this.TotalPercentageValuation = this.TotalPercentageValuation - val.Amount;
        console.log("removedpercentagerulevalue ", this.TotalPercentageValuation);
        val.Amount = 0;
        val.Yeschecked = false;

      }
      if (val.description === "Any Two side Roads" && item.description === "Corner Property") {
        val.Amount = this.transform(val.Amount)
        this.TotalPercentageValuation = this.TotalPercentageValuation - val.Amount;
        console.log("removedpercentagerulevalue ", this.TotalPercentageValuation);
        val.Amount = 0;
        val.Yeschecked = false;
      }

    });
  }
  Removepercentagerule(item) {
    this.Annexurerules.forEach(val => {
      if (val.description == item.description) {
        if (val.Yeschecked) {
          val.Yeschecked = false;
        }
        var finalamount = this.marketvaluationService.calculatePercentageforAnnexure(item.percentage, this.finalamountofproperty)
        val.Amount = this.transform(val.Amount)
        if(this.TotalPercentageValuation != 0){
          this.TotalPercentageValuation = this.TotalPercentageValuation - finalamount;
          console.log("removedpercentagerulevalue ", this.TotalPercentageValuation);
        }
        val.Amount = 0;
      }
      if (val.description === "Corner Property" && item.description === "Any Two side Roads") {
        val.Nochecked = false;
      }
      if (val.description === "Any Two side Roads" && item.description === "Corner Property") {
        val.Nochecked = false;
      }
    });
  }
  ValuateTotalAmount() {
    this.Totallist.forEach(list => {
      if (list.Id == '01') {
        list.amount = this.numberWithCommas(this.TotalPercentageValuation);
        localStorage.setItem('AgriculturalTotalAnnexureValuation', this.TotalPercentageValuation);
      } else if (list.Id == '02') {
        var finalamount = this.finalamountofproperty + this.TotalPercentageValuation;
        list.amount = this.numberWithCommas(finalamount)
        var AgricultureTotalAmount = finalamount;
        localStorage.setItem('AgricultureTotalAmount', AgricultureTotalAmount);
        localStorage.setItem('FinalMarketValuationAmount', AgricultureTotalAmount);
      }
    });
    this.TotalValuationAmount = true;
    
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
  //  this.GetAgriculturaldatafromApi();
    this.TotalValuationAmount = false;
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
   // this.GetPropertydetails()
   // this.Addpropertydetailsinlocal();
  
    this.changeprop();
   
    this.TotalValuationAmount = false;
    //this.FetchAgriculturalvaluationdetails()
  }

  // changeprop() {

  //   this.bhoomiObject = this.bhoomiMultyobject[this.item]
  //   this.disTrict = this.bhoomiObject.districtname;
  //   this.talUka = this.bhoomiObject.talukaname;
  //   this.town = this.bhoomiObject.hobliname;
  //   this.vilLage = this.bhoomiObject.villagename;
  //   this.Unitcode = this.bhoomiObject.TotalArea;
  //   this.roadcode.roadcode = this.bhoomiObject.RoadCode
  //   this.villagecode = this.bhoomiObject.VillageCodeK
  //   this.SROCode = this.bhoomiObject.SROCode
  //   if(this.bhoomiObject.propertyid != undefined){
  //     this.propertyId = this.bhoomiObject.propertyid
  //   }else if(this.bhoomiObject.PropertyId!= undefined){
  //     this.propertyId = this.bhoomiObject.PropertyId
  //   }
  //   this.RegSROCode = this.bhoomiObject.RegSROCode
  //   //this.PropertytypeId = localStorage.getItem('PropertyId');
  //   this.PropertytypeId = "17"
  //   this.GetAgriculturaldatafromApi();
  // }
  changeprop() {

    this.bhoomiObject = this.bhoomiMultyobject[this.item]
    this.disTrict = this.bhoomiObject.districtname;
    this.talUka = this.bhoomiObject.taluknamee;
    this.town = this.bhoomiObject.hoblinamee;
    this.vilLage = this.bhoomiObject.villagenamee;
    this.Unitcode = this.bhoomiObject.totalarea;
    //this.roadcode.roadcode = this.bhoomiObject.RoadCode
    this.roadcode.roadcode = this.Agriroadcode
    this.villagecode = this.bhoomiObject.villagecode
    this.SROCode = this.bhoomiObject.srocode
    if(this.bhoomiObject.propertyid){
      this.propertyId = this.bhoomiObject.propertyid
    }else if(this.bhoomiObject.PropertyId){
      this.propertyId = this.bhoomiObject.PropertyId
    }
    this.RegSROCode = this.bhoomiObject.regsrocode
    //this.PropertytypeId = localStorage.getItem('PropertyId');
    this.PropertytypeId = "17"
    console.log(this.bhoomiObject)
    this.GetAgriculturaldatafromApi();
  }
  Addpropertydetailsinlocal() {
    var total = {
      "propertyid": this.displaypropertytypeNum - 1,
      "products": this.products,
      "Annexurerules": this.Annexurerules,
      "Totallist": this.Totallist
    }

    if (this.totalpropertydetails != 0 && this.totalpropertydetails != null && this.totalpropertydetails != undefined) {
      this.totalpropertydetails.forEach(element => {
        if (element.propertyid === total.propertyid) {
          this.totalpropertydetails.push(total);
          localStorage.setItem("totalpropertydetails", JSON.stringify(this.totalpropertydetails))
        }
      });
    } else {
      this.totalpropertydetails.push(total);
      localStorage.setItem("totalpropertydetails", JSON.stringify(this.totalpropertydetails))
    }

  }
  GetPropertydetails() {
    this.totalpropertydetails = JSON.parse(localStorage.getItem("totalpropertydetails"))
    if (this.totalpropertydetails != 0 && this.totalpropertydetails != undefined && this.totalpropertydetails != null) {
      this.totalpropertydetails.forEach(element => {
        if (element.propertyid === this.displaypropertytypeNum) {
          this.products = element.products;
          this.Annexurerules = element.Annexurerules
          this.Totallist = element.Totallist
        }
      });
    }

  }

  savevaluationagri() {
    this.item = this.displaypropertytypeNum - 1;
    if (this.displaypropertytypeNum === this.numofprop) {
      this.SendValuationdetailstoApi();
      this.NavigatetotheRelatedproperty();
    } else {
      this.SendValuationdetailstoApi();
      this.frontbuttonclicks();
    }
  }
  ArrayValuation: any = [];
  SendValuationdetailstoApi() {
    let Valuationmodel = new Valuationdetails()
    var srocode = parseInt(this.SROCode)
    console.log("display the srococde ", srocode)
  if(this.ValuationId){
    Valuationmodel.valuationid = this.ValuationId
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
      console.log("Save ::display the array of valuationdetails //////////////:::",this.ArrayValuation)
    this.marketvaluationService.SaveFinalagriValuationdetails(this.ArrayValuation).subscribe(
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
       "amount": this.finalamountofproperty + this.TotalPercentageValuation,
       "propertyid" :this.propertyId 
     }
  
     this.ArrayValuation = []
     this.ValuationId = null

     var i:any  = this.numofprop - 1;
     this.marketvalue[i] = this.finalamountofproperty + this.TotalPercentageValuation;
     var mkvl = JSON.stringify(this.marketvalue);
     localStorage.setItem("FinalmarketValuation",mkvl)
  }
  Updatepropertyschedule(){
    this.bhoomiObject = this.bhoomiMultyobject[this.item]
    console.log(this.bhoomiObject)
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
      "marketvalue":this.finalamountofproperty + this.TotalPercentageValuation,
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
    this.kaveriService.SavePropertyScheduleMaster(propertydetails).subscribe(
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
        AgriculturalRatemodel.agriculturedetailsid = this.agriculturedetailsid
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
          this.SaveAnnexuredetails(valid)
          this.showToast(data.responseMessage);
          this.agriculturedetailsid = null;
          this.ValuationId = null
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
  SaveAnnexuredetails(valid) {

    this.Annexurerules.forEach(element => {
      let annexure = new Annexure();
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
    this.RemoveAllVacantValues()
  }

  RemoveAllVacantValues(){
    this.TotalPercentageValuation = 0
    this.finalamountofproperty = 0
  }
  NavigatetotheRelatedproperty() {

    this.router.navigate(['/fee-calculation']);

  }
  Savevaluationdetails() {
    var srocode = parseInt(this.SROCode)
    console.log("display the srococde ", srocode)
    this.Valuationmodel._srocode = srocode;
    //nedd to change once we have regsrocode
    this.Valuationmodel._regsrocode = srocode;
    this.Valuationmodel._villagecode = parseInt(this.villagecode);
    this.Valuationmodel._roadcode = parseInt(this.roadcode.roadcode);
    this.Valuationmodel._valuationdate = this.currentdate;
    this.Valuationmodel._propertytypeid = parseInt(this.PropertytypeId);
    this.Valuationmodel._totalarea = parseInt(this.Unitcode);
    this.Valuationmodel._unitid = 1;
    this.Valuationmodel._marketvalue = this.finalamountofproperty + this.TotalPercentageValuation;
    this.Valuationmodel._leasetype = 0
    this.Valuationmodel._leaseamount = 100
    this.Valuationmodel._northboundary = this.northboundary
    this.Valuationmodel._southboundary = this.southboundary
    this.Valuationmodel._eastboundary = this.eastboundary
    this.Valuationmodel._westboundary = this.westboundary
    this.Valuationmodel._assessment = this.assessment
    this.Valuationmodel._regarticlecode = this.regarticlecode
    //  this.Valuationmodel._applicationnumber = "PRP-23102021-00016"
    this.marketvaluationService.SaveFinalValuationdetails(this.Valuationmodel).subscribe(
      (data: any) => {
        if (data.responseCode == 100) {
          this.message = data.responseMessage;
          this.showToast(data.responseMessage);
        }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )

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

