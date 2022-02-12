import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KaveriResultComponent } from './kaveri-result.component';

describe('KaveriResultComponent', () => {
  let component: KaveriResultComponent;
  let fixture: ComponentFixture<KaveriResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KaveriResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KaveriResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
