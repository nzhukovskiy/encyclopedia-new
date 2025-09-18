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
import { ButtonComponent } from "../../../../shared/components/button/button.component";
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {isCaptureEventType} from '@angular/core/primitives/event-dispatch';

@Component({
  selector: 'app-all-articles',
  imports: [AsyncPipe,
    ArticleCardComponent,
    SearchbarComponent,
    MatPaginator,
    ButtonComponent,
    MatIconModule
],
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
        this.route.queryParams.subscribe(params => {
            const title = params['title'] || "";
            this.title = title;
            const page = params['page'] || 0;
            const limit = params['limit'] || 10;
            this.articlesService.loadArticles(
                new ArticleFilterParams(title, {
                    page: page,
                    limit: limit,
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
    }

    handlePageChange(event: PageEvent) {
        this.router.navigate([], {
            queryParams: {
                page: event.pageIndex,
                limit: event.pageSize
            },
            queryParamsHandling: 'merge',
        }).then();
    }

    handleDeletion(articleId: string) {
        this.articlesService.delete(articleId, this.title).subscribe(() => {

        })
    }
}
