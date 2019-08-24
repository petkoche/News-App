import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/shared/article.service';
import { Article } from 'src/app/shared/models/article.model';
import { SearchModel } from 'src/app/shared/models/search.model';
import { environment } from 'src/environments/environment';
import { PairModel } from 'src/app/shared/models/pair.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {

  searchModel: SearchModel = new SearchModel();

  langButtons: PairModel[] = [
    { key: 'DE', value: 'de' },
    { key: 'EN', value: 'en' },
    { key: 'ES', value: 'es' },
    { key: 'FR', value: 'fr' },
    { key: 'IT', value: 'it' },
  ]

  sortButtons: PairModel[] = [
    { key: 'Date', value: 'publishedAt' },
    { key: 'Relevance', value: 'relevancy' },
    { key: 'Popularity', value: 'popularity' },
  ]

  articles: Article[] = [];

  collapseFilters: boolean = false;
  collapseSorts: boolean = false;

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.articleService.getArticles({ text: environment.defaultSearchText }).subscribe(res => {
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

  clearFilters() {
    this.searchModel = new SearchModel();
  }

}
