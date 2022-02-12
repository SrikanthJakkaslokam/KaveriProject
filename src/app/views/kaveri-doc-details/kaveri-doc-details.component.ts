import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { KaveriService } from '../../services/kaveri.service';

@Component({
  selector: 'app-kaveri-doc-details',
  templateUrl: './kaveri-doc-details.component.html',
  styleUrls: ['./kaveri-doc-details.component.scss']
})
export class KaveriDocDetailsComponent implements OnInit {
  kaveridocDetailsForm: FormGroup;

  dataSource: any[];
  popupVisible = false;
  bhumipopupVisible = false;
  positionOf: string;
  errorMessage: string = "";
  selecteddistvalue: string = "";
  selectedtalukvalue: string = "";
  selectedhoblivalue: string = "";
  selectedvillagevalue: string = "";
  selectedpropertyType: string = "";
  loggedinUser: string = "";
  submitted = false;

  distmodel: boolean = false;
  talukmodel: boolean = false;
  hoblimodel: boolean = false;
  villagemodel: boolean = false;

  districT: string = "";
  talUkA: string = "";
  towN: string = "";
  vilLagE: string = "";
  propertytype: string = "";
  propertyid: string = "";
  dateTrxn: string = "";
  propNo:string = "";
  docNo:string = "";
  districtList: Array<any> = [];
  talukaList: Array<any> = [];
  hobliList: Array<any> = [];
  villageList: Array<any> = [];
  PropertyTypeList: Array<any> = [];
  constructor(public router: Router, private kaveriService: KaveriService, private formBuilder: FormBuilder,private datePipe: DatePipe) { }

  ngOnInit() {
    this.kaveridocDetailsForm = this.formBuilder.group({
      district: ["", Validators.required],
      taluka: ["", Validators.required],
      hobli: ["", Validators.required],
      village: ["", Validators.required],
      propertyType: ["", Validators.required],
      propertyID: ["", Validators.required],
      propertyNo: ["", Validators.required],
      transactionDate: ["", Validators.required],
      
    });
    this.District();
    this.loggedinUser = localStorage.getItem('loggedinuser');
    this.PropertyType();
  }
  get f() { 
    return this.kaveridocDetailsForm.controls; 
  }
  showInfo() {
    this.popupVisible = true;
  }
  showbhumiInfo() {
  this.bhumipopupVisible = true;
  }

onSubmit() {
  debugger;
  this.submitted = true;
  if (this.kaveridocDetailsForm.invalid) {
    return;
}
if (this.kaveridocDetailsForm.valid) {
  this.router.navigateByUrl('/kaveri-doc-details-results');
}
  console.log(this.kaveridocDetailsForm);
  this.dateTrxn = this.kaveridocDetailsForm.get("transactionDate").value;
  var details = {
    "districtCode": this.kaveridocDetailsForm.get("district").value,
    "talukCode": this.kaveridocDetailsForm.get("taluka").value,
    "hobliCode": this.kaveridocDetailsForm.get("hobli").value,
    "villageCode": this.kaveridocDetailsForm.get("village").value,
    "proptype": this.kaveridocDetailsForm.get("propertyType").value,
    "propid": this.kaveridocDetailsForm.get("propertyID").value,
    "propno": this.kaveridocDetailsForm.get("propertyNo").value,
    "date": this.datePipe.transform(this.dateTrxn, 'dd-MM-yyyy'),
  };
  localStorage.setItem('distrct', this.kaveridocDetailsForm.get("district").value);
  localStorage.setItem('talukA',this.kaveridocDetailsForm.get("taluka").value );
  localStorage.setItem('hoblitowN',this.kaveridocDetailsForm.get("hobli").value);
  localStorage.setItem('indexvillagE',this.kaveridocDetailsForm.get("village").value );
  localStorage.setItem('proptype',this.kaveridocDetailsForm.get("propertyType").value);
  localStorage.setItem('propid', this.kaveridocDetailsForm.get("propertyID").value);
  localStorage.setItem('date', this.datePipe.transform(this.dateTrxn, 'dd-MM-yyyy'));
 
  // console.log(JSON.stringify(details));
  this.kaveriService.bhoomisearch(details).subscribe(
    (data: any) => {
      console.log(data);
      data = data['bhoomi_surveyno'];
      data = data['surveynodetails'];
      data = data['surveyno'];
      console.log(data);
      const filterdata = this.filterrowdata(data);
      this.dataSource = [...filterdata];
    }, e => {
      if (e.error) {
        this.errorMessage = e.error.error_description;
      }
    }
  )
}

ondistrictChange($event){
  let text1 = $event.target.options[$event.target.options.selectedIndex].text;
  this.districT = text1;
  localStorage.setItem("dist", this.districT);
  }
ontalukaChange($event){
    let text2 = $event.target.options[$event.target.options.selectedIndex].text;
    this.talUkA = text2;
    localStorage.setItem("taluk", this.talUkA);
    }
onhobliChange($event){
      let text3 = $event.target.options[$event.target.options.selectedIndex].text;
      this.towN = text3;
      this.hobliList.forEach(element => {
        if(element.hoblinamee == this.towN){
          debugger;
          localStorage.setItem("bhoomihoblicode", element.bhoomihoblicode);
          localStorage.setItem("hobliname", element.hoblinamee);
        }
        
      });
      }
onvillageChange($event){
        let text4 = $event.target.options[$event.target.options.selectedIndex].text;
        this.vilLagE = text4;
        this.villageList.forEach(element => {
          if(element.villagenamee == this.vilLagE){
            debugger;
         
            localStorage.setItem("bhoomiDistrictCode", element.bhoomiDistrictCode);
            localStorage.setItem("bhoomitalukcode", element.bhoomitalukcode);
            localStorage.setItem("bhoomivillagecode", element.bhoomivillagecode);
            localStorage.setItem("villagecode", element.villagecode);
            localStorage.setItem("villagename", element.villagenamee);

         
          }
          
        });
        }

District() {
  this.kaveriService.district().subscribe(
    (data: any) => {
      console.log(data);
      if(data.length != 0) {
        this.districtList = data;
        if(this.kaveridocDetailsForm.get("district").value != 0) {
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
  if(this.kaveridocDetailsForm.get("district").value != 0) {
  this.Taluka();
  }
}

Taluka() {
  var taluk = {
    "districtCode": this.selecteddistvalue,
  };
  // console.log(JSON.stringify(taluk))
  if(taluk != undefined) {
    this.kaveriService.taluka(taluk).subscribe(
      (data: any) => {
        console.log(data);
        if(data.length != 0) {
        this.selectedtalukvalue = this.kaveridocDetailsForm.get("taluka").value;
        this.talukaList = data;
        if(this.kaveridocDetailsForm.get("taluka").value != 0) {
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
  if(this.kaveridocDetailsForm.get("taluka").value != 0) {
    this.Hobli();
  }
}

Hobli() {
  var hoblireq = {
    "talukaCode": this.selectedtalukvalue,
  };
  if(hoblireq != undefined) {
  this.kaveriService.hobli(hoblireq).subscribe(
    (data: any) => {
      console.log(data);
      if(data.length != 0) {
      this.hobliList = data;
      this.selectedhoblivalue = this.kaveridocDetailsForm.get("hobli").value;
      if(this.kaveridocDetailsForm.get("hobli").value != 0) {
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

onhobliValuechange(hobliValue) {
  this.selectedhoblivalue = hobliValue;
  if(this.kaveridocDetailsForm.get("hobli").value != 0) {
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

filterrowdata(data) {
  data.forEach((currentValue, index) => {
    localStorage.setItem('landCode', currentValue.landcode);
    if (currentValue.restriction == "Y" && currentValue.restrictiontype  == "PY") {
      currentValue.restrictiondescription = "Y";
      // console.log(currentValue.restrictiondescription);
    }
     else currentValue.restrictiondescription = "N";
  });
  return data;
}
PropertyType() {
  debugger;
  this.kaveriService.PropertyType().subscribe(
    (data: any) => {
      console.log(data);
      if(data.length != 0) {
        this.PropertyTypeList = data;
        console.log(this.PropertyTypeList);
        debugger;
      }
    }, e => {
      if (e.error) {
        this.errorMessage = e.error.error_description;
      }
    }
  )
}
}
