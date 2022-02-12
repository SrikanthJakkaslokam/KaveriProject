import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultWithoutKaveriComponent } from './search-result-without-kaveri.component';

describe('SearchResultWithoutKaveriComponent', () => {
  let component: SearchResultWithoutKaveriComponent;
  let fixture: ComponentFixture<SearchResultWithoutKaveriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchResultWithoutKaveriComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultWithoutKaveriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
