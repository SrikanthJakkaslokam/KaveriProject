import { Injectable } from '@angular/core';
import { HttpService } from '../../shared/services/http.service';
import { HttpReq } from '../../shared/common/app.entity';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  REST_TYPE_GET = 'get';
  REST_TYPE_POST = 'post';
  REST_TYPE_PUT = 'put';
  REST_TYPE_DELETE = 'delete';
  
  constructor(
    private httpService: HttpService,
    private httpClient: HttpClient
  ) { }

  getPropertyMasterData(data) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_POST;
    httpReq.url = `${environment.baseUrl}:${environment.port8088}/api/GetPropertyMasterDetails`;
    httpReq.showLoader = true;
    httpReq.body = data;
    return this.httpService.restCall(httpReq, false);
  }
  searchCourtOrder(data) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_POST;
    httpReq.url = `${environment.baseUrl}:${environment.kaveriSearchPortNo}/api/SearchCourtOrder`;
    httpReq.showLoader = true;
    httpReq.body = data;
    return this.httpService.restCall(httpReq, false);
  }
  getOwnerdetailsFromPropertyID(data) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_POST;
    httpReq.url = `${environment.baseUrl}:${environment.propertySchedulePortNo}/api/GetOwnerdetailsFromPropertyID`;
    httpReq.showLoader = true;
    httpReq.body = data;
    return this.httpService.restCall(httpReq, false);
  }
  getPartyInfoDetails(data) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_POST;
    httpReq.url = `${environment.baseUrl}:${environment.partyInfoPortNo}/api/GetPartyInfoDetails`;
    httpReq.showLoader = true;
    httpReq.body = data;
    return this.httpService.restCall(httpReq, false);
  }
  getWitnessInfoDetails(data) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_POST;
    httpReq.url = `${environment.baseUrl}:${environment.port8099}/api/GetFetchWitness`;
    httpReq.showLoader = true;
    httpReq.body = data;
    return this.httpService.restCall(httpReq, false);
  }
  getPropertyScheduleDetails(data) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_POST;
    httpReq.url = `${environment.baseUrl}:${environment.propertySchedulePortNo}/api/GetPropertyScheduleDetails`;
    httpReq.showLoader = true;
    httpReq.body = data;
    return this.httpService.restCall(httpReq, false);
  }
  fetchMarketandFeeData(data) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_POST;
    httpReq.url = `${environment.baseUrl}:${environment.feeCalculationPortNo}/api/FetchMarketandFeeData`;
    httpReq.showLoader = true;
    httpReq.body = data;
    return this.httpService.restCall(httpReq, false);
  }
  fetchDocumentSummary(data) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_POST;
    httpReq.url = `${environment.baseUrl}:${environment.port8096}/api/FetchDocumentSummary`;
    httpReq.showLoader = true;
    httpReq.body = data;
    return this.httpService.restCall(httpReq, false);
  }
  updateDeoRegistrationStatus(data) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_POST;
    httpReq.url = `${environment.baseUrl}:${environment.port8096}/api/UpdateDeoRegistrationStatus`;
    httpReq.showLoader = true;
    httpReq.body = data;
    return this.httpService.restCall(httpReq, false);
  }
  saveDocumentMaster(data) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_POST;
    httpReq.url = `${environment.baseUrl}:${environment.port8096}/api/SaveDocumentMaster`;
    httpReq.showLoader = true;
    httpReq.body = data;
    return this.httpService.restCall(httpReq, false);
  }
  fetchPendingRegNumberDataAsync(data) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_POST;
    httpReq.url = `${environment.baseUrl}:${environment.port8096}/api/FetchPendingRegNumberDataAsync`;
    httpReq.showLoader = true;
    httpReq.body = data;
    return this.httpService.restCall(httpReq, false);
  }
  fetchFinalRegNumberDataAsync(data) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_POST;
    httpReq.url = `${environment.baseUrl}:${environment.port8096}/api/FetchFinalRegNumberDataAsync`;
    httpReq.showLoader = true;
    httpReq.body = data;
    return this.httpService.restCall(httpReq, false);
  }
  printAcknowledgementDataAsync(data) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_POST;
    httpReq.url = `${environment.baseUrl}:${environment.port8096}/api/PrintAcknowledgementDataAsync`;
    httpReq.showLoader = true;
    httpReq.body = data;
    return this.httpService.restCall(httpReq, false);
  }
  saveImageDataAsync(data) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_POST;
    httpReq.url = `${environment.baseUrl}:${environment.port8096}/api/SaveImageDataAsync`;
    httpReq.showLoader = true;
    httpReq.body = data;
    return this.httpService.restCall(httpReq, false);
  }
  retrieveImageDataAsync(data) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_POST;
    httpReq.url = `${environment.baseUrl}:${environment.port8096}/api/RetrieveImageDataAsync`;
    httpReq.showLoader = true;
    httpReq.body = data;
    return this.httpService.restCall(httpReq, false);
  }
  TestMethod(method: string) {
    const headers = {
      'Content-type': 'application/json',
      'async': false,
      'crossDomain': true,
    }
    return this.httpClient.get("http://localhost:8004/mfs100/info");
  }

  PostMFS100Data(method: string, jsonData: any) {
    const headers = {
      'Content-type': 'application/json',
    }

    let MFS100Request = {
      "Quality": 60,
      "TimeOut": 30
    };
    let jsondata = JSON.stringify(MFS100Request);
    return this.httpClient.post("http://localhost:8004/mfs100/capture", { async: false, crossDomain: true, data: jsondata }, { headers })
  }
}

