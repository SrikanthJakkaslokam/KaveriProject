import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as internal from 'stream';

@Injectable({
  providedIn: 'root'
})
export class KaveriService {

  // baseprodUrl: string = "http://49.206.243.85:8080";
  // baseprodUrl: string = "http://10.10.133.200:8080";
  ProdUrl: string = "http://localhost:8080";
  DevUrl: string = "http://csgkaveridev.centralindia.cloudapp.azure.com:8001/api/";
  StageUrl: string = "http://localhost:8080";
  baseUrl: string = this.DevUrl;
  sroUrl = 'http://csgkaveridev.centralindia.cloudapp.azure.com:8085/api/Masters/GetSROMasterAsync';
  bookUrl = 'http://csgkaveridev.centralindia.cloudapp.azure.com:8085/api/Masters/GetBooktype';
  financialYearUrl = 'http://csgkaveridev.centralindia.cloudapp.azure.com:8085/api/Masters/GetFinancialyear';

  paymentURL: string = "http://csgkaveridev.centralindia.cloudapp.azure.com:8102/api/";

  public IsLoggedIn: boolean = false;
  IsForgotPassword: boolean = false;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    
    var user = {
      "loginname": username,
      "password": password,
    };
    console.log(JSON.stringify(user));
    const headers = {

      'Content-type': 'application/json',
      'Accept': 'application/json'

    }
    // return this.http.post(this.baseUrl + '/UserLoginAPI/api/UserLogin/LoginData',user, { headers });
    return this.http.post(this.baseUrl + 'LoginData', user, { headers });
  }



  forgotpassword(email: string, phone: string): Observable<any> {
    var user = {
      "emailID": email,
      "phoneNumber": phone,
      "newPassword": ""
    };
    console.log(JSON.stringify(user));
    const headers = {

      'Content-type': 'application/json',
      'Accept': 'application/json'

    }
    // return this.http.post(this.baseUrl + '/UserLoginAPI/api/UserLogin/LoginData',user, { headers });
    return this.http.post(this.baseUrl + 'ForgotPasswordData', user, { headers });
  }

  changepassword(citizenid: string, currentPassword: string, newPassword: string): Observable<any> {
    var pass = {
      "citizenid": citizenid,
      "currentPassword": currentPassword,
      "newPassword": newPassword
    };
    console.log(JSON.stringify(pass));
    const headers = {

      'Content-type': 'application/json',
      'Accept': 'application/json'

    }
    // return this.http.post(this.baseUrl + '/UserLoginAPI/api/UserLogin/LoginData',user, { headers });
    return this.http.post(this.baseUrl + 'ChangePasswordData', pass, { headers });
  }

  loginOtp(phone: string): Observable<any> {
    var Phone = {
      "mobileNumber": phone,
    };
    console.log(JSON.stringify(Phone));
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl + 'SendOTPMSGAsync', Phone, { headers });
  }
  getfeerate(): Observable<any> {

    const headers = {

      'Content-type': 'application/json',

      'Accept': 'application/json'

    }

    return this.http.post(this.baseUrl + 'GetFeeRate', { headers });

  }
  getapptype(): Observable<any> {

    const headers = {

      'Content-type': 'application/json',

      'Accept': 'application/json'

    }

    return this.http.post(this.baseUrl + 'GetAppointmentTypeMasterAsync', { headers });

  }
  getsro(): Observable<any> {

    const headers = {

      'Content-type': 'application/json',

      'Accept': 'application/json'

    }

    return this.http.post(this.baseUrl + 'GetSROMasterAsync', { headers });

  }
  getregiontype(vlgcode: number): Observable<any> {

    var villagecode = {

      "villagecode": vlgcode,

    };

    console.log(JSON.stringify(villagecode));

    const headers = {

      'Content-type': 'application/json',

      'Accept': 'application/json'

    }

    return this.http.post(this.baseUrl + 'GetRegionType', villagecode, { headers });

  }
  propertyType(): Observable<any> {
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl + '', { headers });
  }

  propertyUsageType(): Observable<any> {
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl + '', { headers });
  }

  articleselection(): Observable<any> {
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl + 'GetStampArticlesAsync', { headers });
  }

  jurisdictionOfProperty(): Observable<any> {
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl + '', { headers });
  }

  departmentalDatabase(): Observable<any> {
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl + '', { headers });
  }

  bhoomisearch(bhoomi1): Observable<any> {
    
    const bhoomiheader = new HttpHeaders({
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      // "Access-Control-Allow-Methods": "GET, OPTIONS,POST, PUT",
      // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret"

    })
    return this.http.post(this.baseUrl + 'BhoomiGetSurveyNoList', bhoomi1, { 'headers': bhoomiheader });
  }
  getSro(): Observable<any> {
    return this.http.post(this.sroUrl, '' , { observe: 'response' });
  }
  getBooks(): Observable<any> {
    return this.http.post(this.bookUrl, '' , { observe: 'response' });
  }
  getFinancialYear(): Observable<any> {
    return this.http.post(this.financialYearUrl, '' , { observe: 'response' });
  }


  MojiniSearch(Mojini): Observable<any> {

    const Mheader = new HttpHeaders({
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      "Access-Control-Allow-Methods": "GET, OPTIONS,POST, PUT",
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret"

    })
    return this.http.post(this.baseUrl + 'Service/BhoomiMojiniServiceGet11EDetails', Mojini, { 'headers': Mheader })
  }
 
  getData(data) : Observable<any> {

    const Mheader = new HttpHeaders({
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      "Access-Control-Allow-Methods": "GET, OPTIONS,POST, PUT",
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret"

    })
    return this.http.post('http://csgkaveridev.centralindia.cloudapp.azure.com:8101/api/Liability/FetchLiabilityFiling', data, { 'headers': Mheader })
  }
  saveLiabilityDetail(add) : Observable<any> {

    const Mheader = new HttpHeaders({
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      "Access-Control-Allow-Methods": "GET, OPTIONS,POST, PUT",
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret"

    })
    return this.http.post('http://csgkaveridev.centralindia.cloudapp.azure.com:8101/api/Liability/SaveLiabilityDetails', add, { 'headers': Mheader })
  }
  liabilityReport(report) : Observable<any> {

    // const Mheader = new HttpHeaders({
    //   'Content-type': 'application/json',
    //   'Accept': 'application/json',
    //   'Access-Control-Allow-Origin': '*',
    //   "Access-Control-Allow-Methods": "GET, OPTIONS,POST, PUT",
    //   "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret"

    // })
    return this.http.post('http://csgkaveridev.centralindia.cloudapp.azure.com:8101/api/Liability/FetchLiabilityReport', report, { observe: 'response'})
  }
  district(): Observable<any> {

    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl + 'GetDistrictAsync', { headers });
  }

  taluka(taluk): Observable<any> {
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl + 'GetTalukaAsync', taluk, { headers });
  }

  // hissa(serveyno):Observable<any> {
  //   
  //   const headers = {
  //     'Content-type': 'application/json',
  //     'Accept': 'application/json'
  //   }
  //   return this.http.post(this.baseUrl + ':8001/api/GetHissaNoAsync',serveyno, { headers });
  // }
  extent(extentno): Observable<any> {
    
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl + 'GetExtentAsync', extentno, { headers });
  }
  subarticle(article): Observable<any> {
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl + 'GetStampRules', article, { headers });
  }
  getRegistrationArticle(article): Observable<any> {
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl + 'GetRegistrationArticles', article, { headers });
  }

  hobli(hoblireq): Observable<any> {
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl + 'GetHobliAsync', hoblireq, { headers });
  }

  road(villageCode): Observable<any> {
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl + 'GetRoadDetailsAsync', villageCode, { headers });
  }


  village(index): Observable<any> {
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl + 'GetVillageAsync', index, { headers });
  }

  eaasthi(aasthi): Observable<any> {
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
    return this.http.post(this.baseUrl + 'EaasthiGetProprty', aasthi, { headers });
  }

  eswathu(swathu): Observable<any> {
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
    return this.http.post(this.baseUrl + 'EswathuGetForm9Data', swathu, { headers });
  }

  eswathuRegStatus(status) {
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl + 'EswathuGetRegistrationStatus', status, { headers });
  }


  kaveriresult(kaveri): Observable<any> {
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl + 'SearchKaveriData', kaveri, { headers });

  }
  kaveriresultDocumentNo(kaveri): Observable<any> {
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl + 'SearchKaveriDataDocumentNo', kaveri, { headers });

  }
  KaveriResultDocumentDetail(kaveri): Observable<any> {
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl + 'SearchKaveriDataDocumentDetail', kaveri, { headers });

  }
  SaveUserRegistration(registration): Observable<any> {
    
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl + 'UserRegistrationData', registration, { headers });

  }


  getOwners(owners) {
    
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl + 'BhoomiGetOwners', owners, { headers });
  }

  courtorder(court) {
    
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl + 'GetCourtOrderDetails', court, { headers });
    //return this.http.post(this.baseUrl + ':8091/api/KaveriSearch/SearchCourtOrder', court, { headers });
  }
  Nonagriculturalcourtorder(court) {
    
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl + 'SearchCourtOrderNonAgri', court, { headers });
  }
  article(): Observable<any> {
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl + 'GetStampArticlesAsync', { headers });
  }
  getSlotDetail(application): Observable<any> {
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl + 'GetSlotDetailsByApplicationNumber', application, { headers });
  }
  getAvailableSlot(application): Observable<any> {
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl + 'GetAvailableSlot', application, { headers });
  }
  eaasthidocView(pid) {
    
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      // 'Access-Control-Allow-Origin':'*'
    }
    // return this.http.get(this.baseUrl + `:8090/api/Service/EaasthiGetProprtyPDF/` + pid, { headers });
    return this.http.get(this.baseUrl + `GetBase64StringForPDF/` + pid, { headers });


  }
  eswathudocView(pid) {
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      // 'Access-Control-Allow-Origin':'*',
      //  "Access-Control-Allow-Methods": "GET, OPTIONS,POST, PUT",
      // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
    }
    return this.http.post(this.baseUrl + 'EswathuGetRegistrationStatusPDF', pid, { headers });
  }
  eswathudocViewJSON(pid) {
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      // 'Access-Control-Allow-Origin':'*',
      //  "Access-Control-Allow-Methods": "GET, OPTIONS,POST, PUT",
      // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
    }
    return this.http.post(this.baseUrl + 'EswathuGetRegistrationStatus', pid, { headers });
  }
  eaasthidocViewJSON(pid) {
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      // 'Access-Control-Allow-Origin':'*',
      //  "Access-Control-Allow-Methods": "GET, OPTIONS,POST, PUT",
      // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
    }
    return this.http.post(this.baseUrl + 'EaasthiGetProprty', pid, { headers });
  }

  kaveriDocNo(docno): Observable<any> {
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl + '', docno, { headers });
  }
  PropertyType(): Observable<any> {
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl + 'GetPropertyTypeMasterAsync', { headers });
  }
  getGender(): Observable<any> {
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl + 'getgender', { headers });
  }

  getRelationship(): Observable<any> {
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl + 'GetRelationshipMasterAsync', { headers });
  }

  getSecQuestion(): Observable<any> {
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl + 'GetSecurityDatayAsync', { headers });
  }
  getScheduleType(): Observable<any> {
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl + 'GetPropertyTypeMasterAsync', { headers });
  }
  getUnits(): Observable<any> {
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl + 'GetPropertyTypeMasterAsync', { headers });
  }
  SavePartyInfoData(PartyData): Observable<any> {

    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl + 'SavePartyInfoDetailFunction', PartyData, { headers });
  }

  SavePartyInfoWitnessData(WitnessData): Observable<any> {

    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl + 'SaveWitnessInfoListFunction', WitnessData, { headers });

  }

  SavePartyInfoOrganizationData(OrgData): Observable<any> {
    
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl + 'SaveOrganizationInfoFunction', OrgData, { headers });
  }

  SavePartyInfoWitnessDetails(WitnessData): Observable<any> {

    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }

    return this.http.post(this.baseUrl + 'SavePartyWitnessFunction', WitnessData, { headers });

  }

  SavePropertySchedule(propschedule): Observable<any> {
    
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl + 'SavePropertyScheduleData', propschedule, { headers });

  }

  Deletepropertyschedule(scheduleid): Observable<any> {
    
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl + 'DeletePropertySchedule', scheduleid, { headers });

  }

  SavePropertyScheduleDetail(scheduledata): Observable<any> {
    
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl + 'SavePropertyScheduleDetail', scheduledata, { headers });

  }
  SavePropertyMaster(propschedule): Observable<any> {
    
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl + 'SavePropertyMasterData', propschedule, { headers });

  }
  SavePropertyScheduleMaster(propschedule): Observable<any> {
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl + 'SavePropertyMasterAndNumberDetails', propschedule, { headers });

  }
  SaveNonagriculturalPropertyScheduleMaster(propschedule): Observable<any> {
    
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl + 'SavePropertyMasterAndNumberDetails', propschedule, { headers });

  }
  DeleteNonagriculturalpropertydetails(propertyid): Observable<any> {
    
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl + 'SavePropertyMasterAndNumberDetails', propertyid, { headers });

  }

  getApplicatonsDetails(CitizenId): Observable<any> {
    
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    //return this.http.post(this.baseUrl + '/DashboardAPI/api/Dashboard/ApplicationStatusDetails',CitizenId ,{ headers });
    return this.http.post(this.baseUrl + 'ApplicationStatusDetails', CitizenId, { headers });
    //return this.http.post('http://localhost:8080/DashboardAPI/api/Dashboard/ApplicationStatusDetails',CitizenId ,{ headers });

  }
  getAppointmentDetails(appointment): Observable<any> {
    
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    //return this.http.post(this.baseUrl + '/DashboardAPI/api/Dashboard/ApplicationStatusDetails',CitizenId ,{ headers });
    return this.http.post(this.baseUrl + 'GetApplicationDetails', appointment, { headers });
    //return this.http.post('http://localhost:8080/DashboardAPI/api/Dashboard/ApplicationStatusDetails',CitizenId ,{ headers });

  }
  ScheduleAppointment(appointmentDetail): Observable<any> {
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    //return this.http.post(this.baseUrl + '/DashboardAPI/api/Dashboard/ApplicationStatusDetails',CitizenId ,{ headers });
    return this.http.post(this.baseUrl + 'ScheduleAppointment', appointmentDetail, { headers });
    //return this.http.post('http://localhost:8080/DashboardAPI/api/Dashboard/ApplicationStatusDetails',CitizenId ,{ headers });

  }
  rescheduleAppointment(appointmentDetail): Observable<any> {
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    //return this.http.post(this.baseUrl + '/DashboardAPI/api/Dashboard/ApplicationStatusDetails',CitizenId ,{ headers });
    return this.http.post(this.baseUrl + 'ScheduleAppointment', appointmentDetail, { headers });
    //return this.http.post('http://localhost:8080/DashboardAPI/api/Dashboard/ApplicationStatusDetails',CitizenId ,{ headers });

  }
  cancelAppointment(appointmentDetail): Observable<any> {
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    //return this.http.post(this.baseUrl + '/DashboardAPI/api/Dashboard/ApplicationStatusDetails',CitizenId ,{ headers });
    return this.http.post(this.baseUrl + 'CancelAppointment', appointmentDetail, { headers });
    //return this.http.post('http://localhost:8080/DashboardAPI/api/Dashboard/ApplicationStatusDetails',CitizenId ,{ headers });

  }
  getApplicatonsReviewData(deptuserId): Observable<any> {
    
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl + 'FetchApplicationReviewDataAsync', deptuserId, { headers });

  }

  GenerateApplicationNumber(ApplicantData): Observable<any> {
    
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    //return this.http.post(this.baseUrl + '/DashboardAPI/api/Dashboard/ApplicationStatusDetails',CitizenId ,{ headers });
    return this.http.post(this.baseUrl + 'GenerateApplicationNumber', ApplicantData, { headers });
    //return this.http.post('http://localhost:8080/DashboardAPI/api/Dashboard/ApplicationStatusDetails',CitizenId ,{ headers });

  }

  GetServicesApplicationCount(ApplicantData): Observable<any> {
    
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    //return this.http.post(this.baseUrl + '/DashboardAPI/api/Dashboard/ApplicationStatusDetails',CitizenId ,{ headers });
    //return this.http.post(this.baseUrl + ':8086/api/Dashboard/GenerateApplicationNumber',ApplicantData ,{ headers });
    return this.http.post(this.baseUrl + 'EncumbranceCerificateCount', ApplicantData, { headers });

  }

  GetDocumentRegisteredCount(DocumentData): Observable<any> {
    
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    //return this.http.post(this.baseUrl + '/DashboardAPI/api/Dashboard/ApplicationStatusDetails',CitizenId ,{ headers });
    //return this.http.post(this.baseUrl + ':8086/api/Dashboard/GenerateApplicationNumber',ApplicantData ,{ headers });
    return this.http.post(this.baseUrl + 'DocumentRegisteredCount', DocumentData, { headers });

  }
  GetRevenueGenerated(fromdate: string, todate: string): Observable<any> {
    
    var data =
    {
      "fromdate": fromdate,
      "todate": todate
    };
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    //return this.http.post(this.baseUrl + '/DashboardAPI/api/Dashboard/ApplicationStatusDetails',CitizenId ,{ headers });
    //return this.http.post(this.baseUrl + ':8086/api/Dashboard/GenerateApplicationNumber',ApplicantData ,{ headers });
    return this.http.post(this.baseUrl + 'RevenueGenerated', data, { headers });

  }

  GetMarriageRegisteredCount(MarriageData): Observable<any> {
    
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    //return this.http.post(this.baseUrl + '/DashboardAPI/api/Dashboard/ApplicationStatusDetails',CitizenId ,{ headers });
    //return this.http.post(this.baseUrl + ':8086/api/Dashboard/GenerateApplicationNumber',ApplicantData ,{ headers });
    return this.http.post(this.baseUrl + 'MarriageRegisteredCount', MarriageData, { headers });

  }
  Savefeecalculationdata(FeesData): Observable<any> {
    
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    //return this.http.post(this.baseUrl + '/DashboardAPI/api/Dashboard/ApplicationStatusDetails',CitizenId ,{ headers });
    //return this.http.post(this.baseUrl + ':8086/api/Dashboard/GenerateApplicationNumber',ApplicantData ,{ headers });
    return this.http.post(this.baseUrl + 'FeeCalculationData', FeesData, { headers });

  }
  Fetchfeecalculationdata(appnumber1): Observable<any> {
    var appnumber = {
      applicationnumber: appnumber1
    }
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }

    return this.http.post(this.baseUrl + 'FetchMarketandFeeData', appnumber, { headers });
  }

  purpose(): Observable<any> {

    const headers = {

      'Content-type': 'application/json',

      'Accept': 'application/json'

    }

    return this.http.post(this.baseUrl + 'GetApplicationType', { headers });

  }

  userType(): Observable<any> {

    const headers = {

      'Content-type': 'application/json',

      'Accept': 'application/json'

    }

    return this.http.post(this.baseUrl + 'GetUserType', { headers });

  }
  GetPropertyMasterData(appnumber1): Observable<any> {
    
    var appnumber = {
      applicationnumber: appnumber1
    }
    const headers = {

      'Content-type': 'application/json',

      'Accept': 'application/json'

    }

    return this.http.post(this.baseUrl + 'GetPropertyMasterDetails', appnumber, { headers });
  }
  GetPropertyMasterOnly(appnumber1): Observable<any> {
    
    var appnumber = {
      applicationnumber: appnumber1
    }
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl + 'GetPropertyMasterOnly', appnumber, { headers });
  }
  GetPropertyCourtAndLiabilityData(appnumber1): Observable<any> {
    
    var appnumber = {
      applicationnumber: appnumber1
    }
    const headers = {

      'Content-type': 'application/json',

      'Accept': 'application/json'

    }

    return this.http.post(this.baseUrl + 'GetPropertyCourtAndLiabilityData', appnumber, { headers });
  }
  GetPropertyScheduledetails(appnumber1): Observable<any> {
    var appnumber = {
      applicationnumber: appnumber1
    }
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl + 'GetPropertyScheduleDetails', appnumber, { headers });
  }
  deletePropertyData(propertyId): Observable<any> {
    var property = {
      propertyId: propertyId
    }
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl + 'DeletePropertyData', property, { headers });
  }
  getPresenterDetails(Preappnumber): Observable<any> {
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl + 'GetPresenterView', Preappnumber, { headers });
  }
  getExicuterDetails(Exeappnumber): Observable<any> {

    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl + 'GetExecutantView', Exeappnumber, { headers });
  }
  getWitnessDetails(Witappnumber): Observable<any> {

    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl + 'GetPartyWitnessView', Witappnumber, { headers });
  }
  deleteWitness(witnessid): Observable<any> {

    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl + 'DeletePartyWitnessAndWitnessInfo', witnessid, { headers });
  }
  deleteExecutant(partyIds): Observable<any> {
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl + 'DeletePartyInfo', partyIds, { headers });
  }

  PaymentGateWay(khajaneUrl: string) {
    return this.http.get(khajaneUrl);
  }

  GetExecutantView(applicationnumber): Observable<any> {
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl + 'GetExecutantView', applicationnumber, { headers });
  }
  GetSalutationMaster(): Observable<any> {
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl + 'GetSalutationMaster', { headers });
  }
  GetIDProofTypes(): Observable<any> {
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl + 'GetIDProofTypes', { headers });
  }

  GetPaymentDetailsPRP(applicationnumber1){
    debugger;
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json',
    }
    return this.http.post(this.paymentURL + `PaymentGateway/GetPaymentDetailsPRP`, applicationnumber1, { headers });
  }

  
}





