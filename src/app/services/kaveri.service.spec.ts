import { TestBed } from '@angular/core/testing';

import { KaveriService } from './kaveri.service';

describe('KaveriService', () => {
  let service: KaveriService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KaveriService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
