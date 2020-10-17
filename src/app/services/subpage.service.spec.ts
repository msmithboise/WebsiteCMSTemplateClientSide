import { TestBed } from '@angular/core/testing';

import { SubpageService } from './subpage.service';

describe('SubpageService', () => {
  let service: SubpageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubpageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
