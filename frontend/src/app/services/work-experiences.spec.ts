import { TestBed } from '@angular/core/testing';

import { WorkExperiences } from './work-experiences';

describe('WorkExperiences', () => {
  let service: WorkExperiences;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkExperiences);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
