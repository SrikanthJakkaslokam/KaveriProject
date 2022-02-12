import { TestBed } from '@angular/core/testing';

import { DocumentapprovalService } from './documentapproval.service';

describe('DocumentapprovalService', () => {
  let service: DocumentapprovalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentapprovalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
