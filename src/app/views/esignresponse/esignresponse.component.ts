import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params } from '@angular/router';
import { EcserviceService } from "../../services/ecservice.service";

@Component({
  selector: 'app-esignresponse',
  templateUrl: './esignresponse.component.html',
  styleUrls: ['./esignresponse.component.scss']
})
export class EsignresponseComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private ecservice: EcserviceService) { }

  base64Form22 = "";
  eSignRequestId:string = "";
  errorMessage = "";


  ngOnInit(): void {

      this.activatedRoute.queryParams.subscribe(
      (data: any) => {
        this.eSignRequestId = data.id;
        let dataForEsigned = {
          Base64Pdf: localStorage.getItem('base64Form22'),      
          eSignRequestId: this.eSignRequestId      
        };
        this.ecservice.esignedPDF(dataForEsigned).subscribe(
          (data: any) => {
            if(data)
            this.Test(data.signedPdfBase64);
          }
          , e => {
            if (e.error) {
              this.errorMessage = e.error.error_description;
            }
          })
      })

  }
  
  Test(base64: any) {
    debugger
    const byteArray = new Uint8Array(
      atob(base64)
        .split("")
        .map(char => char.charCodeAt(0))
    );
    const file = new Blob([byteArray], { type: "application/pdf" });
    const fileURL = URL.createObjectURL(file);
    //this.pdf =fileURL;
    //console.log(this.pdf);
    document.querySelector("iframe").src = fileURL;
    //window.open(fileURL);
  }
  

}
