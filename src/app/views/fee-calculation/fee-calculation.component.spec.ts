import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeCalculationComponent } from './fee-calculation.component';

describe('FeeCalculationComponent', () => {
  let component: FeeCalculationComponent;
  let fixture: ComponentFixture<FeeCalculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeeCalculationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeeCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
