import { TestBed } from '@angular/core/testing';

import { CustomImageService } from './custom-image.service';

describe('CustomImageService', () => {
  let service: CustomImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
