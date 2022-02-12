import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscellaneousPropertiesDetailsComponent } from './miscellaneous-properties-details.component';

describe('MiscellaneousPropertiesDetailsComponent', () => {
  let component: MiscellaneousPropertiesDetailsComponent;
  let fixture: ComponentFixture<MiscellaneousPropertiesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiscellaneousPropertiesDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscellaneousPropertiesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
