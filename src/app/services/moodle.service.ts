import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Credential } from '../models/credential';
import { MoodleResults } from '../models/moodleResults';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ResourcesList } from '../models/resourcesList';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class MoodleService {

  constructor(private http : HttpClient) { }

  addValidateData(newMoodle: Credential):Observable<Credential>{
    return this.http.post<Credential>('http://localhost:8082/moodle/savecredentials',newMoodle,httpOptions).pipe(
      tap((moodle:Credential) => console.log(`Inserted - ${JSON.stringify(moodle)}`)),
      catchError(error => of(new Credential()))
    );
  }

  getMoodleResults():Observable<ResourcesList>{
    return this.http.get<ResourcesList>('http://localhost:8082/moodle/validateresult').pipe(
      tap((validateResult => console.log(`validateResult = ${JSON.stringify(validateResult)}`)),
    catchError(error => of()))
    );
  }




}
