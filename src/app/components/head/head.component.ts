import {Component, OnInit, Inject} from "@angular/core";
import {UserSessionService} from "../../services/user-session.service";
import {WebStorageService, SESSION_STORAGE} from "angular-webstorage-service";
declare var $: any;
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
    //start
    $(window).scroll(function(){
      var sticky = $('.header-bottom'),
          scroll = $(window).scrollTop();

      if (scroll >= 100) sticky.addClass('fixed');
      else sticky.removeClass('fixed');
    });
    //end
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


}
