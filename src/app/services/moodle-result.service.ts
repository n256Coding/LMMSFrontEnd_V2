import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ResourcesList } from './../models/resourcesList';

@Injectable({
  providedIn: 'root'
})
export class MoodleResultService {

  private messageSource = new BehaviorSubject(new ResourcesList);
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(message: ResourcesList) {
    this.messageSource.next(message);
  }

}
