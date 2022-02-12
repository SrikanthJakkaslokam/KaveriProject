import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcSearchResultComponent } from './ec-search-result.component';

describe('EcSearchResultComponent', () => {
  let component: EcSearchResultComponent;
  let fixture: ComponentFixture<EcSearchResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EcSearchResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EcSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
