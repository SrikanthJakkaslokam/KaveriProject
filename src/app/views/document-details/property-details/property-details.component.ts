import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../document.service';
import { Storage } from '../../../shared/utils/storage';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.scss']
})
export class PropertyDetailsComponent implements OnInit {
  properties: any = [];
  pendingRegNumberData: any = {};
  constructor(
    private documentService: DocumentService
  ) { }

  ngOnInit(): void {
    // Storage.setLocalItem('applicationNo', 'PRP-27122021-01807')
    this.getPropertyMasterData();
    this.fetchPendingRegNumberDataAsync();
  }
  fetchPendingRegNumberDataAsync() {
    this.documentService.fetchPendingRegNumberDataAsync({
      applicationnumber: Storage.getLocalItem('applicationNo'),
      sroCode: localStorage.getItem("deptSroCode")
    }).subscribe(res => {
      if (res && res['body'].responseCode === 1000) {
        this.pendingRegNumberData = res['body'];
        Storage.setLocalItem('pendingRegNoData', res['body']);
      }
    });
  }
  getPropertyMasterData() {
    const req = {applicationnumber: Storage.getLocalItem('applicationNo')};
    this.documentService.getPropertyMasterData(req).subscribe((res: any) => {
      if (res.status === 200 && res.body && res.body.length) {
        this.properties = res.body;
        this.properties.map(async (prop) => {
          await this.documentService.searchCourtOrder({
            sroCode: prop.srocode,
            hissaNo: prop.hissa_no ? prop.hissa_no.toString() : null,
            surveyNo: prop.survey_no
          }).subscribe(res => {
            if (res && res['body']) {
              prop.courtOrders = res['body'].filter(co => co.applicationnumber === Storage.getLocalItem('applicationNo'));
            }
          });
          await this.documentService.getOwnerdetailsFromPropertyID({
            propertyids: prop.propertyid ? prop.propertyid.toString() : null,
          }).subscribe(res => {
            if (res && res['body'] && res['body'].length > 0) {
              prop.propertyDetails = res['body'][0];
            }
          });
        });
      }
    });
  }
}
