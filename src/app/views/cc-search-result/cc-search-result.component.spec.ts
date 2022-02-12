import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CcSearchResultComponent } from './cc-search-result.component';

describe('CcSearchResultComponent', () => {
  let component: CcSearchResultComponent;
  let fixture: ComponentFixture<CcSearchResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CcSearchResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CcSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
