import { TestBed } from '@angular/core/testing';

import { Applicants } from './applicants';

describe('Applicants', () => {
  let service: Applicants;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Applicants);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
