import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DFAComponent } from './dfa.component';

describe('DFAComponent', () => {
  let component: DFAComponent;
  let fixture: ComponentFixture<DFAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DFAComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DFAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
