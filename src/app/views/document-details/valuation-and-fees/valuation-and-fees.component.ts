import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../document.service';
import { Storage } from '../../../shared/utils/storage';

@Component({
  selector: 'app-valuation-and-fees',
  templateUrl: './valuation-and-fees.component.html',
  styleUrls: ['./valuation-and-fees.component.scss']
})
export class ValuationAndFeesComponent implements OnInit {
  valutions: any =[];
  pendingRegNumberData: any = {};
  constructor(private documentService: DocumentService) { }

  ngOnInit(): void {
    // Storage.setLocalItem('applicationNo', 'PRP-23112021-01216');
    this.pendingRegNumberData = Storage.getLocalItem('pendingRegNoData');
    this.getValutionsAndFees();
  }
  getValutionsAndFees(){
    const req = {applicationnumber: Storage.getLocalItem('applicationNo')};
    this.documentService.fetchMarketandFeeData(req).subscribe((res: any) => {
      if (res.status === 200 && res.body && res.body.length) {
        this.valutions = res.body;
      }
    });
  }
}
