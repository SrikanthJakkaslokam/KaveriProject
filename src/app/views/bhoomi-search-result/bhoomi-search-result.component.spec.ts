import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BhoomiSearchResultComponent } from './bhoomi-search-result.component';

describe('BhoomiSearchResultComponent', () => {
  let component: BhoomiSearchResultComponent;
  let fixture: ComponentFixture<BhoomiSearchResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BhoomiSearchResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BhoomiSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
