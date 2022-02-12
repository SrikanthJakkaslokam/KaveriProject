import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentalLoginComponent } from './departmental-login.component';

describe('DepartmentalLoginComponent', () => {
  let component: DepartmentalLoginComponent;
  let fixture: ComponentFixture<DepartmentalLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentalLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentalLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
