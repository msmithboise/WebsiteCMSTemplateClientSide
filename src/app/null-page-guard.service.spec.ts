import { TestBed } from '@angular/core/testing';

import { NullPageGuardService } from './null-page-guard.service';

describe('NullPageGuardService', () => {
  let service: NullPageGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NullPageGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
