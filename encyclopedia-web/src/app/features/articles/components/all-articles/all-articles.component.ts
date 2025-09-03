import {Component, OnInit} from '@angular/core';
import {ArticlesService} from '../../services/articles.service';
import {Observable} from 'rxjs';
import {Article} from '../../models/article';
import {AsyncPipe} from '@angular/common';
import { ArticleCardComponent } from '../article-card/article-card.component';
import {SearchbarComponent} from '../../../../shared/components/searchbar/searchbar.component';
import {ArticleFilterParams} from '../../models/article-filter-params';
import { PaginationResult } from '../../../../core/models/pagination-result';
import {ActivatedRoute, Router} from '@angular/router';
import {MatPaginator, PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-all-articles',
  imports: [AsyncPipe, ArticleCardComponent, SearchbarComponent, MatPaginator],
  templateUrl: './all-articles.component.html',
  styleUrl: './all-articles.component.scss'
})
export class AllArticlesComponent implements OnInit {

    articles$ = new Observable<PaginationResult<Article>>;
    loading$ = new Observable<boolean>;

    title = "";

    constructor(private readonly articlesService: ArticlesService,
                private readonly route: ActivatedRoute,
                private readonly router: Router) {
        this.articles$ = this.articlesService.articles;
        this.loading$ = this.articlesService.loading;
    }

    ngOnInit(): void {
        // this.articlesService.loadArticles();
        this.route.queryParams.subscribe(params => {
            const title = params['title'] || "";
            this.articlesService.loadArticles(
                new ArticleFilterParams(title, {
                    page: 0,
                    limit: 10,
                    total: 0
                }),
                true);
        });
    }

    searchByTitle(title: string) {
        this.title = title;
        this.router.navigate([], {
            queryParams: {
                title: title || null,
            },
            queryParamsHandling: 'merge',
        }).then();
        // this.articlesService.loadArticles(new ArticleFilterParams(title), true);
    }

    handlePageChange(event: PageEvent) {
        this.articlesService.loadArticles(
            new ArticleFilterParams(this.title, {
                page: event.pageIndex,
                limit: event.pageSize,
                total: 0
            }),
            true);
    }
}
