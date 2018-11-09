import {Component, OnInit, Inject} from "@angular/core";
import {UserSessionService} from "../../services/user-session.service";
import {WebStorageService, SESSION_STORAGE} from "angular-webstorage-service";
import {Router} from "@angular/router";

declare var $: any;
@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})

export class HeadComponent implements OnInit {
  router: Router;

  constructor(private userSession: UserSessionService,
              @Inject(SESSION_STORAGE) private storage: WebStorageService,
              private routerService: Router) {
    this.router = routerService;
  }

  ngOnInit() {
    // this.storage.set('loggedUser', {name:'dfsdgd'});
    //start sticky nav-bar
    $(window).scroll(function(){
      var sticky = $('.header-bottom'),
          scroll = $(window).scrollTop();

      if (scroll >= 100){
        sticky.addClass('fixed');
        $('#navbar-logo').removeClass('dis-none');
      }else {
        sticky.removeClass('fixed');
        $('#navbar-logo').addClass('dis-none');
      }
    });
    //end sticky nav-bar
  }

  logout() {
    this.userSession.unauthenticate();
  }

  isAdminUser(){
    const isAdminUser = this.userSession.isAdminUser();
    return isAdminUser == null ? false : isAdminUser;
  }

  authenticated() {
    if (this.storage.get('loggedUser') == null) {
      return false;
    } else {
      return true;
    }
  }

}
