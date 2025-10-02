import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {HistoryService} from '../../services/history.service';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import {MatPaginator} from '@angular/material/paginator';
import {HistoryFilterParams} from '../../models/history-filter-params';
import { ActionType } from '../../constants/action-type';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MatFormField, MatOption} from '@angular/material/select';
import { HistoryListComponent } from "../history-list/history-list.component";
import {PaginationResult} from '../../../../core/models/pagination-result';
import {History} from '../../models/history';

@Component({
    selector: 'app-article-history',
    imports: [AsyncPipe, DatePipe, CommonModule, RouterLink, MatIconModule, TranslatePipe, MatPaginator, ReactiveFormsModule, MatIconModule, MatFormField, MatOption, HistoryListComponent],
    templateUrl: './article-history.component.html',
    styleUrl: './article-history.component.scss'
})
export class ArticleHistoryComponent implements OnInit {
    constructor(private readonly route: ActivatedRoute,
                private readonly router: Router) {
    }

    @Input() title: string = "";

    @Input() type: "forUser" | "forArticle" = "forArticle";

    @Input() history: PaginationResult<History> | null = null;

    @Output() loadHistory = new EventEmitter<{id: string, params: HistoryFilterParams}>()

    sortBy = new FormControl<string|null>(null);

    protected readonly actionType = ActionType;

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.route.queryParams.subscribe(queryParams => {
                const page = queryParams['page'] || 0;
                const limit = queryParams['limit'] || 10;
                const sortBy = queryParams['sortBy'] || 'actionDate:DESC';
                this.sortBy.patchValue(sortBy, {emitEvent: false});
                this.loadHistory.emit({
                    id:  params.get('id')!,
                    params: new HistoryFilterParams(sortBy, {
                        page: parseInt(page) + 1,
                        limit: limit,
                        total: 0
                    })
                });
            });
        })
        this.sortBy.valueChanges.subscribe(val => this.handleSortChange(val!));
    }

    // handlePageChange(event: PageEvent) {
    //     this.router.navigate([], {
    //         queryParams: {
    //             page: event.pageIndex,
    //             limit: event.pageSize
    //         },
    //         queryParamsHandling: 'merge',
    //     }).then();
    // }

    handleSortChange(sortBy: string) {
        this.router.navigate([], {
            queryParams: {
                sortBy: sortBy,
            },
            queryParamsHandling: 'merge',
        }).then();
    }
}
