import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from 'src/app/shared/article.service';
import { Article } from 'src/app/shared/models/article.model';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss'],
})

export class DetailsComponent implements OnInit {

    constructor(private route: ActivatedRoute, private articleService: ArticleService) {}
    id: number;
    article: Article;
    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.article = this.articleService.getArticle(+this.id);
    }
}
