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
  btnNeedsCredentials = "no_needs_cred";
  standardType = "moodle_standard_validation";
  quizStdType = "basic_quiz_analyze";
  // moodle fields
  moodleTopicType = "date_wise";
  weeklyDesc = "checked";
  resourcesName = "checked";
  resourcesDesc = "checked";
  lecturesName = "";
// end moodle fields

  creds :Credential[] = [];
  quizStds: QuizStandards[] = [];
  resources : ResourcesList = new ResourcesList();
  quizes :  QuizResults = new  QuizResults();

  m_username ; m_loginUrl ; m_pwd ; m_pageUrl;
  
  begin_string; 
  resNumCheck = "numAdd";
  resCharCheck = "none";
  testNum; testChar; 

  selectedOption(event) {
    this.checkValue = event.target.value;
    // alert("clicked !! "+ event.target.value);
  }

  selectedMoodleStandard(event) {
    this.standardType = event.target.value;
    // alert( this.standardType)
  }
  getTopicType(event){
    this.moodleTopicType = event.target.value;
  }

  getMainDescCheck(event){
    this.weeklyDesc = event.target.value;
  }

  getResCheck(event){
    this.resourcesName = event.target.value;
  }

  getResDescCheck(event){
    this.resourcesDesc = event.target.value;
  }

  selectedValidationOption(event){

  }

  selectResNumType(event){
    this.resNumCheck = event.target.value;
  }

  selectResCharType(event){
    this.resCharCheck = event.target.value;
  }

  //quizes
  selectedQuizStd(event){
    this.quizStdType = event.target.value;
    // this.quizStdType = event.target.options[event.target.selectedIndex].text;   
  }

  //quizes ends


  enterLoginCreds(){
    this.btnNeedsCredentials = "needs_cred";
    $('#btn_cancel_cred').removeClass('dis-none')
    $('#btn_enter_cred').addClass('dis-none')
  }
  cancelLoginCreds(){
    this.btnNeedsCredentials = "no_needs_cred";
    $('#btn_cancel_cred').addClass('dis-none')
    $('#btn_enter_cred').removeClass('dis-none')
  }

  credInfo(){
    alert('sfsd')
  }

  showPreviewRes(){
    $('#showResourcePreview').show();
    $('#clsResPrew').removeClass('dis-none');

    if(this.resNumCheck === 'numAdd')
      this.testNum = "1";
    else
      this.testNum = "";
    
    if(this.resCharCheck === 'none')
      this.testChar = ""
    else
      this.testChar = this.resCharCheck

    $('#showResourcePreview').html(this.begin_string +' '+this.testNum +' '+this.testChar + ' xxxxxxxxxxxx')
  }
  
  closePreviewRes(){
    $('#clsResPrew').addClass('dis-none');
    $('#showResourcePreview').hide();
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
    console.log(this.begin_string)
  }


  applyMoodleValidateSettings(){

  }

  startMoodlePageValidation(pageUrl){
    const newMoodle: Credential = new Credential();
    newMoodle.pageUrl = pageUrl.value;
    newMoodle.standardType = this.standardType;
    newMoodle.credentialType = this.btnNeedsCredentials;

    if(this.btnNeedsCredentials =="needs_cred"){
      newMoodle.username = this.m_username;
      newMoodle.pwd = this.m_pwd;
      newMoodle.loginUrl = this.m_loginUrl;
    }
    
    if(this.standardType == "moodle_custom_validation"){
      newMoodle.moodleTopicType = this.moodleTopicType;
      newMoodle.weeklyDesc = this.weeklyDesc;
      newMoodle.resourcesName = this.resourcesName;
      newMoodle.resourcesDesc = this.resourcesDesc;
      newMoodle.lecturesName = this.begin_string;
      newMoodle.lectureNumber = this.resNumCheck;
      newMoodle.lectureCharacter = this.resCharCheck;
    }

    this.moodleService.addValidateData(newMoodle).subscribe(insertedCred => {
        console.log("inserted credentials");
        this.displayMoodleResults();
      },err =>{
        alert("cannot connect to the moodle server !!!");
      }
    );
    // this.displayMoodleResults();
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
        this.displayMoodleQuizResults();
      },err =>{
        alert("cannot connect to the moodle server !!!");
      }
    );
    
  }


  // end quiz analyze
  
  // End quiz codes


  ngOnInit() {
    // this.displayMoodleResults();

  }

}
