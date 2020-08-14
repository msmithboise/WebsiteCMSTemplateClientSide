import { TestBed } from '@angular/core/testing';

import { CustomTextService } from './custom-text.service';

describe('CustomTextService', () => {
  let service: CustomTextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomTextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
