import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { HttpRequest, HttpEvent } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SlideStandard} from '../models/StandardSlide';
import {CustomSlide} from '../models/CustomSlide';
import {catchError,map,tap} from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import {SlideStandardReport} from '../models/SlideStandradReport';
import {SlideAdminTemplate} from '../models/SlideAdminTemplate';

const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class SlideService {

  constructor(private http: HttpClient) { }


    pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('file', file,file.name);
    const req = new HttpRequest('POST', '//localhost:8090/slide/post', formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

    pushMasterSlideToStorage(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('file', file,file.name);
    const req = new HttpRequest('POST', '//localhost:8090/slide/postMasterSlide', formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

     addSandardSlide(newSlide: SlideStandard):Observable<SlideStandard>{
      return this.http.post<SlideStandard>('//localhost:8090/slide/slideStandard',newSlide,httpOptions).pipe(
      tap((slide:SlideStandard) => console.log(`Inserted = ${JSON.stringify(slide)}`)),
      catchError(error => of(new SlideStandard()))
    );
  }

    addCustomSlide(newSlide: CustomSlide):Observable<CustomSlide>{
      return this.http.post<CustomSlide>('//localhost:8090/slide/slideCustom',newSlide,httpOptions).pipe(
      tap((slide:CustomSlide) => console.log(`Inserted = ${JSON.stringify(slide)}`)),
      catchError(error => of(new CustomSlide()))
    );
  }

        getCustomSlideReport():Observable<SlideStandardReport[]>{
    return this.http.get<SlideStandardReport[]>('//localhost:8090/slide/slideCustom').pipe(
      tap(receivedSlide => console.log(`receivedCustomSlides = ${JSON.stringify(receivedSlide)}`)),
      catchError(error => of([]))
    );
  }

      getSlideReport():Observable<SlideStandardReport[]>{
    return this.http.get<SlideStandardReport[]>('//localhost:8090/slide/slideStandard').pipe(
      tap(receivedSlide => console.log(`receivedSlides = ${JSON.stringify(receivedSlide)}`)),
      catchError(error => of([]))
    );
  }
 
        getSlideCustomReport():Observable<SlideStandardReport[]>{
    return this.http.get<SlideStandardReport[]>('//localhost:8090/slide/slideCustom').pipe(
      tap(receivedSlide => console.log(`receivedSlides = ${JSON.stringify(receivedSlide)}`)),
      catchError(error => of([]))
    );
  }

     addAdminTemplate(tempalte: SlideAdminTemplate):Observable<SlideAdminTemplate>{
      return this.http.post<SlideAdminTemplate>('//localhost:8090/slide/mongo',tempalte,httpOptions).pipe(
      tap((slide:SlideAdminTemplate) => console.log(`Inserted = ${JSON.stringify(slide)}`)),
      catchError(error => of(new SlideAdminTemplate()))
    );
  }

       getAdminTemplates(name:string):Observable<SlideAdminTemplate[]>{
    return this.http.get<SlideAdminTemplate[]>('//localhost:8090/slide/mongo/'+name).pipe(
      tap(receivedSlide => console.log(`receivedCustomSlides = ${JSON.stringify(receivedSlide)}`)),
      catchError(error => of([]))
    );
  }

}
