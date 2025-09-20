import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {HistoryService} from '../../services/history.service';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {HistoryFilterParams} from '../../models/history-filter-params';
import { ActionType } from '../../constants/action-type';

@Component({
    selector: 'app-article-history',
    imports: [AsyncPipe, DatePipe, CommonModule, RouterLink, MatIconModule, TranslatePipe, MatPaginator],
    templateUrl: './article-history.component.html',
    styleUrl: './article-history.component.scss'
})
export class ArticleHistoryComponent implements OnInit {
    constructor(private readonly route: ActivatedRoute,
                protected readonly historyService: HistoryService,
                private readonly router: Router) {
    }

    protected readonly actionType = ActionType;

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.route.queryParams.subscribe(queryParams => {
                const page = queryParams['page'] || 0;
                const limit = queryParams['limit'] || 10;
                this.historyService.loadHistory(
                    params.get('id')!,
                    new HistoryFilterParams(undefined,{
                        page: parseInt(page) + 1,
                        limit: limit,
                        total: 0
                    }),
                    true);
            });
        })
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
}
