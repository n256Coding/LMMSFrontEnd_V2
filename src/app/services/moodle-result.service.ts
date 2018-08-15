import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ResourcesList } from './../models/resourcesList';
import { QuizResults } from './../models/quizResults';

@Injectable({
  providedIn: 'root'
})
export class MoodleResultService {

  //moodle page message
  private messageSource = new BehaviorSubject(new ResourcesList);
  currentMessage = this.messageSource.asObservable();

  //moodle quiz message
  private messageSourceForQuiz = new BehaviorSubject(new QuizResults);
  currentMessageForQuiz = this.messageSourceForQuiz.asObservable();

  constructor() { }

  changeMessage(message: ResourcesList) {
    this.messageSource.next(message);
  }

  changeMessageForQuiz(message: QuizResults) {
    this.messageSourceForQuiz.next(message);
  }
}
