import { Component, OnInit } from '@angular/core';
import { Credential } from '../../models/credential';

@Component({
  selector: 'app-moodle',
  templateUrl: './moodle.component.html',
  styleUrls: ['./moodle.component.css']
})
export class MoodleComponent implements OnInit {

  constructor() { }

  checkValue = "";
  creds = new Credential();

  selectedOption(event) {
    this.checkValue = event.target.value;
    // alert("clicked !! "+ event.target.value);
  }

  ngOnInit() {
  }

}
