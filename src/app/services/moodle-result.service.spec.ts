import { TestBed, inject } from '@angular/core/testing';

import { MoodleResultService } from './moodle-result.service';

describe('MoodleResultService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MoodleResultService]
    });
  });

  it('should be created', inject([MoodleResultService], (service: MoodleResultService) => {
    expect(service).toBeTruthy();
  }));
});
