import { TestBed, inject } from '@angular/core/testing';

import { TargetAreaService } from './target-area.service';

describe('TargetAreaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TargetAreaService]
    });
  });

  it('should be created', inject([TargetAreaService], (service: TargetAreaService) => {
    expect(service).toBeTruthy();
  }));
});
