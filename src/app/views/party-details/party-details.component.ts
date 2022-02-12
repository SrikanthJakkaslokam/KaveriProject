import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { KaveriService } from '../../services/kaveri.service';
import { Router } from '@angular/router';

import { OrganizationData } from './OrganizationData.Model';
import { partyInfoData } from './PartyInfoData.Model';
import notify from "devextreme/ui/notify";
@Component({
  selector: 'app-party-details',
  templateUrl: './party-details.component.html',
  styleUrls: ['./party-details.component.scss']
})
export class PartyDetailsComponent implements OnInit {

  presenterForm : FormGroup;
  submitted = false;
  errorMessage: string;

  presenterJsonReq: any[];

  links = ['CLAIMANT - 1'];
  activeLink = this.links[0];
  background: ThemePalette = undefined;
  // selected = new FormControl(0);
  // toggleBackground() {
  //   this.background = this.background ? undefined : 'primary';
  // }
  VisibleMinorGuardian: boolean = false;
  VisiblePOA: boolean = false;
  VisibleExempted: boolean = false;
  VisibleOrganization: boolean = false;
  VisibleIndividual: boolean = true;

  VisiblePOAOrganization: boolean = false;
  VisiblePOAIndividual: boolean = true;

  MinorGuardianradioStatus: boolean;
  POAradioStatus: boolean;

  IfOrganization: boolean = true;

  genderList: Array<any> = [];
  selectedgendervalue: string = "";
  POAselectedgendervalue: string = "";
  relationshipList: Array<any> = [];
  POArelationshipList: Array<any> = [];

  selectedrelationshipvalue: string = "";
  POAselectedrelationshipvalue: string = "";
  check: string = "";
  checkFirstOrg: string = "";

  Iselectedgendervalue: string = "";
  IgenderList: Array<any> = [];
  POAgenderList: Array<any> = [];
  IdisTrict: string = "";
  ItalUka: string = "";
  Itown: string = "";
  IvilLage: string = "";
  Iselecteddistvalue: string = "";
  Iselectedtalukvalue: string = "";
  Iselectedhoblivalue: string = "";
  Iselectedvillagevalue: string = "";

  Orgselectedgendervalue: string = "";
  OrggenderList: Array<any> = [];
  OrgdisTrict: string = "";
  OrgtalUka: string = "";
  Orgtown: string = "";
  OrgvilLage: string = "";
  Orgselecteddistvalue: string = "";
  Orgselectedtalukvalue: string = "";
  Orgselectedhoblivalue: string = "";
  Orgselectedvillagevalue: string = "";

  OrgRASselectedgendervalue: string = "";
  OrgRASgenderList: Array<any> = [];
  OrgRASdisTrict: string = "";
  OrgRAStalUka: string = "";
  OrgRAStown: string = "";
  OrgRASvilLage: string = "";
  OrgRASselecteddistvalue: string = "";
  OrgRASselectedtalukvalue: string = "";
  OrgRASselectedhoblivalue: string = "";
  OrgRASselectedvillagevalue: string = "";

  POAdisTrict: string = "";
  POAtalUka: string = "";
  POAtown: string = "";
  POAvilLage: string = "";

  POAOrgdisTrict: string = "";
  POAOrgtalUka: string = "";
  POAOrgtown: string = "";
  POAOrgvilLage: string = "";

  POAselecteddistvalue: string = "";
  POAselectedtalukvalue: string = "";
  POAselectedhoblivalue: string = "";
  POAselectedvillagevalue: string = "";

  POAOrgselecteddistvalue: string = "";
  POAOrgselectedtalukvalue: string = "";
  POAOrgselectedhoblivalue: string = "";
  POAOrgselectedvillagevalue: string = "";

  selecteOrgddistvalue: string = "";
  selectedOrgtalukvalue: string = "";
  selectedOrghoblivalue: string = "";
  selectedOrgvillagevalue: string = "";

  selectedIdistvalue: string = "";
  selectedItalukvalue: string = "";
  selectedIhoblivalue: string = "";
  selectedIvillagevalue: string = "";

  districtList: Array<any> = [];
  talukaList: Array<any> = [];
  hobliList: Array<any> = [];
  villageList: Array<any> = [];

  POAdistrictList: Array<any> = [];
  POAtalukaList: Array<any> = [];
  POAhobliList: Array<any> = [];
  POAvillageList: Array<any> = [];

  POAOrgdistrictList: Array<any> = [];
  POAOrgtalukaList: Array<any> = [];
  POAOrghobliList: Array<any> = [];
  POAOrgvillageList: Array<any> = [];

  OrgdistrictList: Array<any> = [];
  OrgtalukaList: Array<any> = [];
  OrghobliList: Array<any> = [];
  OrgvillageList: Array<any> = [];

  OrgRASdistrictList: Array<any> = [];
  OrgRAStalukaList: Array<any> = [];
  OrgRAShobliList: Array<any> = [];
  OrgRASvillageList: Array<any> = [];

  IdistrictList: Array<any> = [];
  ItalukaList: Array<any> = [];
  IhobliList: Array<any> = [];
  IvillageList: Array<any> = [];
  storedData: Array<any> = [];
  PresenterOrganizationId: string = "";
  PresenterpartyId: string = "";
  PresenterIndividual: string = "";
  srocode: string = "";
  propertydata: Array<any> = [];
  isExecutant: boolean;
  isClaimant: boolean = true;
  PREFirstInd: boolean;
  IsPREFirstInd:boolean=true;
  PREFirstOrg: boolean;
  GetPresenterData: Array<any> = [];
  PreIndPartyid: string = "";
  PreOrgPartyid: string = "";
  PreOrgAuthPartyid: string = "";
  PrePOAIndPartyid: string = "";
  PrePOAOrgPartyid: string = "";
  POAindRadio:string = "";
  firstnameInd: boolean;
  ageInd: boolean;
  genderInd: boolean;
  inhousenoInd: boolean;
  streetAddressInd: boolean;
  state: boolean;
  district: boolean;
  taluka: boolean;
  hobli: boolean;
  city: boolean;
  pincode: boolean;
  organisationName: boolean;
  HousenoOrg: boolean;
  Orgdistrict: boolean;
  TalukaOrg: boolean;
  pincodeOrg: boolean;
  HouseOrg: boolean;
  DistrictOrg: boolean;
  HobliOrg: boolean;
  CityOrg: boolean;
  PincodeOrg: boolean;
  firstNameOrg: boolean;
  AgeOrg: boolean;
  GenderOrg: boolean;
  HouseRAOrg: boolean;
  OrgRASstreet: boolean;
  stateRAOrg: boolean;
  DistrictRaOrg: boolean;
  TalukaRaOrg: boolean;
  HobliRaOrg: boolean;
  propertyView: any;
  salutaion: any;
  salutations: any;
  idProofType: any;
  RAOrgcity: boolean;
  RAORGPIncode: boolean;
  PoaRelationship: boolean;
  PoaRelativeName: boolean;
  PoaAge: boolean;
  PoaSex: boolean;
  PoaHouseNo: boolean;
  Poastreet: boolean;
  PoaState: boolean;
  PoaDistrict: boolean;
  Poataluka: boolean;
  Poahobli: boolean;
  PoaCity: boolean;
  PoaPincode: boolean;
  PoaOrgname: boolean;
  PoaOrgHouseNo: boolean;
  PoaOrgstreet: boolean;
  PoaOrgState: boolean;
  PoaOrgDistrict: boolean;
  PoaOrgtaluka: boolean;
  PoaOrghobli: boolean;
  PoaOrgvillage: boolean;
  PoaOrgPincode: boolean;
  PoaOrgFIrstname: boolean;
  PoaOrgLastname: boolean;

  addLink() {
    this.links.push(`CLAIMANT -  ${this.links.length + 1}`);
  }

  removeTab(index: number) {
    this.links.splice(index, 1);
  }

  loggedinUser: string = "";
  constructor(private fb: FormBuilder, private kaveriService: KaveriService, public router: Router) {
    
   }

   propertyexecutent(ev){
    console.log(ev.target.name);
    
   }

   GetExecutantView(){

    let postData ={
      "applicationnumber": "PRP-25012022-02712"
    }
    // this.kaveriService.GetExecutantView(postData).subscribe(res=>{
    //   this.propertyView = res;
    //  })
   }

   getSalutation(){

    this.kaveriService.GetSalutationMaster().subscribe(res=>{
      console.log(res);
      
      this.salutations = res;
    })
   }

   GetIDProofTypes(){
this.kaveriService.GetIDProofTypes().subscribe((res)=>{
  this.idProofType = res;
  
})

   }
  message;
  ngOnInit() {

   
    this.presenterForm = this.fb.group({
      Claimant: new FormControl(""),
  
      Executant: new FormControl(""),
  
      Orgname: new FormControl(""),
  
      OrgCorrected: new FormControl(""),
  
      OrgYrOfInco: new FormControl(""),
  
      OrgTAN: new FormControl(""),
  
      OrgIDType: new FormControl(""),
  
      OrgIdNumber: new FormControl(""),
  
      OrgRegAddr: new FormControl(""),
      salInd: new FormControl(""),
  
      IFirstName: new FormControl(""),
  
      IMiddleName: new FormControl(""),
  
      ILastName: new FormControl(""),
  
      IAliasName: new FormControl(""),
  
      IAge: new FormControl(""),
  
      ISex: new FormControl(""),
  
      IProfession: new FormControl(""),
  
      IPAN: new FormControl(""),
      IIDproof: new FormControl(""),
  
      IHouseNo: new FormControl(""),
      IOrgHouseNo: new FormControl(""),
  
      OrgHouseNo: new FormControl(""),
      Orgproof: new FormControl(""),
  
      street: new FormControl(""),
      Istreet: new FormControl(""),
  
      City: new FormControl(""),
      ICity: new FormControl(""),
  
      District: new FormControl(""),
  
      IDistrict: new FormControl(""),
  
      OrgDistrict: new FormControl(""),
      Orgtaluka: new FormControl(""),
      Orghobli: new FormControl(""),
      Orgvillage: new FormControl(""),
  
      taluka: new FormControl(""),
      Italuka: new FormControl(""),
  
      hobli: new FormControl(""),
      Ihobli: new FormControl(""),
      Ivillage: new FormControl(""),
      State: new FormControl(""),
      IState: new FormControl(""),
  
      OrgState: new FormControl(""),
  
      Pincode: new FormControl(""),
      IPincode: new FormControl(""),
      IRelationship: new FormControl(""),
  
      IRelativeName: new FormControl(""),
      Relationship: new FormControl(""),
  
      RelativeName: new FormControl(""),
  
      POAradio: new FormControl(""),
  OrgRASdisTrict: new FormControl(""),
      POAIndRadio: new FormControl(""),
  
      POAOrgRadio: new FormControl(""),
      POAFIrstname: new FormControl(""),
      POAMiddlename: new FormControl(""),
      POALastname: new FormControl(""),
      POAOrgname: new FormControl(""),
  
      POAOrgTAN: new FormControl(""),
  
      POAOrgCorrected: new FormControl(""),
  
      POAOrgYrOfInco: new FormControl(""),
  
      POAOrgIDType: new FormControl(""),
  
      POAOrgIdNumber: new FormControl(""),
  
      POAOrgRegAddr: new FormControl(""),
  
      POAOrgFIrstname: new FormControl(""),
  
      POAOrgMiddlename: new FormControl(""),
  
      POAOrgLastname: new FormControl(""),
  
      MGradio: new FormControl(""),
  
      MGFIrstname: new FormControl(""),
  
      MGMiddlename: new FormControl(""),
  
      MGLastname: new FormControl(""),
  
      MGAge: new FormControl(""),
  
      MGRelationship: new FormControl(""),
      POAAge: new FormControl(""),
      POASex: new FormControl(""),
      POAHouseNo: new FormControl(""),
      POAstreet: new FormControl(""),
      POAState: new FormControl(""),
      POADistrict: new FormControl(""),
      POAtaluka: new FormControl(""),
      POAhobli: new FormControl(""),
      POACity: new FormControl(""),
      POAPincode: new FormControl(""),
      POARelationship: new FormControl(""),
      POARelativeName: new FormControl(""),
      PREFirstInd: new FormControl(""),
      PREFirstOrg: new FormControl(""),
 Orgstreet: new FormControl(""),
    OrgPincode: new FormControl(""),
    OrgRASFirstName: new FormControl(""),
    OrgRASMiddleName: new FormControl(""),
    OrgRASLastName: new FormControl(""),
    OrgRASAliasName: new FormControl(""),
    OrgRASAge: new FormControl(""),
    OrgRASSex: new FormControl(""),
    OrgRASProfession: new FormControl(""),
    OrgRASIdType: new FormControl(""),
    OrgRASPAN: new FormControl(""),
    OrgRASHouseNo: new FormControl(""),
    OrgRASstreet: new FormControl(""),
    OrgRASState: new FormControl(""),
    OrgRASDistrict: new FormControl(""),
    OrgRAStaluka: new FormControl(""),
    OrgRAShobli: new FormControl(""),
    OrgRASCity: new FormControl(""),
    OrgRASPincode: new FormControl(""),
    IIdType:new FormControl(""),
    
    POAOrgHouseNo: new FormControl(""),
    POAOrgstreet: new FormControl(""),
    POAOrgState: new FormControl(""),
    POAOrgDistrict: new FormControl(""),
    POAOrgtaluka: new FormControl(""),
    POAOrghobli: new FormControl(""),
    POAOrgvillage: new FormControl(""),
    POAOrgPincode: new FormControl(""),
    });

  
  this.getpropertydata();
    this.GetRelationship();
    this.POADistrict() ;
    this.IDistrict();
    this.IGetGender();
    this.OrgRASDistrict();
    this.FetchPresenterData();
    this.OrgRASGetGender();
    this.POAGetRelationship();
    this.POAGetGender();
    this.getSalutation();
    this.GetExecutantView();
    this.GetIDProofTypes();
    if(this.GetPresenterData.length>0){
        this.AssigndatatoObject();
    }
    console.log(this.presenterForm)
    console.log(localStorage.getItem('presenterFormData'));
    if (this.submitted) {
    
if(this.GetPresenterData.length==0){
      // if (localStorage.getItem('presenterFormData')) {
      //   this.presenterForm.setValue(JSON.parse(localStorage.getItem('presenterFormData')));
      //   console.log(localStorage.getItem('presenterFormData'));
      //   let previousData = JSON.parse(localStorage.getItem('presenterFormData'));

      //   this.selectedgendervalue = previousData["Sex"];
      //   this.selecteddistvalue = previousData["District"];
      //   this.selectedtalukvalue = previousData["taluka"];
      //   this.selectedhoblivalue = previousData["hobli"];
      //   this.selectedvillagevalue = previousData["City"];
      //   this.POAselectedgendervalue = previousData["POASex"];
      //   this.POAselecteddistvalue = previousData["POADistrict"];
      //   this.POAselectedtalukvalue = previousData["POAtaluka"];
      //   this.POAselectedhoblivalue = previousData["POAhobli"];
      //   this.POAselectedvillagevalue = previousData["POACity"];
      //   this.selectedrelationshipvalue = previousData["Relationship"];
      //   this.POAselectedrelationshipvalue = previousData["POARelationship"];
      //   this.selecteOrgddistvalue = previousData["OrgDistrict"];
      //   this.selectedOrgtalukvalue = previousData["Orgtaluka"];
      //   this.selectedOrghoblivalue = previousData["Orghobli"];
      //   this.selectedOrgvillagevalue = previousData["Orgvillage"];
      //   this.selectedIdistvalue = previousData["IDistrict"];
      //   this.selectedItalukvalue = previousData["Italuka"];
      //   this.selectedIhoblivalue = previousData["Ihobli"];
      //   this.selectedIvillagevalue = previousData["Ivillage"];
      //   var FirstIndiorg = localStorage.getItem("FirstIndi");
      //   var SecondIndiorg = localStorage.getItem("SecondIndi");
      //   var POAVisible = localStorage.getItem("POAVisible");

      //   if (FirstIndiorg == "Indi") {
      //     this.PREFirstInd = true;
      //   }
      //   else if (FirstIndiorg == "Org") {
      //     this.PREFirstOrg = true;
      //     this.VisibleOrganization = true;
      //   }
      //   if (SecondIndiorg == "Indi") {
      //     this.VisiblePOAOrganization = false;
      //     this.VisiblePOAIndividual = true;
      //   }
      //   else if (SecondIndiorg == "Org") {
      //     this.VisiblePOAOrganization = true;
      //     this.VisiblePOAIndividual = false;

      //   }
      //   if (POAVisible == "POA") {
      //     this.VisiblePOA = true;
      //   }

      // }
      localStorage.getItem("FirstOrg");

    }
  }
    this.loggedinUser = localStorage.getItem('loggedinuser');

    this.srocode = localStorage.getItem('SROCode');

    console.log("Your sro code : " + this.srocode);




  }



  MinorGuardianChange() {
    this.MinorGuardianradioStatus = !this.MinorGuardianradioStatus;
    this.VisibleMinorGuardian = !this.VisibleMinorGuardian;
  }

  POAChange() {
 
    this.POAradioStatus = !this.POAradioStatus;
    this.VisiblePOA = !this.VisiblePOA;
    // this.POAIndividualChange();

  }

  ExemptedChange() {
    this.VisibleExempted = !this.VisibleExempted;
  }

  IndividualChange() {
console.log("here");

//     this.presenterForm.clearValidators();
// this.presenterForm.get('IFirstName').valueChanges.subscribe(()=>{
//   console.log("there");
//   console.log(this.presenterForm.get('IFirstName').value);
//   if(this.presenterForm.get('IFirstName').value ==''){
//     console.log("came here");
//     this.presenterForm.controls['IFirstName'].setValidators([Validators.required]);
//   }else{
//     this.presenterForm.controls['IFirstName'].clearValidators();
//   }
//   this.presenterForm.controls['IFirstName'].updateValueAndValidity();
// })

    this.VisibleOrganization = false;
    if (this.VisibleOrganization = false) {
      localStorage.setItem("FirstOrg", this.VisibleOrganization)
      // localStorage.setItem("PREFirstIndi","Indi");
    }
    this.VisibleIndividual = true;

    if (this.VisibleIndividual != true) {
      localStorage.setItem("FirstIndividual", this.VisibleIndividual)
    }
    this.checkFirstOrg = "Indi";
    if (this.VisibleIndividual === true) {
      this.PresenterIndividual = 'INDIVIDUAL';
      localStorage.setItem("FirstIndividual", "Indi")
    }
  }

  OrganizationChange() {

    // this.presenterForm.clearValidators();
    // this.presenterForm.get('OrgHouseNo').valueChanges.subscribe(()=>{
    //   if(this.presenterForm.get('OrgHouseNo').value==""){
    //     this.presenterForm.controls['OrgHouseNo'].setValidators([Validators.required]);
    //   }else{
    //     this.presenterForm.controls['OrgHouseNo'].clearValidators();
    //   }
    // this.presenterForm.controls['OrgHouseNo'].updateValueAndValidity();
    // });
   
    this.OrgDistrict();
    this.OrgGetGender();
    this.OrgRASDistrict();
    this.OrgRASGetGender();
    this.VisibleOrganization = true;
    console.log(this.VisibleOrganization);
    this.VisibleIndividual = false;
    this.checkFirstOrg = "Org";
  }

  POAIndividualChange() {
;
    this.VisiblePOAOrganization = false;
    this.VisiblePOAIndividual = true;
    // this.IfOrganization= true; 
    this.check = "Indi";

  }
  ClaimantChange() {
   
    this.isClaimant=true;
    this.isExecutant=false;
      }
      ExicutentChange() {
       
        this.isExecutant=true;
        this.isClaimant=false;
          }
  POAOrganizationChange() {
debugger
this.POAOrgDistrict() ;
    this.VisiblePOAOrganization = true;
    this.VisiblePOAIndividual = false;
    //  this.IfOrganization= false;
    this.check = "Org";
  }

  GetGender() {
    this.kaveriService.getGender().subscribe(
      (data: any) => {
        console.log(data);
        if (data.length != 0) {
          this.genderList = data;


        }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
  }
  onGenderchange(genderValue) {

    this.selectedgendervalue = genderValue;
    localStorage.setItem("Gendervalue", this.selectedgendervalue);
  }
  GetRelationship() {
    this.kaveriService.getRelationship().subscribe(
      (data: any) => {
        console.log(data);
        if (data.length != 0) {
          this.relationshipList = data;
        }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
  }
 // Individual<<<<
 IGetGender() {
  this.kaveriService.getGender().subscribe(
    (data: any) => {
      console.log(data);
      if (data.length != 0) {
        this.IgenderList = data;
      }
    }, e => {
      if (e.error) {
        this.errorMessage = e.error.error_description;
      }
    }
  )
}
IonGenderchange(genderValue) {

  this.Iselectedgendervalue = genderValue;
  localStorage.setItem("Gendervalue", this.Iselectedgendervalue);
}
  IDistrict() {
    this.kaveriService.district().subscribe(
      (data: any) => {
        console.log(data);
        if (data.length != 0) {
          this.IdistrictList = data;
          // this.OrgdistrictList = data;
          // this.IdistrictList = data;
          if (this.presenterForm.get("IDistrict").value != 0) {
            this.ITaluka();
          }
        }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
  }
  IondistrictChange($event) {

    if ($event != "") {
      let text1 = $event.target.options[$event.target.options.selectedIndex].text;
      this.IdisTrict = text1;
    }
  }
  IondistrictValuechange(distValue) {
   
    this.Iselecteddistvalue = distValue;
    if (this.presenterForm.get("IDistrict").value != 0) {
      this.ITaluka();
    }
  }

  ITaluka() {

    var taluk = {
      "districtCode": this.Iselecteddistvalue,
    };
    console.log(JSON.stringify(taluk))
    if (taluk != undefined) {
      this.kaveriService.taluka(taluk).subscribe(
        (data: any) => {
          console.log(data);
          if (data.length != 0) {
            this.Iselectedtalukvalue = this.presenterForm.get("Italuka").value;
            this.ItalukaList = data;
            if (this.presenterForm.get("Italuka").value != 0) {
              this.IHobli();
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

  IontalukaChange($event) {

    if ($event != "") {
      let text2 = $event.target.options[$event.target.options.selectedIndex].text;
      this.ItalUka = text2;
    }
  }
  
  IontalukValuechange(talukValue) {

    this.Iselectedtalukvalue = talukValue;
    if (this.presenterForm.get("Italuka").value != 0) {
      this.IHobli();
    }
  }

  IHobli() {
    var hoblireq = {
      "talukaCode": this.Iselectedtalukvalue,
    };
    if (hoblireq != undefined) {
      this.kaveriService.hobli(hoblireq).subscribe(
        (data: any) => {
          console.log(data);
          if (data.length != 0) {
            this.IhobliList = data;
            this.Iselectedhoblivalue = this.presenterForm.get("Ihobli").value;
            if(this.presenterForm.get("Ihobli").value != 0) {
            this.IVillage();
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
  IonhobliChange($event) {
    if ($event != "") {
      let text3 = $event.target.options[$event.target.options.selectedIndex].text;
      console.log("========hobli code ", this.IhobliList);
      this.Itown = text3;
      this.IhobliList.forEach(element => {
        if (element.hoblinamee == this.Itown) {
          localStorage.setItem("bhoomihoblicode", element.bhoomihoblicode);
          localStorage.setItem("hobliname", element.hoblinamee);
        }

      });
    }
  }

  IonhobliValuechange(hobliValue) {
    this.Iselectedhoblivalue = hobliValue;
    if (this.presenterForm.get("Ihobli").value != 0) {
      this.IVillage();
    }
  }
  IVillage() {
    var index = {
      "hobliCode": this.Iselectedhoblivalue,
    };
    if (index != undefined) {
      this.kaveriService.village(index).subscribe(
        (data: any) => {
          console.log(data);
          if (data.length != 0) {
            this.IvillageList = data;
          }
        }, e => {
          if (e.error) {
            this.errorMessage = e.error.error_description;
          }
        }
      )
    }
  }
  // Individual<<<<
// Organization>>>>

OrgGetGender() {
  this.kaveriService.getGender().subscribe(
    (data: any) => {
      console.log(data);
      if (data.length != 0) {
        this.OrggenderList = data;
      }
    }, e => {
      if (e.error) {
        this.errorMessage = e.error.error_description;
      }
    }
  )
}
OrgonGenderchange(genderValue) {

  this.Orgselectedgendervalue = genderValue;
  localStorage.setItem("Gendervalue", this.Orgselectedgendervalue);
}
OrgDistrict() {
    this.kaveriService.district().subscribe(
      (data: any) => {
        console.log(data);
        if (data.length != 0) {
          this.OrgdistrictList = data;
          // this.OrgdistrictList = data;
          // this.IdistrictList = data;
          if (this.presenterForm.get("OrgDistrict").value != 0) {
            this.OrgTaluka();
          }
        }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
  }
  OrgondistrictChange($event) {
;
    if ($event != "") {
      let text1 = $event.target.options[$event.target.options.selectedIndex].text;
      this.OrgdisTrict = text1;
    }
  }
  OrgondistrictValuechange(distValue) {
  
    this.Orgselecteddistvalue = distValue;
    if (this.presenterForm.get("OrgDistrict").value != 0) {
      this.OrgTaluka();
    }
  }

  OrgTaluka() {
    var taluk = {
      "districtCode": this.Orgselecteddistvalue,
    };
    console.log(JSON.stringify(taluk))
    if (taluk != undefined) {
      this.kaveriService.taluka(taluk).subscribe(
        (data: any) => {
          console.log(data);
          if (data.length != 0) {
            this.Orgselectedtalukvalue = this.presenterForm.get("Orgtaluka").value;
            this.OrgtalukaList = data;
            if (this.presenterForm.get("Orgtaluka").value != 0) {
              this.OrgHobli();
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

  OrgontalukaChange($event) {

    if ($event != "") {
      let text2 = $event.target.options[$event.target.options.selectedIndex].text;
      this.OrgtalUka = text2;
    }
  }
  
  OrgontalukValuechange(talukValue) {

    this.Orgselectedtalukvalue = talukValue;
    if (this.presenterForm.get("Orgtaluka").value != 0) {
      this.OrgHobli();
    }
  }

  OrgHobli() {
    var hoblireq = {
      "talukaCode": this.Orgselectedtalukvalue,
    };
    if (hoblireq != undefined) {
      this.kaveriService.hobli(hoblireq).subscribe(
        (data: any) => {
          console.log(data);
          if (data.length != 0) {
            this.OrghobliList = data;
            this.Orgselectedhoblivalue = this.presenterForm.get("Orghobli").value;
            if(this.presenterForm.get("Orghobli").value != 0) {
            this.OrgVillage();
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
  OrgonhobliChange($event) {
    if ($event != "") {
      let text3 = $event.target.options[$event.target.options.selectedIndex].text;
      console.log("========hobli code ", this.OrghobliList);
      this.Orgtown = text3;
      this.OrghobliList.forEach(element => {
        if (element.hoblinamee == this.Orgtown) {
          localStorage.setItem("bhoomihoblicode", element.bhoomihoblicode);
          localStorage.setItem("hobliname", element.hoblinamee);
        }

      });
    }
  }

  OrgonhobliValuechange(hobliValue) {
    this.Orgselectedhoblivalue = hobliValue;
    if (this.presenterForm.get("Orghobli").value != 0) {
      this.OrgVillage();
    }
  }
  OrgVillage() {
    var index = {
      "hobliCode": this.Orgselectedhoblivalue,
    };
    if (index != undefined) {
      this.kaveriService.village(index).subscribe(
        (data: any) => {
          console.log(data);
          if (data.length != 0) {
            this.OrgvillageList = data;
          }
        }, e => {
          if (e.error) {
            this.errorMessage = e.error.error_description;
          }
        }
      )
    }
  }
  // Organization<<<<
   // RASOrganization>>>>

OrgRASGetGender() {
  this.kaveriService.getGender().subscribe(
    (data: any) => {
      console.log(data);
      if (data.length != 0) {
        this.OrgRASgenderList = data;
      }
    }, e => {
      if (e.error) {
        this.errorMessage = e.error.error_description;
      }
    }
  )
}
OrgRASonGenderchange(genderValue) {

  this.OrgRASselectedgendervalue = genderValue;
  localStorage.setItem("Gendervalue", this.OrgRASselectedgendervalue);
}
OrgRASDistrict() {
  this.kaveriService.district().subscribe(
    (data: any) => {
      console.log(data);
      if (data.length != 0) {
        this.OrgRASdistrictList = data;
        // this.OrgdistrictList = data;
        // this.IdistrictList = data;
        if (this.presenterForm.get("OrgRASDistrict").value != 0) {
          this.OrgRASTaluka();
        }
      }
    }, e => {
      if (e.error) {
        this.errorMessage = e.error.error_description;
      }
    }
  )
}
OrgRASondistrictChange($event) {
;
  if ($event != "") {
    let text1 = $event.target.options[$event.target.options.selectedIndex].text;
    this.OrgRASdisTrict = text1;
    this.OrgRASondistrictValuechange($event.target.value);
  }
}
OrgRASondistrictValuechange(distValue) {


  this.OrgRASselecteddistvalue = distValue;
  console.log(this.presenterForm.get("OrgRASDistrict").value);
  if (this.presenterForm.get("OrgRASDistrict").value != 0) {
    this.OrgRASTaluka();
  }
}

  OrgRASTaluka() {
    
    var taluk = {
      "districtCode": this.OrgRASselecteddistvalue,
    };
    console.log(JSON.stringify(taluk))
    if (taluk != undefined) {
      this.kaveriService.taluka(taluk).subscribe(
        (data: any) => {
          console.log(data);
          if (data.length != 0) {
            this.OrgRASselectedtalukvalue = this.presenterForm.get("OrgRAStaluka").value;
            this.OrgRAStalukaList = data;
            if (this.presenterForm.get("OrgRAStaluka").value != 0) {
              this.OrgRASHobli();
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

  OrgRASontalukaChange($event) {


    if ($event != "") {
      let text2 = $event.target.options[$event.target.options.selectedIndex].text;
      this.OrgRAStalUka = text2;
    }
  }
  
  OrgRASontalukValuechange(talukValue) {

    this.OrgRASselectedtalukvalue = talukValue;
    if (this.presenterForm.get("OrgRAStaluka").value != 0) {
      this.OrgRASHobli();
    }
  }

  OrgRASHobli() {
    var hoblireq = {
      "talukaCode": this.OrgRASselectedtalukvalue,
    };
    if (hoblireq != undefined) {
      this.kaveriService.hobli(hoblireq).subscribe(
        (data: any) => {
          console.log(data);
          if (data.length != 0) {
            this.OrgRAShobliList = data;
            this.OrgRASselectedhoblivalue = this.presenterForm.get("OrgRAShobli").value;
            if(this.presenterForm.get("OrgRAShobli").value != 0) {
            this.OrgRASVillage();
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
  OrgRASonhobliChange($event) {
    if ($event != "") {
      let text3 = $event.target.options[$event.target.options.selectedIndex].text;
    
      this.OrgRAStown = text3;
      this.OrgRAShobliList.forEach(element => {
        if (element.hoblinamee == this.OrgRAStown) {
          localStorage.setItem("bhoomihoblicode", element.bhoomihoblicode);
          localStorage.setItem("hobliname", element.hoblinamee);
        }

      });
    }
  }

  OrgRASonhobliValuechange(hobliValue) {
    this.OrgRASselectedhoblivalue = hobliValue;
    if (this.presenterForm.get("OrgRAShobli").value != 0) {
      this.OrgVillage();
    }
  }
  OrgRASVillage() {
    var index = {
      "hobliCode": this.OrgRASselectedhoblivalue,
    };
    if (index != undefined) {
      this.kaveriService.village(index).subscribe(
        (data: any) => {
          console.log(data);
          if (data.length != 0) {
            this.OrgRASvillageList = data;
          }
        }, e => {
          if (e.error) {
            this.errorMessage = e.error.error_description;
          }
        }
      )
    }
  }
  // OrgRASORganization<<<<
  get f(): { [key: string]: AbstractControl }  {
    return this.presenterForm.controls;
  }
  get ISex()  {
    return this.presenterForm.get('ISex');
  }
  POADistrict() {

    this.kaveriService.district().subscribe(
      (data: any) => {
        console.log(data);
        if (data.length != 0) {
          this.POAdistrictList = data;
          if (this.presenterForm.get("POADistrict").value != 0) {
            this.POATaluka();
          }
        }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
  }

  
  POAondistrictChange($event) {
    
    if ($event != "") {
      let text1 = $event.target.options[$event.target.options.selectedIndex].text;
      this.POAdisTrict = text1;
    }
  }
  POAondistrictValuechange(distValue) {
    
    this.POAselecteddistvalue = distValue;
    if (this.presenterForm.get("POADistrict").value != 0) {
      this.POATaluka();
    }
  }
  POATaluka() {
  
    var taluk = {
      "districtCode": this.POAselecteddistvalue,
    };
    console.log(JSON.stringify(taluk))
    if (taluk != undefined) {
      this.kaveriService.taluka(taluk).subscribe(
        (data: any) => {
          console.log(data);
          if (data.length != 0) {
            this.POAselectedtalukvalue = this.presenterForm.get("POAtaluka").value;
            this.POAtalukaList = data;
            if (this.presenterForm.get("POAtaluka").value != 0) {
              this.POAHobli();
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
  POAontalukaChange($event) {

    if ($event != "") {
      let text2 = $event.target.options[$event.target.options.selectedIndex].text;
      this.POAtalUka = text2;
    }
  }
  POAontalukValuechange(talukValue) {

    this.POAselectedtalukvalue = talukValue;
    if (this.presenterForm.get("POAtaluka").value != 0) {
      this.POAHobli();
    }
  }
  POAHobli() {
    var hoblireq = {
      "talukaCode": this.POAselectedtalukvalue,
    };
    if (hoblireq != undefined) {
      this.kaveriService.hobli(hoblireq).subscribe(
        (data: any) => {
          console.log(data);
          if (data.length != 0) {
            this.POAhobliList = data;
            this.POAselectedhoblivalue = this.presenterForm.get("POAhobli").value;
            if(this.presenterForm.get("POAhobli").value != 0) {
            this.POAVillage();
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
  POAonhobliChange($event) {
    if ($event != "") {
      let text3 = $event.target.options[$event.target.options.selectedIndex].text;
      console.log("========hobli code ", this.POAhobliList);
      this.Itown = text3;
      this.POAhobliList.forEach(element => {
        if (element.hoblinamee == this.Itown) {
     
          localStorage.setItem("bhoomihoblicode", element.bhoomihoblicode);
          localStorage.setItem("hobliname", element.hoblinamee);
        }

      });
    }
  }
  POAonhobliValuechange(hobliValue) {
 
    this.POAselectedhoblivalue = hobliValue;
    if (this.presenterForm.get("POAhobli").value != 0) {
      this.POAVillage();
    }
  }
  POAVillage() {
    var index = {
      "hobliCode": this.POAselectedhoblivalue,
    };
    if (index != undefined) {
      this.kaveriService.village(index).subscribe(
        (data: any) => {
          console.log(data);
          if (data.length != 0) {
            this.POAvillageList = data;
          }
        }, e => {
          if (e.error) {
            this.errorMessage = e.error.error_description;
          }
        }
      )
    }
  }
   //POAIndividual <<<<<<
    //POAIndividual >>>>>
    POAGetGender() {
      this.kaveriService.getGender().subscribe(
        (data: any) => {
          console.log(data);
          if (data.length != 0) {
            this.POAgenderList = data;
  
  
          }
        }, e => {
          if (e.error) {
            this.errorMessage = e.error.error_description;
          }
        }
      )
    }
    POAonGenderchange(genderValue) {
  
      this.selectedgendervalue = genderValue;
      localStorage.setItem("Gendervalue", this.selectedgendervalue);
    }
    POAGetRelationship() {
      this.kaveriService.getRelationship().subscribe(
        (data: any) => {
          console.log(data);
          if (data.length != 0) {
            this.POArelationshipList = data;
          }
        }, e => {
          if (e.error) {
            this.errorMessage = e.error.error_description;
          }
        }
      )
    }
  POAOrgDistrict() {

    this.kaveriService.district().subscribe(
      (data: any) => {
        console.log(data);
        if (data.length != 0) {
          this.POAdistrictList = data;
          if (this.presenterForm.get("POAOrdDistrict").value != 0) {
            this.POAOrgTaluka();
          }
        }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
  }
  POAOrgondistrictChange($event) {
    
    if ($event != "") {
      let text1 = $event.target.options[$event.target.options.selectedIndex].text;
      this.POAOrgdisTrict = text1;
    }
  }
  POAOrgondistrictValuechange(distValue) {
    
    this.POAselecteddistvalue = distValue;
    if (this.presenterForm.get("POAOrgDistrict").value != 0) {
      this.POAOrgTaluka();
    }
  }
  POAOrgTaluka() {
  
    var taluk = {
      "districtCode": this.POAOrgselecteddistvalue,
    };
    console.log(JSON.stringify(taluk))
    if (taluk != undefined) {
      this.kaveriService.taluka(taluk).subscribe(
        (data: any) => {
          console.log(data);
          if (data.length != 0) {
            this.POAOrgselectedtalukvalue = this.presenterForm.get("POAOrgtaluka").value;
            this.POAOrgtalukaList = data;
            if (this.presenterForm.get("POAOrgtaluka").value != 0) {
              this.POAHobli();
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
  POAOrgontalukaChange($event) {

    if ($event != "") {
      let text2 = $event.target.options[$event.target.options.selectedIndex].text;
      this.POAOrgtalUka = text2;
    }
  }
  POAOrgontalukValuechange(talukValue) {

    this.POAselectedtalukvalue = talukValue;
    if (this.presenterForm.get("POAtaluka").value != 0) {
      this.POAHobli();
    }
  }
  POAOrgHobli() {
    var hoblireq = {
      "talukaCode": this.POAOrgselectedtalukvalue,
    };
    if (hoblireq != undefined) {
      this.kaveriService.hobli(hoblireq).subscribe(
        (data: any) => {
          console.log(data);
          if (data.length != 0) {
            this.POAhobliList = data;
            this.POAselectedhoblivalue = this.presenterForm.get("POAOrghobli").value;
            if(this.presenterForm.get("POAOrghobli").value != 0) {
            this.POAOrgVillage();
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
  POAOrgonhobliChange($event) {
    if ($event != "") {
      let text3 = $event.target.options[$event.target.options.selectedIndex].text;
      console.log("========hobli code ", this.POAOrghobliList);
      this.POAOrgtown = text3;
      this.POAOrghobliList.forEach(element => {
        if (element.hoblinamee == this.POAOrgtown) {
     
          localStorage.setItem("bhoomihoblicode", element.bhoomihoblicode);
          localStorage.setItem("hobliname", element.hoblinamee);
        }

      });
    }
  }
  POAOrgonhobliValuechange(hobliValue) {
 
    this.POAselectedhoblivalue = hobliValue;
    if (this.presenterForm.get("POAOrghobli").value != 0) {
      this.POAOrgVillage();
    }
  }
  POAOrgVillage() {
    var index = {
      "hobliCode": this.POAOrgselectedhoblivalue,
    };
    if (index != undefined) {
      this.kaveriService.village(index).subscribe(
        (data: any) => {
          console.log(data);
          if (data.length != 0) {
            this.POAOrgvillageList = data;
          }
        }, e => {
          if (e.error) {
            this.errorMessage = e.error.error_description;
          }
        }
      )
    }
  }
   //POAIndividual <<<<<<
 


  onOrgdistrictChange($event) {
   
    if ($event != "") {
      let text1 = $event.target.options[$event.target.options.selectedIndex].text;
      this.IdisTrict = text1;
    }
  }

  onIdistrictChange($event) {
   
    if ($event != "") {
      let text1 = $event.target.options[$event.target.options.selectedIndex].text;
      this.IdisTrict = text1;
    }
  }

  ondistrictValuechange(distValue) {
   
    this.Iselecteddistvalue = distValue;
    if (this.presenterForm.get("District").value != 0) {
      this.Taluka();
    }
  }
 
  onOrgdistrictValuechange(distValue) {

    this.selecteOrgddistvalue = distValue;
    if (this.presenterForm.get("OrgDistrict").value != 0) {
      this.OrgTaluka();
    }
  }

  onIdistrictValuechange(distValue) {

    this.selectedIdistvalue = distValue;
    if (this.presenterForm.get("IDistrict").value != 0) {
      this.ITaluka();
    }
  }

  Taluka() {
  
    var taluk = {
      "districtCode": this.Iselecteddistvalue,
    };
    console.log(JSON.stringify(taluk))
    if (taluk != undefined) {
      this.kaveriService.taluka(taluk).subscribe(
        (data: any) => {
          console.log(data);
          if (data.length != 0) {
            this.ItalukaList = data;
            this.Iselectedtalukvalue = this.presenterForm.get("Italuka").value;
            
            if (this.presenterForm.get("Italuka").value != 0) {
              this.IHobli();
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

 

 



  onOrgtalukaChange($event) {

    if ($event != "") {
      let text2 = $event.target.options[$event.target.options.selectedIndex].text;
      this.ItalUka = text2;
    }
  }
  onItalukaChange($event) {

    if ($event != "") {
      let text2 = $event.target.options[$event.target.options.selectedIndex].text;
      this.ItalUka = text2;
    }
  }
  
  onOrgtalukValuechange(talukValue) {

    this.selectedOrgtalukvalue = talukValue;
    if (this.presenterForm.get("Orgtaluka").value != 0) {
      this.OrgHobli();
    }
  }

  onItalukValuechange(talukValue) {

    this.Iselectedtalukvalue = talukValue;
    if (this.presenterForm.get("Italuka").value != 0) {
      this.IHobli();
    }
  }

  
  onOrghobliChange($event) {

    if ($event != "") {
      let text3 = $event.target.options[$event.target.options.selectedIndex].text;
      console.log("========hobli code ", this.OrghobliList);
      this.Itown = text3;
      this.OrghobliList.forEach(element => {
        if (element.hoblinamee == this.Itown) {
        
          localStorage.setItem("bhoomihoblicode", element.bhoomihoblicode);
          localStorage.setItem("hobliname", element.hoblinamee);
        }

      });
    }
  }

  

  onOrghobliValuechange(hobliValue) {
   
    this.selectedOrghoblivalue = hobliValue;
    if (this.presenterForm.get("Orghobli").value != 0) {
      this.OrgVillage();
    }
  }
  Village() {
    var index = {
      "hobliCode": this.Iselectedhoblivalue,
    };
    if (index != undefined) {
      this.kaveriService.village(index).subscribe(
        (data: any) => {
          console.log(data);
          if (data.length != 0) {
            this.villageList = data;
            this.Iselectedvillagevalue = this.presenterForm.get("City").value;
          }
        }, e => {
          if (e.error) {
            this.errorMessage = e.error.error_description;
          }
        }
      )
    }
  }
 

 

  getpropertydata(){
    this.kaveriService.GetPropertyMasterData(localStorage.getItem('ApplicationData')).subscribe(
      (data: any) => {
        console.log((data))
        if(data){
          this.propertydata = data;
          this.srocode=this.propertydata[0].srocode;
        }

      }
    )
  }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.presenterForm.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            invalid.push(name);
        }
    }
    return console.log(invalid);
}
 
  onSubmit() {
    this.firstnameInd = false;
    this.ageInd = false;
    this.genderInd = false;
    this.inhousenoInd = false;
    this.streetAddressInd = false;
    this.state =  false;
    this.district =  false;
    this.taluka = false;
    this.hobli = false;
    this.city = false;
    this.pincode = false;
    this.salutaion = false;
    if(this.VisibleIndividual){
      if(this.presenterForm.get('salInd').value==""){
        console.log("blank");
        this.salutaion = true; 
      }
      if(this.presenterForm.get('IFirstName').value==""){
        console.log("blank");
        this.firstnameInd = true; 
      }
      if(this.presenterForm.get('IAge').value==""){
        this.ageInd = true;
      }
      if(this.presenterForm.get('ISex').value==""){
        this.genderInd = true;
      }
      if(this.presenterForm.get('IHouseNo').value==""){
        this.inhousenoInd = true;
      }
      if(this.presenterForm.get('Istreet').value==""){
        this.streetAddressInd = true;
      }
      if(this.presenterForm.get('IState').value==""){
          this.state = true;
      }
      if(this.presenterForm.get('IDistrict').value==""){
          this.district = true;
      }
      if(this.presenterForm.get('Italuka').value==""){
        this.taluka = true;
      }
      if(this.presenterForm.get('Ihobli').value==""){
        this.hobli = true;
      }
      if(this.presenterForm.get('ICity').value==""){
        this.city = true;
      }
      if(this.presenterForm.get('IPincode').value==""){
        this.pincode = true;
      }
    }
    this.organisationName = false;
    this.HousenoOrg = false;
    this.Orgdistrict = false;
    this.TalukaOrg = false;
    this.pincodeOrg = false;
    this.HouseOrg = false;
    this.DistrictOrg = false;
    this.HobliOrg = false;
    this.CityOrg = false;
    this.PincodeOrg = false;
    this.firstNameOrg = false;
    this.AgeOrg = false;
    this.GenderOrg = false;
    this.HouseRAOrg =  false;
    this.OrgRASstreet = false;
    this.stateRAOrg = false;
    this.DistrictRaOrg = false;
    this.TalukaRaOrg = false;
    this.HobliRaOrg = false;
    this.RAOrgcity = false;
    this.RAORGPIncode = false;
    if(this.VisibleOrganization){
      if(this.presenterForm.get('Orgname').value==""){
        this.organisationName = true;
      }
      // if(this.presenterForm.get('OrgHouseNo').value==""){
      //   this.HousenoOrg = true;
      // }
      // if(this.presenterForm.get('OrgDistrict').value==""){
      //   this.Orgdistrict = true;
      // }
      // if(this.presenterForm.get('Orgtaluka').value==""){
      //   this.TalukaOrg = true;
      // }
      if(this.presenterForm.get('IPincode').value==""){
        this.pincodeOrg = true;
      }
      if(this.presenterForm.get('OrgHouseNo').value==""){
        this.HouseOrg = true;
      }
      if(this.presenterForm.get('OrgDistrict').value==""){
        this.DistrictOrg = true;
      }
      if(this.presenterForm.get('Orgtaluka').value==""){
        this.TalukaOrg = true;
      }
      if(this.presenterForm.get('Orghobli').value==""){
        this.HobliOrg = true;
      }
      if(this.presenterForm.get('Orgvillage').value==""){
        this.CityOrg = true;
      }
      if(this.presenterForm.get('OrgPincode').value==""){
        this.PincodeOrg = true;
      }
      if(this.presenterForm.get('OrgRASFirstName').value==""){
        this.firstNameOrg = true;
      }
      if(this.presenterForm.get('OrgRASAge').value==""){
        this.AgeOrg = true;
      }
      if(this.presenterForm.get('OrgRASSex').value==""){
        this.GenderOrg = true;
      }
      if(this.presenterForm.get('OrgRASHouseNo').value==""){
        this.HouseRAOrg = true;
      }
      if(this.presenterForm.get('OrgRASstreet').value==""){
        this.OrgRASstreet = true;
      }
      if(this.presenterForm.get('OrgRASState').value==""){
        this.stateRAOrg = true;
      }
      if(this.presenterForm.get('OrgRASDistrict').value==""){
        this.DistrictRaOrg = true;
      }
      if(this.presenterForm.get('OrgRAStaluka').value==""){
        this.TalukaRaOrg = true;
      }
      if(this.presenterForm.get('OrgRAShobli').value==""){
        this.HobliRaOrg = true;
      }
      if(this.presenterForm.get('OrgRASCity').value==""){
        this.RAOrgcity = true;
      }
      if(this.presenterForm.get('OrgRASPincode').value==""){
        this.RAORGPIncode = true;
      }
      
    }
    this.PoaRelationship = false;
    this.PoaRelativeName = false;
    this.PoaAge = false;
    this.PoaSex = false;
    this.PoaHouseNo = false;
    this.Poastreet = false;
    this.PoaState = false;
    this.PoaDistrict = false;
    this.Poataluka = false;
    this.Poahobli= false;
    this.PoaCity = false;
    this.PoaPincode = false;
    if(this.POAradioStatus && this.VisiblePOAIndividual){
      if(this.presenterForm.get('POARelationship').value==""){
        this.PoaRelationship = true;
      }
      if(this.presenterForm.get('POARelativeName').value==""){
        this.PoaRelativeName = true;
      }
      if(this.presenterForm.get('POAAge').value==""){
        this.PoaAge = true;
      }
      if(this.presenterForm.get('POASex').value==""){
        this.PoaSex = true;
      }
      if(this.presenterForm.get('POAHouseNo').value==""){
        this.PoaHouseNo = true;
      }
      if(this.presenterForm.get('POAstreet').value==""){
        this.Poastreet = true;
      }
      if(this.presenterForm.get('POAState').value==""){
        this.PoaState = true;
      }
      if(this.presenterForm.get('POADistrict').value==""){
        this.PoaDistrict = true;
      }
      if(this.presenterForm.get('POAtaluka').value==""){
        this.Poataluka = true;
      }
      if(this.presenterForm.get('POAhobli').value==""){
        this.Poahobli = true;
      }
      if(this.presenterForm.get('POACity').value==""){
        this.PoaCity = true;
      }
      if(this.presenterForm.get('POAPincode').value==""){
        this.PoaPincode = true;
      }
    }

    this.PoaOrgname = false;
    this.PoaOrgHouseNo = false;
    this.PoaOrgstreet = false;
    this.PoaOrgState = false;
    this.PoaOrgDistrict = false;
    this.PoaOrgtaluka = false;
    this.PoaOrghobli = false;
    this.PoaOrgvillage = false;
    this.PoaOrgPincode = false;
    this.PoaOrgFIrstname = false;
    this.PoaOrgLastname = false;

    if(this.POAradioStatus && this.VisiblePOAOrganization){
      if(this.presenterForm.get('POAOrgname').value==""){
        this.PoaOrgname = true;
      }
      if(this.presenterForm.get('POAOrgHouseNo').value==""){
        this.PoaOrgHouseNo = true;
      }
      if(this.presenterForm.get('POAOrgstreet').value==""){
        this.PoaOrgHouseNo = true;
      }
      if(this.presenterForm.get('POAOrgstreet').value==""){
        this.PoaOrgstreet = true;
      }
      if(this.presenterForm.get('POAOrgState').value==""){
        this.PoaOrgState = true;
      }
      if(this.presenterForm.get('POAOrgDistrict').value==""){
        this.PoaOrgDistrict = true;
      }
      if(this.presenterForm.get('POAOrgtaluka').value==""){
        this.PoaOrgtaluka = true;
      }
      if(this.presenterForm.get('POAOrghobli').value==""){
        this.PoaOrghobli = true;
      }
      if(this.presenterForm.get('POAOrgvillage').value==""){
        this.PoaOrgvillage = true;
      }
      if(this.presenterForm.get('POAOrgPincode').value==""){
        this.PoaOrgPincode = true;
      }
      if(this.presenterForm.get('POAOrgFIrstname').value==""){
        this.PoaOrgFIrstname = true;
      }
      if(this.presenterForm.get('POAOrgLastname').value==""){
        this.PoaOrgLastname = true;
      }
    }

    this.findInvalidControls();
    console.log(this.presenterForm);

    this.submitted = true;

    // if (this.presenterForm.invalid) {
    //   return;
    // }

    if (this.checkFirstOrg === "Indi") {
      localStorage.setItem("FirstIndi", "Indi");
    }
    else if (this.checkFirstOrg === "Org") {
      localStorage.setItem("FirstIndi", "Org");
    }
    if (this.check === "Indi") {
      localStorage.setItem("SecondIndi", "Indi");
    }
    else if (this.check === "Org") {
      localStorage.setItem("SecondIndi", "Org");
    }
    if (this.POAradioStatus) {
      localStorage.setItem("POAVisible", "POA");
    }
    if (this.submitted ) {
      localStorage.setItem("presenterFormData", JSON.stringify(this.presenterForm.value));
      // this.presenterForm.setValue(JSON.parse(localStorage.getItem('presenterFormData')));

    }
    // this.submitted = true;
    var IsExiOrClaimantval = this.presenterForm.get('Executant').value;
    if (this.isClaimant == true) {
      this.isClaimant = true;
      this.isExecutant = false;
      console.log(this.isClaimant);
      console.log(this.isExecutant);
    }
    else if (this.isExecutant == true) {
      this.isClaimant = false;
      this.isExecutant = true;
      console.log(this.isClaimant);
      console.log(this.isExecutant);
    }
    else {
      alert('Please choose Who is Presenter.')
      return false;
    }
    // New>>>>>>>>>>>
  
    var partytypeid=0;
    if(this.isExecutant){
      partytypeid=2;
    }
    else if(this.isClaimant){
      partytypeid=1;
    }

    const request = [];
   
    if(this.checkFirstOrg === "Indi"){
      var DistrictId= null;
      if(this.presenterForm.get('IDistrict').value!=="")
      {
        DistrictId=this.presenterForm.get('IDistrict').value;
      }
      var TalukId= null;
      if(this.presenterForm.get('Italuka').value!=="")
      {
        TalukId=this.presenterForm.get('Italuka').value;
      }
      var HobliId= null;
      if(this.presenterForm.get('Ihobli').value!=="")
      {
        HobliId=this.presenterForm.get('Ihobli').value;
      }
      var VillageId= null;
      if(this.presenterForm.get('ICity').value!=="")
      {
        VillageId=this.presenterForm.get('ICity').value;
      }
      var PreIndPartyid=null
      if(this.PreIndPartyid!="")
      {
        PreIndPartyid=this.PreIndPartyid;
      }
     
      var firstIndiReq = {
        "partyid": PreIndPartyid,
        "srocode": this.srocode,
        "documentid": 2,
        "partytypeid": partytypeid,
        "firstname": this.presenterForm.get('IFirstName').value,
        "middlename": this.presenterForm.get('IMiddleName').value,
        "lastname": this.presenterForm.get('ILastName').value,
        "address": this.presenterForm.get('Istreet').value,
        "age": this.presenterForm.get('IAge').value,
        "sex": this.presenterForm.get('ISex').value,
        "isexecutor": this.isExecutant,
        "ispresenter": true,
        "admissiondate": "2021-11-19T11:28:40.553Z",
        "aliasname": this.presenterForm.get('IAliasName').value,
        "correctedname": "",
        "relationship": this.presenterForm.get('IRelationship').value,
        "relativename": this.presenterForm.get('IRelativeName').value,
        "epic": "epic",
        "pan": this.presenterForm.get('IPAN').value,
        "phonenumber": "9876533444",
        "availableextacre": null,
        "availableextgunta": null,
        "availableextfgunta": null,
        "bincom": "er",
        "category": "dd",
        "dateofdeath": "2021-11-19T11:28:40.553Z",
        "fingerid": 10,
        "fingerverificationstatusid": 10,
        "ispartofrtc": true,
        "landcode": 10,
        "mainownerno": 10,
        "ownerno": 10,
        "partypoa": "party",
        "photopath": "path",
        "poaadmission": 10,
        "poapresentation": 10,
        "primaryseller": true,
        "profession": this.presenterForm.get('IProfession').value,
        "restriction": "R",
        "restrictiondescription": "Res des",
        "restrictiontype": "Re",
        "section88exemption": true,
        "thumbmatchfailedreasonid": 10,
        "thumbminutiae": null,
        "thumbpath": "thum",
        "totalextacre": null,
        "totalextgunta": null,
        "totalextfgunta": null,
        "transactextacre": null,
        "transactextgunta": null,
        "transactextfgunta": null,
        "volumename": "volume",
        "hasgpa": true,
        "isaua": true,
        "importedpartyparentid": 10,
        "salutationid": this.presenterForm.get("salInd").value,
        "isorganization": false,
        "organizationid": 1,
        "applicationnumber": localStorage.getItem('ApplicationData'),
        "verified": true,
        "issroapproved": "E",
        "districtcode": DistrictId,
        "talukcode": TalukId,
        "hoblicode": HobliId,
        "villagecode":VillageId,
        "housenumber":this.presenterForm.get('IHouseNo').value, 
        "pin":this.presenterForm.get('IPincode').value,
        "tanno": "tt",
        "yearofincorp": 1780,
        "orgpoaauthsignfname": null,
        "orgpoaauthsignmname":null,
        "orgpoaauthsignlname": null,
        "linkpartyid":null,
        "propertyid":null,
        "idprooftypeid":this.presenterForm.get('IIDproof').value,
    
      }
      request.push(firstIndiReq);
      localStorage.setItem("presenterFirstIndiStored", JSON.stringify(request));
      console.log('req', firstIndiReq);
      console.log('req', request);
    }
    else if(this.checkFirstOrg === "Org"){
     
      var DistrictId= null;
    if(this.presenterForm.get('OrgDistrict').value!=="")
    {
      DistrictId=this.presenterForm.get('OrgDistrict').value;
    }
    var TalukId= null;
    if(this.presenterForm.get('Orgtaluka').value!=="")
    {
      TalukId=this.presenterForm.get('Orgtaluka').value;
    }
    var HobliId= null;
    if(this.presenterForm.get('Orghobli').value!=="")
    {
      HobliId=this.presenterForm.get('Orghobli').value;
    }
    var VillageId= null;
    if(this.presenterForm.get('Orgvillage').value!=="")
    {
      VillageId=this.presenterForm.get('Orgvillage').value;
    }
      
      const firstOrgReq =
      {
        "partyid": null,
        "srocode":  this.srocode,
        "documentid": 1,
        "partytypeid": partytypeid,
        "firstname": this.presenterForm.get('Orgname').value,
        "middlename": null,
        "lastname": null,
        "address": this.presenterForm.get('Orgstreet').value,
        "age": null,
        "sex": 2,
        "isexecutor": this.isExecutant,
        "ispresenter": true,
        "admissiondate": "2021-11-19T11:28:40.553Z",
        "aliasname": null,
        "correctedname": "",
        "relationship": null,
        "relativename": null,
        "epic": "epic",
        "pan": this.presenterForm.get('OrgRASPAN').value,
        "phonenumber": "9876533444",
        "availableextacre": 10,
        "availableextgunta": 10,
        "availableextfgunta": 10,
        "bincom": "er",
        "category": "dd",
        "dateofdeath": "2021-11-19T11:28:40.553Z",
        "fingerid": 10,
        "fingerverificationstatusid": 10,
        "ispartofrtc": true,
        "landcode": 10,
        "mainownerno": 10,
        "ownerno": 10,
        "partypoa": "party",
        "photopath": "path",
        "poaadmission": 10,
        "poapresentation": 10,
        "primaryseller": true,
        "profession": null,
        "restriction": "R",
        "restrictiondescription": "Res des",
        "restrictiontype": "Re",
        "section88exemption": true,
        "thumbmatchfailedreasonid": 10,
        "thumbminutiae": null,
        "thumbpath": "thum",
        "totalextacre": 10,
        "totalextgunta": 10,
        "totalextfgunta": 10,
        "transactextacre": 10,
        "transactextgunta": 10,
        "transactextfgunta": 10,
        "volumename": "volume",
        "hasgpa": true,
        "isaua": true,
        "importedpartyparentid": 10,
        "salutationid": 1,
        "isorganization": true,
        "organizationid": 1,
        "applicationnumber": localStorage.getItem('ApplicationData'),
        "verified": true,
        "issroapproved": "E",
        "districtcode": DistrictId,
        "talukcode": TalukId,
        "hoblicode": HobliId,
        "villagecode":VillageId,
        "housenumber":this.presenterForm.get('OrgHouseNo').value, 
        "pin":this.presenterForm.get('OrgPincode').value,
        "tanno": this.presenterForm.get('OrgTAN').value,
        "yearofincorp": this.presenterForm.get('OrgYrOfInco').value,
        "orgpoaauthsignfname": "",
        "orgpoaauthsignmname": "",
        "orgpoaauthsignlname":"",
        "linkpartyid":null,
        "propertyid": this.presenterForm.get('Orgproof').value,
      }
      request.push(firstOrgReq);
      localStorage.setItem("presenterFirstIndiStored", JSON.stringify(request));
      console.log('req', firstIndiReq);
      console.log('req', request);

      var DistrictId= null;
      if(this.presenterForm.get('OrgRASDistrict').value!=="")
      {
        DistrictId=this.presenterForm.get('OrgRASDistrict').value;
      }
      var TalukId= null;
      if(this.presenterForm.get('OrgRAStaluka').value!=="")
      {
        TalukId=this.presenterForm.get('OrgRAStaluka').value;
      }
      var HobliId= null;
      if(this.presenterForm.get('OrgRAShobli').value!=="")
      {
        HobliId=this.presenterForm.get('OrgRAShobli').value;
      }
      var VillageId= null;
      if(this.presenterForm.get('OrgRASCity').value!=="")
      {
        VillageId=this.presenterForm.get('OrgRASCity').value;
      }
      
      const firstOrgsecReq =
      {
        "partyid": null,
        "srocode":  this.srocode,
        "documentid": 2,
        "partytypeid": 9,
        "firstname": this.presenterForm.get('OrgRASFirstName').value,
        "middlename": this.presenterForm.get('OrgRASMiddleName').value,
        "lastname": this.presenterForm.get('OrgRASLastName').value,
        "address": this.presenterForm.get('OrgRASstreet').value,
        "age": this.presenterForm.get('OrgRASAge').value,
        "sex": this.presenterForm.get('OrgRASSex').value,
        "isexecutor": this.isExecutant,
        "ispresenter": true,
        "admissiondate": "2021-11-19T11:28:40.553Z",
        "aliasname": this.presenterForm.get('OrgRASAliasName').value,
        "correctedname": "",
        "relationship": null,
        "relativename":null,
        "epic": "epic",
        "pan": this.presenterForm.get('OrgRASPAN').value,
        "phonenumber": "9876533444",
        "availableextacre": 10,
        "availableextgunta": 10,
        "availableextfgunta": 10,
        "bincom": "er",
        "category": "dd",
        "dateofdeath": "2021-11-19T11:28:40.553Z",
        "fingerid": 10,
        "fingerverificationstatusid": 10,
        "ispartofrtc": true,
        "landcode": 10,
        "mainownerno": 10,
        "ownerno": 10,
        "partypoa": "party",
        "photopath": "path",
        "poaadmission": 10,
        "poapresentation": 10,
        "primaryseller": true,
        "profession": this.presenterForm.get('OrgRASProfession').value,
        "restriction": "R",
        "restrictiondescription": "Res des",
        "restrictiontype": "Re",
        "section88exemption": true,
        "thumbmatchfailedreasonid": 10,
        "thumbminutiae": null,
        "thumbpath": "thum",
        "totalextacre": 10,
        "totalextgunta": 10,
        "totalextfgunta": 10,
        "transactextacre": 10,
        "transactextgunta": 10,
        "transactextfgunta": 10,
        "volumename": "volume",
        "hasgpa": true,
        "isaua": true,
        "importedpartyparentid": 10,
        "salutationid": 1,
        "isorganization": false,
        "organizationid": 1,
        "applicationnumber": localStorage.getItem('ApplicationData'),
        "verified": true,
        "issroapproved": "E",
         "districtcode": DistrictId,
        "talukcode": TalukId,
        "hoblicode": HobliId,
        "villagecode":VillageId,
        "housenumber":this.presenterForm.get('OrgRASHouseNo').value, 
        "pin":this.presenterForm.get('OrgRASPincode').value,
        "tanno": "tt",
        "yearofincorp": 1780,
        "orgpoaauthsignfname": null,
        "orgpoaauthsignmname": null,
        "orgpoaauthsignlname":null,
        "linkpartyid":null,
        "propertyid": this.presenterForm.get('Orgproof').value,
      }

      localStorage.setItem("presenterIndiStored", JSON.stringify(firstIndiReq));
      request.push(firstOrgsecReq);
    }
    if(this.check === "Indi")
    {
     
      var DistrictId= null;
      if(this.presenterForm.get('POADistrict').value!=="")
      {
        DistrictId=this.presenterForm.get('POADistrict').value;
      }
      var TalukId= null;
      if(this.presenterForm.get('POAtaluka').value!=="")
      {
        TalukId=this.presenterForm.get('POAtaluka').value;
      }
      var HobliId= null;
      if(this.presenterForm.get('POAhobli').value!=="")
      {
        HobliId=this.presenterForm.get('POAhobli').value;
      }
      var VillageId= null;
      if(this.presenterForm.get('POACity').value!=="")
      {
        VillageId=this.presenterForm.get('POACity').value;
      }
      var PrePOAIndPartyid=null;
      if(this.PrePOAIndPartyid!=""){
        PrePOAIndPartyid=this.PrePOAIndPartyid;
      }
      console.log(this.presenterForm.get('POAFIrstname').value);
      var firstn=this.presenterForm.get('POAFIrstname').value;
      var poaIndiReq = {
        "partyid": PrePOAIndPartyid,
        "srocode":  this.srocode,
        "documentid": 2,
        "partytypeid": 5,

        "firstname": firstn,
        "middlename": this.presenterForm.get('POAMiddlename').value,
        "lastname": this.presenterForm.get('POALastname').value,
        "address": this.presenterForm.get('POAstreet').value,
        "age": this.presenterForm.get('POAAge').value,
        "sex": this.presenterForm.get('POASex').value,
        "isexecutor": this.isExecutant,
        "ispresenter": true,
        "admissiondate": "2021-11-19T11:28:40.553Z",
        "aliasname": null,
        "correctedname": "",
        "relationship": this.presenterForm.get('POARelationship').value,
        "relativename": this.presenterForm.get('POARelativeName').value,
        "epic": "epic",
        "pan": null,
        "phonenumber": "9876533444",
        "availableextacre": 10,
        "availableextgunta": 10,
        "availableextfgunta": 10,
        "bincom": "er",
        "category": "dd",
        "dateofdeath": "2021-11-19T11:28:40.553Z",
        "fingerid": 10,
        "fingerverificationstatusid": 10,
        "ispartofrtc": true,
        "landcode": 10,
        "mainownerno": 10,
        "ownerno": 10,
        "partypoa": "party",
        "photopath": "path",
        "poaadmission": 10,
        "poapresentation": 10,
        "primaryseller": true,
        "profession": null,
        "restriction": "R",
        "restrictiondescription": "Res des",
        "restrictiontype": "Re",
        "section88exemption": true,
        "thumbmatchfailedreasonid": 10,
        "thumbminutiae": null,
        "thumbpath": "thum",
        "totalextacre": 10,
        "totalextgunta": 10,
        "totalextfgunta": 10,
        "transactextacre": 10,
        "transactextgunta": 10,
        "transactextfgunta": 10,
        "volumename": "volume",
        "hasgpa": true,
        "isaua": true,
        "importedpartyparentid": 10,
        "salutationid": 1,
        "isorganization": false,
        "organizationid": 1,
        "applicationnumber": localStorage.getItem('ApplicationData'),
        "verified": true,
        "issroapproved": "E",
        "districtcode": DistrictId,
        "talukcode": TalukId,
        "hoblicode": HobliId,
        "villagecode":VillageId,
        "housenumber":this.presenterForm.get('POAHouseNo').value, 
        "pin":this.presenterForm.get('POAPincode').value,
        "tanno": "tt",
        "yearofincorp": 1780,
        "orgpoaauthsignfname": "fnam1",
        "orgpoaauthsignmname": "mname1",
        "orgpoaauthsignlname": "lname1",
        "linkpartyid":null,
        "propertyid":null,
      };
      console.log(poaIndiReq);
      request.push(poaIndiReq);
    }
    else if(this.check === "Org")
    {
    
      var DistrictId= null;
      if(this.presenterForm.get('OrgDistrict').value!=="")
      {
        DistrictId=this.presenterForm.get('OrgDistrict').value;
      }
      var TalukId= null;
      if(this.presenterForm.get('Orgtaluka').value!=="")
      {
        TalukId=this.presenterForm.get('Orgtaluka').value;
      }
      var HobliId= null;
      if(this.presenterForm.get('Orghobli').value!=="")
      {
        HobliId=this.presenterForm.get('Orghobli').value;
      }
      var VillageId= null;
      if(this.presenterForm.get('Orgvillage').value!=="")
      {
        VillageId=this.presenterForm.get('Orgvillage').value;
      }
      var PrePOAOrgPartyid=null;
      if(this.PrePOAOrgPartyid!=""){
        PrePOAOrgPartyid=this.PrePOAOrgPartyid;
      }
      var poaOrgReqSecond = {
        "partyid": PrePOAOrgPartyid,
        "srocode":  this.srocode,
        "documentid": 2,
        "partytypeid": 5,
        "firstname": this.presenterForm.get('POAOrgname').value,
        "middlename": null,
        "lastname": null,
        "address": this.presenterForm.get('POAstreet').value,
        "age": this.presenterForm.get('POAAge').value,
        "sex": 2,
        "isexecutor": this.isExecutant,
        "ispresenter": true,
        "admissiondate": "2021-11-19T11:28:40.553Z",
        "aliasname": this.presenterForm.get('AliasName').value,
        "correctedname": "",
        "relationship": this.presenterForm.get('Relationship').value,
        "relativename": this.presenterForm.get('RelativeName').value,
        "epic": "epic",
        "pan": this.presenterForm.get('PAN').value,
        "phonenumber": "9876533444",
        "availableextacre": 10,
        "availableextgunta": 10,
        "availableextfgunta": 10,
        "bincom": "er",
        "category": "dd",
        "dateofdeath": "2021-11-19T11:28:40.553Z",
        "fingerid": 10,
        "fingerverificationstatusid": 10,
        "ispartofrtc": true,
        "landcode": 10,
        "mainownerno": 10,
        "ownerno": 10,
        "partypoa": "party",
        "photopath": "path",
        "poaadmission": 10,
        "poapresentation": 10,
        "primaryseller": true,
        "profession": null,
        "restriction": "R",
        "restrictiondescription": "Res des",
        "restrictiontype": "Re",
        "section88exemption": true,
        "thumbmatchfailedreasonid": 10,
        "thumbminutiae": null,
        "thumbpath": "thum",
        "totalextacre": 10,
        "totalextgunta": 10,
        "totalextfgunta": 10,
        "transactextacre": 10,
        "transactextgunta": 10,
        "transactextfgunta": 10,
        "volumename": "volume",
        "hasgpa": true,
        "isaua": true,
        "importedpartyparentid": 10,
        "salutationid": 1,
        "isorganization": true,
        "organizationid": 1,
        "applicationnumber": localStorage.getItem('ApplicationData'),
        "verified": true,
        "issroapproved": "E",
        "districtcode": DistrictId,
        "talukcode": TalukId,
        "hoblicode": HobliId,
        "villagecode":VillageId,
        "housenumber":this.presenterForm.get('OrgHouseNo').value, 
        "pin":this.presenterForm.get('Pincode').value,
        "tanno": "tt",
        "yearofincorp": 1780,
        "orgpoaauthsignfname": this.presenterForm.get('POAOrgFIrstname').value,
        "orgpoaauthsignmname": this.presenterForm.get('POAOrgMiddlename').value,
        "orgpoaauthsignlname": this.presenterForm.get('POAOrgLastname').value,
        "linkpartyid":null,
      };
      request.push(poaOrgReqSecond);
    }
    this.savePartyInfo(request);
    //New<<<<<<<<<<<

  
  }

  savePartyInfo(request) {
   
    localStorage.setItem("presenterStored", JSON.stringify(request));
    this.kaveriService.SavePartyInfoData(request).subscribe(
      (data: any) => {
        console.log(data);
        if (data[0].responseCode == "1000") {
          this.message = data[0].responseMesg;
          this.showToast();
           this.router.navigate(['/party-details-executant']);
        }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.errordescription;
        }
      });
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

  FetchPresenterData() {
  debugger
    var appNo = {
      "applicationnumber": localStorage.getItem('ApplicationData'),
      //"applicationnumber": "PRP-15122021-01693",
    };
    if(appNo!=null){
    this.kaveriService.getPresenterDetails(appNo).subscribe(
      (data: any) => {
        console.log(data);
        if (data.length != 0) {
          this.GetPresenterData = data;
          this.AssigndatatoObject();
        }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
    }
  }
  AssigndatatoObject(){
    
    console.log(JSON.stringify(this.GetPresenterData));
    for(let i=0;i< this.GetPresenterData.length;i++){
      if(this.GetPresenterData[i].partytypeid==1||this.GetPresenterData[i].partytypeid==2){
        if(this.GetPresenterData[i].isorganization){
          this.VisibleOrganization = true;
          this.VisibleIndividual = false;
        this.PreOrgPartyid=this.GetPresenterData[i].partyid;
        this.presenterForm.controls['Orgname'].setValue(this.GetPresenterData[i].firstname);
        this.presenterForm.controls['OrgYrOfInco'].setValue(this.GetPresenterData[i].yearofincorp);
        this.presenterForm.controls['OrgTAN'].setValue(this.GetPresenterData[i].tanno);
        this.presenterForm.controls['OrgHouseNo'].setValue(this.GetPresenterData[i].housenumber);
        this.presenterForm.controls['Orgstreet'].setValue(this.GetPresenterData[i].address);
        this.presenterForm.controls['OrgPincode'].setValue(this.GetPresenterData[i].pin);
        this.Orgselecteddistvalue =this.GetPresenterData[i].districtcode;
        this.Orgselectedtalukvalue =    this.GetPresenterData[i].talukcode;
        this.Orgselectedhoblivalue =  this.GetPresenterData[i].hoblicode;
        this.Orgselectedvillagevalue =  this.GetPresenterData[i].villagecode;
        this.presenterForm.controls['OrgState'].setValue(1);
        this.checkFirstOrg ="Org"
        
        this.PREFirstOrg = true;
       }
       else{
        
        this.PreIndPartyid=this.GetPresenterData[i].partyid;
        //this.Executant=Claimant
        
        this.presenterForm.controls['salInd'].setValue(this.GetPresenterData[i].salutationid);
        this.presenterForm.controls['IIDproof'].setValue(this.GetPresenterData[i].idprooftypeid);
        this.presenterForm.controls['IFirstName'].setValue(this.GetPresenterData[i].firstname);
        this.presenterForm.controls['IMiddleName'].setValue(this.GetPresenterData[i].middlename);
        this.presenterForm.controls['ILastName'].setValue(this.GetPresenterData[i].lastname);
        this.presenterForm.controls['IAliasName'].setValue(this.GetPresenterData[i].aliasname);
        this.presenterForm.controls['IAge'].setValue(this.GetPresenterData[i].age);
        this.presenterForm.controls['ISex'].setValue(this.GetPresenterData[i].sex);
        this.presenterForm.controls['IProfession'].setValue(this.GetPresenterData[i].profession);    
        this.presenterForm.controls['IPAN'].setValue(this.GetPresenterData[i].pan);  
        this.presenterForm.controls['Istreet'].setValue(this.GetPresenterData[i].address);
        this.presenterForm.controls['IState'].setValue(1);
        this.presenterForm.controls['IHouseNo'].setValue(this.GetPresenterData[i].housenumber);
        this.presenterForm.controls['IPincode'].setValue(this.GetPresenterData[i].pin);
        this.Iselectedgendervalue = this.GetPresenterData[i].sex;
        this.Iselecteddistvalue =this.GetPresenterData[i].districtcode;
        // this.Taluka();
        this.Iselectedtalukvalue =    this.GetPresenterData[i].talukcode;
        //  this.Hobli();
      
        this.Iselectedhoblivalue =  this.GetPresenterData[i].hoblicode;
        // this.Village();
        this.Iselectedvillagevalue =  this.GetPresenterData[i].villagecode;
        this.IsPREFirstInd = true;
        this.checkFirstOrg = "Indi"
        }
        if(this.GetPresenterData[i].isexecutor)
        {
          this.isExecutant=true
        }
        else{
         this.isClaimant=true;
        }
      }
      if(this.GetPresenterData[i].partytypeid==9){
        this.PreOrgAuthPartyid=this.GetPresenterData[i].partyid
        this.presenterForm.controls['OrgRASFirstName'].setValue(this.GetPresenterData[i].firstname);
        this.presenterForm.controls['OrgRASMiddleName'].setValue(this.GetPresenterData[i].middlename);
        this.presenterForm.controls['OrgRASLastName'].setValue(this.GetPresenterData[i].lastname);
        this.presenterForm.controls['OrgRASAliasName'].setValue(this.GetPresenterData[i].aliasname);
        this.presenterForm.controls['OrgRASAge'].setValue(this.GetPresenterData[i].age);
        this.presenterForm.controls['OrgRASProfession'].setValue(this.GetPresenterData[i].profession);    
        this.presenterForm.controls['OrgRASPAN'].setValue(this.GetPresenterData[i].pan);
        this.presenterForm.controls['OrgRASHouseNo'].setValue(this.GetPresenterData[i].housenumber);
        this.presenterForm.controls['OrgRASPincode'].setValue(this.GetPresenterData[i].pin);
        // this.presenterForm.controls['HouseNo'].setValue("");
        this.presenterForm.controls['OrgRASstreet'].setValue(this.GetPresenterData[i].address);    
        // this.presenterForm.controls['street'].setValue(this.GetPresenterData[i].address);
        this.presenterForm.controls['OrgRASState'].setValue(1);
        this.presenterForm.controls['OrgRASSex'].setValue(this.GetPresenterData[i].sex);
        this.OrgRASselectedgendervalue = this.GetPresenterData[i].sex;
        this.OrgRASselecteddistvalue =this.GetPresenterData[i].districtcode;
        this.OrgRASselectedtalukvalue =    this.GetPresenterData[i].talukcode;
        this.OrgRASselectedhoblivalue =  this.GetPresenterData[i].hoblicode;
        this.OrgRASselectedvillagevalue =  this.GetPresenterData[i].villagecode;
        this.OrgRASselectedgendervalue = this.GetPresenterData[i].sex;

      }
      if(this.GetPresenterData[i].partytypeid==5){

        this.POAradioStatus=true;
        this.VisiblePOA = true;
        if(this.GetPresenterData[i].isorganization){
          this.PrePOAOrgPartyid=this.GetPresenterData[i].Partyid
          this.presenterForm.controls['POAOrgname'].setValue(this.GetPresenterData[i].firstname);
          this.presenterForm.controls['POAOrgYrOfInco'].setValue(this.GetPresenterData[i].yearofincorp);
          this.presenterForm.controls['POAOrgTAN'].setValue(this.GetPresenterData[i].tanno);
          
          this.presenterForm.controls['POAAge'].setValue(this.GetPresenterData[i].age);
          this.presenterForm.controls['POAState'].setValue(1);    
          this.presenterForm.controls['POAstreet'].setValue(this.GetPresenterData[i].address);
          this.presenterForm.controls['OrgHouseNo'].setValue(this.GetPresenterData[i].housenumber);
          this.presenterForm.controls['Pincode'].setValue(this.GetPresenterData[i].pin);
          this.POAselectedgendervalue = this.GetPresenterData[i].sex;
          this.selecteOrgddistvalue =this.GetPresenterData[i].districtcode;
          this.selectedOrgtalukvalue =    this.GetPresenterData[i].talukcode;
          this.selectedOrghoblivalue =  this.GetPresenterData[i].hoblicode;
          this.selectedOrgvillagevalue =  this.GetPresenterData[i].villagecode;
          this.POAselectedgendervalue = this.GetPresenterData[i].sex;
          this.presenterForm.controls['POAOrgFIrstname'].setValue(this.GetPresenterData[i].relativename);
          this.presenterForm.controls['POAMiddlename'].setValue(this.GetPresenterData[i].middlename);
          this.presenterForm.controls['POAOrgMiddlename'].setValue(this.GetPresenterData[i].lastname);
          this.presenterForm.controls['POAOrgLastname'].setValue(this.GetPresenterData[i].lastname);
          this.VisiblePOAOrganization = true;
          this.VisiblePOAIndividual = false;
        }
        else
        {
        this.PrePOAIndPartyid=this.GetPresenterData[i].partyid;
        this.presenterForm.controls['POAFIrstname'].setValue(this.GetPresenterData[i].firstname);
        this.presenterForm.controls['POAMiddlename'].setValue(this.GetPresenterData[i].middlename);
        this.presenterForm.controls['POALastname'].setValue(this.GetPresenterData[i].lastname);
        this.presenterForm.controls['POAAge'].setValue(this.GetPresenterData[i].age);
        this.presenterForm.controls['POAHouseNo'].setValue(this.GetPresenterData[i].housenumber);
        this.presenterForm.controls['POAState'].setValue(1);    
        this.presenterForm.controls['POAstreet'].setValue(this.GetPresenterData[i].address);
        this.presenterForm.controls['State'].setValue(1);
        this.POAselectedgendervalue = this.GetPresenterData[i].sex;
        this.POAselecteddistvalue =this.GetPresenterData[i].districtcode;
        this.POAselectedtalukvalue =    this.GetPresenterData[i].talukcode;
        this.POAselectedhoblivalue =  this.GetPresenterData[i].hoblicode;
        this.POAselectedvillagevalue =  this.GetPresenterData[i].villagecode;
        this.POAselectedgendervalue = this.GetPresenterData[i].sex;
        this.presenterForm.controls['POAPincode'].setValue(this.GetPresenterData[i].pin);
        this.POAselectedrelationshipvalue=this.GetPresenterData[i].relationship;
        this.presenterForm.controls['POARelativeName'].setValue(this.GetPresenterData[i].relativename);
        this.VisiblePOAIndividual = true;
       
        }
      }
    }
  }
}
