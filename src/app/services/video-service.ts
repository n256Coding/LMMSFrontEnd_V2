import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { postModel } from '../models/searchPostModel';
import { listItem } from '../models/ListItemModel';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class videoService {

    constructor(private http: HttpClient) { }

    searchVideosInDatabase(model: postModel): Observable<listItem[]> {
        return this.http.post<listItem[]>('/api/index/evideos', model);
    }

    searchNewVideos(model: postModel) {
        this.http.post('/api/index/tvideos', model);
    }
}