import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/shared/article.service';
import { Article } from 'src/app/shared/models/article.model';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit{

    constructor(private articleService: ArticleService){}

    articles: Article[] = [];

    ngOnInit() {
        this.articleService.getArticles().subscribe(res =>{
            this.articles = res.articles;
        })
    }

}
