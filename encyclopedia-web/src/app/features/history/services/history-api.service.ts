import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {History} from '../models/history';
import { PaginationResult } from '../../../core/models/pagination-result';
import {map, tap} from 'rxjs';
import {PaginationAdapterService} from '../../../core/adapters/pagination-adapter.service';
import {ArticleFilterParams} from '../../articles/models/article-filter-params';
import {HistoryFilterParams} from '../models/history-filter-params';

@Injectable({
    providedIn: 'root'
})
export class HistoryApiService {

    constructor(private readonly httpClient: HttpClient,
                private readonly paginationAdapterService: PaginationAdapterService) {
    }

    getForArticle(articleId: string, historyFilterParams?: HistoryFilterParams) {
        let params = new HttpParams();
        if (historyFilterParams) {
            if (historyFilterParams.pagination) {
                params = params.append("page", historyFilterParams.pagination.page);
                params = params.append("limit", historyFilterParams.pagination.limit);
            }
        }
        return this.httpClient.get<any>(`articles/${articleId}/history`, {params}).pipe(
            map((x) => this.paginationAdapterService.adaptTypeOrmResponse<History>(x))
        );
    }

    getSingleHistory(historyId: number) {
        return this.httpClient.get<History>(`history/${historyId}`);
    }
}
