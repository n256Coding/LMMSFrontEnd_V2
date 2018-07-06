import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideStandardReportComponent } from './slide-standard-report.component';

describe('SlideStandardReportComponent', () => {
  let component: SlideStandardReportComponent;
  let fixture: ComponentFixture<SlideStandardReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlideStandardReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideStandardReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
