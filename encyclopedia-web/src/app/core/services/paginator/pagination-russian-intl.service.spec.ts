import { TestBed } from '@angular/core/testing';

import { PaginationRussianIntlService } from './pagination-russian-intl.service';

describe('PaginationRussianIntlService', () => {
  let service: PaginationRussianIntlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaginationRussianIntlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
