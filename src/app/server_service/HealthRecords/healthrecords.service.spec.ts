import { TestBed } from '@angular/core/testing';

import { HealthrecordsService } from './healthrecords.service';

describe('HealthrecordsService', () => {
  let service: HealthrecordsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HealthrecordsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
