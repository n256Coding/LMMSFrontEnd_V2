import {Rating} from "./../models/rating";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {InsiteSearchResult} from "../models/insiteSearchResult";
import {OperationStatus} from "../models/operationStatus";

@Injectable()
export class TextResourceService {
  // textSearchUrl = 'http://54.201.234.92:8081/api/resource';
  textSearchUrl = 'http://localhost:8081/api/resource';


  constructor(private http: HttpClient) {
  }

  searchResource(keywords: string, ispdf: boolean, userId: string): Observable<InsiteSearchResult> {
    return this.http.get<InsiteSearchResult>(this.textSearchUrl + '?q=' + keywords + '&pdf=' + ispdf + '&userId=' + userId);
  }

  setRating(rating: Rating): Observable<OperationStatus> {
    return this.http.put<OperationStatus>(this.textSearchUrl + '/rating', rating);
  }
}
