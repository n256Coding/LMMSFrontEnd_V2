import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SlideStandardReport } from '../../models/SlideStandradReport';
import { SlideService } from './../../services/slide.service';

import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import Chart from 'Chart.js'

@Component({
  selector: 'app-slide-custom-report',
  templateUrl: './slide-custom-report.component.html',
  styleUrls: ['./slide-custom-report.component.css']
})
export class SlideCustomReportComponent implements OnInit {
  showSpinner: boolean = true;
      BarChart: any;
    PieChart: any;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private slideService: SlideService) { }

  ngOnInit() {
    this.getSlideReportFromService();
  }

  reportList: SlideStandardReport[];
      maxNo: number;
    totalPoints: number;
    currentPoints: number = 0;
    successPre: number;

  getSlideReportFromService(): void {
    this.reportList=null;
    this.slideService.getSlideCustomReport().subscribe(
      (updatedReport) => {

        
        this.reportList = updatedReport;
        this.showSpinner = false;
        this.maxNo = this.reportList.length;
        

                var barLableArray: string[] = new Array(this.maxNo);
                var barDataArray: number[] = new Array(this.maxNo);
                var colorArray: string[] = new Array(this.maxNo);
                var countlable: number = 0;
                var countdata: number = 0;
                var colordata: number = 0;
                this.totalPoints = 11 * this.maxNo;
                for (let i of this.reportList) {
                    this.currentPoints = this.currentPoints + i.checkingPoints;
                    barLableArray[countlable++] = "Slide No: "+i.slideNo;
                    barDataArray[countdata++] = i.checkingPoints;
                    colorArray[colordata++]= 'rgba(0, 0, 255, 0.8)';
                }

                this.successPre = +this.reportList[this.maxNo - 1].summary;

                this.PieChart = new Chart('pieChart', {
                    type: 'doughnut',
                    data: {
                        labels: ["Success", "Failed"],
                        datasets: [{
                            label: '# of Votes',
                            data: [this.successPre, 100 - this.successPre],
                            backgroundColor: [
                                'rgba(0, 255, 0, 0.8)',
                                'rgba(255, 0, 0, 0.8)'
                            ],

                            borderWidth: 1
                        }]
                    },
                    options: {
                        title: {
                            display: true
                        },
                        responsive: false,
                        display: true,
                    }
                });
                //////////////////////////////////////////////////////////////

                this.BarChart = new Chart('barChart', {
                    type: 'bar',
                    data: {
                        labels: barLableArray,
                        datasets: [{
                            label: 'Success Points in Slide',
                            data: barDataArray,
                            backgroundColor: colorArray,
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true,
                                    min: 0,
                                    max: 11
                                }
                            }]
                        }
                    }
                });



      });
  }

  goBack(): void {
    this.location.back();
  }

}
