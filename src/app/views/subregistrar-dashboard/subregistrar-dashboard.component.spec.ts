import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubregistrarDashboardComponent } from './subregistrar-dashboard.component';

describe('SubregistrarDashboardComponent', () => {
  let component: SubregistrarDashboardComponent;
  let fixture: ComponentFixture<SubregistrarDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubregistrarDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubregistrarDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
