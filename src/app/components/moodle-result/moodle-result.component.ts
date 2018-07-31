import { Component, OnInit } from '@angular/core';
import { ResourcesList } from '../../models/resourcesList';
import { Router } from '@angular/router';
import { MoodleService } from './../../services/moodle.service';
import { MoodleResultService } from './../../services/moodle-result.service';
import { Chart} from 'chart.js';

@Component({
  selector: 'app-moodle-result',
  templateUrl: './moodle-result.component.html',
  styleUrls: ['./moodle-result.component.css']
})
export class MoodleResultComponent implements OnInit {

  constructor(private router: Router,
    private moodleResultService: MoodleResultService) { }

    resources : ResourcesList = new ResourcesList();

  //chart variables
  canvas: any;
  ctx: any;

  ngOnInit() {
    this.moodleResultService.currentMessage.subscribe(
      res => {
        if (res.sectionType === undefined) {
          // this.router.navigateByUrl('/moodle');
          this.router.navigateByUrl('/moodle-result');
          
        } else {
          this.resources = res;
          console.log('SectionType: '+this.resources.sectionType);
          console.log(res);
          console.log(this.resources.resourcesList);
        }
      }
    );

    // pie chart
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    let myChart = new Chart(this.ctx, {
      type: 'pie',
      data: {
          labels: ["Success", "Fail"],
          datasets: [{
              label: '# of Resources',
              data: [12,9],
              backgroundColor: [
                  'rgb(76, 175, 80)', //green
                  'rgb(244, 67, 54)' //red
              ],
              borderWidth: 1
          }]
      },
      options: {
        responsive: true,
        display: true
      }
    });
    //end pie chart


  }

}
