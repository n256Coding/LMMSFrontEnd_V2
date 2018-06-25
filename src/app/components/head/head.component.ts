import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';
import { UserSessionService } from '../../services/user-session.service';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {

  constructor(private userSession: UserSessionService) { }

  hello() {

  }

  ngOnInit() {
    const user = new User();
    user.id = '5b25204baf2fc52278dd7ed4';
    user.userName = 'Default User';
    this.userSession.changeUser(user);
  }

}
