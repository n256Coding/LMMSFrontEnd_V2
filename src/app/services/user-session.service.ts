import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable()
export class UserSessionService {

  private messageSource = new BehaviorSubject(new User);
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeUser(message: User) {
    this.messageSource.next(message);
  }
}
