import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelCourtOrderComponent } from './cancel-court-order.component';

describe('CancelCourtOrderComponent', () => {
  let component: CancelCourtOrderComponent;
  let fixture: ComponentFixture<CancelCourtOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelCourtOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelCourtOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
