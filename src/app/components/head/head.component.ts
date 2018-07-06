import {Component, OnInit, Inject} from "@angular/core";
import {UserSessionService} from "../../services/user-session.service";
import {WebStorageService, SESSION_STORAGE} from "angular-webstorage-service";

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {

  constructor(private userSession: UserSessionService, @Inject(SESSION_STORAGE) private storage: WebStorageService) {
  }

  ngOnInit() {
    // this.storage.set('loggedUser', {name:'dfsdgd'});
  }

  logout() {
    this.userSession.unauthenticate();
  }

  authenticated() {
    console.log('logged User: ');
    console.log(this.storage.get('loggedUser'));
    if (this.storage.get('loggedUser') == null) {
      console.log('its false');
      return false;
    } else {
      console.log('its true');
      return true;
    }
  }

  setSession() {
    this.storage.set('loggedUser', {name: 'hello'});
  }

  removeSession() {
    this.storage.remove('loggedUser');
  }

}
