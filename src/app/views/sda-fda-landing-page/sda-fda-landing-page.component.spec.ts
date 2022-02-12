import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SdaFdaLandingPageComponent } from './sda-fda-landing-page.component';

describe('SdaFdaLandingPageComponent', () => {
  let component: SdaFdaLandingPageComponent;
  let fixture: ComponentFixture<SdaFdaLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SdaFdaLandingPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SdaFdaLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
