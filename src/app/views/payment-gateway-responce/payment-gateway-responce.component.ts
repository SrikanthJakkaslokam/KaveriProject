import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-gateway-responce',
  templateUrl: './payment-gateway-responce.component.html',
  styleUrls: ['./payment-gateway-responce.component.scss']
})
export class PaymentGatewayResponceComponent implements OnInit {
  encDataStr: string = "";
  deptCode: string = "";
  constructor(
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const encdata = params['encdata'];
      const dept_code = params['dept_code'];
      console.log("encoded data from Payment Gateway");
      console.log(encdata);
      this.encDataStr = encdata;
      console.log("dept code from Payment Gateway");
      console.log(dept_code);
      this.deptCode = dept_code;
    });
  }
}
