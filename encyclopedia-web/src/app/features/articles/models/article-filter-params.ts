import {PaginationData} from '../../../core/models/pagination-data';

export class ArticleFilterParams {

    constructor(title: string, pagination?: PaginationData) {
        this.title = title;
        this.pagination = pagination;
    }

    title: string;
    pagination?: PaginationData;
}
