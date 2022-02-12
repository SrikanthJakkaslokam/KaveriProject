import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcSearchMakePaymentComponent } from './ec-search-make-payment.component';

describe('EcSearchMakePaymentComponent', () => {
  let component: EcSearchMakePaymentComponent;
  let fixture: ComponentFixture<EcSearchMakePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EcSearchMakePaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EcSearchMakePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
