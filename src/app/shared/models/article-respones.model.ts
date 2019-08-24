import { Article } from './article.model';

export class ArticleResponse {
    status: string
    totalResults: number
    articles: Article[]
}
