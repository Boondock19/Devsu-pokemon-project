import { TestBed } from '@angular/core/testing';

import { CentralizedService } from './centralized.service';

describe('CentralizedService', () => {
  let service: CentralizedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CentralizedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
