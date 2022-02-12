import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiabilityDetailComponent } from './liability-detail.component';

describe('LiabilityDetailComponent', () => {
  let component: LiabilityDetailComponent;
  let fixture: ComponentFixture<LiabilityDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiabilityDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiabilityDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
