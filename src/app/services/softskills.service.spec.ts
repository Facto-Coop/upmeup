import { TestBed } from '@angular/core/testing';

import { SoftskillsService } from './softskills.service';

describe('SoftskillsService', () => {
  let service: SoftskillsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoftskillsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
