import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketvaluationComponent } from './marketvaluation.component';

describe('MarketvaluationComponent', () => {
  let component: MarketvaluationComponent;
  let fixture: ComponentFixture<MarketvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketvaluationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
