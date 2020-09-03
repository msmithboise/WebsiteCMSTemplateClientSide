import { TestBed } from '@angular/core/testing';

import { WebcontentService } from './webcontent.service';

describe('WebcontentService', () => {
  let service: WebcontentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebcontentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
