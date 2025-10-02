import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PaginationResult} from '../../../../core/models/pagination-result';
import {History} from '../../models/history';
import {CommonModule} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {ActionType} from '../../constants/action-type';
import {TranslatePipe} from '@ngx-translate/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';

@Component({
    selector: 'app-history-list',
    imports: [CommonModule, RouterLink, TranslatePipe, MatPaginator],
    templateUrl: './history-list.component.html',
    styleUrl: './history-list.component.scss'
})
export class HistoryListComponent {

    constructor(private readonly router: Router) {
    }

    @Input() history: PaginationResult<History> | null = null;

    @Input() type: "forUser" | "forArticle" = "forArticle";

    protected readonly actionType = ActionType;


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
