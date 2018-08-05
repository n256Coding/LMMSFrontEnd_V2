import { Component, OnInit } from '@angular/core';
import {UserSessionService} from "../../services/user-session.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private session: UserSessionService) { }

  isAdminUser(){
    return this.session.isAdminUser() == null ? false : this.session.isAdminUser();
  }

  ngOnInit() {

  }

}
