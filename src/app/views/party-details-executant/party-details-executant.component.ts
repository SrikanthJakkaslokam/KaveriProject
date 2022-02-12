import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { KaveriService } from '../../services/kaveri.service';
import { Router } from '@angular/router';

import { OrganizationData } from './OrganizationData.Model';
import { partyInfoData } from './PartyInfoData.Model';
import { MatTabChangeEvent } from '@angular/material/tabs';
import notify from "devextreme/ui/notify";
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-party-details-executant',
  templateUrl: './party-details-executant.component.html',
  styleUrls: ['./party-details-executant.component.scss']
})
export class PartyDetailsExecutantComponent implements OnInit {
  public tabIndex = 0;
  selectedIndex = 0;
  taluka: string = "";
  GetExecuterData: any= [];
  PreIndPartyid: string = "";
  PreOrgPartyid: string = "";
  PreOrgAuthPartyid: string = "";
  PrePOAIndPartyid: string = "";
  PrePOAOrgPartyid: string = "";
  singleExecDetails = [];
  multiExecDetails = [];
  selectedItems = [];
  dropdownSettings:IDropdownSettings = {};

  partDetailsObj = {
    IsClaimant: undefined,

  };
  private newExecutant = {
    Claimant: '',

    Executant: '',

    Orgname: '',

    OrgCorrected: '',

    OrgYrOfInco: '',

    OrgTAN: '',

    OrgIDType: '',

    OrgIdNumber: '',

    OrgRegAddr: '',

    FirstName: '',

    MiddleName: '',

    LastName: '',

    AliasName: '',

    Age: '',

    Sex: '',

    Profession: '',

    PAN: '',

    HouseNo: '',

    street: '',

    City: '',

    District: '',

    taluka: '',

    hobli: '',

    State: '',

    Pincode: '',
    POAFIrstname: '',
    POAMiddlename: '',
    POALastname: '',
    Relationship: '',

    RelativeName: '',

    POAradio: '',

    POAIndRadio: '',

    POAOrgRadio: '',

    POAOrgname: '',

    POAOrgCorrected: '',

    POAOrgYrOfInco: '',

    POAOrgTAN: '',

    POAOrgIDType: '',

    POAOrgIdNumber: '',

    POAOrgRegAddr: '',

    OrgHouseNo: '',

    Orgstreet: '',

    OrgCity: '',

    OrgState: '',

    OrgDistrict: '',
    Orgtaluka: '',
    Orghobli: '',
    Orgvillage: '',

    OrgPincode: '',

    POAOrgFIrstname: '',

    POAOrgMiddlename: '',

    POAOrgLastname: '',

    MGradio: '',

    MGFIrstname: '',

    MGMiddlename: '',

    MGLastname: '',

    MGAge: '',

    MGRelationship: '',

    POAOrgHouseNo: '',

    POAOrgstreet: '',

    POAOrgCity: '',

    POAOrgDistrict: '',
    POAOrgtaluka: '',
    POAOrghobli: '',
    POAOrgvillage: '',

    POAOrgState: '',

    POAOrgPincode: '',
    POAAge: '',
    POASex: '',
    POAHouseNo: '',
    POAstreet: '',
    POAState: '',
    POADistrict: '',
    POAtaluka: '',
    POAhobli: '',
    POACity: '',
    POAPincode: '',
    POARelationship: '',
    POARelativeName: '',
    EXEFirstOrg: '',
    EXEFirstInd: '',
    Climent: ''

  } as any;
  // executantForm : FormGroup;
  submitted = false;
  errorMessage: string;

  public links: Array<any> = [
    { name: 'EXECUTANT - 1', ...this.newExecutant }];
  activeLink = this.links[0];

  background: ThemePalette = undefined;
  // selected = new FormControl(0);
  // toggleBackground() {
  //   this.background = this.background ? undefined : 'primary';
  // }
  ExecutantJsonReq: any[];
  VisibleMinorGuardian: boolean = false;
  VisiblePOA: boolean = false;
  VisibleExempted: boolean = false;
  VisibleOrganization: boolean = false;
  VisibleIndividual: boolean = true;

  VisiblePOAOrganization: boolean = false;
  VisiblePOAIndividual: boolean = false;

  MinorGuardianradioStatus: boolean;
  POAradioStatus: boolean;

  genderList: Array<any> = [];
  selectedgendervalue: string = "";

  VisibleBothMinorAndExemption = true;

  checkFirstIndiOrg: string = "";
  checkSecondIndiOrg: string = "";

  disTrict: string = "";
  talUka: string = "";
  town: string = "";
  vilLage: string = "";

  POAdisTrict: string = "";
  POAtalUka: string = "";
  POAtown: string = "";
  POAvilLage: string = "";

  selecteddistvalue: string = "";
  selectedtalukvalue: string = "";
  selectedhoblivalue: string = "";
  selectedvillagevalue: string = "";

  selecteOrgddistvalue: string = "";
  selectedOrgtalukvalue: string = "";
  selectedOrghoblivalue: string = "";
  selectedOrgvillagevalue: string = "";

  selectePOAOrgddistvalue: string = "";
  selectedPOAOrgtalukvalue: string = "";
  selectedPOAOrghoblivalue: string = "";
  selectedPOAOrgvillagevalue: string = "";

  districtList: Array<any> = [];
  talukaList: Array<any> = [];
  hobliList: Array<any> = [];
  villageList: Array<any> = [];

  POAdistrictList: Array<any> = [];
  POAtalukaList: Array<any> = [];
  POAhobliList: Array<any> = [];
  POAvillageList: Array<any> = [];

  OrgdistrictList: Array<any> = [];
  OrgtalukaList: Array<any> = [];
  OrghobliList: Array<any> = [];
  OrgvillageList: Array<any> = [];

  POAOrgdistrictList: Array<any> = [];
  POAOrgtalukaList: Array<any> = [];
  POAOrghobliList: Array<any> = [];
  POAOrgvillageList: Array<any> = [];
  storedExecData: Array<any> = [];

  PresenterOrganizationId: string = "";
  PresenterpartyId: string = "";
  srocode: string = "";

  relationshipList: Array<any> = [];
  selectedrelationshipvalue: string = "";

  isClaimant: boolean = true;
  selectedTabIndex;
  storedexecData: any;
  EXEFirstInd: boolean;
  EXEFirstOrg: boolean;
  IsExecutant: boolean;
  IsEXEFirstInd: boolean;
  IsEXEFirstOrg: boolean;
  Tabdata: Array<any> = [];

  IsPageInitialised: boolean = false;
  ValidData: boolean = true;
  IsNewTabClicked: boolean = false;
  nameOrg: boolean;
  HouseNo: boolean;
  StreetAdd: boolean;
  stateOrg: boolean;
  DistrictOrg: boolean;
  talukaOrg: boolean;
  hobliOrg: boolean;
  villageOrg: boolean;
  pincodeOrg: boolean;
  firstname: boolean;
  age: boolean;
  gender: boolean;
  house: boolean;
  StreetAddres: boolean;
  stateInd: boolean;
  districtInd: boolean;
  talukaInd: boolean;
  hobliInd: boolean;
  cityInd: boolean;
  pincodeInd: boolean;
  relationshipInd: boolean;
  RelativeNameInd: boolean;
  propertyView: any;
  salutations: any;
  idProofType: any;
  salutation: boolean;
  POAsalOrg:boolean;
  dropdownList: { item_id: number; item_text: string; }[];
  dropdownselectitem: any;
  addLink() {
    this.CreateExecObject(true);
    this.IsNewTabClicked = true;
    //debugger
    // this.links.push({
    //   name: `EXECUTANT -  ${this.links.length + 1}`
    // });
    // //this.executantForm.patchValue(null);
    // setTimeout(() => {
    //   this.selectedIndex = Number(this.selectedIndex + 1);
    //   console.log(this.selectedIndex);
    // }, 0);
    //this.executantForm.reset();
  }



  removeTab(index: number) {
    debugger
    var tab = index + 1;
    if (confirm("Are you sure to delete Executent " + tab)) {
      this.deleteExecutant(index);
      this.links.splice(index, 1);
    }
  }

  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    console.log(' I am executing========================================');
    //this.selectedIndex = tabChangeEvent.index;
    this.tabIndex = this.IsNewTabClicked ? this.links.length - 1 : tabChangeEvent.index;
    //this.selectedIndex = this.IsNewTabClicked ? this.links.length : tabChangeEvent.index;
    console.log('tabChangeEvent => ', tabChangeEvent);
    console.log('index => ', tabChangeEvent.index);
    //const currentForm = this.links[tabChangeEvent.index];
    if (this.IsNewTabClicked)
      this.setFormData(JSON.parse(JSON.stringify(this.links[this.links.length - 1])));
    else
      this.setFormData(JSON.parse(JSON.stringify(this.links[tabChangeEvent.index])));
    this.IsNewTabClicked = false;
  }

  loggedinUser: string = "";
  constructor(private fb: FormBuilder, private kaveriService: KaveriService, public router: Router) { }
  message;
  executantForm = this.fb.group({
    Claimant: [""],

    Executant: [""],

    Orgname: [""],

    OrgCorrected: [""],

    OrgYrOfInco: [""],

    OrgTAN: [""],

    OrgIDType: [""],

    OrgIdNumber: [""],

    OrgRegAddr: [""],

    FirstName: [""],
    salInd: [""],

    MiddleName: [""],

    LastName: [""],

    AliasName: [""],

    Age: [""],

    Sex: [""],

    Profession: [""],

    PAN: [""],

    HouseNo: [""],

    street: [""],

    City: [""],

    District: [""],

    taluka: [""],

    hobli: [""],

    State: [""],

    Pincode: [""],
    IIDproof: [""],



    Relationship: [""],

    RelativeName: [""],

    POAradio: [""],

    POAIndRadio: [""],

    POAOrgRadio: [""],

    POAOrgname: [""],

    POAOrgCorrected: [""],

    POAOrgYrOfInco: [""],

    POAOrgTAN: [""],

    POAOrgIDType: [""],

    POAOrgIdNumber: [""],

    POAOrgRegAddr: [""],

    OrgHouseNo: [""],

    Orgstreet: [""],

    OrgCity: [""],

    OrgState: [""],

    OrgDistrict: [""],
    Orgtaluka: [""],
    Orghobli: [""],
    Orgvillage: [""],

    OrgPincode: [""],

    POAOrgFIrstname: [""],

    POAOrgMiddlename: [""],

    POAOrgLastname: [""],

    MGradio: [""],
    MGSal: [""],

    MGFIrstname: [""],

    MGMiddlename: [""],

    MGLastname: [""],

    MGAge: [""],

    MGRelationship: [""],
    POASal: [""],
    POAFIrstname: [""],
    POAMiddlename: [""],
    POALastname: [""],
    POAOrgHouseNo: [""],
    POAOrgSal: [""],

    POAOrgstreet: [""],

    POAOrgCity: [""],

    POAOrgDistrict: [""],
    POAOrgtaluka: [""],
    POAOrghobli: [""],
    POAOrgvillage: [""],

    POAOrgState: [""],

    POAOrgPincode: [""],
    POAAge: [""],
    POASex: [""],
    POAHouseNo: [""],
    POAstreet: [""],
    POAState: [""],
    POADistrict: [""],
    POAtaluka: [""],
    POAhobli: [""],
    POACity: [""],
    POAPincode: [""],
    POARelationship: [""],
    POARelativeName: [""],
    EXEFirstInd: [""],
    EXEFirstOrg: [""],
    FirstPartyId: [""],
    FirstOrgPartyId: [""],
    FirstOrgAuthPartyId: [""],
    POAIndPartyId: [""],
    POAOrgPartyId: [""],
    MinorGuardianId: [""],
    Climent: [""],
    PropertyId: [""]
  });


  propertyexecutent(ev){
    console.log(ev.target.name);
    
   }

   GetExecutantView(){

    let postData ={
      "applicationnumber":localStorage.getItem('ApplicationData')
      // "applicationnumber": 
    }
     this.kaveriService.GetExecutantView(postData).subscribe(res=>{
      this.dropdownList = res;
      console.log(res,">>>>>>>>>>>>>>>>>>>>>>>>>");
     
    

     });
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

   onItemSelect(item: any) {
    console.log(item);
    this.dropdownselectitem = item.currentnumber;
  }
  onSelectAll(items: any) {
    console.log(items);
  }

   
  ngOnInit() {
    this.GetExecutantView();
    this.GetRelationship();
    this.District();
    this.OrgDistrict();
    this.POAOrgDistrict();
    this.GetGender();
    this.POADistrict();
    this.FetchExecuterData();
    this.getSalutation();
    this.GetIDProofTypes();

    // this.dropdownList = [
    //   { item_id: 1, item_text: 'Mumbai' },
    //   { item_id: 2, item_text: 'Bangaluru' },
    //   { item_id: 3, item_text: 'Pune' },
    //   { item_id: 4, item_text: 'Navsari' },
    //   { item_id: 5, item_text: 'New Delhi' }
    // ];

    this.selectedItems = [
      // { item_id: 3, item_text: 'Pune' },
      // { item_id: 4, item_text: 'Navsari' }
    ];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'propertyid',
      textField: 'currentnumber',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    
    
    // if (this.GetExecuterData.length > 0) {
    //   // this.AssigndatatoObject();
    //   this.CreateExecObject();
    // }
    if (this.GetExecuterData.length == 0) {

      this.loggedinUser = localStorage.getItem('loggedinuser');
      this.srocode = localStorage.getItem('SROCode');
    }
    console.log(this.executantForm);
    console.log(this.checkFirstIndiOrg);
    console.log(this.checkSecondIndiOrg);



    this.executantForm.valueChanges.subscribe((value) => {
      console.log(value,">>>>>>");
      
      for (let key in value) {
        this.links[this.tabIndex][key] = JSON.parse(JSON.stringify(value[key]));
      }
      // console.log('value', value, this.links[this.tabIndex]);
    });
  }
  setFormData(currentFormData) {
    console.log('setform', currentFormData);
    const fromData = JSON.parse(JSON.stringify(currentFormData));
    console.log('Loading formdata json');
    console.log(fromData);
    this.executantForm.patchValue({ ...fromData });
    console.log(this.executantForm);
    //this.

  }
  setform(responseForm) {

    console.log('setform', responseForm);
    const fromData = JSON.parse(JSON.stringify(responseForm));
    console.log('Loading formdata json');
    console.log(fromData);
    this.executantForm.patchValue({ ...fromData });
    console.log(this.executantForm);
    //this.

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
          this.errorMessage = e.error.errordescription;
        }
      }
    )
  }

  GetRelationship() {
    // // debugger;
    this.kaveriService.getRelationship().subscribe(
      (data: any) => {
        console.log(data);
        if (data.length != 0) {
          this.relationshipList = data;
        }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.errordescription;
        }
      }
    )
  }

  District() {

    this.kaveriService.district().subscribe(
      (data: any) => {
        console.log(data);
        if (data.length != 0) {
          this.districtList = data;
          // this.OrgdistrictList = data;
          // this.POAOrgdistrictList = data;
          if (this.executantForm.get("District").value != 0) {
            this.selecteddistvalue = this.executantForm.get("District").value;
            this.Taluka();
          }
        }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.errordescription;
        }
      }
    )
  }
  POADistrict() {

    this.kaveriService.district().subscribe(
      (data: any) => {
        console.log(data);
        if (data.length != 0) {
          this.POAdistrictList = data;
          // this.OrgdistrictList = data;
          // this.POAOrgdistrictList = data;
          if (this.executantForm.get("POADistrict").value != 0) {
            this.selecteddistvalue = this.executantForm.get("POADistrict").value;
            this.POATaluka();
          }
        }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.errordescription;
        }
      }
    )
  }
  OrgDistrict() {

    this.kaveriService.district().subscribe(
      (data: any) => {
        console.log(data);
        if (data.length != 0) {

          this.OrgdistrictList = data;

          if (this.executantForm.get("OrgDistrict").value != 0) {
            this.selecteOrgddistvalue = this.executantForm.get("OrgDistrict").value;
            this.OrgTaluka();
          }
        }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.errordescription;
        }
      }
    )
  }
  POAOrgDistrict() {

    this.kaveriService.district().subscribe(
      (data: any) => {
        console.log(data);
        if (data.length != 0) {

          this.POAOrgdistrictList = data;

          if (this.executantForm.get("POAOrgDistrict").value != 0) {
            this.selectePOAOrgddistvalue = this.executantForm.get("POAOrgDistrict").value;
            this.POAOrgTaluka();
          }
        }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.errordescription;
        }
      }
    )
  }
  ondistrictChange($event) {
    debugger
    if ($event != "") {
      let text1 = $event.target.options[$event.target.options.selectedIndex].text;
      this.disTrict = text1;
    }
  }
  onPOAdistrictChange($event) {

    if ($event != "") {
      let text1 = $event.target.options[$event.target.options.selectedIndex].text;
      this.POAdisTrict = text1;
    }
  }

  onOrgdistrictChange($event) {
    // // debugger
    if ($event != "") {
      let text1 = $event.target.options[$event.target.options.selectedIndex].text;
      this.disTrict = text1;
    }
  }

  onPOAOrgdistrictChange($event) {
    // debugger
    if ($event != "") {
      let text1 = $event.target.options[$event.target.options.selectedIndex].text;
      this.disTrict = text1;
    }
  }


  ondistrictValuechange(distValue) {

    this.selecteddistvalue = distValue;
    if (this.executantForm.get("District").value != 0) {
      this.Taluka();
    }
  }

  onOrgdistrictValuechange(distValue) {

    this.selecteOrgddistvalue = distValue;
    if (this.executantForm.get("OrgDistrict").value != 0) {
      this.OrgTaluka();
    }
  }

  onPOAOrgdistrictValuechange(distValue) {
    debugger
    this.selectePOAOrgddistvalue = distValue;
    if (this.executantForm.get("POAOrgDistrict").value != 0) {
      this.POAOrgTaluka();
    }
  }

  Taluka() {

    var taluk = {
      "districtCode": this.selecteddistvalue,
    };
    console.log(JSON.stringify(taluk))
    if (taluk != undefined) {
      this.kaveriService.taluka(taluk).subscribe(
        (data: any) => {
          console.log(data);
          if (data.length != 0) {
            this.talukaList = data;

            this.selectedtalukvalue = this.executantForm.get("taluka").value;
            if (this.executantForm.get("taluka").value != 0) {
              this.Hobli();
            }
          }
        }, e => {
          if (e.error) {
            this.errorMessage = e.error.errordescription;
          }
        }
      )
    }
  }
  POATaluka() {

    var taluk = {
      "districtCode": this.selecteddistvalue,
    };
    console.log(JSON.stringify(taluk))
    if (taluk != undefined) {
      this.kaveriService.taluka(taluk).subscribe(
        (data: any) => {
          console.log(data);
          if (data.length != 0) {
            this.POAtalukaList = data;

            this.selectedtalukvalue = this.executantForm.get("POAtaluka").value;
            if (this.executantForm.get("POAtaluka").value != 0) {
              this.Hobli();
            }
          }
        }, e => {
          if (e.error) {
            this.errorMessage = e.error.errordescription;
          }
        }
      )
    }
  }

  OrgTaluka() {

    var taluk = {
      "districtCode": this.selecteOrgddistvalue,
    };
    console.log(JSON.stringify(taluk))
    if (taluk != undefined) {
      this.kaveriService.taluka(taluk).subscribe(
        (data: any) => {
          console.log(data);
          if (data.length != 0) {
            this.OrgtalukaList = data;
            this.selectedOrgtalukvalue = this.executantForm.get("Orgtaluka").value;

            if (this.executantForm.get("Orgtaluka").value != 0) {
              this.OrgHobli();
            }
          }
        }, e => {
          if (e.error) {
            this.errorMessage = e.error.errordescription;
          }
        }
      )
    }
  }

  POAOrgTaluka() {
    debugger
    var taluk = {
      "districtCode": this.selectePOAOrgddistvalue,
    };
    console.log(JSON.stringify(taluk))
    if (taluk != undefined) {
      this.kaveriService.taluka(taluk).subscribe(
        (data: any) => {
          console.log(data);
          if (data.length != 0) {
            this.POAOrgtalukaList = data;
            this.selectedPOAOrgtalukvalue = this.executantForm.get("POAOrgtaluka").value;

            if (this.executantForm.get("POAOrgtaluka").value != 0) {
              this.POAOrgHobli();
            }
          }
        }, e => {
          if (e.error) {
            this.errorMessage = e.error.errordescription;
          }
        }
      )
    }
  }

  ontalukaChange($event) {
    if ($event != "") {
      let text2 = $event.target.options[$event.target.options.selectedIndex].value;
      this.selectedtalukvalue = text2;
      this.Hobli();
      this.talUka = text2;
    }
  }
  onPOAtalukaChange($event) {

    if ($event != "") {
      let text2 = $event.target.options[$event.target.options.selectedIndex].text;
      this.POAtalUka = text2;
    }
  }

  onOrgtalukaChange($event) {

    if ($event != "") {
      let text2 = $event.target.options[$event.target.options.selectedIndex].text;
      this.talUka = text2;
    }
  }

  onPOAOrgtalukaChange($event) {

    if ($event != "") {
      let text2 = $event.target.options[$event.target.options.selectedIndex].text;
      this.talUka = text2;
    }
  }

  ontalukValuechange(talukValue) {

    this.selectedtalukvalue = talukValue;
    if (this.executantForm.get("taluka").value != 0) {
      this.Hobli();
    }
  }

  onOrgtalukValuechange(talukValue) {
    debugger
    this.selectedOrgtalukvalue = talukValue;
    if (this.executantForm.get("Orgtaluka").value != 0) {
      this.OrgHobli();
    }
  }

  onPOAOrgtalukValuechange(talukValue) {
    // debugger
    this.selectedPOAOrgtalukvalue = talukValue;
    if (this.executantForm.get("POAOrgtaluka").value != 0) {
      this.POAOrgHobli();
    }
  }

  Hobli() {

    var hoblireq = {
      "talukaCode": this.selectedtalukvalue,
    };
    if (hoblireq != undefined) {
      this.kaveriService.hobli(hoblireq).subscribe(
        (data: any) => {
          console.log(data);
          if (data.length != 0) {
            this.hobliList = data;
            this.selectedhoblivalue = this.executantForm.get("hobli").value;
            if (this.executantForm.get("hobli").value != 0) {
              this.Village();
            }
          }
        }, e => {
          if (e.error) {
            this.errorMessage = e.error.errordescription;
          }
        }
      )
    }
  }

  POAHobli() {
    debugger
    var hoblireq = {
      "talukaCode": this.selectedtalukvalue,
    };
    if (hoblireq != undefined) {
      this.kaveriService.hobli(hoblireq).subscribe(
        (data: any) => {
          console.log(data);
          if (data.length != 0) {
            this.POAhobliList = data;
            this.selectedhoblivalue = this.executantForm.get("hobli").value;
            if (this.executantForm.get("hobli").value != 0) {
              this.Village();
            }
          }
        }, e => {
          if (e.error) {
            this.errorMessage = e.error.errordescription;
          }
        }
      )
    }
  }

  OrgHobli() {
    // debugger
    var hoblireq = {
      "talukaCode": this.selectedOrgtalukvalue,
    };
    if (hoblireq != undefined) {
      this.kaveriService.hobli(hoblireq).subscribe(
        (data: any) => {
          console.log(data);
          if (data.length != 0) {
            this.OrghobliList = data;
            this.selectedOrghoblivalue = this.executantForm.get("Orghobli").value;
            if (this.executantForm.get("Orghobli").value != 0) {
              this.OrgVillage();
            }
          }
        }, e => {
          if (e.error) {
            this.errorMessage = e.error.errordescription;
          }
        }
      )
    }
  }

  POAOrgHobli() {
    debugger
    var hoblireq = {
      "talukaCode": this.selectedPOAOrgtalukvalue,
    };
    if (hoblireq != undefined) {
      this.kaveriService.hobli(hoblireq).subscribe(
        (data: any) => {
          console.log(data);
          if (data.length != 0) {
            this.POAOrghobliList = data;
            this.selectedPOAOrghoblivalue = this.executantForm.get("POAOrghobli").value;
            if (this.executantForm.get("hobli").value != 0) {
              this.POAOrgVillage();
            }
          }
        }, e => {
          if (e.error) {
            this.errorMessage = e.error.errordescription;
          }
        }
      )
    }
  }

  // onhobliChange($event) {
  //   if ($event != "") {
  //     let text3 = $event.target.options[$event.target.options.selectedIndex].value;
  //     this.selectedtalukvalue = text3;
  //     this.Village();
  //     this.vilLage = text3;
  //   }
  // }
  onhobliChange($event) {
    debugger
    if ($event != "") {
      let text3 = $event.target.options[$event.target.options.selectedIndex].text;
      console.log("========hobli code ", this.hobliList);
      this.town = text3;
      this.hobliList.forEach(element => {
        if (element.hoblinamee == this.town) {
          // debugger;
          localStorage.setItem("bhoomihoblicode", element.bhoomihoblicode);
          localStorage.setItem("hobliname", element.hoblinamee);
          if (this.executantForm.get("hobli").value != 0) {
            this.selectedhoblivalue = this.executantForm.get("hobli").value;
            this.Village();
          }

        }
      });
    }
  }

  onOrghobliChange($event) {
    // debugger
    if ($event != "") {
      let text3 = $event.target.options[$event.target.options.selectedIndex].text;
      console.log("========hobli code ", this.OrghobliList);
      this.town = text3;
      this.OrghobliList.forEach(element => {
        if (element.hoblinamee == this.town) {
          // debugger;
          localStorage.setItem("bhoomihoblicode", element.bhoomihoblicode);
          localStorage.setItem("hobliname", element.hoblinamee);
          if (this.executantForm.get("Orghobli").value != 0) {
            this.selectedhoblivalue = this.executantForm.get("Orghobli").value;
            this.OrgVillage();
          }
        }


      });
    }
  }

  onPOAOrghobliChange($event) {
    // debugger
    if ($event != "") {
      let text3 = $event.target.options[$event.target.options.selectedIndex].text;
      console.log("========hobli code ", this.POAOrghobliList);
      this.town = text3;
      this.POAOrghobliList.forEach(element => {
        if (element.hoblinamee == this.town) {
          // debugger;
          localStorage.setItem("bhoomihoblicode", element.bhoomihoblicode);
          localStorage.setItem("hobliname", element.hoblinamee);
        }

      });
    }
  }


  onhobliValuechange(hobliValue) {
    // debugger
    this.selectedhoblivalue = hobliValue;
    if (this.executantForm.get("hobli").value != 0) {
      this.Village();
    }
  }

  onOrghobliValuechange(hobliValue) {
    // debugger
    this.selectedOrghoblivalue = hobliValue;
    if (this.executantForm.get("Orghobli").value != 0) {
      this.OrgVillage();
    }
  }

  onPOAOrghobliValuechange(hobliValue) {
    // debugger
    this.selectedPOAOrghoblivalue = hobliValue;
    if (this.executantForm.get("POAOrghobli").value != 0) {
      this.POAOrgVillage();
    }
  }



  Village() {

    var index = {
      "hobliCode": this.selectedhoblivalue,
    };
    if (index != undefined) {
      this.kaveriService.village(index).subscribe(
        (data: any) => {
          console.log(data);
          if (data.length != 0) {
            this.villageList = data;
            this.selectedvillagevalue = this.executantForm.get("City").value;
          }
        }, e => {
          if (e.error) {
            this.errorMessage = e.error.errordescription;
          }
        }
      )
    }
  }


  POAVillage() {
    debugger
    var index = {
      "hobliCode": this.selectedhoblivalue,
    };
    if (index != undefined) {
      this.kaveriService.village(index).subscribe(
        (data: any) => {
          console.log(data);
          if (data.length != 0) {
            this.POAvillageList = data;
            this.selectedvillagevalue = this.executantForm.get("POACity").value;
          }
        }, e => {
          if (e.error) {
            this.errorMessage = e.error.errordescription;
          }
        }
      )
    }
  }
  OrgVillage() {
    var index = {
      "hobliCode": this.selectedOrghoblivalue,
    };
    if (index != undefined) {
      this.kaveriService.village(index).subscribe(
        (data: any) => {
          console.log(data);
          if (data.length != 0) {
            this.OrgvillageList = data;
            this.selectedvillagevalue = this.executantForm.get("Orgvillage").value;
          }
        }, e => {
          if (e.error) {
            this.errorMessage = e.error.errordescription;
          }
        }
      )
    }
  }

  POAOrgVillage() {
    var index = {
      "hobliCode": this.selectedPOAOrghoblivalue,
    };
    if (index != undefined) {
      this.kaveriService.village(index).subscribe(
        (data: any) => {
          console.log(data);
          if (data.length != 0) {
            this.POAOrgvillageList = data;
            this.selectedPOAOrgvillagevalue = this.executantForm.get("POAOrgvillage").value;
          }
        }, e => {
          if (e.error) {
            this.errorMessage = e.error.errordescription;
          }
        }
      )
    }
  }

  MinorGuardianChange(ev) {
    console.log(ev);
    debugger;
    this.MinorGuardianradioStatus = !this.MinorGuardianradioStatus;
    this.VisibleMinorGuardian = !this.VisibleMinorGuardian;
  }

  POAChange() {
    this.POAradioStatus = !this.POAradioStatus;
    this.VisiblePOA = !this.VisiblePOA;
    //this.POAIndividualChange();
  }

  ExemptedChange() {
    this.VisibleExempted = !this.VisibleExempted;
  }

  IndividualChange() {
    debugger
    this.VisibleOrganization = false;
    this.VisibleIndividual = true;
    this.IsEXEFirstOrg = false;
    this.checkFirstIndiOrg = "Ind";

    //  this.POAIndividualChange();
  }

  ClimentChange(e) {
    this.IsExecutant = false;
    this.isClaimant = true;
    console.log();
    
    //this.newExecutant['Climent'] = "Claiment";
    this.executantForm.controls['Executant'].setValue('');
  }

  ExicutentChange() {
    this.isClaimant = false;
    this.IsExecutant = true;
    //this.executantForm.controls['Climent'].setValue('');
    this.newExecutant['Executant'] = "Executant";
  }
  OrganizationChange() {
    debugger
    this.VisibleOrganization = true;
    this.VisibleIndividual = false;
    this.checkFirstIndiOrg = "Org";
    this.IsEXEFirstInd = false;
  }

  POAIndividualChange() {
    this.VisiblePOAOrganization = false;
    this.VisiblePOAIndividual = true;
    this.VisibleBothMinorAndExemption = true;
    this.checkSecondIndiOrg = "Ind";

  }

  POAOrganizationChange() {

    this.VisiblePOAOrganization = true;
    this.VisiblePOAIndividual = false;
    this.VisibleBothMinorAndExemption = false;

    this.checkSecondIndiOrg = "Org";

  }

  onSubmit() {
    this.ValidData = true;
    // this.links[this.tabIndex] = this.executantForm.value;
    // console.log(this.links[this.tabIndex]);
    
    this.nameOrg = false;
    this.HouseNo = false;
    this.StreetAdd = false;
    this.stateOrg = false;
    this.DistrictOrg = false;
    this.talukaOrg = false;
    this.hobliOrg = false;
    this.villageOrg = false;
    this.pincodeOrg = false;
    this.firstname = false;
    this.age = false;
    this.gender = false;
    this.house = false;
    this.StreetAddres = false;
    this.stateInd = false;
    this.districtInd  =false;
    this.talukaInd =false;
    this.hobliInd = false;
    this.cityInd = false;
    this.pincodeInd = false;
    this.relationshipInd =false;
    this.RelativeNameInd = false;
    this.salutation = false;

    if(this.VisibleOrganization){

      if(this.executantForm.get('Orgname').value==""){
        this.nameOrg = true;
        return;
      }
      if(this.executantForm.get('OrgHouseNo').value==""){
        this.HouseNo = true;
        return;
      }
      if(this.executantForm.get('Orgstreet').value==""){
        this.StreetAdd = true;
        return;
      }
      if(this.executantForm.get('OrgState').value==""){
        this.stateOrg = true;
        return;
      }
      if(this.executantForm.get('OrgDistrict').value==""){
        this.DistrictOrg = true;
        return;
      }
      if(this.executantForm.get('Orgtaluka').value==""){
        this.talukaOrg = true;
        return;
      }
      if(this.executantForm.get('Orghobli').value==""){
        this.hobliOrg = true;
        return;
      }
      if(this.executantForm.get('Orgvillage').value==""){
        this.villageOrg = true;
        return;
      }
      if(this.executantForm.get('OrgPincode').value==""){
        this.pincodeOrg = true;
        return;
      }
    }

    if(this.VisibleIndividual){

      if(this.executantForm.get('salInd').value==""){
        this.salutation = true;
        return;
      }
      if(this.executantForm.get('FirstName').value==""){
        this.firstname = true;
        return;
      }
      if(this.executantForm.get('Age').value==""){
        this.age = true;
        return;
      }
      if(this.executantForm.get('Sex').value==""){
        this.gender = true;
        return;
      }
      if(this.executantForm.get('HouseNo').value==""){
        this.house = true;
        return;
      }
      if(this.executantForm.get('street').value==""){
        this.StreetAddres = true;
        return;
      }
      if(this.executantForm.get('State').value==""){
        this.stateInd = true;
        return;
      }
      if(this.executantForm.get('District').value==""){
        this.districtInd = true;
        return;
      }
      
      if(this.executantForm.get('taluka').value==""){
        this.talukaInd = true;
        return;
      }
      if(this.executantForm.get('hobli').value==""){
        this.hobliInd = true;
        return;
      }
      if(this.executantForm.get('City').value==""){
        this.cityInd = true;
        return;
      }
      if(this.executantForm.get('Pincode').value==""){
        this.pincodeInd = true;
        return;
      }
      if(this.executantForm.get('Relationship').value==""){
        this.relationshipInd = true;
        return;
      }
      if(this.executantForm.get('RelativeName').value==""){
        this.RelativeNameInd = true;
        return;
      }
    }




    // if (this.submitted = true) {
    //   console.log('linksdata', this.links);
    //   localStorage.setItem("executantFormData", JSON.stringify(this.links));
    //   // this.presenterForm.setValue(JSON.parse(localStorage.getItem('presenterFormData')));
    // }
    // this.submitted = true;
    // var IsExiOrClaimantval = this.executantForm.get('Executant').value;
    // if (IsExiOrClaimantval == "Claimant") {
    //   this.isClaimant = true;
    //   this.isExecutant = false;
    //   console.log(this.isClaimant);
    //   console.log(this.isExecutant);
    // }
    // else if (IsExiOrClaimantval == "Executant") {
    //   this.isClaimant = false;
    //   this.isExecutant = true;
    //   console.log(this.isClaimant);
    //   console.log(this.isExecutant);
    // }
    // else {
    //   alert('Please choose is Claimant Yes/No.')
    //   return false;
    // }
    console.log(this.ValidData);
    this.validatedata();
debugger 

    if (this.ValidData) {
      console.log('links', this.links);
      const request = [];
      this.links.forEach((item) => {
        console.log(item,"KKKK");
        
        console.log(this.checkFirstIndiOrg);
        console.log(this.checkSecondIndiOrg);

        // New>>>>>>>
        var partytypeid = 0;


        if (item.Climent == "Claimant") {
          partytypeid = 1;
        }
        else if (item.Executant == "Executant") {
          partytypeid = 2;
        }
        if (item.EXEFirstInd == "option3") {
          this.checkFirstIndiOrg = "Ind"
        }
        if (item.EXEFirstInd == "option4") {
          this.checkFirstIndiOrg = "Org"
        }
        if (item.POAOrgRadio == "option5") {
          this.checkSecondIndiOrg = "Ind"
        }
        if (item.POAOrgRadio == "option6") {
          this.checkSecondIndiOrg = "Org"
        }

        if (this.checkFirstIndiOrg === "Ind") {
          var PreIndPartyid = null
          if (item.FirstPartyId != "") {
            PreIndPartyid = item.FirstPartyId;
          }
          var DistrictId = null;
          if (item.District !== "") {
            DistrictId = item.District;
          }
          var TalukId = null;
          if (item.taluka !== "") {
            TalukId = item.taluka;
          }
          var HobliId = null;
          if (item.hobli !== "") {
            HobliId = item.hobli;
          }
          var VillageId = null;
          if (item.City !== "" && item.City !== 0) {
            VillageId = item.City;
          }
         var  street="";
         if (item.street !== null) {
          street = item.street;
        }
        var  Sex=0;
         if (item.Sex !== null) {
          Sex = item.Sex;
        }
       
          var firstIndiReq = {
            "partyid": PreIndPartyid,
            "srocode": parseInt(localStorage.getItem('SROCode')),
            "documentid": 0,
            "partytypeid": partytypeid,
            "firstname": item.FirstName,
            "middlename": item.MiddleName,
            "lastname": item.LastName,
            "address": street,
            "age":item.Age == null ? "" : item.Age,
            "sex": item.Sex == null ? 0 : item.Sex,
            "isexecutor": true,
            "ispresenter": false,
            "admissiondate": "2021-11-19T11:28:40.553Z",
            "aliasname": item.AliasName,
            "correctedname": "corrected",
            "relationship": JSON.stringify(item.Relationship),
            "relativename": item.RelativeName,
            "epic": "epic",
            "pan": item.PAN == "" ? null : item.PAN,
            "phonenumber": "987653",
            "availableextacre": this.GetExecuterData.availableextacre,
            "availableextgunta": this.GetExecuterData.availableextgunta,
            "availableextfgunta": this.GetExecuterData.availableextfgunta,
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
            "profession": item.Profession,
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
            "salutationid":item.salInd,
            "isorganization": false,
            "organizationid": 1,
            "applicationnumber": localStorage.getItem('ApplicationData'),
            "verified": true,
            "issroapproved": "E",
            "districtcode": DistrictId,
            "talukcode":TalukId ,
            "hoblicode": HobliId,
            "villagecode": VillageId,
            "housenumber": item.HouseNo , 
            "pin": item.Pincode,
            "tanno": "tt",
            "yearofincorp": 1780,
            "orgpoaauthsignfname": "fnam1",
            "orgpoaauthsignmname": "mname1",
            "orgpoaauthsignlname": "lname1",
            "idprooftypeid":item.IIDproof == "" ? null : item.IIDproof


          };
          request.push(firstIndiReq);
          localStorage.setItem("executantFirstIndiStored", JSON.stringify(request));
          console.log('req', JSON.stringify(request));

        }
        else if (this.checkFirstIndiOrg === "Org") {
          var FirstOrgPartyId = null
          if (item.FirstOrgPartyId != "") {
            FirstOrgPartyId = item.FirstOrgPartyId;
          }
          var DistrictId = null;
          if (item.OrgDistrict !== "") {
            DistrictId = item.OrgDistrict;
          }
          var TalukId = null;
          if (item.Orgtaluka !== "") {
            TalukId = item.Orgtaluka;
          }
          var HobliId = null;
          if (item.Orghobli !== "") {
            HobliId = item.Orghobli;
          }
          var VillageId = null;
          if (item.Orgvillage !== "") {
            VillageId = item.Orgvillage;
          }
          var  street="";
          if (item.Orgstreet !== null) {
           street = item.Orgstreet;
         }
         var  Sex=0;
         if (item.Sex !== null) {
          Sex = item.Sex;
        }
          const firstOrgReq = {
            "partyid": FirstOrgPartyId,
            "srocode": parseInt(localStorage.getItem('SROCode')),
            "documentid": 0,
            "partytypeid": partytypeid,
            "firstname": item.Orgname,
            "middlename": null,
            "lastname": null,
            "address":street,
            "age": null,
            "sex": Sex == 0 ? 1 : Sex,
            "isexecutor": true,
            "ispresenter": false,
            "admissiondate": "2021-11-19T11:28:40.553Z",
            "aliasname": item.AliasName,
            "correctedname": "",
            "relationship": JSON.stringify(this.executantForm.get('Relationship').value),
            "relativename": item.RelativeName,
            "epic": "epic",
            "pan": item.PAN,
            "phonenumber": "9876533444",
            "availableextacre": this.GetExecuterData.availableextacre,
            "availableextgunta": this.GetExecuterData.availableextgunta,
            "availableextfgunta": this.GetExecuterData.availableextfgunta,
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
            "profession": item.Profession,
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
            "districtcode": item.District,
            "talukcode": TalukId,
            "hoblicode": HobliId,
            "villagecode": VillageId,
            "housenumber": item.OrgHouseNo,
            "pin": item.OrgPincode,
            "tanno": item.OrgTAN,
            "yearofincorp": item.OrgYrOfInco,
            "orgpoaauthsignfname": null,
            "orgpoaauthsignmname": null,
            "orgpoaauthsignlname": null

          };
          request.push(firstOrgReq);
          var DistrictId = null;
          if (item.District !== "") {
            DistrictId = item.District;
          }
          var TalukId = null;
          if (item.taluka !== "") {
            TalukId = item.taluka;
          }
          var HobliId = null;
          if (item.hobli !== "") {
            HobliId = item.hobli;
          }
          var VillageId = null;
          if (item.City !== "") {
            VillageId = item.City;
          }
          var  street="";
          if (item.Orgstreet !== null) {
           street = item.Orgstreet;
         }
         var  Sex=0;
         if (item.Sex !== null) {
          Sex = item.Sex;
        }
          const AuthSigOrgReq = {
            "partyid": null,
            "srocode": parseInt(localStorage.getItem('SROCode')),
            "documentid": 0,
            "partytypeid": 9,
            "firstname": item.FirstName,
            "middlename": item.MiddleName,
            "lastname": item.LastName,  
            "address": "sdf",
            "age": "25",
            "sex": Sex == 0 ? 1 : Sex,
            "isexecutor": true,
            "ispresenter": false,
            "admissiondate": "2021-11-19T11:28:40.553Z",
            "aliasname": item.AliasName,
            "correctedname": "",
            "relationship": JSON.stringify(this.executantForm.get('Relationship').value),
            "relativename": item.RelativeName,
            "epic": "epic",
            "pan": item.PAN,
            "phonenumber": "9876533444",
            "availableextacre": this.GetExecuterData.availableextacre,
            "availableextgunta": this.GetExecuterData.availableextgunta,
            "availableextfgunta": this.GetExecuterData.availableextfgunta,
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
            "profession": item.Profession,
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
            "villagecode": VillageId,
            "housenumber": item.HouseNo,
            "pin": item.Pincode == "" ? null : item.Pincode,

            "tanno": "tt",
            "yearofincorp": 1780,
            "orgpoaauthsignfname": null,
            "orgpoaauthsignmname": null,
            "orgpoaauthsignlname": null

          };
          request.push(AuthSigOrgReq);
        }
        this.checkSecondIndiOrg == "" ? "Ind" : this.checkSecondIndiOrg;
        debugger;
        if (this.checkSecondIndiOrg === "Ind") {
          var POAIndPartyId = null;
          if (item.POAIndPartyId != "") {
            POAIndPartyId = item.POAIndPartyId;
          }
          var DistrictId = null;
          if (item.POADistrict !== "") {
            DistrictId = item.POADistrict;
          }
          var TalukId = null;
          if (item.POAtaluka !== "") {
            TalukId = item.POAtaluka;
          }
          var HobliId = null;
          if (item.POAhobli !== "") {
            HobliId = item.POAhobli;
          }
          var VillageId = null;
          if (item.POACity !== "") {
            VillageId = item.POACity;
          }
          var  Sex=0;
          if (item.POASex !== null) {
           Sex = item.POASex;
         }
          var poaIndiReqSecond = {
            "partyid": POAIndPartyId,
            "srocode": parseInt(localStorage.getItem('SROCode')),
            "documentid": 0,
            "partytypeid": 5,
            "firstname": item.POAFIrstname,
            "middlename": item.POAMiddlename,
            "lastname": item.POALastname,
            "address": item.POAstreet,
            "age":item.POAAge,
            "sex":item.POASex=="" ? 1 : 1,
            "isexecutor": true,
            "ispresenter": false,
            "admissiondate": "2021-11-19T11:28:40.553Z",
            "aliasname": null,
            "correctedname": null,
            "relationship":JSON.stringify(item.Relationship),
            "relativename": item.POARelativeName,
            "epic": "epic",
            "pan": "ASDF",
            "phonenumber": "987653",
            "availableextacre": this.GetExecuterData.availableextacre,
            "availableextgunta": this.GetExecuterData.availableextgunta,
            "availableextfgunta": this.GetExecuterData.availableextfgunta,
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
            "profession": item.Profession,
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
            "salutationid": item.POASal,
            "isorganization": false,
            "organizationid": 1,
            "applicationnumber": localStorage.getItem('ApplicationData'),
            "verified": true,
            "issroapproved": "E",
            "districtcode": DistrictId,
            "talukcode":TalukId,
            "hoblicode": HobliId,
            "villagecode": VillageId,
            "housenumber":item.POAHouseNo,
            "pin": item.POAPincode =="" ? null : item.POAPincode,
            "tanno": "tt",
            "yearofincorp": 1780,
            "orgpoaauthsignfname": null,
            "orgpoaauthsignmname": null,
            "orgpoaauthsignlname": null,
            "idprooftypeid":3
          };
          request.push(poaIndiReqSecond);
          console.log(request,"LLLLLL");
          debugger
          console.log('req', JSON.stringify(request));
          localStorage.setItem("executantPOAIndiStored", JSON.stringify(request));
        }
        else if (this.checkSecondIndiOrg === "Org") {

          var POAOrgPartyId = null;
          if (item.POAOrgPartyId != "") {
            POAOrgPartyId = item.POAOrgPartyId;
          }

          var DistrictId = null;
          if (item.POAOrgDistrict !== "") {
            DistrictId = item.POAOrgDistrict;
          }
          var TalukId = null;
          if (item.POAOrgtaluka !== "") {
            TalukId = item.POAOrgtaluka;
          }
          var HobliId = null;
          if (item.POAOrghobli !== "") {
            HobliId = item.POAOrghobli;
          }
          var VillageId = null;
          if (item.POAOrgvillage !== "") {
            VillageId = item.POAOrgvillage;
          }
          var  Sex=0;
          if (item.POASex !== null) {
           Sex = item.POASex;
         }

          const firstIndiReq = {
            "partyid": POAOrgPartyId,
            "srocode": parseInt(localStorage.getItem('SROCode')),
            "documentid": 0,
            "partytypeid": 5,
            "firstname": item.MGFIrstname,
            "middlename": item.MGMiddlename,
            "lastname": item.MGLastname,
            "address": "sdf",
            "age": "25",
            "sex": Sex ==0 ? 0: Sex,
            "isexecutor": true,
            "ispresenter": false,
            "admissiondate": "2021-11-19T11:28:40.553Z",
            "aliasname": item.AliasName,
            "correctedname": "",
            "relationship":JSON.stringify(item.Relationship),
            "relativename": item.RelativeName,
            "epic": "epic",
            "pan": item.PAN,
            "phonenumber": "9876533444",
            "availableextacre": this.GetExecuterData.availableextacre,
            "availableextgunta": this.GetExecuterData.availableextgunta,
            "availableextfgunta": this.GetExecuterData.availableextfgunta,
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
            "profession": item.Profession,
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
            "villagecode": VillageId,

            "housenumber": item.POAOrgHouseNo,
            "pin": item.POAOrgPincode =="" ? null : item.POAOrgPincode,
            "tanno": item.POAOrgTAN =="" ? "test" : null,
            "yearofincorp": item.POAOrgYrOfInco,
            "orgpoaauthsignfname": item.POAOrgFIrstname,
            "orgpoaauthsignmname": item.POAOrgMiddlename,
            "orgpoaauthsignlname": item.POAOrgLastname,
            "idprooftypeid":3
          };
          request.push(firstIndiReq);

        }
        //New<<<<<<<
        if (this.MinorGuardianradioStatus) {

          var MinorGuardianId = null;
          if (item.MinorGuardianId != "") {
            MinorGuardianId = item.MinorGuardianId;
          }
          const firstIndiReq = {
            "partyid": MinorGuardianId,
            "srocode": parseInt(localStorage.getItem('SROCode')),
            "documentid": 0,
            "partytypeid": 4,
            "firstname": this.executantForm.get('MGFIrstname').value,
            "middlename": this.executantForm.get('MGMiddlename').value,
            "lastname": this.executantForm.get('MGLastname').value,
            "address": "sdf",
            "age": this.executantForm.get('MGAge').value,
            "sex": 1,
            "isexecutor": true,
            "ispresenter": false,
            "admissiondate": "2021-11-19T11:28:40.553Z",
            "aliasname": item.AliasName,
            "correctedname": "",
            "relationship": this.executantForm.get('MGRelationship').value,
            "relativename": item.RelativeName,
            "epic": "epic",
            "pan": item.PAN,
            "phonenumber": "9876533444",
            "availableextacre": this.GetExecuterData.availableextacre,
            "availableextgunta": this.GetExecuterData.availableextgunta,
            "availableextfgunta": this.GetExecuterData.availableextfgunta,
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
            "profession": item.Profession,
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
            "salutationid": this.executantForm.get('MGSal').value,
            "isorganization": true,
            "organizationid": 1,
            "applicationnumber": localStorage.getItem('ApplicationData'),
            "verified": true,
            "issroapproved": "E",
            "districtcode": null,
            "talukcode": null,
            "hoblicode": null,
            "villagecode": null,
            "housenumber": null,
            "pin": null,
            "tanno": "tt",
            "yearofincorp": 1780,
            "orgpoaauthsignfname": "fnam1",
            "orgpoaauthsignmname": "mname1",
            "orgpoaauthsignlname": "lname1"

          };
          request.push(firstIndiReq);
          localStorage.setItem("executantIndiStored", JSON.stringify(firstIndiReq));
        }

      });
      this.savePartyInfo(request);
    }
  }
  validatedata() {

    var climentcount = 0;
    var exicutentcount = 0
    if (this.links.length >= 2) {
      this.links.forEach((item) => {
        // if (this.isClaimant = true) {
        //   item.Climent = "Claimant";
        //   item.Executant = ""
        // }
        // else
        // {
        //   item.Climent = "";
        //   item.Executant = "Executant"
        // }
        if (item.Climent == "Claimant") {
          climentcount++;
        }
        if (item.Executant == "Executant") {
          exicutentcount++;
        }
      });
    }
    else {
      alert("Please provide atleast one executant and claimant")
      this.ValidData = false;
      return;
    }
    if (climentcount == 0) {
      alert("Please provide atleast one executant and claimant")
      this.ValidData = false;
      return;
    }
    if (exicutentcount == 0) {
      alert("Please provide atleast one executant and claimant")
      this.ValidData = false;
      return;
    }

  }
  savePartyInfo(request) {
    localStorage.setItem("ExecutantStored", JSON.stringify(request));
    this.kaveriService.SavePartyInfoData(request).subscribe(
      (data: any) => {
        console.log(data);
        if (data[0].responseCode == "1000") {
          this.message = data[0].responseMesg;
          localStorage.setItem("ExicutentId", data[0].partyId)
          this.showToast();
          this.router.navigate(['/party-details-witness']);
        }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.errordescription;
        }
      });
  }


  saveOrganization(organizationDetails) {
    console.log(JSON.stringify(organizationDetails));
    this.kaveriService.SavePartyInfoOrganizationData(organizationDetails).subscribe(
      (data: any) => {
        console.log(data);
        if (data[0].responseCode == "1000") {
          this.message = data[0].responseMesg;
          this.showToast();
          this.router.navigate(['/party-details-witness']);
        }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.errordescription;
        }
      }
    )
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

  FetchExecuterData() {

    var appNo = {
      "applicationnumber": localStorage.getItem('ApplicationData'),
      //"applicationnumber": "PRP-14012022-02332",
      //"applicationnumber": "PRP-21122021-01760" //2 tabs
    };
    if (appNo != null) {
      this.kaveriService.getExicuterDetails(appNo).subscribe(
        (data: any) => {
          console.log(data);
          if (data.length != 0) {
            this.GetExecuterData = data;
            console.log("this.GetExecuterData",this.GetExecuterData );
            
debugger;
            // <<<
            if (data) {

              var index = 0;
              var len = this.GetExecuterData.length;
              var i = 0;
              var k = 0;
              var j = 0;
              var tabdata = [];
              //-------
              if (len == 2) {
                if (this.GetExecuterData[i].tabnumber != data[i + 1].tabnumber) {
                  for (var k = 0; k < len; k++) {
                    tabdata.push(data[k]);
                    this.Tabdata[k] = tabdata;
                    tabdata = [];
                  }
                }
                else {
                  for (var k = 0; k < len; k++) {
                    tabdata.push(data[k]);
                    this.Tabdata[0] = tabdata;

                  }

                }

              }
              else if (len == 1) {
                tabdata.push(data[i]);
                this.Tabdata[0] = tabdata;
              }
              else {
                for (i; i < len - 1; i++) {
                  if (i == index) {
                    tabdata.push(data[index]);
                    index++;
                  }
                  if (this.GetExecuterData[i].tabnumber == data[i + 1].tabnumber) {
                    tabdata.push(data[index]);
                    index++;
                  }
                  else {
                    this.Tabdata[j] = tabdata;
                    tabdata = [];
                    j++;
                  }
                  if (index == len) {
                    this.Tabdata[j] = tabdata;
                  }
                  console.log(this.Tabdata[0]);
                }
              }

              this.CreateExecObject(false)
              //------
              // while(len > 0){

              //   if(this.GetExecuterData[i].tabnumber == data[index].tabnumber ){
              //     tabdata.push(data[index]);
              //     if(index < data.length - 1){
              //       index++;
              //     }
              //     else{
              //       this.Tabdata[i] = tabdata;
              //       tabdata = [];
              //       break;
              //     }
              //   }
              //   else{

              //     this.Tabdata[i] = tabdata;
              //     console.log(this.Tabdata);
              //      i++;
              //     len--;
              //     tabdata = [];
              //   }
              // }
            }

            //>>>
            // this.AssigndatatoObject();
          }
        }, e => {
          if (e.error) {
            this.errorMessage = e.error.error_description;
          }
        }
      )
    }
  }
  // AssigndatatoObject() {
  //   debugger
  //   console.log(JSON.stringify(this.GetExecuterData));
  //   for (let i = 0; i < this.GetExecuterData.length; i++) {
  //     if (this.GetExecuterData[i].partytypeid == 1) {
  //       if (this.GetExecuterData[i].isorganization) {
  //         this.VisibleOrganization = true;
  //         this.PreIndPartyid = this.GetExecuterData[i].partyid;
  //         this.executantForm.controls['Orgname'].setValue(this.GetExecuterData[i].firstname);
  //         this.executantForm.controls['OrgYrOfInco'].setValue(this.GetExecuterData[i].yearofincorp);
  //         this.executantForm.controls['OrgTAN'].setValue(this.GetExecuterData[i].tanno);
  //         this.executantForm.controls['IOrgHouseNo'].setValue(this.GetExecuterData[i].aliasname);
  //         this.selecteddistvalue = this.GetExecuterData[i].districtcode;
  //         this.selectedtalukvalue = this.GetExecuterData[i].talukcode;
  //         this.selectedhoblivalue = this.GetExecuterData[i].hoblicode;
  //         this.selectedvillagevalue = this.GetExecuterData[i].villagecode;
  //         this.EXEFirstOrg = true;
  //       }
  //       else {
  //         this.PreIndPartyid = this.GetExecuterData[i].partyid;
  //         //this.Executant=Claimant
          
  //         this.executantForm.controls['salutationid'].setValue(this.GetExecuterData[i].salutationid);
  //         this.executantForm.controls['FirstName'].setValue(this.GetExecuterData[i].firstname);
  //         this.executantForm.controls['MiddleName'].setValue(this.GetExecuterData[i].middlename);
  //         this.executantForm.controls['LastName'].setValue(this.GetExecuterData[i].lastname);
  //         this.executantForm.controls['AliasName'].setValue(this.GetExecuterData[i].aliasname);
  //         this.executantForm.controls['Age'].setValue(this.GetExecuterData[i].age);
  //         this.executantForm.controls['Sex'].setValue(this.GetExecuterData[i].sex);
  //         this.executantForm.controls['Profession'].setValue(this.GetExecuterData[i].profession);
  //         this.executantForm.controls['PAN'].setValue(this.GetExecuterData[i].pan);
  //         this.executantForm.controls['HouseNo'].setValue("");
  //         this.executantForm.controls['HouseNo'].setValue(this.GetExecuterData[i].housenumber);
  //         this.executantForm.controls['PAN'].setValue(this.GetExecuterData[i].pan);
  //         this.executantForm.controls['street'].setValue(this.GetExecuterData[i].address);


  //         this.selectedgendervalue = this.GetExecuterData[i].sex;
  //         // this.selecteddistvalue = this.GetExecuterData[i].districtcode;
  //         // this.selectedtalukvalue = this.GetExecuterData[i].talukcode;
  //         // this.selectedhoblivalue = this.GetExecuterData[i].hoblicode;
  //         // this.selectedvillagevalue = this.GetExecuterData[i].villagecode;

  //         this.executantForm.controls['District'].setValue(this.GetExecuterData[i].districtcode);
  //         this.executantForm.controls['taluka'].setValue(this.GetExecuterData[i].talukcode);
  //         this.executantForm.controls['hobli'].setValue(this.GetExecuterData[i].hoblicode);
  //         this.executantForm.controls['City'].setValue(this.GetExecuterData[i].villagecode);
  //         this.EXEFirstInd = true;
  //         this.checkFirstIndiOrg = "Ind";



  //       }

  //     }
  //     if (this.GetExecuterData[i].partytypeid == 9) {
  //       this.executantForm.controls['FirstName'].setValue(this.GetExecuterData[i].firstname);
  //       this.executantForm.controls['MiddleName'].setValue(this.GetExecuterData[i].middlename);
  //       this.executantForm.controls['LastName'].setValue(this.GetExecuterData[i].lastname);
  //       this.executantForm.controls['AliasName'].setValue(this.GetExecuterData[i].aliasname);
  //       this.executantForm.controls['Age'].setValue(this.GetExecuterData[i].age);
  //       this.executantForm.controls['Profession'].setValue(this.GetExecuterData[i].profession);
  //       this.executantForm.controls['PAN'].setValue(this.GetExecuterData[i].pan);
  //       // this.presenterForm.controls['HouseNo'].setValue("");
  //       this.executantForm.controls['street'].setValue(this.GetExecuterData[i].address);
  //       // this.presenterForm.controls['street'].setValue(this.GetExecuterData[i].address);

  //       this.selectedgendervalue = this.GetExecuterData[i].sex;
  //       this.selecteddistvalue = this.GetExecuterData[i].districtcode;
  //       this.selectedtalukvalue = this.GetExecuterData[i].talukcode;
  //       this.selectedhoblivalue = this.GetExecuterData[i].hoblicode;
  //       this.selectedvillagevalue = this.GetExecuterData[i].villagecode;
  //       this.selectedgendervalue = this.GetExecuterData[i].sex;

  //     }
  //     if (this.GetExecuterData[i].partytypeid == 5) {
  //       this.VisiblePOA = true;
  //       this.POAradioStatus = true;
  //       // this.MinorGuardianradioStatus = true;
  //       // this.VisibleMinorGuardian = true;
  //       this.PrePOAIndPartyid = this.GetExecuterData[i].partyid;
  //       this.executantForm.controls['POASal'].setValue(this.GetExecuterData[i].salutationid);
  //       this.executantForm.controls['POAFIrstname'].setValue(this.GetExecuterData[i].firstname);
  //       this.executantForm.controls['POAMiddlename'].setValue(this.GetExecuterData[i].middlename);
  //       this.executantForm.controls['POALastname'].setValue(this.GetExecuterData[i].lastname);
  //       this.executantForm.controls['POAAge'].setValue(this.GetExecuterData[i].age);
  //       this.executantForm.controls['POAHouseNo'].setValue("");
  //       this.executantForm.controls['POAState'].setValue(1);
  //       this.executantForm.controls['POAstreet'].setValue(this.GetExecuterData[i].address);

  //       // this.POAselectedgendervalue = this.GetExecuterData[i].sex;
  //       // this.POAselecteddistvalue =this.GetExecuterData[i].districtcode;
  //       // this.POAselectedtalukvalue =    this.GetExecuterData[i].talukcode;
  //       // this.POAselectedhoblivalue =  this.GetExecuterData[i].hoblicode;
  //       // this.POAselectedvillagevalue =  this.GetExecuterData[i].villagecode;
  //       // this.POAselectedgendervalue = this.GetExecuterData[i].sex;
  //       // this.presenterForm.controls['POAPincode'].setValue("");
  //       // this.POAselectedrelationshipvalue=this.GetExecuterData[i].relationship;
  //       this.executantForm.controls['POARelativeName'].setValue(this.GetExecuterData[i].relativename);
  //       this.VisiblePOAIndividual = true;
  //       if (this.GetExecuterData[i].isorganization) {

  //         this.executantForm.controls['POAOrgname'].setValue(this.GetExecuterData[i].firstname);
  //         this.executantForm.controls['POAOrgYrOfInco'].setValue(this.GetExecuterData[i].yearofincorp);
  //         this.executantForm.controls['POAOrgTAN'].setValue(this.GetExecuterData[i].tanno);

  //         this.executantForm.controls['POAAge'].setValue(this.GetExecuterData[i].age);
  //         this.executantForm.controls['OrgHouseNo'].setValue("");
  //         this.executantForm.controls['OrgState'].setValue(1);
  //         this.executantForm.controls['POAstreet'].setValue(this.GetExecuterData[i].address);

  //         //this.POAselectedgendervalue = this.GetExecuterData[i].sex;
  //         this.selecteOrgddistvalue = this.GetExecuterData[i].districtcode;
  //         this.selectedOrgtalukvalue = this.GetExecuterData[i].talukcode;
  //         this.selectedOrghoblivalue = this.GetExecuterData[i].hoblicode;
  //         this.selectedOrgvillagevalue = this.GetExecuterData[i].villagecode;

  //         this.executantForm.controls['POAPincode'].setValue("");

  //         this.executantForm.controls['POAOrgFIrstname'].setValue(this.GetExecuterData[i].relativename);
  //         this.executantForm.controls['POAMiddlename'].setValue(this.GetExecuterData[i].middlename);
  //         this.executantForm.controls['POAOrgMiddlename'].setValue(this.GetExecuterData[i].lastname);
  //         this.executantForm.controls['POAOrgLastname'].setValue(this.GetExecuterData[i].lastname);
  //         this.VisiblePOAOrganization = true;
  //         this.VisiblePOAIndividual = false;
  //       }

  //     }
  //     if (this.GetExecuterData[i].partytypeid == 4) {
  //       this.VisibleMinorGuardian = true;
  //       this.MinorGuardianradioStatus = true;

  //       this.executantForm.controls['MGSal'].setValue(this.GetExecuterData[i].salutationid);
  //       this.executantForm.controls['MGFIrstname'].setValue(this.GetExecuterData[i].firstname);
  //       this.executantForm.controls['MGMiddlename'].setValue(this.GetExecuterData[i].middlename);
  //       this.executantForm.controls['MGLastname'].setValue(this.GetExecuterData[i].lastname);
  //       this.executantForm.controls['MGAge'].setValue(this.GetExecuterData[i].age);
  //       this.executantForm.controls['MGRelationship'].setValue(this.GetExecuterData[i].relationship);
  //     }
  //   }
  // }


  CreateExecObject(isNewTab: boolean) {
    debugger
    //this.executantForm.reset();
    var test: any = [];
    //this.links = [];
    let tabNumber = 0;
    var i = 1;
    if (this.links.length === 1) {
      this.links = [];
      this.Tabdata.forEach(element => {
        console.log(element);
        element.forEach(data => {
          console.log(data);
          tabNumber = data.tabnumber;
          if (data.partytypeid == 1 || data.partytypeid == 2) {

            if (!data.ispresenter) {
              if (data.partytypeid == 1) {
                this.newExecutant['Climent'] = "Claimant";
                this.newExecutant['Executant'] = '';
              } else if (data.partytypeid == 2) {
                this.newExecutant['Climent'] = "";
                this.newExecutant['Executant'] = "Executant";
              }
            }
            this.VisiblePOAIndividual = true;

            if (data.isorganization) {
              this.VisibleOrganization = true;
              this.newExecutant['FirstOrgPartyId'] = data.partyid;
              this.newExecutant['Orgname'] = data.firstname;
              this.newExecutant['OrgYrOfInco'] = data.yearofincorp;
              this.newExecutant['OrgTAN'] = data.tanno;
              this.newExecutant['IOrgHouseNo'] = data.aliasname;
              this.newExecutant['EXEFirstInd'] = "option4";
            }
            else {

              debugger;
              this.newExecutant["name"] = "EXECUTANT -" + data.tabnumber;
              this.newExecutant['salInd'] = data.salutationid;
              this.newExecutant['IIDproof'] = data.idprooftypeid;
              this.newExecutant['FirstPartyId'] = data.partyid;
              this.newExecutant['FirstName'] = data.firstname;
              this.newExecutant['MiddleName'] = data.middlename;
              this.newExecutant['LastName'] = data.lastname;
              this.newExecutant['AliasName'] = data.aliasname;
              this.newExecutant['Age'] = data.age;
              this.newExecutant['Sex'] = data.sex;
              this.newExecutant['Profession'] = data.profession;
              this.newExecutant['PAN'] = data.pan;
              this.newExecutant['HouseNo'] = data.housenumber;
              this.newExecutant['street'] = data.address;
              this.newExecutant['Pincode'] = data.pin;
              this.newExecutant['State'] = 1;
              this.newExecutant['District'] = data.districtcode;
              this.newExecutant['taluka'] = data.talukcode;
              this.newExecutant['hobli'] = data.hoblicode;
              this.newExecutant['City'] = data.villagecode;
              this.newExecutant['Relationship'] = 3;
              this.newExecutant['RelativeName'] = data.relativename;
              this.newExecutant['EXEFirstInd'] = "option3";



            }
          }

          if (data.partytypeid == 5) {
            this.newExecutant['POAradio'] = "option5";

            if (data.isorganization) {
              this.newExecutant['POAOrgRadio'] = "option6";
              this.newExecutant['POAOrgPartyId'] = data.partyid;
              this.newExecutant['POAOrgname'] = data.firstname;
              this.newExecutant['POAOrgYrOfInco'] = data.yearofincorp;
              this.newExecutant['POAOrgTAN'] = data.tanno;
              this.newExecutant['POAAge'] = data.age;
              this.newExecutant['OrgHouseNo'] = data.housenumber;
              this.newExecutant['OrgState'] = 1;
              this.newExecutant['POAstreet'] = data.address;
              this.newExecutant['POAPincode'] = data.pin;
              this.newExecutant['POADistrict'] = data.districtcode;
              this.newExecutant['POAtaluka'] = data.talukcode;
              this.newExecutant['POACity'] = data.villagecode;
              this.newExecutant['POAhobli'] = data.hoblicode;
              this.newExecutant['POARelationship'] = data.relationship;
              this.newExecutant['POARelativeName'] = data.relativename;
              this.newExecutant['POAOrgFIrstname'] = data.orgpoaauthsignfname;
              this.newExecutant['POAOrgMiddlename'] = data.orgpoaauthsignmname;
              this.newExecutant['POAOrgLastname'] = data.orgpoaauthsignlname;
              this.newExecutant['POAOrgRadio'] = "option6";
              //this.VisiblePOAIndividual = true;

              this.VisiblePOAOrganization = true;
              this.VisiblePOAIndividual = false;
            }
            else {
              this.VisiblePOA = true;
              this.POAradioStatus = true;
              // this.MinorGuardianradioStatus = true;
              // this.VisibleMinorGuardian = true;
              this.newExecutant['POAIndPartyId'] = data.partyid;
              this.newExecutant['POAFIrstname'] = data.firstname;
              this.newExecutant['POAMiddlename'] = data.middlename;
              this.newExecutant['POALastname'] = data.lastname;
              this.newExecutant['POAAge'] = data.age;
              this.newExecutant['POASex'] = data.sex;
              this.newExecutant['POAHouseNo'] = data.housenumber;
              this.newExecutant['POAPincode'] = data.pin;
              this.newExecutant['POAState'] = 1;
              this.newExecutant['POAstreet'] = data.address;
              this.newExecutant['POADistrict'] = data.districtcode;
              this.newExecutant['POAtaluka'] = data.talukcode;
              this.newExecutant['POACity'] = data.villagecode;
              this.newExecutant['POAhobli'] = data.hoblicode;
              this.newExecutant['POARelationship'] = 3;
              this.newExecutant['POARelativeName'] = data.relativename;
              this.newExecutant['POAOrgRadio'] = "option5";
            }

          }
          if (data.partytypeid == 9) {
            this.newExecutant['FirstOrgAuthPartyId'] = data.partyid;
            this.newExecutant['FirstName'] = data.firstname;
            this.newExecutant['MiddleName'] = data.middlename;
            this.newExecutant['LastName'] = data.lastname;
            this.newExecutant['AliasName'] = data.aliasname;
            this.newExecutant['Age'] = data.age;
            this.newExecutant['Profession'] = data.profession;
            this.newExecutant['PAN'] = data.pan;
            this.newExecutant['street'] = data.address;
            this.newExecutant['HouseNo'] = data.housenumber;
            this.newExecutant['Pincode'] = data.pin;
            this.newExecutant['State'] = 1;
            this.newExecutant['District'] = data.districtcode;
            this.newExecutant['taluka'] = data.talukcode;
            this.newExecutant['hobli'] = data.hoblicode;
            this.newExecutant['City'] = data.villagecode;
          }
          if (data.partytypeid == 9) {
            this.newExecutant['MGSal'] = data.salutationid;
            this.newExecutant['MGFIrstname'] = data.firstname;
            this.newExecutant['MGMiddlename'] = data.middlename;
            this.newExecutant['MGLastname'] = data.lastname;
            this.newExecutant['MGAge'] = data.age;
            this.newExecutant['MGRelationship'] = data.relationship;
          }
        });

        this.links.push({ "name": "EXECUTANT-" + i, ...this.newExecutant });
        console.log(this.multiExecDetails);
        i++;

      });
    }
    this.tabIndex = 0;
    if (isNewTab) {
      //this.newExecutant['FirstPartyId'] = null;

      this.newExecutant['FirstPartyId'] = false;
      this.newExecutant['FirstOrgAuthPartyId'] = false;
      this.newExecutant['POAIndPartyId'] = null;
      this.newExecutant['POAOrgPartyId'] = null;
      this.newExecutant['PropertyId'] = null;
      this.checkFirstIndiOrg = null;
      this.newExecutant['isClaimant'] = false;
      this.newExecutant['IsExecutant'] = false;
      this.newExecutant['FirstName'] = "";
      this.newExecutant['MiddleName'] = "";
      this.newExecutant['LastName'] = "";
      this.newExecutant['AliasName'] = "";
      this.newExecutant['Age'] = "";
      this.newExecutant['Sex'] = null;
      this.newExecutant['Profession'] = null;
      this.newExecutant['PAN'] = null;
      this.newExecutant['HouseNo'] = null;
      this.newExecutant['street'] = null;
      this.newExecutant['Pincode'] = null;
      this.newExecutant['State'] = null;
      this.newExecutant['District'] = null;
      this.newExecutant['taluka'] = null;
      this.newExecutant['hobli'] = null;
      this.newExecutant['City'] = null;
      this.newExecutant['Relationship'] = null;
      this.newExecutant['RelativeName'] = "";
      this.newExecutant['EXEFirstInd'] = "option3";
      this.newExecutant['Executant'] = "";
      this.newExecutant['Climent'] = "Claimant";
      this.newExecutant['name'] = "EXECUTANT -" + (parseInt(this.links.length.toString()) + 1).toString()
      //this.executantForm[2].reset();
      this.links.push({ "name": "EXECUTANT -" + (parseInt(this.links.length.toString()) + 1).toString(), ...this.newExecutant });
      //this.setFormData(JSON.parse(JSON.stringify(this.links[parseInt(this.links.length.toString())+1])));

    }
    this.setform(JSON.parse(JSON.stringify(this.links[0])));
    this.selectedIndex = parseInt(this.links.length.toString());
    this.tabIndex = parseInt(this.links.length.toString());
  }

  deleteExecutant(index) {
    var FirstPartyId = this.links[index]['FirstPartyId'];
    var FirstOrgAuthPartyId = this.links[index]['FirstOrgAuthPartyId'];
    partyIds = FirstPartyId + ',' + FirstOrgAuthPartyId;
    var partyIds = {
      "partyIds": partyIds,
    };
    if (partyIds != null) {
      this.kaveriService.deleteExecutant(partyIds).subscribe(
        (data: any) => {
          console.log(data);

        }, e => {
          if (e.error) {
            this.errorMessage = e.error.error_description;
          }
        }
      )
    }
  }
}