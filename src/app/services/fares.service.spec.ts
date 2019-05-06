import { TestBed, inject } from '@angular/core/testing';

import { FaresService } from './fares.service';

describe('FaresService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FaresService]
    });
  });

  it('should be created', inject([FaresService], (service: FaresService) => {
    expect(service).toBeTruthy();
  }));
});
