import { Injectable } from '@angular/core';
import { HttpService } from '../../shared/services/http.service';
import { HttpReq } from '../../shared/common/app.entity';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourtOrderService {
  REST_TYPE_GET = 'get';
  REST_TYPE_POST = 'post';
  REST_TYPE_PUT = 'put';
  REST_TYPE_DELETE = 'delete';
  
  constructor(
    private httpService: HttpService,
    private httpClient: HttpClient
  ) { }

  fetchCourtOrder(data) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_POST;
    httpReq.url = `${environment.baseUrl}:8096/api/CourtOrder/FetchCourtOrder`;
    httpReq.showLoader = true;
    httpReq.body = data;
    return this.httpService.restCall(httpReq, false);
  }

  getPropertyType() {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_POST;
    httpReq.url = `${environment.baseUrl}:${environment.port8096}/api/GetPropertyTypeMasterAsync`;
    httpReq.showLoader = true;
    httpReq.body = {};
    return this.httpService.restCall(httpReq, false);
  }
  insertCourtOrder(data) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_POST;
    httpReq.url = `${environment.baseUrl}:8096/api/CourtOrder/InsertCourtOrder`;
    httpReq.showLoader = true;
    httpReq.body = data;
    return this.httpService.restCall(httpReq, false);
  }
  sro() {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_POST;
    httpReq.url = `${environment.baseUrl}:${environment.port8096}/api/Masters/GetSROMasterAsync`;
    httpReq.showLoader = true;
    httpReq.body = {};
    return this.httpService.restCall(httpReq, false);
  }
}
