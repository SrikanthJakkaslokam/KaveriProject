import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KindOfMortgageComponent } from './kind-of-mortgage.component';

describe('KindOfMortgageComponent', () => {
  let component: KindOfMortgageComponent;
  let fixture: ComponentFixture<KindOfMortgageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KindOfMortgageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KindOfMortgageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
