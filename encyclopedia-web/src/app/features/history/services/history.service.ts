import {Injectable} from '@angular/core';
import {HistoryApiService} from './history-api.service';
import {BehaviorSubject} from 'rxjs';
import {History} from '../models/history';
import {PaginationResult} from '../../../core/models/pagination-result';
import {HistoryFilterParams} from '../models/history-filter-params';

@Injectable({
    providedIn: 'root'
})
export class HistoryService {
    constructor(private readonly historyApiService: HistoryApiService) {
    }

    private $history = new BehaviorSubject<PaginationResult<History>>({
        data: [],
        pagination: {
            total: 0,
            limit: 0,
            page: 0
        }
    });
    history = this.$history.asObservable();

    private $currentHistory = new BehaviorSubject<History | null>(null);
    currentHistory = this.$currentHistory.asObservable();


    loadHistory(articleId: string, historyFilterParams?: HistoryFilterParams, forceReload = false) {
        if (this.$history.value.data.length && !forceReload) {
            return;
        }
        this.historyApiService.getForArticle(articleId, historyFilterParams).subscribe(history => {
            this.$history.next(history);
        })
    }

    setCurrentHistory(history: History) {
        this.$currentHistory.next(history);
    }
}
