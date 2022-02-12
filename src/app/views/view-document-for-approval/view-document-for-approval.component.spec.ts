import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDocumentForApprovalComponent } from './view-document-for-approval.component';

describe('ViewDocumentForApprovalComponent', () => {
  let component: ViewDocumentForApprovalComponent;
  let fixture: ComponentFixture<ViewDocumentForApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDocumentForApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDocumentForApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
