import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanUploadDocumentComponent } from './scan-upload-document.component';

describe('ScanUploadDocumentComponent', () => {
  let component: ScanUploadDocumentComponent;
  let fixture: ComponentFixture<ScanUploadDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScanUploadDocumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanUploadDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
