import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentForApprovalComponent } from './document-for-approval.component';

describe('DocumentForApprovalComponent', () => {
  let component: DocumentForApprovalComponent;
  let fixture: ComponentFixture<DocumentForApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentForApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentForApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
