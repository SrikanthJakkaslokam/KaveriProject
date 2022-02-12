import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CcSearchMakePaymentComponent } from './cc-search-make-payment.component';

describe('CcSearchMakePaymentComponent', () => {
  let component: CcSearchMakePaymentComponent;
  let fixture: ComponentFixture<CcSearchMakePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CcSearchMakePaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CcSearchMakePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
