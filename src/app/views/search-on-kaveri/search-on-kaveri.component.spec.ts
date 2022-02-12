import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchOnKaveriComponent } from './search-on-kaveri.component';

describe('SearchOnKaveriComponent', () => {
  let component: SearchOnKaveriComponent;
  let fixture: ComponentFixture<SearchOnKaveriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchOnKaveriComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchOnKaveriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
