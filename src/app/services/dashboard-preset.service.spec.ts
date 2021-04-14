import { TestBed } from '@angular/core/testing';

import { DashboardPresetService } from './dashboard-preset.service';

describe('DashboardPresetService', () => {
  let service: DashboardPresetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardPresetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
