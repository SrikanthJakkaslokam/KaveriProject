import { TestBed } from '@angular/core/testing';

import { MovableService } from './movable.service';

describe('MovableService', () => {
  let service: MovableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
