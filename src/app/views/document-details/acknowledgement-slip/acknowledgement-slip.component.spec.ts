import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcknowledgementSlipComponent } from './acknowledgement-slip.component';

describe('AcknowledgementSlipComponent', () => {
  let component: AcknowledgementSlipComponent;
  let fixture: ComponentFixture<AcknowledgementSlipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcknowledgementSlipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcknowledgementSlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
