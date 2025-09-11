import {Injectable} from '@angular/core';
import {BehaviorSubject, switchMap, tap} from 'rxjs';
import {Article} from '../models/article';
import {ArticlesApiService} from './articles-api.service';
import {ArticleFilterParams} from '../models/article-filter-params';
import {PaginationResult} from '../../../core/models/pagination-result';
import {AuthService} from '../../../core/services/auth/auth.service';

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

    constructor(private readonly articlesApiService: ArticlesApiService,
                private readonly authService: AuthService) {
    }

    loadArticles(articleFilterParams?: ArticleFilterParams, forceReload = false) {
        if (this.$loading.value) {
            return;
        }
        if (this.$articles.value.data.length && !forceReload) {
            return;
        }
        this.$loading.next(true);
        this.articlesApiService.getAll(articleFilterParams).pipe(tap(articles => {
            this.$articles.next(articles);
        })).subscribe(() => {
            this.$loading.next(false);
        })
    }

    delete(articleId: string, title: string = "") {
        return this.articlesApiService.delete(articleId).pipe(tap(() => {
            this.loadArticles(new ArticleFilterParams(title, this.$articles.value.pagination), true);
        }));
    }
}
