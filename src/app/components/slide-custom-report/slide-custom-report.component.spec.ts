import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideCustomReportComponent } from './slide-custom-report.component';

describe('SlideCustomReportComponent', () => {
  let component: SlideCustomReportComponent;
  let fixture: ComponentFixture<SlideCustomReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlideCustomReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideCustomReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
