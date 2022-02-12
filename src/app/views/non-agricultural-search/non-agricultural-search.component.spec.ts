import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonAgriculturalSearchComponent } from './non-agricultural-search.component';

describe('NonAgriculturalSearchComponent', () => {
  let component: NonAgriculturalSearchComponent;
  let fixture: ComponentFixture<NonAgriculturalSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonAgriculturalSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NonAgriculturalSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
