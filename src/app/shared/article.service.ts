import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError,tap  } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ArticleResponse } from './models/article-respones.model';
import { Article } from './models/article.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ArticleService {

    constructor(private http: HttpClient) {}

    savedArticles: Article[] = [];

    getArticles(parameters): Observable<ArticleResponse> {
        let params = new HttpParams();

        params = params.append('q', environment.defaultSearchText);
        params = params.append('pageSize', environment.defaultPageSize);
        params = params.append('apiKey', environment.apikey);

        const httpOptions = {
            params: params
        }

        return this.http.get<ArticleResponse>(environment.newsApiUrl, httpOptions).pipe(
            tap(result => {
                this.setId(result);
            }),
            catchError<ArticleResponse, never>(null)
        );
    }

   getArticle(id: number): Article{
       return this.savedArticles.find(article => article.givenId === +id);
   }

    private setId(result: ArticleResponse): ArticleResponse {
        let id = 0;
        result.articles.forEach(article => {
          article['givenId'] = id;
          id++;
        });
        this.savedArticles = result.articles;
        return result;
    }
}
