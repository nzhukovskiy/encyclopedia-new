export class PaginationData {
    constructor(total: number, page: number, limit: number) {
        this.total = total;
        this.page = page;
        this.limit = limit;
    }

    total: number;
    page: number;
    limit: number;
}
