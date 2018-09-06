import { Component, OnInit } from '@angular/core';
import { QuizResults } from '../../models/quizResults';
import { Router } from '@angular/router';
import { MoodleResultService } from './../../services/moodle-result.service';
import { Chart} from 'chart.js';

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

   //chart variables
   canvas: any;
   ctx: any;

  showNotFourAnsQ(){
    // $('#showIncorrectAnswers').removeClass('dis-none');  
  }

  showAllQues(){
    if($('#tbl_all_ques').hasClass('dis-none')){
      $('#tbl_all_ques').removeClass('dis-none')

    }else{
      $('#tbl_all_ques').addClass('dis-none')
    }
  }

  showAllMCQs(){
    if($('#tbl_all_mcqs').hasClass('dis-none')){
      $('#tbl_all_mcqs').removeClass('dis-none')

    }else{
      $('#tbl_all_mcqs').addClass('dis-none')
    }
  }
  showSingleMCQs(){
    if($('#tbl_single_mcqs').hasClass('dis-none')){
      $('#tbl_single_mcqs').removeClass('dis-none')

    }else{
      $('#tbl_single_mcqs').addClass('dis-none')
    }
  }

  showMultiMCQs(){
    if($('#tbl_multi_mcqs').hasClass('dis-none')){
      $('#tbl_multi_mcqs').removeClass('dis-none')

    }else{
      $('#tbl_multi_mcqs').addClass('dis-none')
    }
  }

  showcorrectAnswers(){
    if($('#tbl_correct_ques').hasClass('dis-none')){
      $('#tbl_correct_ques').removeClass('dis-none')

    }else{
      $('#tbl_correct_ques').addClass('dis-none')
    }
  }

  showIncorrectAnswers(){
    if($('#tbl_incorrect_ques').hasClass('dis-none')){
      $('#tbl_incorrect_ques').removeClass('dis-none')

    }else{
      $('#tbl_incorrect_ques').addClass('dis-none')
    }
  }
  htmlToAdd;
  ngOnInit() {
    // this.htmlToAdd = '<div>two</div>';
    
    
    this.moodleResultService.currentMessageForQuiz.subscribe(
      res => {
        // this.QuizResults = res;
        if (res.totalQuestions === undefined) {
          this.router.navigateByUrl('/moodle');
          // this.router.navigateByUrl('/moodle-quiz-results');
          
        } else {
          this.quizResults = res;  
          // pie chart
          this.canvas = document.getElementById('quesBasicChart');
          this.ctx = this.canvas.getContext('2d');
          let quesBasicChart = new Chart(this.ctx, {
            type: 'pie',
            data: {
                labels: ["MCQs", "True/False", "Short Answer", "Numerical", "Matching", "Essay" ],
                datasets: [{
                    label: 'Question Types',
                    data: [res.multiChoice, res.trueFalse, res.shortAnsQues, res.numericalQues, res.matchingQues, res.essayQues],
                    backgroundColor: [
                        'rgb(76, 175, 80)', //green
                        'rgb(244, 67, 54)', //red
                        'rgb(200, 235, 4)', //yellow
                        'rgb(45, 220, 10)', //blue
                        'rgb(10, 96, 235)', 
                        'rgb(4, 45, 100)' 
                    ],
                    borderWidth: 1
                }]
            },
            options: {
              responsive: false,
              display: true,
              title: {
                display: true,
                text: 'Overall Result'
            }
            }
          });
          //end pie chart
      
        }

      }
    );

      
  }

}
