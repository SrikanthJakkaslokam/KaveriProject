import { TestBed } from '@angular/core/testing';

import { MarketvaluationService } from './marketvaluation.service';

describe('MarketvaluationService', () => {
  let service: MarketvaluationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarketvaluationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
