import { TestBed } from '@angular/core/testing';

import { Educations } from './educations';

describe('Educations', () => {
  let service: Educations;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Educations);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
