import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CcDocumentDetailsBlockchainKeyComponent } from './cc-document-details-blockchain-key.component';

describe('CcDocumentDetailsBlockchainKeyComponent', () => {
  let component: CcDocumentDetailsBlockchainKeyComponent;
  let fixture: ComponentFixture<CcDocumentDetailsBlockchainKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CcDocumentDetailsBlockchainKeyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CcDocumentDetailsBlockchainKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
