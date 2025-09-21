import {PaginationData} from '../../../core/models/pagination-data';

export class HistoryFilterParams {

    constructor(sortBy?: string, pagination?: PaginationData) {
        this.sortBy = sortBy;
        this.pagination = pagination;
    }

    sortBy?: string;
    pagination?: PaginationData;
}
