import {PaginationData} from '../../../core/models/pagination-data';
import {SortParams} from '../../../core/models/sort-params';

export class HistoryFilterParams {

    constructor(sortBy?: SortParams, pagination?: PaginationData) {
        this.sortBy = sortBy;
        this.pagination = pagination;
    }

    sortBy?: SortParams;
    pagination?: PaginationData;
}
