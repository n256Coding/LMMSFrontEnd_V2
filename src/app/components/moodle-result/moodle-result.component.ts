import { Component, OnInit } from '@angular/core';
import { ResourcesList } from '../../models/resourcesList';
import { Router } from '@angular/router';
import { MoodleService } from './../../services/moodle.service';
import { MoodleResultService } from './../../services/moodle-result.service';

@Component({
  selector: 'app-moodle-result',
  templateUrl: './moodle-result.component.html',
  styleUrls: ['./moodle-result.component.css']
})
export class MoodleResultComponent implements OnInit {

  constructor(private router: Router,
    private moodleResultService: MoodleResultService) { }

    resources : ResourcesList = new ResourcesList();

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
  }

}
