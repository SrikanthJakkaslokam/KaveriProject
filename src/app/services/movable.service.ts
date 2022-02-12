import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovableService {
 
  totalunitssqf:any = 1200;
  TotalGuntaorCent = 5;
  TotalAmount:any ;
  TotalAmountNonagri :any;
  removedpercentage:any;
  localurl:string = 'http://localhost:33200' ;
  ProdUrl: string = "http://localhost:8080";
  DevUrl: string = "http://csgkaveridev.centralindia.cloudapp.azure.com:8001/api/";
  StageUrl: string = "http://localhost:8080";
   baseUrl: string = this.DevUrl;
 
  
  constructor(private http: HttpClient) { }


  SaveMiscellaneousPropertiesDetails(codes): Observable<any> {
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl+'Save_MovableProperty',codes, { headers });
  }
  FetchMiscellaneousPropertiesDetails(applicationdata): Observable<any> {
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl+'GetMovablePropertyData',applicationdata, { headers });
  }

}
