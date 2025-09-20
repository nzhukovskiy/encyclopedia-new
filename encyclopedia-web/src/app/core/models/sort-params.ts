export class SortParams {
    constructor(sortColumn: string, sortOrder: "DESC" | "ASC") {
        this.sortColumn = sortColumn;
        this.sortOrder = sortOrder;
    }

    sortColumn: string;
    sortOrder: "DESC" | "ASC";
}
