import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodleQuizResultsComponent } from './moodle-quiz-results.component';

describe('MoodleQuizResultsComponent', () => {
  let component: MoodleQuizResultsComponent;
  let fixture: ComponentFixture<MoodleQuizResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoodleQuizResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoodleQuizResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
