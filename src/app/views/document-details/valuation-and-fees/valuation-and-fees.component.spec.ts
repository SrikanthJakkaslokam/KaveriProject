import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValuationAndFeesComponent } from './valuation-and-fees.component';

describe('ValuationAndFeesComponent', () => {
  let component: ValuationAndFeesComponent;
  let fixture: ComponentFixture<ValuationAndFeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValuationAndFeesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValuationAndFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
