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
    text: string = '';
    sortBy: string = 'publishedAt'
    from: Date;
    to: Date;
    language: string = 'en';
    collapseFilters: boolean = false;
    collapseSorts: boolean = false;
    defaultSearchText: string = 'bitcoin';
  

    ngOnInit() {
        this.articleService.getArticles({}).subscribe(res =>{
            this.articles = res.articles;
        })
    } 
    
    search() {
        this.articleService.getArticles({text: this.text ? this.text : this.defaultSearchText, from: this.from, to: this.to, sortBy: this.sortBy, language: this.language})
        .subscribe(res => {
          this.articles = res.articles;
        })
      }
    
      collapseFilter() {
        this.collapseFilters = this.collapseFilters ? false : true;
      }
    
      filterSort(sort: string) {
        this.sortBy = sort;
      }
    
      filterLanguage(lang: string) {
        this.language = lang;
      }
    
    }
    