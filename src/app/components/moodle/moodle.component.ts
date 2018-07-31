import { Component, OnInit } from '@angular/core';
import { Credential } from '../../models/credential';
import { MoodleResults } from '../../models/moodleResults';
import { QuizResults } from '../../models/quizResults';
import { MoodleService } from './../../services/moodle.service';
import { Router } from '@angular/router';
import { ResourcesList } from '../../models/resourcesList';
import { MoodleResultService } from './../../services/moodle-result.service';

//quiz
import {HttpClient, HttpResponse, HttpEventType} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { MoodleQuizService } from './../../services/moodle-quiz.service';
import { QuizStandards } from '../../models/quizStandards';
declare var $: any;

@Component({
  selector: 'app-moodle',
  templateUrl: './moodle.component.html',
  styleUrls: ['./moodle.component.css']
})
export class MoodleComponent implements OnInit {

  constructor(private moodleService: MoodleService, private router: Router,
    private moodleResultService: MoodleResultService, private moodleQuizService: MoodleQuizService) { }

  checkValue = "";
  standardType = "";
  quizStdType = "basic_quiz_analyze";
  

  creds :Credential[] = [];
  quizStds: QuizStandards[] = [];
  resources : ResourcesList = new ResourcesList();
  quizes :  QuizResults = new  QuizResults();

  m_username ; m_loginUrl ; m_pwd ; m_pageUrl; 

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

  selectedQuizStd(event){
    this.quizStdType = event.target.value;
    // this.quizStdType = event.target.options[event.target.selectedIndex].text;
   
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

  checkMe(){
    // alert(this.quizStdType)

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

  // start quiz codes
  selectedFiles: FileList
  currentFileUpload: File
  progress: { percentage: number } = { percentage: 0 }
  
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.progress.percentage = 0;
 
    this.currentFileUpload = this.selectedFiles.item(0)

    if(this.currentFileUpload.type ==="text/xml"){
      this.moodleQuizService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress.percentage = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          console.log('File is completely uploaded!');
        } 
      },err=>{
        console.log("Failed to complete Uploading!!!");
      })
    }else{
      alert("Invalid file format !!! \n Moodle XML files only....")
    }
    this.progress.percentage = 0;
    this.selectedFiles = undefined
  }

  displayMoodleQuizResults(): void{
    // $('#moodleLoadingModal').modal('show');
    this.moodleQuizService.getMoodleQuizResults().subscribe(
      res => {
        // this.quizes = res;
        this.router.navigateByUrl('/moodle-quiz-results');
        this.moodleResultService.changeMessageForQuiz(res);
        $("#moodleLoadingModal").modal('hide');
      

      },err =>{
      alert("cannot connect to the quiz server !!!");
      $('#moodleLoadingModal').modal('hide');
      }
    );
  }

  //start quiz analyze
  startQuizAnalyze():void{
    const newQuizSetting: QuizStandards = new QuizStandards();
    newQuizSetting.analyzeType = this.quizStdType;
    
    this.moodleQuizService.addQuizSettings(newQuizSetting).subscribe(quizSettings => {
        console.log("inserted settings");
      
      },err =>{
        alert("cannot connect to the moodle server !!!");
      }
    );
    this.displayMoodleQuizResults();
  }


  // end quiz analyze
  
  // End quiz codes


  ngOnInit() {
    // this.displayMoodleResults();
  }

}
