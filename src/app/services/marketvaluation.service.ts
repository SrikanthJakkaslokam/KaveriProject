import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarketvaluationService {
  
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
  // baseUrl: string = this.localurl;
  finalreturnjson :any = {
    'units' :0,
    'amount' :0,
    'Totalamount' :0
  }
  
  constructor(private http: HttpClient) { }

  /////Agricutural details 

  GetagriculturalRateDetails(codes): Observable<any> {
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl+'SearchAgriculturalPropertyType',codes, { headers });
   //return this.http.post('http://localhost:33200/api/AgriculturalMarketValuation/SearchAgriculturalPropertyType',codes, { headers });
   
  }
  GetAnnexurerules(): Observable<any>{
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl+'GetAriculturalAnnexurerules', { headers });
  }

  ///Vacant details 

  GetVacantRateDetails(codes): Observable<any>{
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl+'SearchVacantTypeRateDetails',codes, { headers });
  }
  GetNonagriculturalAnnexurerules(PropertytypeId): Observable<any>{
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
   return this.http.post(this.baseUrl+'GetNonAgriculturalAnnexurerules',PropertytypeId,{ headers });
   //return this.http.post('http://localhost:33200/api/NonAgriculturalMarketValuation/GetNonAgriculturalAnnexurerules',PropertytypeId,{ headers });
  }
  
  ////Building details 

  GetBuildingRateDetails(codes): Observable<any>{
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl+'SearchBuildingRateDetails',codes, { headers });
  }

  GetConstructionTypeDetails(): Observable<any> {
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl+'GetConstructionTypeDetails', { headers });
  }
  GetConstructionRateDetails(constructiontypes): Observable<any>{
    debugger ;
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl+'ConstructionTypeRateDetails',constructiontypes, { headers });
  }

  // GetConstructionRateDetails(constructiontypes): Observable<any>{
  //   const headers = {
  //     'Content-type': 'application/json',
  //     'Accept': 'application/json'
  //   }
  //   return this.http.post('http://localhost:33200/api/NonAgriculturalMarketValuation/ConstructionTypeRateDetails',constructiontypes, { headers });
  // }
  ////Flate details 

  GetFlateRateDetails(FlateRateRequest): Observable<any>{
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl+'FlatRateDetails' ,FlateRateRequest, { headers });
  }
  GetFloorNumberDetails(): Observable<any>{
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl+'Getapartmentfloorrates' , { headers });
  }
  
  GetApartmentSpecialAmenities(): Observable<any>{
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl+'GetApartmentSpecialAmenities', { headers });
  }
  GetRateApartmentSpecialAmenities(totalamenities): Observable<any>{
    const headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
    return this.http.post(this.baseUrl+'GetRateApartmentSpecialAmenities',totalamenities, { headers });
  }

GetParkingTypeDetails(): Observable<any>{
  const headers = {
    'Content-type': 'application/json',
    'Accept': 'application/json'
  }
  return this.http.post(this.baseUrl+'GetBuildingParkingDetails', { headers });
  
}
GetParkingRateDetails(TypeRequest): Observable<any>{
  const headers = {
    'Content-type': 'application/json',
    'Accept': 'application/json'
  }
  return this.http.post(this.baseUrl+'FlatParkingRateDetails',TypeRequest, { headers });
  
}
GetPropertyTypes(typeid): Observable<any>{
  const headers = {
    'Content-type': 'application/json',
    'Accept': 'application/json'
  }
  // return this.http.post(this.baseUrl+'/api/Masters/GetMarketpropertytypeAsync',typeid, { headers });
  return this.http.post(this.baseUrl+'GetMarketpropertytypeAsync',typeid, { headers });
}

  CalculationforNonAgriculturalLand(units ,amount){
    //////calculation for squaremeter
    this.TotalAmountNonagri = units * amount;

  //  return finaldata;
  }
  CalculationforAgriculturalLand(totalunits,propertytypeamount){
    //////calaculate gunta or cent  
    var TotalAmountagri = totalunits * propertytypeamount;
    this.finalreturnjson['units'] = totalunits;
  this.finalreturnjson['amount'] = propertytypeamount;
  this.finalreturnjson['Totalamount'] =TotalAmountagri;
  // var finaldata = JSON.stringify(this.finalreturnjson);
    return TotalAmountagri;
  }
  calculatePercentageforAnnexure(percentToGet,Amount){

    //percent = 10%
    //amount = 2000
    var percentageamount = (percentToGet / 100) * Amount;
    return percentageamount;

  }
  CalculateTotalvaluatedAmount(SumoftheAllrules){
    var totalamount = SumoftheAllrules + this.TotalAmountNonagri ;
    var finalvaluatedamount = totalamount - this.removedpercentage;
    return finalvaluatedamount;

  }

SaveFinalValuationdetails(Valuationmodel): Observable<any>{
  const headers = {
    'Content-type': 'application/json',
    'Accept': 'application/json'
  }
  return this.http.post(this.baseUrl+'SaveMarketvaluationDetails',Valuationmodel, { headers });
  
}
SaveFinalagriValuationdetails(Valuationmodel): Observable<any>{
  const headers = {
    'Content-type': 'application/json',
    'Accept': 'application/json'
  }
  return this.http.post(this.baseUrl+'SaveMarketValuationDetails',Valuationmodel, { headers });
 // return this.http.post('http://localhost:33200/api/AgriculturalMarketValuation/SaveMarketValuationDetails',Valuationmodel, { headers });
  
}
SaveAgriculturalRateValuationdetails(Valuationmodel): Observable<any>{
  const headers = {
    'Content-type': 'application/json',
    'Accept': 'application/json'
  }
  return this.http.post(this.baseUrl+'SaveAggricultuteDetails',Valuationmodel, { headers });
  //return this.http.post('http://localhost:33200/api/AgriculturalMarketValuation/SaveAggricultuteDetails',Valuationmodel, { headers });
  
}
SaveAnnuxureValuationdetails(Valuationmodel): Observable<any>{
  const headers = {
    'Content-type': 'application/json',
    'Accept': 'application/json'
  }
  return this.http.post(this.baseUrl+'SaveAnnexureDetails',Valuationmodel, { headers });
 //return this.http.post('http://localhost:33200/api/AgriculturalMarketValuation/SaveAnnexureDetails',Valuationmodel, { headers });
}


SaveFinalVacantsiteValuationdetails(Valuationmodel): Observable<any>{
  const headers = {
    'Content-type': 'application/json',
    'Accept': 'application/json'
  }
  return this.http.post(this.baseUrl+'SaveVacantsiteValuationDetails',Valuationmodel, { headers });
  
}
SaveFinalBuildingValuationdetails(Valuationmodel): Observable<any>{
  const headers = {
    'Content-type': 'application/json',
    'Accept': 'application/json'
  }
  return this.http.post(this.baseUrl+'SaveBuildingValuationDetails',Valuationmodel, { headers });
  
}
SaveFinalFlatValuationdetails(Valuationmodel): Observable<any>{
  const headers = {
    'Content-type': 'application/json',
    'Accept': 'application/json'
  }
  return this.http.post(this.baseUrl+'SaveFlatValuationDetails',Valuationmodel, { headers });
  
}
FetchAgriculturaldetails(request): Observable<any>{
  const headers = {
    'Content-type': 'application/json',
    'Accept': 'application/json'
  }
  return this.http.post(this.baseUrl+'FetchAllAgriculturalDetails',request, { headers });
  
}
Saveopenbuildratedetails(Valuationmodel): Observable<any>{
  const headers = {
    'Content-type': 'application/json',
    'Accept': 'application/json'
  }
  return this.http.post(this.baseUrl+'OpenBuiltValuationdetails',Valuationmodel, { headers });
 //return this.http.post('http://localhost:33200/api/NonAgriculturalMarketValuation/InsertFlatDetails',Valuationmodel, { headers });
}
SaveFlatDetails(Valuationmodel): Observable<any>{
  const headers = {
    'Content-type': 'application/json',
    'Accept': 'application/json'
  }
  return this.http.post(this.baseUrl+'InsertFlatDetails',Valuationmodel, { headers });
// return this.http.post('http://localhost:33200/api/NonAgriculturalMarketValuation/InsertFlatDetails',Valuationmodel, { headers });
}

SaveConstructiontypedetails(Valuationmodel): Observable<any>{
  const headers = {
    'Content-type': 'application/json',
    'Accept': 'application/json'
  }
  return this.http.post(this.baseUrl+'ConstructionRateDetails',Valuationmodel, { headers });
  
}
SaveParkingdetails(Valuationmodel): Observable<any>{
  const headers = {
    'Content-type': 'application/json',
    'Accept': 'application/json'
  }
  return this.http.post(this.baseUrl+'ParkingRateDetails',Valuationmodel, { headers });
  
}
SaveUserApartmentAmenityDetails(Valuationmodel): Observable<any>{
  const headers = {
    'Content-type': 'application/json',
    'Accept': 'application/json'
  }
  return this.http.post(this.baseUrl+'UserApartmentAmenityDetails',Valuationmodel, { headers });
  
}
SaveAmenitiesdetails(Valuationmodel): Observable<any>{
  const headers = {
    'Content-type': 'application/json',
    'Accept': 'application/json'
  }
  return this.http.post(this.baseUrl+'ApartmentAmenityDetails',Valuationmodel, { headers });
  
}
SaveFloordetails(Valuationmodel): Observable<any>{
  const headers = {
    'Content-type': 'application/json',
    'Accept': 'application/json'
  }
  return this.http.post(this.baseUrl+'FlatFloorDetails',Valuationmodel, { headers });
  
}
FetchVacantdetails(request): Observable<any>{
  const headers = {
    'Content-type': 'application/json',
    'Accept': 'application/json'
  }
  return this.http.post(this.baseUrl+'FetchVacantDetails',request, { headers });
 // return this.http.post('http://localhost:33200/api/NonAgriculturalMarketValuation/FetchVacantDetails',request, { headers });
  
}
FetchBuildingdetails(request): Observable<any>{
  const headers = {
    'Content-type': 'application/json',
    'Accept': 'application/json'
  }
  return this.http.post(this.baseUrl+'FetchBuildingDetails',request, { headers });
  //return this.http.post('http://localhost:33200/api/NonAgriculturalMarketValuation/FetchBuildingDetails',request, { headers });
  
}
FetchNonagriculturaldetails(request): Observable<any>{
  const headers = {
    'Content-type': 'application/json',
    'Accept': 'application/json'
  }
  return this.http.post(this.baseUrl+'FetchFlatDetails',request, { headers });
  //return this.http.post('http://localhost:33200/api/NonAgriculturalMarketValuation/FetchFlatDetails',request, { headers });
  
}



}
