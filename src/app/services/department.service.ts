import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  DevUrl: string = "http://csgkaveridev.centralindia.cloudapp.azure.com:8001/api/";
  baseUrl: string = this.DevUrl;

  constructor(private http: HttpClient) { }

  deptlogin(user): Observable<any> {

    console.log(JSON.stringify(user));
    const headers = {

      'Content-type': 'application/json',
      'Accept': 'application/json'

    }
    return this.http.post(this.baseUrl + 'DepartmentUserData', user, { headers });
  }

  updateDeoRegistrationStatus(data): Observable<any> {
    const headers = {

      'Content-type': 'application/json',
      'Accept': 'application/json'

    }
    return this.http.post(this.baseUrl + 'UpdateDeoRegistrationStatus', data, { headers });
  }

  fetchSfdaApplicationsBySRO(data): Observable<any> {
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(`${environment.baseUrl}:${environment.port8095}/api/AllocateApplication/FetchSfdaApplicationsBySRO`, data, { headers });
  }
  fetchSfdaApplicationsByID(data): Observable<any> {
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(`${environment.baseUrl}:${environment.port8095}/api/AllocateApplication/FetchSfdaApplicationsByID`, data, { headers });
  }
  fetchAllocateApplication(application): Observable<any> {
    const headers = {

      'Content-type': 'application/json',
      'Accept': 'application/json'

    }
    return this.http.post(this.baseUrl + 'FetchAllocateApplicationDataAsync', application, { headers });
  }

  saveEvaluation(data): Observable<any> {
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(`${environment.baseUrl}:${environment.p8096}/api/Evaluation/SaveEvaluation`, data, { headers });
  }

  fetchApplicationDEODataAsync(application): Observable<any> {
    const headers = {

      'Content-type': 'application/json',
      'Accept': 'application/json'

    }
    return this.http.post(this.baseUrl + 'FetchApplicationDEODataAsync', application, { headers });
  }

  fetchAllocateApplicationsBySRO(application): Observable<any> {
    const headers = {

      'Content-type': 'application/json',
      'Accept': 'application/json'

    }
    return this.http.post(`${environment.baseUrl}:${environment.port8095}/api/AllocateApplication/fetchAllocateApplicationsBySRO`, application, { headers });
  }

  fetchApplicationReview(): Observable<any> {
    const headers = {

      'Content-type': 'application/json',
      'Accept': 'application/json'

    }
    return this.http.post(this.baseUrl + 'GetApplicationReview', { headers });
  }

  deoData(list): Observable<any> {
    const headers = {

      'Content-type': 'application/json',
      'Accept': 'application/json'

    }
    return this.http.post(this.baseUrl + 'FetchAllocateApplicationDEODetailsDataAsync', list, { headers });
  }

  applicationCount(count): Observable<any> {
    const headers = {

      'Content-type': 'application/json',
      'Accept': 'application/json'

    }
    return this.http.post(this.baseUrl + 'FetchAllocationApplicationCountDataAsync', count, { headers });
  }

  notApproveSend(send): Observable<any> {
    const headers = {

      'Content-type': 'application/json',
      'Accept': 'application/json'

    }
    return this.http.post(this.baseUrl + 'UpdateApplicationStatusDataAsync', send, { headers });
  }

  allocateSdaFda(send): Observable<any> {
    const headers = {

      'Content-type': 'application/json',
      'Accept': 'application/json'

    }
    return this.http.post('http://csgkaveridev.centralindia.cloudapp.azure.com:8095/api/AllocateApplication/UpdateApplicationStatusDataAsync', send, { headers });
  }

  propertyMaster(master): Observable<any> {
    const headers = {

      'Content-type': 'application/json',
      'Accept': 'application/json'

    }
    // return this.http.post(this.baseUrl + ':8091/api/KaveriSearch/GetPropertyMasterData',master, { headers });
    // return this.http.post(this.baseUrl + ':  8088/api/PropertySchedule/GetPropertyMasterDetails',master, { headers });
    return this.http.post(this.baseUrl + 'GetPropertyDataBhoomi', master, { headers });
  }

  marketFeeCalculation(calculation): Observable<any> {
    const headers = {

      'Content-type': 'application/json',
      'Accept': 'application/json'

    }
    // return this.http.post(this.baseUrl + ':8094/api/FeeCalculation/FetchMarketandFeeData',calculation, { headers });
    return this.http.post(this.baseUrl + 'GetMarketValuationAndFeeCalculation', calculation, { headers });
  }
  GetOwners(owner) {
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl + 'GetPropertyDataBhoomi', owner, { headers });
  }
  fetchAllocateApplicationDEODetailsDataAsync(data) {
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(`${environment.baseUrl}:${environment.port8095}/api/AllocateApplication/FetchAllocateApplicationDEODetailsDataAsync`, data, { headers });
  }
}