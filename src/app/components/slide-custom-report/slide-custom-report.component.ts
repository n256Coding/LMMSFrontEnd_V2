import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SlideStandardReport } from '../../models/SlideStandradReport';
import { SlideService } from './../../services/slide.service';

import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-slide-custom-report',
  templateUrl: './slide-custom-report.component.html',
  styleUrls: ['./slide-custom-report.component.css']
})
export class SlideCustomReportComponent implements OnInit {
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
    this.slideService.getSlideCustomReport().subscribe(
      (updatedReport) => {

        this.reportList = updatedReport;
        this.showSpinner = false;
      });
  }

  goBack(): void {
    this.location.back();
  }

}
