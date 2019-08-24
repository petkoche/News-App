import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ArticleResponse } from './models/article-respones.model';
import { Router } from '@angular/router';
import { Article } from './models/article.model';
import { environment } from 'src/environments/environment';
import { _ } from 'underscore';

@Injectable({
    providedIn: 'root'
})
export class ArticleService {

    constructor(private http: HttpClient, private router: Router) { }

    savedArticles: Article[] = [];

    getArticles(parameters): Observable<ArticleResponse> {
        let params = new HttpParams();

        if (!_.isUndefined(parameters)) {
            params = _.isUndefined(parameters.text) || parameters.text == '' ? params.append('q', environment.defaultSearchText) : params.append('q', parameters.text);
            params = _.isUndefined(parameters.from) ? params : params.append('from', JSON.stringify(parameters.from));
            params = _.isUndefined(parameters.to) ? params : params.append('to', JSON.stringify(parameters.to));
            params = _.isUndefined(parameters.sortBy) ? params.append('sortBy', environment.defualtSortBy) : params.append('sortBy', parameters.sortBy);
            params = _.isUndefined(parameters.language) ? params : params.append('language', parameters.language);
        }

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

    getArticle(id: number): Article {
        let article = this.savedArticles.find(article => article.givenId === +id);
        this.checkIfArticleExists(article);
        return article;
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

    private checkIfArticleExists(article: Article) {
        if(!article) {
            this.router.navigate(['/home']);
        }
    }
}
