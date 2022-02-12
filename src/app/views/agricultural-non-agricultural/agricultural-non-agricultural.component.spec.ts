import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgriculturalNonAgriculturalComponent } from './agricultural-non-agricultural.component';

describe('AgriculturalNonAgriculturalComponent', () => {
  let component: AgriculturalNonAgriculturalComponent;
  let fixture: ComponentFixture<AgriculturalNonAgriculturalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgriculturalNonAgriculturalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgriculturalNonAgriculturalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
