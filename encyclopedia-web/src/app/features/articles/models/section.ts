import {Column} from './column';

export class Section {
    constructor(title: string, columns: Column[]) {
        this.title = title;
        this.columns = columns;
    }

    title: string;
    columns: Column[];
}
