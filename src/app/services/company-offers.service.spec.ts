import { TestBed } from '@angular/core/testing';

import { CompanyOffersService } from './company-offers.service';

describe('CompanyOffersService', () => {
  let service: CompanyOffersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyOffersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
