import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CcSearchComponent } from './cc-search.component';

describe('CcSearchComponent', () => {
  let component: CcSearchComponent;
  let fixture: ComponentFixture<CcSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CcSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CcSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
