import {Injectable} from '@angular/core';
import {BehaviorSubject, tap} from 'rxjs';
import {Article} from '../models/article';
import {ArticlesApiService} from './articles-api.service';
import {ArticleFilterParams} from '../models/article-filter-params';
import {PaginationResult} from '../../../core/models/pagination-result';

@Injectable({
    providedIn: 'root'
})
export class ArticlesService {

    private $articles = new BehaviorSubject<PaginationResult<Article>>({
        data: [],
        pagination: {
            total: 0,
            limit: 0,
            page: 0
        }
    });
    articles = this.$articles.asObservable();

    private $loading = new BehaviorSubject(false);
    loading = this.$loading.asObservable();

    constructor(private readonly articlesApiService: ArticlesApiService) {
    }

    loadArticles(articleFilterParams?: ArticleFilterParams, forceReload = false) {
        if (this.$loading.value) {
            return;
        }
        if (this.$articles.value.data.length && !forceReload) {
            return;
        }
        console.log(articleFilterParams?.title)
        this.$loading.next(true);
        this.articlesApiService.getAll(articleFilterParams).pipe(tap(articles => {
            this.$articles.next(articles);
        })).subscribe(() => {
            this.$loading.next(false);
        })
    }
}
