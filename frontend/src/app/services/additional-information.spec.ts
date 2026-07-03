import { TestBed } from '@angular/core/testing';

import { AdditionalInformation } from './additional-information';

describe('AdditionalInformation', () => {
  let service: AdditionalInformation;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdditionalInformation);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
