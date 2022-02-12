import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KaveriDocNumberResultsComponent } from './kaveri-doc-number-results.component';

describe('KaveriDocNumberResultsComponent', () => {
  let component: KaveriDocNumberResultsComponent;
  let fixture: ComponentFixture<KaveriDocNumberResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KaveriDocNumberResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KaveriDocNumberResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
