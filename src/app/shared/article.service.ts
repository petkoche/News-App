import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ArticleResponse } from './models/article-respones.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ArticleService {

    constructor(private http: HttpClient) {}

    getArticles(): Observable<ArticleResponse> {
        let params = new HttpParams();

        params = params.append('q', environment.defaultSearchText);
        params = params.append('pageSize', environment.defaultPageSize);
        params = params.append('apiKey', environment.apikey);

        const httpOptions = {
            params: params
        }

        return this.http.get<ArticleResponse>(environment.newsApiUrl, httpOptions).pipe(
            catchError<ArticleResponse, never>(null)
        );
    }
}
