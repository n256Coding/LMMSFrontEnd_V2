import { InsiteSearchResult } from './../models/insiteSearchResult';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {

  private messageSource = new BehaviorSubject(new InsiteSearchResult);
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(message: InsiteSearchResult) {
    this.messageSource.next(message);
  }

}
