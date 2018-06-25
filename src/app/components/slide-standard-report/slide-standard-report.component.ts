import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SlideStandardReport } from '../../models/SlideStandradReport';
import { SlideService } from './../../services/slide.service';

import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-slide-standard-report',
  templateUrl: './slide-standard-report.component.html',
  styleUrls: ['./slide-standard-report.component.css']
})
export class SlideStandardReportComponent implements OnInit {

  showSpinner: boolean = true;


  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private slideService: SlideService) { }

  ngOnInit() {
    this.getSlideReportFromService();
  }

  reportList: SlideStandardReport[];
  getSlideReportFromService(): void {
    this.reportList=null;
    this.slideService.getSlideReport().subscribe(
      (updatedReport) => {

        this.reportList = updatedReport;
        this.showSpinner = false;
      });
  }

  goBack(): void {
    this.location.back();
  }
}
