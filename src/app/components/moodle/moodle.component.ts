import { Component, OnInit } from '@angular/core';
import { Credential } from '../../models/credential';
import { MoodleResults } from '../../models/moodleResults';
import { MoodleService } from './../../services/moodle.service';
import { Router } from '@angular/router';
import { ResourcesList } from '../../models/resourcesList';
import { MoodleResultService } from './../../services/moodle-result.service';

declare var $: any;

@Component({
  selector: 'app-moodle',
  templateUrl: './moodle.component.html',
  styleUrls: ['./moodle.component.css']
})
export class MoodleComponent implements OnInit {

  constructor(private moodleService: MoodleService, private router: Router,
    private moodleResultService: MoodleResultService) { }

  checkValue = "";
  standardType = "";


  creds :Credential[] = [];
  resources : ResourcesList = new ResourcesList();

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
    $('#moodleLoadingModal').modal('show');

    this.moodleService.getMoodleResults().subscribe(
      res => {
        // this.resources = res
        this.router.navigateByUrl('/moodle-result');
        this.moodleResultService.changeMessage(res);
       $('#moodleLoadingModal').modal('hide');

      },err =>{
      alert("cannot connect to the moodle server !!!");
      $('#moodleLoadingModal').modal('hide');
      }
    );
  }

  // sendMoodleCredentials(){
  //   const newMoodle: Credential = new Credential();
  //   newMoodle.username = this.m_username;
  //   newMoodle.pwd = this.m_pwd;
  //   newMoodle.loginUrl = this.m_loginUrl;
  //   newMoodle.pageUrl = this.m_pageUrl;
  //   this.moodleService.addValidateData(newMoodle).subscribe(insertedCred => {
  //       console.log("inserted");
  //     });
  // }

  checkData(){
    console.log(this.m_username)
  }




  startMoodlePageValidation(loginUrl, userName, userPwd, pageUrl){
    const newMoodle: Credential = new Credential();
    newMoodle.username = userName.value;
    newMoodle.pwd = userPwd.value;
    newMoodle.loginUrl = loginUrl.value;
    newMoodle.pageUrl = pageUrl.value;
    this.moodleService.addValidateData(newMoodle).subscribe(insertedCred => {
        console.log("inserted credentials");

      },err =>{
        alert("cannot connect to the moodle server !!!");
      }
    );
    this.displayMoodleResults();
  }



  ngOnInit() {

    // this.displayMoodleResults();

  }

}
