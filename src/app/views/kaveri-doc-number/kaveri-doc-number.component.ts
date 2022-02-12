import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { displayPartsToString } from 'typescript';
import { KaveriService } from '../../services/kaveri.service';

@Component({
  selector: 'app-kaveri-doc-number',
  templateUrl: './kaveri-doc-number.component.html',
  styleUrls: ['./kaveri-doc-number.component.scss']
})
export class KaveriDocNumberComponent implements OnInit {
  loggedinUser: string = "";
  kaveridocNumberForm: FormGroup;

  dataSource: any[];
  popupVisible = false;
  bhumipopupVisible = false;
  positionOf: string;
  errorMessage: string = "";
  selecteddistvalue: string = "";
  selectedtalukvalue: string = "";
  selectedhoblivalue: string = "";
  selectedvillagevalue: string = "";
  submitted = false;

  distmodel: boolean = false;
  talukmodel: boolean = false;
  hoblimodel: boolean = false;
  villagemodel: boolean = false;

  disTrict: string = "";
  talUka: string = "";
  town: string = "";
  vilLage: string = "";
  docNo: string = "";
  dateTrxn: Date;

  districtList: Array<any> = [];
  talukaList: Array<any> = [];
  hobliList: Array<any> = [];
  villageList: Array<any> = [];
  bhoomidata: any[] = [];
  bhoomisource: any[] = [];
  surveynum: any[] = [];
  constructor(public router: Router, private kaveriService: KaveriService, private formBuilder: FormBuilder, private datePipe: DatePipe) { }

  ngOnInit() {
    this.loggedinUser = localStorage.getItem('loggedinuser');
    this.kaveridocNumberForm = this.formBuilder.group({
      district: ["", Validators.required],
      taluka: ["", Validators.required],
      hobli: ["", Validators.required],
      village: ["", Validators.required],
      documentNo: ["", Validators.required],
      transactionDate: ["", Validators.required]
    });
    this.District();
  }
  get f() {
    return this.kaveridocNumberForm.controls;
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
    if (this.kaveridocNumberForm.invalid) {
      return;
    }
    else{
      
    
    console.log(this.kaveridocNumberForm);
    this.dateTrxn = this.kaveridocNumberForm.get("transactionDate").value;
    var docno = {
      "districtCode": this.kaveridocNumberForm.get("district").value,
      "talukCode": this.kaveridocNumberForm.get("taluka").value,
      "hobliCode": this.kaveridocNumberForm.get("hobli").value,
      "villageCode": this.kaveridocNumberForm.get("village").value,
      "documentNo": this.kaveridocNumberForm.get("documentNo").value,
      // "date": this.kaveridocNumberForm.get("transactionDate").value
      "date": this.datePipe.transform(this.dateTrxn, 'dd-MM-yyyy'),

    };
    // localStorage.setItem('dist', this.disTrict);
    // localStorage.setItem('taluk',this.talUka );
    // localStorage.setItem('hoblitown',this.town );
    // localStorage.setItem('villagecode',this.vilLage );
    localStorage.setItem('docNo', this.kaveridocNumberForm.get("documentNo").value);
    localStorage.setItem('date', this.datePipe.transform(this.dateTrxn, 'dd-MM-yyyy'));
    console.log(JSON.stringify(docno));
    this.router.navigateByUrl('/kaveri-doc-number-results');
    // this.kaveriService.kaveriDocNo(docno).subscribe(
    //   (data: any) => {
    //     console.log(data);
    //     data = data['bhoomi_surveyno'];
    //     data = data['surveynodetails'];
    //     data = data['surveyno'];
    //     console.log(data);
    //     const filterdata = this.filterrowdata(data);
    //     this.dataSource = [...filterdata];
    //     this.router.navigateByUrl('/kaveri-doc-number-results');
    //   }, e => {
    //     if (e.error) {
    //       this.errorMessage = e.error.error_description;
    //     }
    //   }
    // )
  }
}

  ondistrictChange($event) {
    let text1 = $event.target.options[$event.target.options.selectedIndex].text;
    this.disTrict = text1;
    localStorage.setItem("dist", this.disTrict);
  }
  ontalukaChange($event) {
    let text2 = $event.target.options[$event.target.options.selectedIndex].text;
    this.talUka = text2;
    localStorage.setItem("taluk", this.talUka);
  }
  onhobliChange($event) {
    let text3 = $event.target.options[$event.target.options.selectedIndex].text;
    this.town = text3;
    this.hobliList.forEach(element => {
      if (element.hoblinamee == this.town) {
      
        localStorage.setItem("bhoomihoblicode", element.bhoomihoblicode);
        localStorage.setItem("hobliname", element.hoblinamee);
      }

    });
  }
  onvillageChange($event) {
    
    let text4 = $event.target.options[$event.target.options.selectedIndex].text;
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

  District() {

    this.kaveriService.district().subscribe(
      (data: any) => {
        console.log(data);
        if (data.length != 0) {
          this.districtList = data;
          if (this.kaveridocNumberForm.get("district").value != 0) {
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
    if (this.kaveridocNumberForm.get("district").value != 0) {
      this.Taluka();
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
            this.selectedtalukvalue = this.kaveridocNumberForm.get("taluka").value;
            this.talukaList = data;
            if (this.kaveridocNumberForm.get("taluka").value != 0) {
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
    if (this.kaveridocNumberForm.get("taluka").value != 0) {
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
          console.log(data);
          if (data.length != 0) {
            this.hobliList = data;
            this.selectedhoblivalue = this.kaveridocNumberForm.get("hobli").value;
            if (this.kaveridocNumberForm.get("hobli").value != 0) {
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
    if (this.kaveridocNumberForm.get("hobli").value != 0) {
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
          console.log(data);
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


  filterrowdata(data) {
    data.forEach((currentValue, index) => {
      localStorage.setItem('landCode', currentValue.landcode);
      if (currentValue.restriction == "Y" && currentValue.restrictiontype == "PY") {
        currentValue.restrictiondescription = "Y";
        // console.log(currentValue.restrictiondescription);
      }
      else currentValue.restrictiondescription = "N";
    });
    return data;
  }
}
