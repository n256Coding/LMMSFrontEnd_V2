import { Injectable } from '@angular/core';
import { HttpClient , HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { QuizResults } from '../models/quizResults';
import { QuizStandards } from '../models/quizStandards';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class MoodleQuizService {

  constructor(private http:HttpClient) { }

  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
 
    formdata.append('file', file);
 
    const req = new HttpRequest('POST', 'http://localhost:8080/moodle/upload', formdata, {
      reportProgress: true,
      responseType: 'text'
    });
 
    return this.http.request(req);
    
  }
 
  // getFiles(): Observable<string[]> {
  //   return this.http.get('/getallfiles');
  // }

  addQuizSettings(QuizSettings: QuizStandards):Observable<QuizStandards>{
    return this.http.post<QuizStandards>('http://localhost:8080/moodle/savequizsettings',QuizSettings,httpOptions).pipe(
      tap((moodleQuiz:QuizStandards) => console.log(`Inserted - ${JSON.stringify(moodleQuiz)}`)),
      catchError(error => of(new QuizStandards()))
    );
  }

  getMoodleQuizResults():Observable<QuizResults>{
    return this.http.get<QuizResults>('http://localhost:8080/moodle/quizresults').pipe(
      tap((validateResult => console.log(`validateQuizResults = ${JSON.stringify(validateResult)}`)),
    catchError(error => of()))
    );
  }
}
