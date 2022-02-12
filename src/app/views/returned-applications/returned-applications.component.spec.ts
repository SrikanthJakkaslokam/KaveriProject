import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnedApplicationsComponent } from './returned-applications.component';

describe('ReturnedApplicationsComponent', () => {
  let component: ReturnedApplicationsComponent;
  let fixture: ComponentFixture<ReturnedApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnedApplicationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnedApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
