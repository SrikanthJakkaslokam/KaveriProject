import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DocumentapprovalService {
  localurl: any = "http://localhost:33200";
  ProdUrl: string = "http://localhost:8080";
  DevUrl: string = "http://csgkaveridev.centralindia.cloudapp.azure.com:8089";
  scheduleURL: string =
    "http://csgkaveridev.centralindia.cloudapp.azure.com:8088/";
  partyinfo: string =
    "http://csgkaveridev.centralindia.cloudapp.azure.com:8087";
  documentApprovalBaseURL: string = `http://csgkaveridev.centralindia.cloudapp.azure.com:8001/`;
  documentApprovalSaveURL: string = `http://csgkaveridev.centralindia.cloudapp.azure.com:8001/`;
  documentforApprovalPropertyDataURL = `http://csgkaveridev.centralindia.cloudapp.azure.com:8001/`;
  viewDocumentForApprovalDataURL = `http://csgkaveridev.centralindia.cloudapp.azure.com:8099/`;
  StageUrl: string = "http://localhost:8080";
  baseUrl: string = this.DevUrl;

  constructor(private http: HttpClient) {}

  GetPropertyScheduledetails(applicationNum): Observable<any> {
    const headers = {
      "Content-type": "application/json",
      Accept: "application/json",
    };
    return this.http.post(
      this.documentApprovalBaseURL + "api/GetPropertySchdule",applicationNum,{ headers });
  }

  Fetchfeecalculationdata(applicationnumber): Observable<any> {    
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.documentApprovalBaseURL + "api/GetMarketValuationAndFeeCalculation", applicationnumber, { headers });
  }

  GetPartyinfodetails(applicationNum): Observable<any> {
    const headers = {
      "Content-type": "application/json",
      Accept: "application/json",
    };
    return this.http.post(
      this.documentApprovalBaseURL + "api/GetPartyDetails",
      applicationNum,
      { headers }
    );
  }

  propertyMaster(master): Observable<any> {
    const headers = {
      "Content-type": "application/json",
      Accept: "application/json",
    };
    return this.http.post(
      this.documentApprovalBaseURL + "api/GetPropertyDataBhoomi",
      master,
      { headers }
    );
  }
  

  GetPropertyCourtAndLiabilityData(master): Observable<any> {
    const headers = {
      "Content-type": "application/json",
      Accept: "application/json",
    };
    return this.http.post(
      this.documentforApprovalPropertyDataURL + "api/GetPropertyCourtAndLiabilityData",
      master,
      { headers }
    );
  }

  GetPropertyCourtAndLiabilityData_(master): Observable<any> {
    const headers = {
      "Content-type": "application/json",
      Accept: "application/json",
    };
    return this.http.post(
      this.scheduleURL + "api/PropertySchedule/GetPropertyCourtAndLiabilityData",
      master,
      { headers }
    );
  }

  courtorder(master): Observable<any> {
    const headers = {
      "Content-type": "application/json",
      Accept: "application/json",
    };
    return this.http.post(
      this.documentApprovalBaseURL + "api/GetCourtOrderDetails",
      master,
      { headers }
    );
  }

  GetWintnessInfo(applicationNum): Observable<any> {
    const headers = {
      "Content-type": "application/json",
      Accept: "application/json",
    };
    return this.http.post(
      this.documentApprovalBaseURL + "api/GetFetchWitness",
      applicationNum,
      { headers }
    );
  }

  postFile(fileToUpload): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload);
    return this.http.post(
      this.viewDocumentForApprovalDataURL + "api/DocumentApproval/SaveDeedDcoumentApproval",
      formData
    );
  }

  saveDocumentApprovalData(documentApprovalData): Observable<any> {
    const headers = {
      "Content-type": "application/json",
      Accept: "application/json",
    };
    return this.http.post(
      this.documentApprovalSaveURL + 'api/ApproveDocumentAsync',
      documentApprovalData,
      { headers }
    );
  }

  getsro(deptId): Observable<any> {
    const headers = {
      "Content-type": "application/json",
      Accept: "application/json",
    };
    return this.http.post(
      this.documentApprovalBaseURL + "api/FetchDROForSRO",
      deptId,
      { headers }
    );
  }

  

  fetchSroDeedDocExcutionDate(applicationnumber): Observable<any> {
    const headers = {
      "Content-type": "application/json",
      Accept: "application/json",
    };
    return this.http.post(
      this.viewDocumentForApprovalDataURL + "api/DocumentApproval/FetchDocumentView",
      applicationnumber,
      { headers }
    );
  }

  getDeedDocument(filename): Observable<any> {
    const headers = {
      "Content-type": "application/json",
      Accept: "application/json",
    };
    return this.http.post(
      this.viewDocumentForApprovalDataURL + "api/DocumentApproval/FetchDocument",
      filename,
      { headers }
    );
  }

  FetchmarketAndConsideration(application){
    const headers = {
      "Content-type": "application/json",
      Accept: "application/json",
    };
    return this.http.post(
      this.scheduleURL + "api/PropertySchedule/GetPropertyMasterOnly",
      application,
      { headers }
    );
  }






  // postFile(fileToUpload: File): Observable<boolean> {
  //   const endpoint = 'your-destination-url';
  //   const formData: FormData = new FormData();
  //   formData.append('fileKey', fileToUpload, fileToUpload.name);
  //   return this.documentApprovalSaveURL + 'api/ApplicationStatus/ApproveDocumentAsync'.post(endpoint, formData, { headers: endpoint }).map(() => { return true; }).catch((e) => this.handleError(e));
  // }

}
