import {Component, OnInit, Inject} from '@angular/core';
import {UserSessionService} from "../../services/user-session.service";
import {Router} from "@angular/router";
import {SESSION_STORAGE, WebStorageService} from "angular-webstorage-service";
import {User} from "../../models/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials = {username:'', password:''};

  constructor(private userSession: UserSessionService, private router: Router) { }

  ngOnInit() {
  }

  login(){
    this.userSession.authenticate(this.credentials, () => {
      this.router.navigateByUrl('/');
    });
    return false;
  }
}
