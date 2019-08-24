import { environment } from 'src/environments/environment';

export class SearchModel {
    text: string
    sortBy: string
    from: Date
    to: Date
    language: string

    constructor() {
        this.language = environment.defaultLanguage;
        this.sortBy = environment.defualtSortBy;
    }
}
