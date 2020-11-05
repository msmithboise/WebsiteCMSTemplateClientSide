import { TestBed } from '@angular/core/testing';

import { WebStructureService } from './web-structure.service';

describe('WebStructureService', () => {
  let service: WebStructureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebStructureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
