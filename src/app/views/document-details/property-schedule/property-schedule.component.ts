import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../document.service';
import { Storage } from '../../../shared/utils/storage';
@Component({
  selector: 'app-property-schedule',
  templateUrl: './property-schedule.component.html',
  styleUrls: ['./property-schedule.component.scss']
})
export class PropertyScheduleDetailsComponent implements OnInit {
  properties: any = [];
  showHoldModal = false;
  showRefuseModal = false;
  pendingRegNumberData: any = {};
  propertySchedules: any = [];
  constructor(
    private documentService: DocumentService
  ) { }

  ngOnInit(): void {
    this.pendingRegNumberData = Storage.getLocalItem('pendingRegNoData');
    this.getPropertyScheduleDetails();
  }
  getPropertyScheduleDetails() {
    const req = {applicationnumber: Storage.getLocalItem('applicationNo')};
    this.documentService.getPropertyScheduleDetails(req).subscribe((res: any) => {
      if (res.status === 200 && res.body && res.body.length) {
        this.propertySchedules = res.body;
        this.documentService.getPropertyMasterData({applicationnumber: Storage.getLocalItem('applicationNo')}).subscribe((res: any) => {
          if (res.status === 200 && res.body && res.body.length) {
            this.properties = res['body'];
            this.propertySchedules.map(ps => {
              this.properties.map(p => {
                if (ps.propertyid === p.propertyid) {
                  ps.westboundary = p.westboundary;
                  ps.eastboundary = p.eastboundary;
                  ps.northboundary = p.northboundary;
                  ps.southboundary = p.southboundary;
                }
              }); 
            });
          }
        });
      }
    });
  }
   
}
