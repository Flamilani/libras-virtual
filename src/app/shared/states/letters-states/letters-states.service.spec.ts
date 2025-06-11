import { TestBed } from '@angular/core/testing';

import { LettersStatesService } from './letters-states.service';

describe('LettersStatesService', () => {
  let service: LettersStatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LettersStatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
