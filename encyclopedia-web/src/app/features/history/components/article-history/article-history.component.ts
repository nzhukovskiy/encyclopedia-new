import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {HistoryService} from '../../services/history.service';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {HistoryFilterParams} from '../../models/history-filter-params';
import { ActionType } from '../../constants/action-type';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MatFormField, MatOption} from '@angular/material/select';

@Component({
    selector: 'app-article-history',
    imports: [AsyncPipe, DatePipe, CommonModule, RouterLink, MatIconModule, TranslatePipe, MatPaginator, ReactiveFormsModule, MatIconModule, MatFormField, MatOption],
    templateUrl: './article-history.component.html',
    styleUrl: './article-history.component.scss'
})
export class ArticleHistoryComponent implements OnInit {
    constructor(private readonly route: ActivatedRoute,
                protected readonly historyService: HistoryService,
                private readonly router: Router) {
    }

    sortBy = new FormControl<string|null>(null);

    protected readonly actionType = ActionType;

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.route.queryParams.subscribe(queryParams => {
                const page = queryParams['page'] || 0;
                const limit = queryParams['limit'] || 10;
                const sortBy = queryParams['sortBy'] || 'actionDate:DESC';
                this.sortBy.patchValue(sortBy, {emitEvent: false});
                this.historyService.loadHistory(
                    params.get('id')!,
                    new HistoryFilterParams(sortBy,{
                        page: parseInt(page) + 1,
                        limit: limit,
                        total: 0
                    }),
                    true);
            });
        })
        this.sortBy.valueChanges.subscribe(val => this.handleSortChange(val!));
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

    handleSortChange(sortBy: string) {
        this.router.navigate([], {
            queryParams: {
                sortBy: sortBy,
            },
            queryParamsHandling: 'merge',
        }).then();
    }
}
