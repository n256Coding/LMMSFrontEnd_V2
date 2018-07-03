import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodleResultComponent } from './moodle-result.component';

describe('MoodleResultComponent', () => {
  let component: MoodleResultComponent;
  let fixture: ComponentFixture<MoodleResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoodleResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoodleResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
