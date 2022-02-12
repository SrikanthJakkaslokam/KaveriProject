import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketvaluationNonAgriculturalComponent } from './marketvaluation-non-agricultural.component';

describe('MarketvaluationNonAgriculturalComponent', () => {
  let component: MarketvaluationNonAgriculturalComponent;
  let fixture: ComponentFixture<MarketvaluationNonAgriculturalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketvaluationNonAgriculturalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketvaluationNonAgriculturalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
