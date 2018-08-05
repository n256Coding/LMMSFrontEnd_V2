import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SlideStandard } from '../models/StandardSlide';
import { CustomSlide } from '../models/CustomSlide';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { SlideStandardReport } from '../models/SlideStandradReport';
import { SlideAdminTemplate } from '../models/SlideAdminTemplate';
import { StandardDoc } from '../models/StandardDoc';
import { CustomDoc } from '../models/CustomDoc';
import { DocReport } from '../models/DocReport';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class SlideService {

  constructor(private http: HttpClient) { }

  pathvalue:string = 'http://35.231.194.172:8090';

  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('file', file, file.name);
    const req = new HttpRequest('POST', this.pathvalue+'/slide/post', formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  pushMasterSlideToStorage(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('file', file, file.name);
    const req = new HttpRequest('POST', this.pathvalue+'/slide/postMasterSlide', formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  addSandardSlide(newSlide: SlideStandard): Observable<SlideStandard> {
    return this.http.post<SlideStandard>(this.pathvalue+'/slide/slideStandard', newSlide, httpOptions).pipe(
      tap((slide: SlideStandard) => console.log(`Inserted = ${JSON.stringify(slide)}`)),
      catchError(error => of(new SlideStandard()))
    );
  }

  addCustomSlide(newSlide: CustomSlide): Observable<CustomSlide> {
    return this.http.post<CustomSlide>(this.pathvalue+'/slide/slideCustom', newSlide, httpOptions).pipe(
      tap((slide: CustomSlide) => console.log(`Inserted = ${JSON.stringify(slide)}`)),
      catchError(error => of(new CustomSlide()))
    );
  }

  getCustomSlideReport(): Observable<SlideStandardReport[]> {
    return this.http.get<SlideStandardReport[]>(this.pathvalue+'/slide/slideCustom').pipe(
      tap(receivedSlide => console.log(`receivedCustomSlides = ${JSON.stringify(receivedSlide)}`)),
      catchError(error => of([]))
    );
  }

  getSlideReport(): Observable<SlideStandardReport[]> {
    return this.http.get<SlideStandardReport[]>(this.pathvalue+'/slide/slideStandard').pipe(
      tap(receivedSlide => console.log(`receivedSlides = ${JSON.stringify(receivedSlide)}`)),
      catchError(error => of([]))
    );
  }

  getSlideCustomReport(): Observable<SlideStandardReport[]> {
    return this.http.get<SlideStandardReport[]>(this.pathvalue+'/slide/slideCustom').pipe(
      tap(receivedSlide => console.log(`receivedSlides = ${JSON.stringify(receivedSlide)}`)),
      catchError(error => of([]))
    );
  }

  addAdminTemplate(tempalte: SlideAdminTemplate): Observable<SlideAdminTemplate> {
    return this.http.post<SlideAdminTemplate>(this.pathvalue+'/slide/mongo', tempalte, httpOptions).pipe(
      tap((slide: SlideAdminTemplate) => console.log(`Inserted = ${JSON.stringify(slide)}`)),
      catchError(error => of(new SlideAdminTemplate()))
    );
  }

  getAdminTemplates(name: string): Observable<SlideAdminTemplate[]> {
    return this.http.get<SlideAdminTemplate[]>(this.pathvalue+'/slide/mongo/' + name).pipe(
      tap(receivedSlide => console.log(`receivedCustomSlides = ${JSON.stringify(receivedSlide)}`)),
      catchError(error => of([]))
    );
  }




  addSandardDoc(newSlide: StandardDoc): Observable<StandardDoc> {
    return this.http.post<StandardDoc>(this.pathvalue+'/slide/docStandard', newSlide, httpOptions).pipe(
      tap((slide: StandardDoc) => console.log(`Inserted = ${JSON.stringify(slide)}`)),
      catchError(error => of(new StandardDoc()))
    );
  }

  addCustomDoc(newSlide: CustomDoc): Observable<CustomDoc> {
    return this.http.post<CustomDoc>(this.pathvalue+'/slide/docCustom', newSlide, httpOptions).pipe(
      tap((slide: CustomDoc) => console.log(`Inserted = ${JSON.stringify(slide)}`)),
      catchError(error => of(new CustomDoc()))
    );
  }

  addAdminDocTemplate(tempalte: SlideAdminTemplate): Observable<SlideAdminTemplate> {
    return this.http.post<SlideAdminTemplate>(this.pathvalue+'/slide/doc/mongo', tempalte, httpOptions).pipe(
      tap((slide: SlideAdminTemplate) => console.log(`Inserted = ${JSON.stringify(slide)}`)),
      catchError(error => of(new SlideAdminTemplate()))
    );
  }

  getAdminDocTemplates(name: string): Observable<SlideAdminTemplate[]> {
    return this.http.get<SlideAdminTemplate[]>(this.pathvalue+'/slide/doc/mongo/' + name).pipe(
      tap(receivedSlide => console.log(`receivedCustomSlides = ${JSON.stringify(receivedSlide)}`)),
      catchError(error => of([]))
    );
  }

  pushMasterDocToStorage(file: FileList): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    for (var x = 0; x < file.length; x++) {
      formdata.append('file', file[x], file[x].name);
    }
    const req = new HttpRequest('POST', this.pathvalue+'/slide/postMasterDoc', formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  getDocReport(): Observable<DocReport[]> {
    return this.http.get<DocReport[]>(this.pathvalue+'/slide/docStandard').pipe(
      tap(receivedSlide => console.log(`receivedSlides = ${JSON.stringify(receivedSlide)}`)),
      catchError(error => of([]))
    );
  }

  getCustomDocReport(): Observable<DocReport[]> {
    return this.http.get<DocReport[]>(this.pathvalue+'/slide/docCustom').pipe(
      tap(receivedSlide => console.log(`receivedSlides = ${JSON.stringify(receivedSlide)}`)),
      catchError(error => of([]))
    );
  }


  checkAdminDocTemplates(name: string): Observable<SlideAdminTemplate[]> {
    return this.http.get<SlideAdminTemplate[]>(this.pathvalue+'/slide/doc/mongo/check/' + name).pipe(
      tap(receivedSlide => console.log(`checkAdminDocTemplates = ${JSON.stringify(receivedSlide)}`)),
      catchError(error => of([]))
    );
  }

  checkAdminSlideTemplates(name: string): Observable<SlideAdminTemplate[]> {
    return this.http.get<SlideAdminTemplate[]>(this.pathvalue+'/slide/mongo/check/' + name).pipe(
      tap(receivedSlide => console.log(`checkAdminDocTemplates = ${JSON.stringify(receivedSlide)}`)),
      catchError(error => of([]))
    );
  }

  checkDocTemplates(name: string): Observable<SlideAdminTemplate[]> {
    return this.http.get<SlideAdminTemplate[]>(this.pathvalue+'/slide/doc/mongo/checkMaster/' + name).pipe(
      tap(receivedSlide => console.log(`checkDocTemplates = ${JSON.stringify(receivedSlide)}`)),
      catchError(error => of([]))
    );
  }

  checkSlideTemplates(name: string): Observable<SlideAdminTemplate[]> {
    return this.http.get<SlideAdminTemplate[]>(this.pathvalue+'/slide/mongo/checkMaster/' + name).pipe(
      tap(receivedSlide => console.log(`checkSlideTemplates = ${JSON.stringify(receivedSlide)}`)),
      catchError(error => of([]))
    );
  }



}
