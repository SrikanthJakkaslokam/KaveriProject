import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KaveriDashboardComponent } from './kaveri-dashboard.component';

describe('KaveriDashboardComponent', () => {
  let component: KaveriDashboardComponent;
  let fixture: ComponentFixture<KaveriDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KaveriDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KaveriDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
