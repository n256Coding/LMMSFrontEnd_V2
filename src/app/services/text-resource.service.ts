import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InsiteSearchResult } from '../models/insiteSearchResult';

@Injectable()
export class TextResourceService {
  textSearchUrl = 'http://localhost:8080/api/search';


  constructor(private http: HttpClient) { }

  searchResource(keywords: string, ispdf: boolean): Observable<InsiteSearchResult> {
    return this.http.get<InsiteSearchResult>(this.textSearchUrl + '?q=' + keywords + '&pdf=' + ispdf);
  }
}
