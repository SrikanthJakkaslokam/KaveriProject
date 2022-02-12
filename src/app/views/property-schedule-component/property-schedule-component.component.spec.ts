import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyScheduleComponentComponent } from './property-schedule-component.component';

describe('PropertyScheduleComponentComponent', () => {
  let component: PropertyScheduleComponentComponent;
  let fixture: ComponentFixture<PropertyScheduleComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyScheduleComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyScheduleComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
