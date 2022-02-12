import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationAllocationComponent } from './application-allocation.component';

describe('ApplicationAllocationComponent', () => {
  let component: ApplicationAllocationComponent;
  let fixture: ComponentFixture<ApplicationAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationAllocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
