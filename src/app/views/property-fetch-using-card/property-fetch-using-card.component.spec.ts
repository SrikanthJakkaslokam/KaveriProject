import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyFetchUsingCardComponent } from './property-fetch-using-card.component';

describe('PropertyFetchUsingCardComponent', () => {
  let component: PropertyFetchUsingCardComponent;
  let fixture: ComponentFixture<PropertyFetchUsingCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyFetchUsingCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyFetchUsingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
