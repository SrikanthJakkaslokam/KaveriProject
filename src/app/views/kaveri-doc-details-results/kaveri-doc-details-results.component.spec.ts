import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KaveriDocDetailsResultsComponent } from './kaveri-doc-details-results.component';

describe('KaveriDocDetailsResultsComponent', () => {
  let component: KaveriDocDetailsResultsComponent;
  let fixture: ComponentFixture<KaveriDocDetailsResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KaveriDocDetailsResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KaveriDocDetailsResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
