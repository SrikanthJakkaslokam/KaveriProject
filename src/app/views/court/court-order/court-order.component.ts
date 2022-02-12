import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { CourtOrderService } from "../court-order.service";
import { Storage } from "../../../shared/utils/storage";
import { Router } from "@angular/router";
import { KaveriService } from "../../../services/kaveri.service";
import notify from "devextreme/ui/notify";

@Component({
  selector: "app-court-order",
  templateUrl: "./court-order.component.html",
  styleUrls: ["./court-order.component.scss"],
})
export class CourtOrderComponent implements OnInit {
  years: any = [];
  submitted: boolean = false;
  searchCourtOrderForm: FormGroup;
  addCourtOrderForm: FormGroup;
  propertyDetailsForm: FormGroup;
  partyDetailsForm: FormGroup;
  parties: FormArray;
  properties: FormArray;
  searchCourtOrders: any = [];
  propertyTypes = [];
  districtList = [];
  sroList = [];
  constructor(
    private courtOrderService: CourtOrderService,
    private formBuilder: FormBuilder,
    private router: Router,
    private kaveriService: KaveriService
  ) {}

  ngOnInit(): void {
    for (let i = 1900; i <= new Date().getFullYear(); i++) {
      this.years.push(i);
    }
    this.searchCourtOrderForm = this.formBuilder.group({
      orderNumber: ["", Validators.required],
      issuingAuthority: ["", Validators.required],
      year: ["", Validators.required],
      caseType: ["", Validators.required],
    });
    this.addCourtOrderForm = this.formBuilder.group({
      OrderNumber: ["", Validators.required],
      IssuingAuthority: ["", Validators.required],
      IssueDate: [null, Validators.required],
      Description: ["", Validators.required],
      IsInForce: [false],
      IsCancelled: [false],
      RegistrationArticle: [""],
      CaseType: [""],
    });
    this.propertyDetailsForm = this.formBuilder.group({
      OrderProperties: this.formBuilder.array([this.getOrderProperty()]),
    });
    this.partyDetailsForm = this.formBuilder.group({
      Parties: this.formBuilder.array([this.getPartyDetails()]),
    });
    this.getDistricts();
    this.getSRO();
    this.courtOrderService.getPropertyType().subscribe(
      (res: any) => {
        console.log(res);
        this.propertyTypes = res.body;
      },
      (err) => console.log("Error::::", err)
    );
  }
  getOrderProperty(): FormGroup {
    return this.formBuilder.group({
      IsAgriProperty: false,
      District: "",
      SroCode: "",
      hobliList: [],
      VillageCode: "",
      villageList: [],
      Hobli: "",
      NorthBoundary: [],
      SouthBoundary: [],
      Taluka: "",
      talukaList: [],
      EastBoundary: [],
      WestBoundary: [],
      PropertyDescription: [],
      Area: [0],
      MeasurementUnit: [0],
      ExtentInformation: [],
      PropertyNumbers: this.formBuilder.array([this.getPropertyNumber()]),
    });
  }
  getDistricts() {
    this.kaveriService.district().subscribe(
      (data: any) => {
        // console.log(data);
        if (data.length != 0) {
          this.districtList = data;
        }
      },
      (e) => {
        console.log("Error ::::", e);
      }
    );
  }
  getSRO() {
    this.kaveriService.getsro().subscribe(
      (data: any) => {
        if (data.length != 0) {
          this.sroList = data;
          console.log(this.sroList);
        }
      },
      (e) => {
        console.log("Error:::", e);
      }
    );
  }
  getHobli(code, form) {
    var hoblireq = {
      talukaCode: code,
    };
    if (hoblireq != undefined) {
      this.kaveriService.hobli(hoblireq).subscribe(
        (data: any) => {
          // console.log(data);
          if (data.length != 0) {
            form.setValue(data);
          }
        },
        (e) => {}
      );
    }
  }

  changeOPTaluka(form, value) {
    console.log(form);
    this.getVillage(value, <FormGroup>form.get("villageList"));
    this.getHobli(value, <FormGroup>form.get("hobliList"));
  }

  getVillage(code, form) {
    var index = {
      hobliCode: code,
    };
    if (index != undefined) {
      this.kaveriService.village(index).subscribe(
        (data: any) => {
          form.setValue(data);
        },
        (e) => {}
      );
    }
  }
  getTaluks(code, form: FormGroup) {
    var taluk = {
      districtCode: code,
    };
    // console.log(JSON.stringify(taluk))
    if (taluk != undefined) {
      this.kaveriService.taluka(taluk).subscribe(
        (data: any) => {
          console.log(form);
          form.setValue(data);
        },
        (e) => {}
      );
    }
  }
  getPropertyNumber(): FormGroup {
    return this.formBuilder.group({
      PropertyNumberType: [""],
      CurrentNumber: [""],
      OldNumber: [],
      SurveyNoc: [],
      HissaNumber: [],
    });
  }
  getPartyDetails(): FormGroup {
    return this.formBuilder.group({
      Saluation: [""],
      FirstName: ["", Validators.required],
      MiddleName: [],
      LastName: [],
      Age: [0],
      HouseNo: [],
      StreetAddress: [],
      Taluka: "",
      Hobli: "",
      District: "",
      City: "",
      PinCode: [],
      talukaList: [],
      villageList: [],
      hobliList: [],
    });
  }
  getOrderProperties() {
    return <FormArray>this.propertyDetailsForm.controls.OrderProperties;
  }
  getParties() {
    return <FormArray>this.partyDetailsForm.controls.Parties;
  }
  changeOPDistrict(form, value) {
    console.log(form);
    this.getTaluks(value, <FormGroup>form.get("talukaList"));
  }
  addMoreParty() {
    this.parties = <FormArray>this.partyDetailsForm.controls.Parties;
    this.parties.push(this.getPartyDetails());
  }
  addMoreProperty() {
    this.properties = <FormArray>(
      this.propertyDetailsForm.controls.OrderProperties
    );
    this.properties.push(this.getOrderProperty());
  }
  addMorePropertyNos(index) {
    const propertyNos = <FormArray>(
      this.propertyDetailsForm
        .get("OrderProperties")
        ["controls"][index].get("PropertyNumbers")
    );
    propertyNos.push(this.getPropertyNumber());
  }
  deleteParty(index) {
    this.parties = <FormArray>this.partyDetailsForm.controls.Parties;
    this.parties.removeAt(index);
  }
  deleteProperty(index) {
    this.properties = <FormArray>(
      this.propertyDetailsForm.controls.OrderProperties
    );
    this.properties.removeAt(index);
  }
  deletePropertyNo(index) {
    const propertyNos = <FormArray>(
      this.propertyDetailsForm
        .get("OrderProperties")
        ["controls"][index].get("PropertyNumbers")
    );
    propertyNos.removeAt(index);
  }
  resetSearch() {
    this.searchCourtOrderForm.reset();
  }
  saveCTA() {
    const req = {
      Orders: [this.addCourtOrderForm.value],
      OrderProperties: this.propertyDetailsForm.value.OrderProperties,
      Parties: this.partyDetailsForm.value.Parties,
    };
    console.log(req);
    req.Orders.forEach((order) => {
      order.IssueDate = order.IssueDate ? new Date(order.IssueDate) : null;
    });
    req.OrderProperties.forEach((prop) => {
      prop.JurySroCode = Number(prop.SroCode);
      prop.VillageCode = Number(prop.VillageCode);
      prop.SroCode = 114;
      delete prop.villageList;
      delete prop.hobliList;
      delete prop.talukaList;
    });
    req.Parties.forEach((party) => {
      party.SroCode = 114;
      party.Address = `${party.HouseNo}, ${party.StreetAddress}, ${party.City}, ${party.Taluka}, ${party.Hobli}, ${party.District}, ${party.PinCode}`;
      delete party.HouseNo;
      delete party.StreetAddress;
      delete party.City;
      delete party.Taluka;
      delete party.Hobli;
      delete party.District;
      delete party.PinCode;
      delete party.villageList;
      delete party.hobliList;
      delete party.talukaList;
    });
    this.courtOrderService.insertCourtOrder(req).subscribe((res: any) => {
        this.showToast('Successfully Created');
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/court/court-order']);
      });
    });
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
  cancelCTA() {}
  fetchCourtOrder() {
    const req = {
      ...this.searchCourtOrderForm.value,
      year: Number(this.searchCourtOrderForm.value.year),
    };
    this.courtOrderService.fetchCourtOrder(req).subscribe((res: any) => {
      if (
        res.status === 200 &&
        res.body &&
        res.body[0] &&
        res.body[0]["responseCode"] === 1000
      ) {
        this.searchCourtOrders = res.body;
      } else {
        this.searchCourtOrders = [];
      }
    });
  }
  isAgriProperty(index) {
    const propertyNos = <FormArray>(
      this.propertyDetailsForm
        .get("OrderProperties")
        ["controls"][index].get("PropertyNumbers")
    );
    while (propertyNos.length) {
      propertyNos.removeAt(0);
    }
    propertyNos.push(this.getPropertyNumber());
    propertyNos.reset();
  }
  get f() {
    return this.searchCourtOrderForm.controls;
  }
  edit(courtOrder) {
    Storage.setLocalItem("court-order", courtOrder);
    this.router.navigate(["/court/edit-court-order"]);
  }
  cancel(courtOrder) {
    Storage.setLocalItem("court-order", courtOrder);
    this.router.navigate(["/court/cancel-court-order"]);
  }
}
