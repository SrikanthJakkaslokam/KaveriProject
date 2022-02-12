import { Component, OnInit } from '@angular/core';
import { KaveriService } from '../../services/kaveri.service';
import { EcserviceService } from '../../services/ecservice.service';
import { CcserviceService } from '../../services/ccservice.service';

import { Router } from '@angular/router';
@Component({
  selector: 'app-application-type',
  templateUrl: './application-type.component.html',
  styleUrls: ['./application-type.component.scss']
})
export class ApplicationTypeComponent implements OnInit {
  loggedinUser: string = "";
  errorMessage: string = "";

  constructor(private kaveriService: KaveriService, private ecservice: EcserviceService, private ccservice: EcserviceService, public router: Router) { }

  ngOnInit() {
    this.loggedinUser = localStorage.getItem('loggedinuser');
  }

  showRegistration() {
    debugger;
    var ApplicantData = {
      "_citizenid": localStorage.getItem('citizenid'),
      "_applicationtypeid": 1
    };
    localStorage.setItem("kaveriResult", "");
    console.log(ApplicantData);
    this.kaveriService.GenerateApplicationNumber(ApplicantData).subscribe(
      (data: any) => {
        console.log(JSON.stringify(data));
        var ApplicacionData = data.applicationNumber;
        console.log(ApplicacionData);
        localStorage.setItem('ApplicationData', ApplicacionData)
        this.router.navigate(['/agricultural/non-agricultural']);
      }, e => {
        if (e.error) {

          this.errorMessage = e.error.error_description;
        }
      }
    )

  }

  show_ec_certificate() {
    debugger;
    var ApplicantData = {
      "_citizenid": localStorage.getItem('citizenid'),
      "_applicationtypeid": 13
    };


    console.log(ApplicantData);
    this.ecservice.GenerateApplicationNumber(ApplicantData).subscribe(
      (data: any) => {

        console.log(JSON.stringify(data));
        var ApplicacionData = data.applicationNumber;
        console.log(ApplicacionData);
        localStorage.setItem('ApplicationData', ApplicacionData)
        this.router.navigate(['/document-details-blockchain-key']);
      }, e => {
        if (e.error) {

          this.errorMessage = e.error.error_description;
        }
      }
    )

  }

  show_cc_certificate() {
    debugger;
    var ApplicantData = {
      "_citizenid": localStorage.getItem('citizenid'),
      "_applicationtypeid": 12
    };


    console.log(ApplicantData);
    this.ccservice.GenerateApplicationNumber(ApplicantData).subscribe(
      (data: any) => {

        console.log(JSON.stringify(data));
        var ApplicacionData = data.applicationNumber;
        console.log(ApplicacionData);
        localStorage.setItem('ApplicationData', ApplicacionData)
        this.router.navigate(['/cc-document-details-blockchain-key']);
      }, e => {
        if (e.error) {

          this.errorMessage = e.error.error_description;
        }
      }
    )

  }


}
