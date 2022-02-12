import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeoPortalAllocatedApplicationComponent } from './deo-portal-allocated-application.component';

describe('DeoPortalAllocatedApplicationComponent', () => {
  let component: DeoPortalAllocatedApplicationComponent;
  let fixture: ComponentFixture<DeoPortalAllocatedApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeoPortalAllocatedApplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeoPortalAllocatedApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
