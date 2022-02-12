import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyScheduleDetailsComponent } from './property-schedule.component';

describe('PropertyScheduleDetailsComponent', () => {
  let component: PropertyScheduleDetailsComponent;
  let fixture: ComponentFixture<PropertyScheduleDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyScheduleDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyScheduleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
