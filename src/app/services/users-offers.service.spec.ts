import { TestBed } from '@angular/core/testing';

import { UsersOffersService } from './users-offers.service';

describe('UsersOffersService', () => {
  let service: UsersOffersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersOffersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
