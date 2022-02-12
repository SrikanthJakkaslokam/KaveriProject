import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterValuationComponent } from './master-valuation.component';

describe('MasterValuationComponent', () => {
  let component: MasterValuationComponent;
  let fixture: ComponentFixture<MasterValuationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterValuationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterValuationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
