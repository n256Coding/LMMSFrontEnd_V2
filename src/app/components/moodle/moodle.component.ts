import { Component, OnInit } from '@angular/core';
import { Credential } from '../../models/credential';
import { MoodleResults } from '../../models/moodleResults';
import { MoodleService } from './../../services/moodle.service';

@Component({
  selector: 'app-moodle',
  templateUrl: './moodle.component.html',
  styleUrls: ['./moodle.component.css']
})
export class MoodleComponent implements OnInit {

  constructor(private moodleService: MoodleService) { }

  checkValue = "";
  standardType = "";

  creds :Credential;
  resources : MoodleResults; 

  m_username; m_loginUrl; m_pwd ; m_pageUrl; 

  selectedOption(event) {
    this.checkValue = event.target.value;
    // alert("clicked !! "+ event.target.value);
  }

  selectedMoodleStandard(event) {
    this.standardType = event.target.value;
    // alert( this.standardType)
  }

  selectedValidationOption(event){

  }

  displayMoodleResults(): void{
    this.moodleService.getMoodleResults().subscribe(res => this.resources = res)
  }

  sendMoodleCredentials(){
    const newMoodle: Credential = new Credential();
    newMoodle.username = this.m_username;
    newMoodle.pwd = this.m_pwd;
    newMoodle.loginUrl = this.m_loginUrl;
    newMoodle.pageUrl = this.m_pageUrl;
    this.moodleService.addValidateData(newMoodle).subscribe(insertedCred => {
        console.log("inserted");
      });
  }

  checkData(){
    console.log(this.m_username)
  }



  ngOnInit() {
    // this.displayMoodleResults();
  }

}
