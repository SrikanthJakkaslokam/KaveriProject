import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEAasthiComponent } from './view-e-aasthi.component';

describe('ViewEAasthiComponent', () => {
  let component: ViewEAasthiComponent;
  let fixture: ComponentFixture<ViewEAasthiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEAasthiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEAasthiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
