import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailEAasthiComponent } from './view-detail-e-aasthi.component';

describe('ViewDetailEAasthiComponent', () => {
  let component: ViewDetailEAasthiComponent;
  let fixture: ComponentFixture<ViewDetailEAasthiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDetailEAasthiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDetailEAasthiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
