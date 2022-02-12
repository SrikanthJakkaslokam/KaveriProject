import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { KaveriService } from '../../services/kaveri.service';
import { Router } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material/tabs';
import notify from "devextreme/ui/notify";
import { stringify } from 'querystring';

@Component({
  selector: 'app-party-details-witness',
  templateUrl: './party-details-witness.component.html',
  styleUrls: ['./party-details-witness.component.scss']
})
export class PartyDetailsWitnessComponent implements OnInit {
  witnessid: any;
  public tabIndex = 0;
  selectedIndex = 0;
  GetWitnessData: Array<any> = [];
  WitnessIdData: Array<any> = [];
  Tabdata: Array<any> = [];
  WitPartyid: string = "";
  private newWitness = {
    FirstName: '',

    MiddleName: '',

    LastName: '',
    Age: '',

    Sex: '',
    // AddressOfParty: new FormControl("", Validators.required),

    Profession: '',

    HouseNo: '',

    street: '',

    City: '',

    District: '',

    taluka: '',

    hobli: '',

    State: '',

    Pincode: '',

    Relationship: '',

    RelativeName: '',

    chkCL: '',

    chkEx: ''

} as any;
  witnessForm : FormGroup;
  submitted = false;
  errorMessage: string;
  
  public links: Array<any> = [
    {name:'IDENTIFIER - 1', ...this.newWitness}];

  activeLink = this.links[0];
  background: ThemePalette = undefined;
  // selected = new FormControl(0);
  // toggleBackground() {
  //   this.background = this.background ? undefined : 'primary';
  // }
  VisibleMinorGuardian : boolean= false;
  VisiblePOA : boolean= false;
  VisibleExempted : boolean= false;
  VisibleOrganization : boolean= false;
  VisibleIndividual : boolean= true;

  VisiblePOAOrganization : boolean= false;
  VisiblePOAIndividual : boolean= true;

  MinorGuardianradioStatus:boolean;
  POAradioStatus :boolean;

  genderList: Array<any> = [];
  selectedgendervalue: string = "";
  
  relationshipList: Array<any> = [];
  selectedrelationshipvalue: string = "";

  disTrict: string = "";
  talUka: string = "";
  town: string = "";
  vilLage: string = "";

  selecteddistvalue: string = "";
  selectedtalukvalue: string = "";
  selectedhoblivalue: string = "";
  selectedvillagevalue: string = "";

  districtList: Array<any> = [];
  talukaList: Array<any> = [];
  hobliList: Array<any> = [];
  villageList: Array<any> = [];

  srocode: string ="";
  Witnesspartyid: string=""; 
  firstname: boolean;
  age: boolean;
  gender: boolean;
  house: boolean;
  street: boolean;
  state: boolean;
  district: boolean;
  taluka: boolean;
  hobli: boolean;
  city: boolean;
  pincode: boolean;
  relativesname: boolean;
 
  addLink() {
    this.links.push({
      name: `IDENTIFIER -  ${this.links.length + 1}`,
      ...this.newWitness
    });
    setTimeout(() => {
      
    this.selectedIndex = Number(this.selectedIndex + 1);
    console.log(this.selectedIndex);
    }, 0);
  }

  removeTab(index: number) {
    debugger;
    var tab=index+1;
    if(confirm("Are you sure to delete witness " +tab)) {
    
     this.deletewitness(index);
     this.links.splice(index, 1);
    }
  }

  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    this.tabIndex = tabChangeEvent.index;
    console.log('tabChangeEvent => ', tabChangeEvent);
    console.log('index => ', tabChangeEvent.index);
    const presentForm = this.links[tabChangeEvent.index];
    this.setFormData(JSON.parse(JSON.stringify(presentForm)));
  }

  loggedinUser: string = "";

  constructor(private fb: FormBuilder,private kaveriService: KaveriService,public router: Router) { }
  message;
  ngOnInit() {
    this.FetchPresenterData();
    if(this.GetWitnessData.length>0){
        //this.AssigndatatoObject();
    }

    this.loggedinUser = localStorage.getItem('loggedinuser');

    this.srocode = localStorage.getItem('SROCode');
    this.Witnesspartyid=localStorage.getItem('PresenterpartyId');

    this.witnessForm =  new FormGroup({
      FirstName: new FormControl(""),
      MiddleName: new FormControl(""),
      LastName: new FormControl(""),
      Age: new FormControl(""),
      Sex: new FormControl(""),
      // AddressOfParty: new FormControl(""),
      Profession: new FormControl(""),
      HouseNo: new FormControl(""),
      street: new FormControl(""),
      City: new FormControl(""),
      District: new FormControl(""),
      taluka: new FormControl("",Validators.required),
      hobli: new FormControl("",Validators.required),
      State: new FormControl(""),
      Pincode: new FormControl(""),
      Relationship: new FormControl(""),
      RelativeName: new FormControl(""),
      chkCL: new FormControl(""),
      chkEx: new FormControl(""),
      witnessId: new FormControl("")
    });
   
    this.GetRelationship();
    this.District();
    this.GetGender();

    this.witnessForm.valueChanges.subscribe((value) => {
      for(let key in value) {
        this.links[this.tabIndex][key] = JSON.parse(JSON.stringify(value[key]));
      }
     // console.log('value', value, this.links[this.tabIndex]);
    });

  }
  setFormData(presentFormData) {
    console.log('setform',presentFormData);
    const fromData = JSON.parse(JSON.stringify(presentFormData));
    this.witnessForm.patchValue({...fromData });
    
  }
  setform(responseForm) {
    console.log('setform', responseForm);
    const fromData = JSON.parse(JSON.stringify(responseForm));
    console.log('Loading formdata json');
    console.log(fromData);
    this.witnessForm.patchValue({ ...fromData });
    console.log(this.witnessForm);
    //this.

  }
  GetGender() {
    this.kaveriService.getGender().subscribe(
      (data: any) => {
        console.log(data);
        if(data.length != 0) {
          this.genderList = data;
         
        }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
  }

  GetRelationship() {
    this.kaveriService.getRelationship().subscribe(
      (data: any) => {
        console.log(data);
        if(data.length != 0) {
          this.relationshipList = data;
        }
      }, e => {
        if (e.error) {
          this.errorMessage = e.error.error_description;
        }
      }
    )
  }

  District() {
    if (sessionStorage.getItem("allDistricts") != undefined) {
      let sessionDistricts = sessionStorage.getItem("allDistricts");
      this.districtList = JSON.parse(sessionDistricts);
      if (this.witnessForm.get("District").value != 0) {
        this.selecteddistvalue = this.witnessForm.get("District").value;
        this.Taluka();
      }
    }
    this.kaveriService.district().subscribe(
      (data: any) => {
        console.log("District load call");
        console.log(data);
        if (data.length != 0) {
          this.districtList = data;
          sessionStorage.setItem("allDistricts", JSON.stringify(data));
       
          if (this.witnessForm.get("District").value != 0) {
            this.selecteddistvalue = this.witnessForm.get("District").value;
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
  ondistrictChange($event){

    if($event!=""){
    let text1 = $event.target.options[$event.target.options.selectedIndex].text;
    this.disTrict = text1;
    }
    }
    ondistrictValuechange(distValue) {
    
         this.selecteddistvalue = distValue;
         if(this.witnessForm.get("District").value != 0) {
         this.Taluka();
         }
       }

  Taluka() {
    if (sessionStorage.getItem("allTaluka") != undefined) {
      let sessiontalukas = sessionStorage.getItem("allTaluka");
      this.talukaList = JSON.parse(sessiontalukas);
      if (this.witnessForm.get("taluka").value != 0) {
        this.selectedtalukvalue = this.witnessForm.get("taluka").value;
        this.Hobli();
      }
    }
 
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
            sessionStorage.setItem("allTaluka", JSON.stringify(data));
              this.selectedtalukvalue = this.witnessForm.get("taluka").value;
              this.talukaList = data;
              if(this.witnessForm.get("taluka").value != 0) {
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

      ontalukaChange($event){
  
        if($event!=""){
          let text2 = $event.target.options[$event.target.options.selectedIndex].text;
          this.talUka = text2;
        }
          }

          ontalukValuechange(talukValue) {

            this.selectedtalukvalue = talukValue;
            if(this.witnessForm.get("taluka").value != 0) {
              this.Hobli();
            }
          }

  Hobli() {
    if (sessionStorage.getItem("allHobli") != undefined) {
      let sessionhobli = sessionStorage.getItem("allHobli");
      this.hobliList = JSON.parse(sessionhobli);
      if (this.witnessForm.get("hobli").value != 0) {
        this.selectedhoblivalue = this.witnessForm.get("hobli").value;
        this.Village();
      }
    }
    var hoblireq = {
      "talukaCode": this.selectedtalukvalue,
    };
    if (hoblireq != undefined) {
      this.kaveriService.hobli(hoblireq).subscribe(
        (data: any) => {
          console.log(data);
          if (data.length != 0) {
            this.hobliList = data;
            sessionStorage.setItem("allHobli", JSON.stringify(data));
            this.selectedhoblivalue = this.witnessForm.get("hobli").value;
            if(this.witnessForm.get("hobli").value != 0) {
            this.Village();
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


          onhobliChange($event){
            if($event!=""){
                let text3 = $event.target.options[$event.target.options.selectedIndex].text;
                console.log("========hobli code ",this.hobliList);
                this.town = text3;
                this.hobliList.forEach(element => {
                  if(element.hoblinamee == this.town){
                    
                    localStorage.setItem("bhoomihoblicode", element.bhoomihoblicode);
                    localStorage.setItem("hobliname", element.hoblinamee);
                  }
                  
                });
            }
                }


                onhobliValuechange(hobliValue) {
                
                  this.selectedhoblivalue = hobliValue;
                  if(this.witnessForm.get("hobli").value != 0) {
                  this.Village();
                  }
                }

                Village() {
                  var index = {
                    "hobliCode": this.selectedhoblivalue,
                  };
                  if(index != undefined) {
                  this.kaveriService.village(index).subscribe(
                    (data: any) => {
                      console.log(data);
                      if(data.length != 0) {
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

  MinorGuardianChange(){
    this.MinorGuardianradioStatus = !this.MinorGuardianradioStatus;
    this.VisibleMinorGuardian = !this.VisibleMinorGuardian; 
  }

  POAChange(){
    this.POAradioStatus = !this.POAradioStatus;
    this.VisiblePOA = !this.VisiblePOA;
    this.POAIndividualChange();
  }

  ExemptedChange(){
    this.VisibleExempted = !this.VisibleExempted;
  }

  IndividualChange(){
   this.VisibleOrganization= false;
   this.VisibleIndividual=true; 
  }

  OrganizationChange(){
    this.VisibleOrganization = true;
    this.VisibleIndividual= false;
  }

  POAIndividualChange(){
    this.VisiblePOAOrganization= false;
    this.VisiblePOAIndividual=true; 
   }
 
   POAOrganizationChange(){
     this.VisiblePOAOrganization = true;
     this.VisiblePOAIndividual= false;
   }
  
   onSubmit() {
     this.firstname = false;
     this.age = false;
     this.gender = false;
     this.house = false;
     this.street = false;
     this.state  = false;
     this.district = false;
     this.taluka = false;
     this.hobli  = false;
     this.city = false;
    this.pincode = false;
    this.relativesname = false;
     if(this.witnessForm.get("FirstName").value ==""){
       this.firstname = true;
     }
     if(this.witnessForm.get("Age").value ==""){
       this.age = true;
     }
     if(this.witnessForm.get("Sex").value ==""){
       this.gender = true;
     }
     if(this.witnessForm.get("HouseNo").value ==""){
       this.house = true;
     }
     if(this.witnessForm.get("HouseNo").value ==""){
       this.house = true;
     }
     if(this.witnessForm.get("street").value ==""){
       this.street = true;
     }
     if(this.witnessForm.get("State").value ==""){
       this.state = true;
     }
     if(this.witnessForm.get("District").value ==""){
       this.district = true;
     }
     if(this.witnessForm.get("taluka").value ==""){
       this.taluka = true;
     }
     if(this.witnessForm.get("hobli").value ==""){
       this.hobli = true;
     }
     if(this.witnessForm.get("City").value ==""){
       this.city = true;
     }
     if(this.witnessForm.get("Pincode").value ==""){
       this.pincode = true;
     }
     if(this.witnessForm.get("RelativeName").value ==""){
       this.relativesname = true;
     }

 if(this.links.length>=2)
 {
  const request = []; 
   console.log(this.links[0]["witnessId"])
     this.links.forEach((item) => {

       console.log(item);
      //  if(this.witnessForm.get("Sex").value === '0' || this.witnessForm.get("Sex").value === '1' || this.witnessForm.get("Sex").value === '2') {
      //   item.Sex = true
      // }
      var witnessid=null
      var chkEx=false
      if(item.chkEx)
      {
        chkEx=true;
      }
      var chkCL=false
      if(item.chkCL)
      {
        chkCL=true;
      }
      console.log(witnessid);
      if(item.witnessId!="" && item.witnessId!=undefined)
      {
        witnessid=item.witnessId;
      }

      var DistrictId= null;
      if(item.District!=="")
      {
        DistrictId=item.District;
      }
      var TalukId= null;
      if(item.taluka!=="")
      {
        TalukId=item.taluka;
      }
      var HobliId= null;
      if(item.hobli!=="")
      {
        HobliId=item.hobli;
      }
      var VillageId= null;
      if(item.City!=="")
      {
        VillageId=item.City;
      }

       const newReq = {
        "witnessid":witnessid,
        "documentId": 1,
        "name": item.FirstName,
        "middlename":item.MiddleName,
        "lastname": item.LastName,
        "address": item.street,
        "sex": item.Sex,
        "age": item.Age,
        "profession": item.Profession,
        "registrationId": 1,
        "dateOfBirth": "2021-10-19T17:23:04.200Z",
        "status": "Complted",
        "phoneNo": "987654",
        "relation": item.Relationship,
        "motherName": item.middllename,
        "fathersName": item.lastname,
        "presentatsolemanization": "rts",
        "srocode":parseInt(localStorage.getItem('SROCode')),
        "isOnline": true,
        "applicationnumber": localStorage.getItem('ApplicationData'),
        "verified": true,
        "issroapproved": null,
        "statecode": item.State,
        "districtcode": DistrictId,
        "talukcode": TalukId,
        "hoblicode":HobliId,
        "villagecode": VillageId,
        "relativename": item.RelativeName,
        "pincode": item.Pincode,
        "houseno": item.HouseNo,
        "iscliment": chkCL,
        "isexicutent": chkEx
      };
       request.push(newReq);
        console.log('req',request)
       console.log(JSON.stringify(request))
     
           });
      // console.log('req',request)
      this.savewitnessinfo(request);
        }  
        else{
          alert('Please give minimum 2 witness.')
          return false;
        }   
         
  }

savewitnessinfo(request){
  this.kaveriService.SavePartyInfoWitnessData(request).subscribe(
    (data: any) => {
      this.witnessid=data[0].witnessId;
      this.WitnessIdData=data;
     this.savepartyinfo();
      console.log(data);
       console.log(data[0].witnessId);
     
      // this.router.navigate(['/property-schedule-component']);
      if (data[0].responseCode == 1000) {
        this.message = data[0].responseMesg;
        this.showToast();
         this.router.navigate(['/document-for-approval']);
      }
 
    });
}

  savepartyinfo(){
    const PartyWitnessrequest = [];
    for(let i=0;i<this.WitnessIdData.length;i++)
    {
    const PartyWitness = {
      "partyid":localStorage.getItem('ExicutentId') ,
      "witnessid": this.WitnessIdData[i].witnessId,
      "witnessdate": "2021-12-23T05:26:04.392Z",
      "srocode": parseInt(localStorage.getItem('SROCode'))
    };
    PartyWitnessrequest.push(PartyWitness);
  }
    console.log(JSON.stringify(PartyWitnessrequest));
    this.kaveriService.SavePartyInfoWitnessDetails(PartyWitnessrequest).subscribe(
      (data: any) => {
        console.log(data);
        if (data[0].responseCode == 1000) {
          this.message = data[0].responseMesg;
          this.showToast();
           this.router.navigate(['/document-for-approval']);
        }
      });
  }

  showToast() {
    notify({
        message: this.message,
        isVisible: true,
        displayTime: 3000,
        height: 50,
        type:"success"

    });
}
FetchPresenterData() {
  debugger;
  var appNo = {
    "applicationnumber": localStorage.getItem('ApplicationData'),
   //"applicationnumber": "PRP-23122021-01794",
  };
  if(appNo!=null){
  this.kaveriService.getWitnessDetails(appNo).subscribe(
    (data: any) => {
      console.log(data);
      if (data.length != 0) {
        this.GetWitnessData = data;
        //this.AssigndatatoObject();
        this.CreateExecObject();
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
  debugger
  console.log(JSON.stringify(this.GetWitnessData));
 
  for(let i=0;i< this.GetWitnessData.length;i++){
    
      this.VisiblePOA = true;
      this.WitPartyid=this.GetWitnessData[i].partyid;
      this.witnessForm.controls['FirstName'].setValue(this.GetWitnessData[i].name);
      this.witnessForm.controls['MiddleName'].setValue(this.GetWitnessData[i].middlename);
      this.witnessForm.controls['LastName'].setValue(this.GetWitnessData[i].lastname);
      
      this.witnessForm.controls['Age'].setValue(this.GetWitnessData[i].sex);
      this.witnessForm.controls['Sex'].setValue("1");
      this.witnessForm.controls['Profession'].setValue(this.GetWitnessData[i].profession);
      this.witnessForm.controls['state'].setValue(1); 
      this.witnessForm.controls['street'].setValue(this.GetWitnessData[i].address);
      this.witnessForm.controls['District'].setValue(this.GetWitnessData[i].districtcode);    
      // this.witnessForm.controls['taluka'].setValue(this.GetWitnessData[i].districtcode);
      // this.witnessForm.controls['hobli'].setValue(this.GetWitnessData[i].districtcode);
      this.witnessForm.controls['City'].setValue(this.GetWitnessData[i].villagecode);
      this.witnessForm.controls['POARelativeName'].setValue(this.GetWitnessData[i].relativename);
     
  }
}

CreateExecObject() {
  var test: any = [];
  this.links = [];
  let tabNumber = 0;
  var i = 1;
  var witnessid = null 
  this.GetWitnessData.forEach(data => {
    console.log(data);
    if(data.witnessid!="")
  {
    witnessid=data.witnessid;
  }
    tabNumber = i;
    this.newWitness['witnessId'] = witnessid;
    this.newWitness['FirstName'] = data.name;
    this.newWitness['MiddleName'] = data.middlename;
    this.newWitness['LastName'] = data.lastname;
    this.newWitness['Age'] = data.age;
    this.newWitness['Sex'] = data.sex;
    this.newWitness['Profession'] = data.profession;
    this.newWitness['HouseNo'] = data.houseno;
    this.newWitness['street'] = data.address;
    this.newWitness['State'] = data.statecode;
    this.newWitness['District'] = data.districtcode;
    this.newWitness['taluka'] = data.talukcode;
    this.newWitness['hobli'] = data.hoblicode;
    this.newWitness['City'] = data.villagecode;
    this.newWitness['Pincode'] = data.pincode;
    this.newWitness['Relationship'] = data.relation;
    this.newWitness['RelativeName'] = data.relativename;
    if(data.iscliment)
    {
      this.newWitness['chkCL']="option6";
    }
    if(data.isexicutent)
    {
      this.newWitness['chkEx']="option7";
    }
   
    this.links.push({ "name": "WITNESS-" + i, ...this.newWitness });
    i++;
  });
  this.tabIndex = 0;
  this.setform(JSON.parse(JSON.stringify(this.links[0])));
}

deletewitness(index) {
  witnessid=this.links[index]['witnessId'];
  var witnessid = {
   "witnessIds": witnessid,
  };
  if(witnessid!=null){
  this.kaveriService.deleteWitness(witnessid).subscribe(
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
