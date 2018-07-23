import { TestBed, inject } from '@angular/core/testing';

import { MoodleQuizService } from './moodle-quiz.service';

describe('MoodleQuizService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MoodleQuizService]
    });
  });

  it('should be created', inject([MoodleQuizService], (service: MoodleQuizService) => {
    expect(service).toBeTruthy();
  }));
});
