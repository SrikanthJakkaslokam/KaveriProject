import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscellaneousFeeCalculationComponent } from './miscellaneous-fee-calculation.component';

describe('MiscellaneousFeeCalculationComponent', () => {
  let component: MiscellaneousFeeCalculationComponent;
  let fixture: ComponentFixture<MiscellaneousFeeCalculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiscellaneousFeeCalculationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscellaneousFeeCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
