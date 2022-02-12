import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ESwathuComponent } from './e-swathu.component';

describe('ESwathuComponent', () => {
  let component: ESwathuComponent;
  let fixture: ComponentFixture<ESwathuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ESwathuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ESwathuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
