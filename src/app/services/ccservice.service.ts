import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CcserviceService {


    // baseprodUrl: string = "http://49.206.243.85:8080";
  // baseprodUrl: string = "http://10.10.133.200:8080";
  ProdUrl: string = "http://localhost:8080";
  DevUrl: string = "http://csgkaveridev.centralindia.cloudapp.azure.com:8001/api/";
  StageUrl: string = "http://localhost:8080";
  baseUrl: string = this.DevUrl;

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

  ccOTP(phone: string): Observable<any> {
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

  ccSearchdocView(searchdata) {
    debugger;
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      // 'Access-Control-Allow-Origin':'*'
    }
    // return this.http.get(this.baseUrl + `:8090/api/Service/EaasthiGetProprtyPDF/` + pid, { headers });
    return this.http.post(this.baseUrl + `CCSearchProperty`, searchdata, { headers });
  }

  district(): Observable<any> {

    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl + 'GetDistrictAsync', { headers });
  }


  documenttype(): Observable<any> {
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl + 'Getdocumenttype', { headers });
  }

  sro(): Observable<any> {
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl + 'GetSROMasterAsync', { headers });
  }

  booktype(): Observable<any> {
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl + 'GetBooktype', { headers });
  }

  registrationyear(): Observable<any> {
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl + 'GetYrRegistration', { headers });
  }

  saveCCApplicationData(saveCCapplicationlData): Observable<any> {
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl + 'SaveCCApplication', saveCCapplicationlData, { headers });
  }

}
