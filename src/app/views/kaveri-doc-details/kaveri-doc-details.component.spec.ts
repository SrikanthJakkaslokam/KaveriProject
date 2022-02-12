import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KaveriDocDetailsComponent } from './kaveri-doc-details.component';

describe('KaveriDocDetailsComponent', () => {
  let component: KaveriDocDetailsComponent;
  let fixture: ComponentFixture<KaveriDocDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KaveriDocDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KaveriDocDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
