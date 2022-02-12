import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPropertyNonAgriculturalComponent } from './view-property-non-agricultural.component';

describe('ViewPropertyNonAgriculturalComponent', () => {
  let component: ViewPropertyNonAgriculturalComponent;
  let fixture: ComponentFixture<ViewPropertyNonAgriculturalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPropertyNonAgriculturalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPropertyNonAgriculturalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
