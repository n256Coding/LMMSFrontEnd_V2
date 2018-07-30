import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Injectable, Inject} from "@angular/core";
import {User} from "../models/user";
import {HttpHeaders, HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SESSION_STORAGE, WebStorageService} from "angular-webstorage-service";

@Injectable()
export class UserSessionService {

  hostname = "http://34.217.10.5:8085/";

  private messageSource = new BehaviorSubject(new User);
  currentMessage = this.messageSource.asObservable();

  constructor(private http: HttpClient, @Inject(SESSION_STORAGE) private storage: WebStorageService) {
  }

  changeUser(message: User) {
    // this.messageSource.next(message);
  }

  authenticate(credentials, callback) {

    const headers = new HttpHeaders(credentials ? {
        authorization: 'Basic ' + btoa(credentials.username + ':' + credentials.password)
      } : {});

    this.http.get('user', {headers: headers}).subscribe(response => {
      if (response['name']) {
        // this.authenticated = true;
        this.getUser(credentials.username).subscribe(response => {
          this.storage.set('loggedUser', response);
          // console.log('Logged User: ');
          // console.log(this.storage.get('loggedUser'));
        });
      }
      else {
        // this.authenticated = false;
      }
      return callback && callback();
    });
  }

  unauthenticate() {
      this.storage.remove('loggedUser');
    this.http.get('logout').subscribe(response => {
      //TODO: Need to do something
      console.log('unauthenticated called');
      console.log(response);
    }, err => {
      console.log('Logout error');
      console.log(err);
    });
  }

  isAdminUser(){
    if(this.storage.get('loggedUser') == null){
      return false;
    }else{
      var roles = this.storage.get('loggedUser').userRoles;
      return roles.indexOf("ADMIN") != -1;
    }
  }

  getUser(username: String): Observable<User> {
    return this.http.get<User>('user/' + username);
  }

  getCurrentUser(){
    var currentUser = this.storage.get('loggedUser');
    let user = new User();
    user.id = currentUser._id;
    user.firstName = currentUser.firstName;
    user.lastName = currentUser.lastName;
    user.userRoles = currentUser.userRoles;
    user.university = currentUser.university;
    user.subjects = currentUser.subjects;

    return user;
  }
}
