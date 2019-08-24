import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/shared/article.service';
import { Article } from 'src/app/shared/models/article.model';
import { SearchModel } from 'src/app/shared/models/search.model';
import { environment } from 'src/environments/environment';
import { ButtonModel } from 'src/app/shared/models/language-button.model';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit{

    langButtons: ButtonModel[] = [
      {key: 'DE', value:'de'},
      {key: 'EN', value:'en'},
      {key: 'ES', value:'es'},
      {key: 'FR', value:'fr'},
      {key: 'IT', value:'it'},
    ]

    sortButtons: ButtonModel[] = [
      {key: 'Date', value:'publishedAt'},
      {key: 'Relevance', value:'relevancy'},
      {key: 'Popularity', value:'popularity'},
    ]

    articles: Article[] = [];
    searchModel: SearchModel;

    collapseFilters: boolean = false;
    collapseSorts: boolean = false;

    constructor(private articleService: ArticleService){ }

    ngOnInit() {
        this.searchModel = new SearchModel();
        this.searchModel.sortBy = environment.defualtSortBy;
        this.searchModel.language = environment.defaultLanguage;
        this.articleService.getArticles({text: environment.defaultSearchText}).subscribe(res =>{
            this.articles = res.articles;
        })
    } 
    
    search() {
        this.articleService.getArticles(this.searchModel)
        .subscribe(res => {
          this.articles = res.articles;
        })
      }
    
      collapseFilter() {
        this.collapseFilters = this.collapseFilters ? false : true;
      }
    
      filterSort(sort: string) {
        this.searchModel.sortBy = sort;
      }
    
      filterLanguage(lang: string) {
        this.searchModel.language = lang;
      }
    
    }
    