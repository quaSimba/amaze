import { TestBed, inject } from '@angular/core/testing';

import { PathFinderService } from './path-finder.service';

describe('PathFinderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PathFinderService]
    });
  });

  it('should be created', inject([PathFinderService], (service: PathFinderService) => {
    expect(service).toBeTruthy();
  }));
});
