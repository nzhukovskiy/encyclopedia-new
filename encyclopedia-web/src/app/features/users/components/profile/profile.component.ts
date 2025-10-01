import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {History} from '../../../history/models/history';
import {HistoryService} from '../../../history/services/history.service';
import {AuthService} from '../../../../core/services/auth/auth.service';
import {AsyncPipe, DatePipe} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {HistoryFilterParams} from '../../../history/models/history-filter-params';
import {ActionType} from '../../../history/constants/action-type';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'app-profile',
    imports: [AsyncPipe, MatIconModule, DatePipe, MatPaginator],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

    constructor(private readonly router: Router,
                private readonly route: ActivatedRoute,
                protected readonly historyService: HistoryService,
                protected readonly authService: AuthService) {
    }

    history: History[] = [];

    sortBy = new FormControl<string | null>(null);

    protected readonly actionType = ActionType;

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.route.queryParams.subscribe(queryParams => {
                const page = queryParams['page'] || 0;
                const limit = queryParams['limit'] || 10;
                const sortBy = queryParams['sortBy'] || 'actionDate:DESC';
                this.sortBy.patchValue(sortBy, {emitEvent: false});
                this.historyService.loadHistoryForCurrentUser(
                    new HistoryFilterParams(sortBy, {
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
