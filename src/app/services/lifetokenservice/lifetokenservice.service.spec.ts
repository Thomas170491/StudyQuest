import { TestBed } from '@angular/core/testing';

import { LifetokenserviceService } from './lifetokenservice.service';

describe('LifetokenserviceService', () => {
  let service: LifetokenserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LifetokenserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
