import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BhoomiHissaComponent } from './bhoomi-hissa.component';

describe('BhoomiHissaComponent', () => {
  let component: BhoomiHissaComponent;
  let fixture: ComponentFixture<BhoomiHissaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BhoomiHissaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BhoomiHissaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
