import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EcserviceService {


    // baseprodUrl: string = "http://49.206.243.85:8080";
  // baseprodUrl: string = "http://10.10.133.200:8080";
  ProdUrl: string = "http://localhost:8080";
  DevUrl: string = "http://csgkaveridev.centralindia.cloudapp.azure.com:8001/api/";
  StageUrl: string = "http://localhost:8080";
  baseUrl: string = this.DevUrl;
  ecdocSerachUrl: string = "http://csgkaveridev.centralindia.cloudapp.azure.com";

  public IsLoggedIn: boolean = false;
  IsForgotPassword: boolean = false;

  constructor(private http: HttpClient) { }

  GenerateApplicationNumber(ApplicantData): Observable<any> {
    debugger
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    //return this.http.post(this.baseUrl + '/DashboardAPI/api/Dashboard/ApplicationStatusDetails',CitizenId ,{ headers });
    return this.http.post(this.baseUrl + 'GenerateApplicationNumber', ApplicantData, { headers });
    //return this.http.post('http://localhost:8080/DashboardAPI/api/Dashboard/ApplicationStatusDetails',CitizenId ,{ headers });

  }

  loginOtp(phone: string): Observable<any> {
    var Phone = {
      "mobileNumber": phone,
      "templateId": "1107161036554226462"
    };
    console.log(JSON.stringify(Phone));
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl + 'SendOTPMSGWithTemplateIdAsync', Phone, { headers });
  }

  propertyNumberType(): Observable<any> {

    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl + 'GetPropertyTypeMasterAsync', { headers });
  }

  // ecSearchdocView(pid) {
  //   debugger;
  //   const headers = {
  //     'Content-type': 'application/json',
  //     'Accept': 'application/json',
  //     // 'Access-Control-Allow-Origin':'*'
  //   }
  //   // return this.http.get(this.baseUrl + `:8090/api/Service/EaasthiGetProprtyPDF/` + pid, { headers });
  //   return this.http.get(this.baseUrl + `:8090/api/Service/GetBase64StringForPDF/`+ pid, { headers });
  //  }

  ecdocView(ecdoc) {
    debugger;
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      // 'Access-Control-Allow-Origin':'*'
    }
    // return this.http.get(this.baseUrl + `:8090/api/Service/EaasthiGetProprtyPDF/` + pid, { headers });
    return this.http.post(this.baseUrl + `ECSearch`, ecdoc, { headers });
  }

  saveEcData(saveECdata){
    debugger;
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json',
    }
    return this.http.post(this.baseUrl + `InsertECApplication`, saveECdata, { headers });
  }

  getMasterEcData(applicationNum){
    debugger;
    // const headers = {
    //   'Content-type': 'application/json',
    //   'Accept': 'application/json',
    // }
    //return this.http.post(this.baseUrl + `:8098/api/OnlineEC/ECSearch/` + applicationNum);
    return this.http.post(this.baseUrl + `FetchECApplication/`+applicationNum, applicationNum)
  }

  applyForEsign(dataForForm22){
    debugger;
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json',
    }
    return this.http.post(this.baseUrl + `Form22ESign`, dataForForm22, { headers });
  }

  esignPDF(esignedArray){
    debugger;
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json',
    }
    return this.http.post(this.baseUrl + `eSingPDF`, esignedArray, { headers });
  }


  esignedPDF(dataForEsigned){
    debugger;
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json',
    }
    return this.http.post(this.baseUrl + `ProcesseSignResponse`, dataForEsigned, { headers });
  }

  fetchECRecord(ecInputParameter){
    debugger;
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json',
    }
    return this.http.post(this.baseUrl + `ECSearchPDF`, ecInputParameter, { headers });
  }

}
