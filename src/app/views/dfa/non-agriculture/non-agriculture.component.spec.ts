import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonAgricultureComponent } from './non-agriculture.component';

describe('NonAgricultureComponent', () => {
  let component: NonAgricultureComponent;
  let fixture: ComponentFixture<NonAgricultureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonAgricultureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NonAgricultureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
