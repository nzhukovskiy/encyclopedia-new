export class PaginationResult<T> {
    constructor(data: T[], pagination: { total: number; page: number; limit: number }) {
        this.data = data;
        this.pagination = pagination;
    }

    data: T[];
    pagination: {
        total: number;
        page: number;
        limit: number;
    }
}
