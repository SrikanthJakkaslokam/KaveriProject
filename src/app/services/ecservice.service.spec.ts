import { TestBed } from '@angular/core/testing';

import { EcserviceService } from './ecservice.service';

describe('EcserviceService', () => {
  let service: EcserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EcserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
