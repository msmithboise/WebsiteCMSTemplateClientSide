import { TestBed } from '@angular/core/testing';

import { DefaultTemplateService } from './default-template.service';

describe('DefaultTemplateService', () => {
  let service: DefaultTemplateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefaultTemplateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
