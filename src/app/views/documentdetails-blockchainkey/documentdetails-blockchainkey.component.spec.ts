import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentdetailsBlockchainkeyComponent } from './documentdetails-blockchainkey.component';

describe('DocumentdetailsBlockchainkeyComponent', () => {
  let component: DocumentdetailsBlockchainkeyComponent;
  let fixture: ComponentFixture<DocumentdetailsBlockchainkeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentdetailsBlockchainkeyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentdetailsBlockchainkeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
