import {Injectable} from '@angular/core';
import {BehaviorSubject, tap} from 'rxjs';
import {Article} from '../models/article';
import {ArticlesApiService} from './articles-api.service';

@Injectable({
    providedIn: 'root'
})
export class ArticlesService {

    private $articles = new BehaviorSubject<Article[]>([]);
    articles = this.$articles.asObservable();

    private $loading = new BehaviorSubject(false);
    loading = this.$loading.asObservable();

    constructor(private readonly articlesApiService: ArticlesApiService) {
    }

    loadArticles(forceReload = false) {
        if (this.$loading.value) {
            return;
        }
        if (this.$articles.value.length && !forceReload) {
            return;
        }
        this.$loading.next(true);
        this.articlesApiService.getAll().pipe(tap(articles => {
            this.$articles.next(articles.data);
        })).subscribe(() => {
            this.$loading.next(false);
        })
    }
}
