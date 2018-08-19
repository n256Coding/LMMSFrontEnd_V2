import { Component, OnInit } from '@angular/core';
import { QuizResults } from '../../models/quizResults';
import { Router } from '@angular/router';
import { MoodleResultService } from './../../services/moodle-result.service';
declare var $: any;

@Component({
  selector: 'app-moodle-quiz-results',
  templateUrl: './moodle-quiz-results.component.html',
  styleUrls: ['./moodle-quiz-results.component.css']
})
export class MoodleQuizResultsComponent implements OnInit {

  constructor(private router: Router,
    private moodleResultService: MoodleResultService) { }

  quizResults : QuizResults = new QuizResults();

  showNotFourAnsQ(){
    $('#showIncorrectAnswers').removeClass('dis-none');
    
  }
  ngOnInit() {

    this.moodleResultService.currentMessageForQuiz.subscribe(
      res => {
        // this.QuizResults = res;
        if (res.totalQuestions === undefined) {
          this.router.navigateByUrl('/moodle');
          // this.router.navigateByUrl('/moodle-quiz-result');
          
        } else {
          this.quizResults = res;
          // console.log(res);
        }
      }
    );

  }

}
