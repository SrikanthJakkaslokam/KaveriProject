import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WillProceedingsComponent } from './will-proceedings.component';

describe('WillProceedingsComponent', () => {
  let component: WillProceedingsComponent;
  let fixture: ComponentFixture<WillProceedingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WillProceedingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WillProceedingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
