import { TestBed } from '@angular/core/testing';

import { NameStatesService } from './name-states.service';

describe('NameStatesService', () => {
  let service: NameStatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NameStatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
