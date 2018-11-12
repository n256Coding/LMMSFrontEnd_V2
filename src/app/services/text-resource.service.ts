import {Rating} from "./../models/rating";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {InsiteSearchResult} from "../models/insiteSearchResult";
import {OperationStatus} from "../models/operationStatus";

@Injectable()
export class TextResourceService {
  textSearchUrl = 'http://18.236.105.137:8081/api/resource';
  // textSearchUrl = 'http://localhost:8081/api/resource';


  constructor(private http: HttpClient) {
  }

  searchResource(keywords: string, ispdf: boolean, userId: string): Observable<InsiteSearchResult> {
    return this.http.get<InsiteSearchResult>(this.textSearchUrl + '?q=' + encodeURIComponent(keywords) + '&pdf=' + ispdf + '&userId=' + userId);
  }

  setRating(rating: Rating): Observable<OperationStatus> {
    return this.http.put<OperationStatus>(this.textSearchUrl + '/rating', rating);
  }

  getTrustedSites(): Observable<TrustedSites[]> {
    return this.http.get<TrustedSites[]>(this.textSearchUrl + '/trustedsites');
  }

  getTrustedSitesByKeyword(query: string): Observable<TrustedSites[]> {
    return this.http.get<TrustedSites[]>(this.textSearchUrl + '/trustedsites?query=' + query);
  }

  addOrUpdateTrustedSites(trustedSites: TrustedSites): Observable<OperationStatus> {
    return this.http.post<OperationStatus>(this.textSearchUrl + '/trustedsites', trustedSites);
  }

  deleteTrustedSites(keyword: string): Observable<OperationStatus> {
    return this.http.delete<OperationStatus>(this.textSearchUrl + '/trustedsites?keyword='+ encodeURIComponent(keyword));
  }
}
