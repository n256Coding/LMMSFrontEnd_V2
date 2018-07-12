import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SlideStandardReport } from '../../models/SlideStandradReport';
import { SlideService } from './../../services/slide.service';

import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import Chart from 'Chart.js'
declare var $: any;

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
        $('#slideCustomLoadingModal').modal('show');
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
         $('#slideCustomLoadingModal').modal('hide');

                var barLableArray: string[] = new Array(this.maxNo);
                var barDataArray: number[] = new Array(this.maxNo);
                var colorArray: string[] = new Array(this.maxNo);
                var countlable: number = 0;
                var countdata: number = 0;
                var colordata: number = 0;
                this.totalPoints = 10 * this.maxNo;
                for (let i of this.reportList) {
                    this.currentPoints = this.currentPoints + i.checkingPoints;
                    barLableArray[countlable++] = "Slide No: "+i.slideNo;
                    barDataArray[countdata++] = i.checkingPoints;
                    colorArray[colordata++]= 'rgba(0, 102, 255, 0.5)';
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
                                'rgba(0, 153, 51,0.7)',
                                'rgba(204, 0, 0, 0.7)'
                            ],

                            borderWidth: 1
                        }]
                    },
                    options: {
                        title: {
                            label:"Success Chart",
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
                        }, {
                           label:'Success Points',
                            data: barDataArray,

                            // Changes this dataset to become a line
                            type: 'line'
                        }]
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true,
                                    min: 0,
                                    max: 10
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
