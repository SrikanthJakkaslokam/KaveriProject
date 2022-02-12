import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KaveriDocNumberComponent } from './kaveri-doc-number.component';

describe('KaveriDocNumberComponent', () => {
  let component: KaveriDocNumberComponent;
  let fixture: ComponentFixture<KaveriDocNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KaveriDocNumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KaveriDocNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
