import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentGatewayResponceComponent } from './payment-gateway-responce.component';

describe('PaymentGatewayResponceComponent', () => {
  let component: PaymentGatewayResponceComponent;
  let fixture: ComponentFixture<PaymentGatewayResponceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentGatewayResponceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentGatewayResponceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
