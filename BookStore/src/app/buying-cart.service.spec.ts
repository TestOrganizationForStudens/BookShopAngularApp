import { TestBed } from '@angular/core/testing';

import { BuyingCartService } from './buying-cart.service';

describe('BuyingCartService', () => {
  let service: BuyingCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuyingCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
