import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { KaveriService } from '../../services/kaveri.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-payment-page',
  templateUrl: './liability-detail.component.html',
  styleUrls: ['./liability-detail.component.scss']
})
export class LiabilityDetailComponent implements OnInit {
  resMsg: string = '';
  liabilityFillingForm: FormGroup;
  liabilityDetailsForm: FormGroup;
  liabilityReportForm: FormGroup;
  loggedinUser: string = '';
  sroNames: Array<any> = [];
  sroList: Array<any> = [];
  books: Array<any> = [];
  liabilityreport: Array<any> = [];
  orderNum: any;
  liabilityNote: any;
  liabilityDate: any;
  liabilityAdditionalNote: any;
  finalRegNum: any;
  propertySchedule:  any;
  propertyNumDetails: any;
  village: any;
  sro: any;
  fromdate: any;
  todate: any;
  liabilityFiling: any;
  financialYears: Array<any> = [];
  submitted: boolean = false;
  showSimilar: boolean = false;
  propertyDetails: any;
  propertyNumberDetails: any;
  finalRegnNum: any;
  execDate: any;
  articleName: any;
  landmark: any;
  propNumDetails: any;
  propDesc: any;
  executant: any;
  claimant: any;
  liabilityDetails: any;
  routerLinks = [{ id: 0, header: "Liability Filing" }, { id: 1, header: "Liablity Report" }];
  constructor(private fb: FormBuilder, private kaveriService: KaveriService, public router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getBook();
    this.getSro();
    this.getSroList();
    this.getFinancialYear();
    this.liabilityFillingForm = this.formBuilder.group({
      sroName: ['', Validators.required],
      bookName: ['', Validators.required],
      financialYear: ['', Validators.required],
      documentNumber: [''],
    });
    this.liabilityDetailsForm = this.formBuilder.group({
      issueDate: ['', Validators.required],
      issuedBy: ['', Validators.required],
      liabilityAmount: ['', Validators.required],
      orderNumber: [''],
      liabilityNote: ['', Validators.required],
    });
    this.liabilityReportForm = this.formBuilder.group({
      sroname: ['', Validators.required],
      fromdate: ['', Validators.required],
      todate: ['', Validators.required],
    });
    this.loggedinUser = localStorage.getItem('loggedinuser');
  }

  getSro() {
    this.kaveriService.getSro().subscribe( res => {
      this.sroNames = res.body;
    });
  }
  getSroList() {
    this.kaveriService.getSro().subscribe( res => {
      this.sroList = res.body;
      console.log(this.sroList)
    });
  }
  getBook() {
    this.kaveriService.getBooks().subscribe( res => {
      this.books = res.body;
    });
  }
  getFinancialYear() {
    this.kaveriService.getFinancialYear().subscribe( res => {
      this.financialYears = res.body;
    });
  }

  get liablityFillingformControl() {
    return this.liabilityFillingForm.controls;
  }
  get liablityDetailsformControl() {
    return this.liabilityDetailsForm.controls;
  }
  get liablityReportformControl() {
    return this.liabilityReportForm.controls;
  }
  searchPropertyDetails() {
    console.log('===called====');
    console.log(this.liabilityFillingForm.get('sroName').value);
    console.log(this.liabilityFillingForm.get('bookName').value);
    console.log(this.liabilityFillingForm.get('financialYear').value);
    console.log(this.liabilityFillingForm.get('documentNumber').value);
    var data =    {
      "srocode": this.liabilityFillingForm.get('sroName').value,
      "bookID": this.liabilityFillingForm.get('bookName').value,
      "financialYear": this.liabilityFillingForm.get('financialYear').value.toString()
    }
    console.log(JSON.stringify(data));
    this.kaveriService.getData(data).subscribe( res => {
      console.log(res)
      console.log(JSON.stringify(res[0]))
      let data = res[0]
      data = data['fn_fetch_liability_details_json_check']
      data = JSON.parse(data);
      this.liabilityFiling = data;
      console.log(data)
      data = data['propnumberdetails']
      this.propertyDetails = data['property_details'];
      this.propertyNumberDetails = data['propertynumberdetails'];
      this.executant = data['executant'];
      this.claimant = data['claimant'];
      this.liabilityDetails = data['liabilitydetails'];
      let similarProperty  = this.liabilityFiling['similarpropdetails'];
      console.log(similarProperty)
      this.finalRegnNum = similarProperty[0].finalregistrationnumber;
      this.execDate = similarProperty[0].executiondate;
      this.articleName = similarProperty[0].articlename;
      this.landmark = similarProperty[0].landmark;
      this.propNumDetails = similarProperty[0].propertynumberdetails;
      this.propDesc = similarProperty[0].propertydescription;
      console.log((this.propertyDetails))
      this.resMsg=res["responseMessage"]
      // console.log(this.resMsg)
    });
  }
  addLiability() {
    
    var add = {
      "liabilityid": null,
      "entrydate":  this.liabilityDetailsForm.get('issueDate').value.toString(),
      "issuedate": this.liabilityDetailsForm.get('issueDate').value.toString(),
      "issuedby": this.liabilityDetailsForm.get('issuedBy').value.toString(),
      "amount": this.liabilityDetailsForm.get('liabilityAmount').value,
      "ordernumber":  this.liabilityDetailsForm.get('orderNumber').value.toString(),
      "liabilitynote": this.liabilityDetailsForm.get('liabilityNote').value.toString(),
      "srocode": 2,
      "userid": 2,
      "drocode": 2,
      "mappingid": null,
      "documentid": 1,
      "propertyid": 1,
      "orderissuedate": "2022-01-05",
      "note": "Liability issued as per Govt regulations"
      
    }
    console.log(JSON.stringify(add));
    this.kaveriService.saveLiabilityDetail(add).subscribe( res => {
      console.log(res)
     
    });
  }
  getLiabilityReport() {
    var report =  {
      "srocode": parseInt(this.liabilityReportForm.get('sroname').value),
      "fromDate": this.liabilityReportForm.get('fromdate').value.toString(),
      "toDate": this.liabilityReportForm.get('todate').value.toString()
    }
    console.log(report);
    this.fromdate = report['fromDate'];
    this.todate = report['toDate'];
    this.kaveriService.liabilityReport(report).subscribe( res => {
      console.log(res.body);
      let data = res.body['liabilityreport'];
      console.log(data[0]);
      this.liabilityreport = data[0];
      console.log(this.liabilityreport['ordernumber'])
      this.orderNum = this.liabilityreport['ordernumber'];
      this.liabilityNote =this.liabilityreport['liabilitynote'];
      this.liabilityDate = this.liabilityreport['liabilitydate'];
      this.liabilityAdditionalNote = this.liabilityreport['liabilityadditionalnote'];
      this.finalRegNum = this.liabilityreport['finalregistrationnumber'];
      this.propertySchedule = this.liabilityreport['propertyschedule'];
      this.propertyNumDetails = this.liabilityreport['propertynumberdetails'];
      this.village = this.liabilityreport['villagenamee']; 
    });
  }
  onsroChange($event) {
    if ($event != "") {
      let text1 = $event.target.options[$event.target.options.selectedIndex].text;
      this.sro = text1;
    }
  }
  showSimilarProperty() {
   this.showSimilar = true; 
  }

  showExactProperty() {

  }
}