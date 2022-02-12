import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BhoomiSearchComponent } from './bhoomi-search.component';

describe('BhoomiSearchComponent', () => {
  let component: BhoomiSearchComponent;
  let fixture: ComponentFixture<BhoomiSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BhoomiSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BhoomiSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
