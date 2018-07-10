import { InsiteSearchResult } from './../models/insiteSearchResult';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {

  private searchResults = new BehaviorSubject(new InsiteSearchResult);
  private contentType = new BehaviorSubject('');

  currentResults = this.searchResults.asObservable();
  currentContentType = this.contentType.asObservable();

  constructor() { }

  changeResults(message: InsiteSearchResult) {
    this.searchResults.next(message);
  }

  changeContentType(contentType: string){
    this.contentType.next(contentType);
  }

}
