import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CourtOrderService } from '../court-order.service';
import { Storage } from '../../../shared/utils/storage';
import notify from 'devextreme/ui/notify';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cancel-court-order',
  templateUrl: './cancel-court-order.component.html',
  styleUrls: ['./cancel-court-order.component.scss']
})
export class CancelCourtOrderComponent implements OnInit {
  submitted: boolean = false;
  cancelCourtOrderForm: FormGroup;
  searchCourtOrders: any = [];
  constructor(
    private courtOrderService: CourtOrderService,
    private formBuilder: FormBuilder,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.cancelCourtOrderForm = this.formBuilder.group({
      orderNumber: ['', Validators.required],
      issuingAuthority: ['', Validators.required],
      cancellationDate: [null, Validators.required],
      cancellationRemarks: ['', Validators.required],
    });
    this.fetchCourtOrder();
  }
  saveCTA() {
    const req = {
      Orders: [
      {
        "Id": null,
            "SroCode": this.searchCourtOrders[0].sroCode,
            "OrderNumber": this.searchCourtOrders[0].orderNumber,
            "IssuingAuthority": this.searchCourtOrders[0].issuingAuthority,
            "IssueDate": this.searchCourtOrders[0].issueDate,
            "DateOfCancellation": null,
            "Description":  this.searchCourtOrders[0].courtDescription,
            "IsCancelled": false,
            "IsInForce": true,
            "CancellationDate": this.cancelCourtOrderForm.value.cancellationDate ? new Date(this.cancelCourtOrderForm.value.cancellationDate) : null,
            "CancellationRemarks": this.cancelCourtOrderForm.value.cancellationRemarks,
            "Username": "1"

      }
    ],
    OrderProperties: this.searchCourtOrders[0].response.propertyInfo.map(op => ({
      "PropertyId": op.propertyId,
      "SroCode": this.searchCourtOrders[0].response.sroCode,
      "JurySroCode": op.jurisdictionSRCode,
      "VillageCode": op.villageCode,
      "PropertyDescription": op.propertyDescription,
      "IsAgriProperty": op.isAgriculture,
      "NorthBoundary": op.northBoundary,
      "SouthBoundary": op.southBoundary,
      "EastBoundary": op.eastBoundary,
      "WestBoundary": op.westBoundary,
      "ExtentInformation": op.extentDescription,
      "Area": op.area,
      "MeasurementUnit": op.measurementUnit,
      "IsDelete": false,
      "PropertyNumbers": op.propertyNumberDetails.map(we => ({
        "Id": 123,
        "SroCode": we.sroCode,
        "PropertyId": we.propertyNumberPropertyId,
        "CurrentPropertyId": we.currentPropertyTypeId,
        "CurrentNumber": we.currentNumber,
        "OldPropertyId": null,
        "OldNumber": null,
        "Description": this.searchCourtOrders[0].courtDescription,
        "SurveyNumber": we.surveyNumber,
        "SurveyNoc": String(we.surveyNumber),
        "HissaNumber": we.hissaNumber,
        "StayFlag": null,
        "IsDelete": false
      }))
    })),
    Parties: this.searchCourtOrders[0].response.courtPartyInfo.map(qw => ({
      "PartyId": qw.partyId,
      "SroCode": qw.sroCode,
      "FirstName": qw.firstName,
      "MiddleName": qw.middleName,
      "LastName": qw.lastName,
      "Age": qw.age,
      "Address": qw.address,
      "IsDelete": false
    }))
  };
    this.courtOrderService.insertCourtOrder(req).subscribe((res: any) => {
      if (res.status === 200) {
        this.showToast('Successfully deleted');
        this.router.navigateByUrl('/court/court-order')
      }
    });
  }
  cancelCTA() {

  }
  showToast(message) {
    notify({
      message: message,
      isVisiblesms: true,
      displayTime: 3000,
      height: 50,
      type: "info"
    });

  }
  fetchCourtOrder() {
    if (Storage.getLocalItem('court-order')) {
      const courtOrder: any = Storage.getLocalItem('court-order');
      console.log(courtOrder);
      this.cancelCourtOrderForm.patchValue({orderNumber: courtOrder.orderNumber, issuingAuthority: courtOrder.issuingAuthority});
      const req = {orderNumber: courtOrder.orderNumber, issuingAuthority: courtOrder.issuingAuthority, caseType: courtOrder.caseType, year: 2022};
      this.courtOrderService.fetchCourtOrder(req).subscribe((res: any) => {
        if (res.status === 200 && res.body) {
          this.searchCourtOrders = res.body;
        }
      });
    }
  }
}
