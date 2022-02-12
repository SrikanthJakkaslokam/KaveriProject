import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EAasthiComponent } from './e-aasthi.component';

describe('EAasthiComponent', () => {
  let component: EAasthiComponent;
  let fixture: ComponentFixture<EAasthiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EAasthiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EAasthiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
