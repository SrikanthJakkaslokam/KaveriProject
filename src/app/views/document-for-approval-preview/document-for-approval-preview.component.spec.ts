import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentForApprovalPreviewComponent } from './document-for-approval-preview.component';

describe('DocumentForApprovalPreviewComponent', () => {
  let component: DocumentForApprovalPreviewComponent;
  let fixture: ComponentFixture<DocumentForApprovalPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentForApprovalPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentForApprovalPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
